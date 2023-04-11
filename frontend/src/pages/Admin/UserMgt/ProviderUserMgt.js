import { MenuItem, Select, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import DeleteConfirmation from "../../../components/UI/DeleteConfirmation";
import ResendInviteModal from "../../../components/UI/ResendInviteModal";
import ViewSubUser from "../../../components/UI/ViewSubUser";
import config from "../../../config";
import {
  getFrezeList,
  deleteFrezeList,
  updateFrezeList,
  getAdminOrgListIdsAndName,
  updateDataApproval,
  updateAccClaim,
  updateSiteClaim,
  resendInvite,
} from "../../../redux/actions/Admin/AdminActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import CancelToken from "../../../utils/cancelClass";
import AddWithNewOrg from "./AddWithNewOrg";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  aboutContainer: {
    paddingTop: "8em",
    width: "95%",
    textAlign: "center",
    margin: "auto",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      width: "99%",
    },
  },

  sortContainer: {
    display: "flex",
    gap: "10px",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
  },
  sortLabel: {
    fontSize: "14px",
    color: "#696974",
    paddingTop: "10px",
    paddingRight: "10px",
  },
}));
const nameObj = {
  claim: "Claim",
  new_registration: "Register",
  system: "Created",
  poc: "Poc",
};
const ProviderUserMgt = (props) => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [order, setOrder] = useState("de");
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [delType, setDelType] = useState("");
  const [openView, setOpenView] = useState(false);
  const [openViewData, setOpenViewData] = useState(false);

  const handleOpenView = async (data) => {
    setOpenViewData(() => data);
    setOpenView(() => true);
  };
  const [openWithEdit, setOpenWithEdit] = useState(false);
  const [orgsData, setOrgsData] = useState([]);
  const handleCloseView = () => {
    setOpenViewData(() => "");
    setOpenView(() => false);
  };
  const [aeid, setAeid] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resendEmailModal, setResendEmailModal] = useState(false);
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setTitle,
      getFrezeList,
      deleteFrezeList,
      updateFrezeList,
      getAdminOrgListIdsAndName,
      updateDataApproval,
      updateAccClaim,
      updateSiteClaim,
      resendInvite,
    },
    dispatch
  );
  const ud = useSelector((state) => state.auth.user);

  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await Promise.all([
      actions.getFrezeList("provider", ctc.getToken()),
      actions.getAdminOrgListIdsAndName(ctc.getToken()),
    ]);
    setOrder("de");

    if (res && res[1] && res[1].length) {
      const org = res[1];
      setOrgsData(() =>
        org.map((v) => {
          return { label: v.name, value: v._id };
        })
      );
    }
    if (res && res[0] && res[0].length) {
      setUserData(() => uniqBy(res[0], "_id"));
      setOldData(() => uniqBy(res[0], "_id"));
    } else {
      setUserData(() => []);
      setOldData(() => []);
    }
    setLoading(false);
  };

  useEffect(() => {
    actions.setTitle({ title: props.title });
    getData();
    return () => ctc.cancelTheApi();
  }, []);

  const handleDeleteModalOpen = (type, id) => {
    setDelId(() => id);
    setDelType(() => type);
    setDeleteModal(() => true);
  };

  const handleResendInviteModalOpen = (email) => {
    setResendEmail(() => email);
    setResendEmailModal(() => true);
  };

  const handleFrezeDelete = async (id, d, status, type = "") => {
    setDeleteModal(false);
    setLoading(true);
    if (d) {
      if (id) await actions.deleteFrezeList(type, id);

      setDelId("");
    } else {
      await actions.updateFrezeList({ id: id, status: status });
    }
    await getData();
    setLoading(false);
  };

  const handleResendEmail = async (email) => {
    setResendEmailModal(false);
    setLoading(true);
    if (email) {
      await actions.resendInvite({ email });
      setResendEmail("");
    }
    await getData();
    setLoading(false);
  };

  const handleOrd = (o) => {
    if (o !== "de") {
      const fd = [];
      // eslint-disable-next-line default-case
      switch (o) {
        case 0: {
          oldData.forEach((a) => {
            if (a.freeze) fd.push(a);
          });
          break;
        }
        case 1: {
          oldData.forEach((a) => {
            if (
              (a.status && a.status === "pending") ||
              a.approvedStatus === "pending"
            )
              fd.push(a);
          });
          break;
        }
        case 2: {
          oldData.forEach((a) => {
            if (a.status && a.status === "cancelled") fd.push(a);
          });
          break;
        }
      }
      setUserData(() => fd);
    } else {
      setUserData(() => oldData);
    }
    setOrder(o);
  };
  const approvalS = async (status, id, orgid, change = false, poc, claim) => {
    setLoading(true);
    if (claim) {
      await actions.updateSiteClaim(id, { status: status });
    } else if (poc) {
      await actions.updateDataApproval({
        status: status,
        id: id,
        type: "subUser",
      });
    } else if (change && orgid) {
      setOpenWithEdit(() => false);
      setAeid(() => "");
      await actions.updateAccClaim({
        approvedStatus: status,
        id: id,
        newOrgId: orgid,
      });
    } else {
      await actions.updateAccClaim({
        approvedStatus: status,
        id: id,
      });
    }
    await getData();
    setLoading(false);
  };
  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      valueGetter: ({ row }) => {
        let result = "-";

        if (
          row.userId &&
          row.userId.status &&
          typeof row.userId.status === "string"
        ) {
          result = row.userId.status;
        } else if (row.userId && row.userId.freeze) {
          result = "Freeze";
        }
        return result;
      },
    },
    {
      field: "method",
      headerName: "Method",
      minWidth: 100,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 100,
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.providerType && nameObj[row.providerType]) {
          result = nameObj[row.providerType];
        }
        return result;
      },
    },
    {
      headerName: "Requested By",
      minWidth: 120,
      field: "Requested By",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.requestBy && row.requestBy.name) {
          result = row.requestBy.name;
        }
        return result;
      },
    },
    {
      headerName: "Approved By",
      minWidth: 120,
      field: "approvedBy",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.approvedBy && row.approvedBy.name) {
          result = row.approvedBy.name;
        }
        return result;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      filterable: false,
      minWidth: 390,
      renderCell: ({ row }) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "9px",
            }}
          >
            <CustomButton
              name="View"
              varient={"contained"}
              onclick={() => handleOpenView(row)}
            />
            {(row.userId && row.userId.status === "approved") ||
            row.approvedStatus === "approved" ||
            row.status === "approved" ? (
              <CustomButton
                name={row.userId && row.userId.freeze ? "Unfreeze" : "Freeze"}
                varient={"contained"}
                onclick={() =>
                  handleFrezeDelete(row._id, false, !row.userId.freeze)
                }
              />
            ) : (
              <>
                <CustomButton
                  name={"Approve"}
                  varient={"contained"}
                  onclick={() =>
                    approvalS(
                      "approved",
                      row._id,
                      "",
                      false,
                      row.providerType === "poc",
                      row.providerType === "claim"
                    )
                  }
                />
                {!row.providerType ||
                row.providerType === "new_registration" ? (
                  <CustomButton
                    name={"approve with change"}
                    varient={"contained"}
                    onclick={() => {
                      setAeid(() => row._id);
                      setOpenWithEdit(() => true);
                    }}
                  />
                ) : null}
                {row.status === "cancelled" ||
                row.approvedStatus === "cancelled" ? null : (
                  <CustomButton
                    name={"Reject"}
                    varient={"contained"}
                    onclick={() =>
                      approvalS(
                        "cancelled",
                        row._id,
                        "",
                        false,
                        row.providerType === "poc",
                        row.providerType === "claim"
                      )
                    }
                  />
                )}
              </>
            )}
            <CustomButton
              name={"Resend Invite"}
              // styled={{ backgroundColor: "red" }}
              varient={"contained"}
              onclick={() => handleResendInviteModalOpen(row.email)}
            />
            {ud && ud.subRole && ud.subRole !== "analyst" && (
              <CustomButton
                name={"Delete"}
                styled={{ backgroundColor: "red" }}
                varient={"contained"}
                onclick={() => handleDeleteModalOpen(row.providerType, row._id)}
              />
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className={classes.aboutContainer}>
      <Stack
        direction="row"
        justifyContent="space-between"
        style={{ marginBottom: "20px" }}
      >
        <div className={classes.sortContainer}>
          <div className={classes.sortLabel}>View:</div>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={order}
            size="small"
            variant="standard"
            onChange={(e) => handleOrd(e.target.value)}
          >
            <MenuItem value="de">
              <em>All</em>
            </MenuItem>
            <MenuItem value={0}>Freeze</MenuItem>
            <MenuItem value={1}>Pending</MenuItem>
            <MenuItem value={2}>Reject</MenuItem>
          </Select>
        </div>
      </Stack>
      <div style={{ height: 550, overflow: "auto", width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={userData || []}
          disableExtendRowFullWidth={false}
          columns={columns}
          rowHeight={70}
          disableSelectionOnClick
          loading={loading}
          rowsPerPageOptions={[...config.pageSlot]}
        />
      </div>
      <DeleteConfirmation
        open={deleteModal}
        title="User"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleFrezeDelete(delId, true, "", delType)}
      />
      <ResendInviteModal
        open={resendEmailModal}
        title="User"
        handleClose={() => setResendEmailModal(false)}
        handleDelete={() => handleResendEmail(resendEmail)}
      />
      <ViewSubUser
        handleClose={() => handleCloseView()}
        open={openView}
        viewD={openViewData}
        dontShow={true}
      />
      <AddWithNewOrg
        handleClose={() => {
          setOpenWithEdit(() => false);
          setAeid(() => "");
        }}
        open={openWithEdit}
        editUserId={aeid}
        orgData={orgsData}
        handleEdit={(oid, id) => approvalS("approved", id, oid, true)}
      />
    </div>
  );
};

export default ProviderUserMgt;
