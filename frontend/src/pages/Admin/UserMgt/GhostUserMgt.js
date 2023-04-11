import { MenuItem, Select, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import DeleteConfirmation from "../../../components/UI/DeleteConfirmation";
import config from "../../../config";
import {
  getGhostProvider,
  deleteGhostAccount,
  getGhostPOC,
  deletePOC,
} from "../../../redux/actions/Admin/AdminActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  aboutContainer: {
    paddingTop: "8em",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      width: "95%",
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

const GhostUserMgt = (props) => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [delId, setDelId] = useState("");
  const [userID, setUserId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [delPOCId, setDelPOCId] = useState("");
  const [userPOCID, setUserPOCId] = useState("");
  const [deletePOCModal, setDeletePOCModal] = useState(false);
  const [order, setOrder] = useState("de");

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setTitle,
      getGhostProvider,
      deleteGhostAccount,
      getGhostPOC,
      deletePOC,
    },
    dispatch
  );

  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getGhostProvider(ctc.getToken());
    if (res && res.length) {
      setUserData(() => res);
    } else {
      setUserData(() => []);
    }
    setLoading(false);
  };

  const gerGhostPOCData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getGhostPOC(ctc.getToken());
    if (res && res.length) {
      setUserData(() => res);
    } else {
      setUserData(() => []);
    }
    setLoading(false);
  };

  useEffect(() => {
    actions.setTitle({ title: props.title });
    getData();
    return () => ctc.cancelTheApi();
  }, []);

  const handleOrd = (o) => {
    if (o !== "de") {
      // eslint-disable-next-line default-case
      switch (o) {
        // eslint-disable-next-line no-lone-blocks
        case 0: {
          gerGhostPOCData();
          break;
        }
      }
    } else {
      getData();
    }
    setOrder(o);
  };

  const handleDeleteModalOpen = (id, userId) => {
    setDelId(() => id);
    setUserId(() => userId);
    setDeleteModal(() => true);
  };

  const handleDeletePOCModalOpen = (id, userId) => {
    setDelPOCId(() => id);
    setUserPOCId(() => userId);
    setDeletePOCModal(() => true);
  };
  const handleDelete = async (id, userId) => {
    setDeleteModal(false);
    setLoading(true);
    await actions.deleteGhostAccount(id, userId);
    setDelId("");
    setUserId("");
    await getData();
    setLoading(false);
  };

  const handleDeletePOC = async (id, userId) => {
    setDeletePOCModal(false);
    setLoading(true);
    await actions.deletePOC(id, userId);
    setDelPOCId("");
    setUserPOCId("");
    await gerGhostPOCData();
    setLoading(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
      valueGetter: ({ row }) => {
        return row?.name ?? "-";
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 120,
      valueGetter: ({ row }) => {
        return row?.email ?? "-";
      },
    },
    {
      headerName: "Organization",
      field: "organization",
      flex: 1,
      minWidth: 190,
      valueGetter: ({ row }) => {
        return order === "de"
          ? row?.organization?.name ?? "-"
          : row?.organisationId?.name ?? "-";
      },
    },
    {
      headerName: "Phone",
      minWidth: 100,
      flex: 1,
      field: "contact",
      valueGetter: ({ row }) => {
        return row?.contact ?? "-";
      },
    },
    {
      headerName: "Job Title",
      field: "jobTitle",
      minWidth: 120,
      valueGetter: ({ row }) => {
        return row?.jobTitle ?? "-";
      },
    },
    {
      headerName: "Created at",
      field: "createdAt",
      minWidth: 120,
      valueGetter: ({ row }) => {
        return row?.createdAt ?? "-";
      },
    },
    {
      headerName: "Last Login",
      field: "lastLogin",
      minWidth: 120,
      valueGetter: ({ row }) => {
        return row?.lastLogin ?? "-";
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 80,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <CustomButton
              name={order === "de" ? "Convert" : "Delete"}
              styled={{ backgroundColor: "red" }}
              varient={"contained"}
              onclick={() => {
                order === "de"
                  ? handleDeleteModalOpen(row._id, row?.userId)
                  : handleDeletePOCModalOpen(
                      row.staticPocId,
                      row?.organisationId?._id
                    );
              }}
            />
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
              <em>Ghost User</em>
            </MenuItem>
            <MenuItem value={0}>Deleted Ghost User</MenuItem>
          </Select>
        </div>
      </Stack>
      <div style={{ height: 550, overflow: "auto", width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={userData || []}
          disableExtendRowFullWidth={false}
          columns={columns}
          disableSelectionOnClick
          loading={loading}
          rowsPerPageOptions={[...config.pageSlot]}
        />
      </div>
      <DeleteConfirmation
        open={deleteModal}
        title="Ghost User"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleDelete(delId, userID)}
      />
      <DeleteConfirmation
        open={deletePOCModal}
        title="Ghost Deleted User"
        handleClose={() => setDeletePOCModal(false)}
        handleDelete={() => handleDeletePOC(delPOCId, userPOCID)}
      />
    </div>
  );
};

export default GhostUserMgt;
