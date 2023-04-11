import { MenuItem, Select, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import DeleteConfirmation from "../../../components/UI/DeleteConfirmation";
import config from "../../../config";
import {
  getSearchLink,
  deleteSearchLinkById,
  udpdateSearchLink,
  getSubAdmin,
} from "../../../redux/actions/Admin/AdminActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import AssignUser from "./AssignUser";
import AddHrModal from "./AddHrModal";
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
const ListSearch = (props) => {
  const classes = useStyle();
  const loc = useNavigate();

  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [order, setOrder] = useState("de");
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [openAsignModal, setOpenAssignModal] = useState(false);
  const [aid, setAid] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);

  const ud = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setTitle,
      getSearchLink,
      deleteSearchLinkById,
      udpdateSearchLink,
      getSubAdmin,
    },
    dispatch
  );

  const updateCloseAndHr = async (hoursSpent, id) => {
    setAid(() => "");
    setCloseOpen(() => false);
    setLoading(() => true);
    if (id) {
      await actions.udpdateSearchLink({ hoursSpent, close: true }, id);
      await getData();
    }
    setLoading(() => false);
  };
  const getData = async () => {
    setLoading(true);
    setOrder("de");
    ctc.createToken();
    const res = await actions.getSearchLink(ctc.getToken());
    if (res && res.length) {
      setSearchData(() => res);
      setOldData(() => res);
    } else {
      setSearchData(() => []);
      setOldData(() => []);
    }
    setLoading(false);
  };

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const handleDelete = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await actions.deleteSearchLinkById(delId);
      await getData();
      setDelId("");
    }
    setLoading(false);
  };
  useEffect(() => {
    actions.setTitle({ title: props.title });
    getData();
    getSubAdminData();
    return () => ctc.cancelTheApi();
  }, []);
  const [userData, setUserData] = useState([]);
  const getSubAdminData = async () => {
    if (ud.subRole !== "analyst") {
      ctc.createToken();
      const res = await actions.getSubAdmin("", ctc.getToken());
      if (res && res.length) {
        setUserData(() =>
          res.map((a) => {
            return {
              label: a.name,
              value: a._id,
            };
          })
        );
      } else {
        setUserData(() => []);
      }
    }
  };

  const handleAssign = async (sid, id) => {
    setAid(() => "");
    setOpenAssignModal(() => false);
    setLoading(() => true);
    await actions.udpdateSearchLink({ assignedBy: ud.id, assignedTo: id }, sid);
    await getData();
    setLoading(() => false);
  };

  const handleOrd = (o) => {
    if (o !== "de") {
      const fd = [];
      switch (o) {
        // case 0: {
        //   oldData.forEach((a) => {
        //     if (a.claimStatus) fd.push(a);
        //   });
        //   break;
        // }
        // case 1: {
        //   oldData.forEach((a) => {
        //     if (!a.claimStatus) fd.push(a);
        //   });
        //   break;
        // }
        case 2: {
          oldData.forEach((a) => {
            if (a.linkType.match("Potential Primary")) fd.push(a);
          });
          break;
        }
        case 3: {
          oldData.forEach((a) => {
            if (a.linkType.match("Must Search to Sort")) fd.push(a);
          });
          break;
        }
      }
      setSearchData(() => fd);
    } else {
      setSearchData(() => oldData);
    }
    setOrder(o);
  };
  const columns = [
    { field: "searchName", headerName: "Name", minWidth: 120, flex: 0.5 },
    {
      field: "searchLink",
      headerName: "Source Of Finding",
      minWidth: 140,
      flex: 0.5,
    },
    {
      field: "linkType",
      headerName: "Link Type",
      minWidth: 90,
      flex: 0.5,
    },
    {
      field: "notes",
      headerName: "Notes",
      minWidth: 120,
    },
    {
      field: "claimUserId",
      headerName: "Created By",
      renderCell: (params) => {
        return (
          <div>
            {(params.row.createdBy && params.row.createdBy.name) || "-"}
          </div>
        );
      },
      minWidth: 120,
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.createdBy && row.createdBy.name) {
          result = row.createdBy.name;
        }
        return result;
      },
    },

    {
      field: "assignedBy",
      headerName: "Assigned By",
      renderCell: (params) => {
        return (
          <div>
            {(params.row.assignedBy && params.row.assignedBy.name) || "-"}
          </div>
        );
      },
      minWidth: 120,
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.assignedBy && row.assignedBy.name) {
          result = row.assignedBy.name;
        }
        return result;
      },
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      renderCell: (params) => {
        return (
          <div>
            {(params.row.assignedTo && params.row.assignedTo.name) || "-"}
          </div>
        );
      },
      minWidth: 120,
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.assignedTo && row.assignedTo.name) {
          result = row.assignedTo.name;
        }
        return result;
      },
    },
    {
      field: "orgCount",
      headerName: "Org Count",
      minWidth: 90,
    },
    {
      field: "hoursSpent",
      headerName: "Hours Spend",
      minWidth: 90,
    },
    {
      field: "close",
      headerName: "Close",
      minWidth: 90,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 190,
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "5px",
              maxHeight: "40px",
            }}
          >
            {!params.row.close && (
              <CustomButton
                name={"Edit"}
                varient={"contained"}
                onclick={() => loc(`/edit-search/${params.row._id}`)}
              />
            )}
            {ud.subRole !== "analyst" &&
              !params.row.close &&
              !params.row.assignedTo && (
                <CustomButton
                  name={"Assign"}
                  varient={"contained"}
                  onclick={() => {
                    setAid(() => params.row._id);
                    setOpenAssignModal(() => true);
                  }}
                />
              )}
            {!params.row.assignedTo && !params.row.close && (
              <CustomButton
                name={"Claim"}
                varient={"contained"}
                onclick={() => handleAssign(params.row._id, ud.id)}
              />
            )}
            {params.row.assignedTo && !params.row.close && (
              <CustomButton
                name={"Add Org"}
                varient={"contained"}
                onclick={() => loc(`/org-add/${params.row._id}`)}
              />
            )}
            {params.row.assignedTo && !params.row.close && (
              <CustomButton
                name={"Close"}
                varient={"contained"}
                onclick={() => {
                  setAid(() => params.row._id);
                  setCloseOpen(() => true);
                }}
              />
            )}

            <CustomButton
              name={"Make A Copy"}
              varient={"contained"}
              onclick={() => loc(`/add-search/${params.row._id}`)}
            />
            {ud && ud.subRole !== "analyst" && (
              <CustomButton
                name={"Delete"}
                varient={"contained"}
                styled={{ backgroundColor: "red" }}
                onclick={() => handleDeleteModalOpen(params.row._id)}
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
        <div>
          <CustomButton
            name="Add Search Link"
            className="w-100"
            varient={"contained"}
            onclick={() => loc("/add-search")}
          />
        </div>
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
            <MenuItem value={2}>Potential Primary</MenuItem>
            <MenuItem value={3}>Must Search to Sort</MenuItem>
          </Select>
        </div>
      </Stack>

      <div style={{ height: 550, overflow: "auto", width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={searchData || []}
          disableExtendRowFullWidth={false}
          columns={columns}
          disableSelectionOnClick
          loading={loading}
          rowsPerPageOptions={[...config.pageSlot]}
        />
      </div>
      <AssignUser
        open={openAsignModal}
        handleClose={() => {
          setAid(() => "");
          setOpenAssignModal(() => false);
        }}
        userData={userData}
        id={aid}
        handleAssign={(a, b) => handleAssign(a, b)}
      />
      <AddHrModal
        open={closeOpen}
        handleClose={() => {
          setAid(() => "");
          setCloseOpen(() => false);
        }}
        id={aid}
        handleAssign={(a, b) => updateCloseAndHr(a, b)}
      />
      <DeleteConfirmation
        open={deleteModal}
        title="Search Link"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleDelete()}
      />
    </div>
  );
};

export default ListSearch;
