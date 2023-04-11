import { Search } from "@mui/icons-material";
import { Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import DeleteConfirmation from "../../../components/UI/DeleteConfirmation";
import config from "../../../config";
import {
  getSubAdmin,
  deleteSubAdmin,
} from "../../../redux/actions/Admin/AdminActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import AddModal from "./AddModal";
import { debounce } from "lodash";
import { DataGrid } from "@mui/x-data-grid";
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
const UserMgt = (props) => {
  const classes = useStyle();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [keyword, setKeyword] = useState("");

  const debouncedSave = useCallback(
    debounce((k) => getByName(k), 1000),
    []
  );
  const getByName = async (k) => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getSubAdmin(k, ctc.getToken());
    if (res && res.length) {
      setUserData(() => res);
    } else {
      setUserData(() => []);
    }
    setLoading(false);
  };

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setTitle, getSubAdmin, deleteSubAdmin },
    dispatch
  );

  const handleKSearch = (k) => {
    debouncedSave(k);
    setKeyword(k);
  };

  const handleOpenModal = (i) => {
    setId(() => i);
    setOpen(() => true);
  };
  const handleCloseModal = () => {
    setId(() => "");
    setOpen(() => false);
    getData();
  };

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const handleDeleteSubAdmin = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await actions.deleteSubAdmin(delId);
      await getData();
      setDelId("");
    }
    setLoading(false);
  };

  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getSubAdmin("", ctc.getToken());
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

  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "contact",
      headerName: "Phone",
      width: 120,
    },

    {
      field: "subRole",
      headerName: "Role",
      width: 120,
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 180,

      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <CustomButton
              name={"Edit"}
              varient={"contained"}
              onclick={() => handleOpenModal(params.row)}
            />
            <CustomButton
              name={"Delete"}
              varient={"contained"}
              styled={{ backgroundColor: "red" }}
              onclick={() => handleDeleteModalOpen(params.row._id)}
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
        flexWrap="wrap"
      >
        <div>
          <Search style={{ marginTop: "4px", marginRight: "3px" }} />
          <TextField
            variant="standard"
            placeholder="Search User"
            value={keyword}
            onChange={(e) => handleKSearch(e.target.value)}
          />
        </div>
        <div>
          <CustomButton
            name="Add Admin User"
            className="w-100"
            varient={"contained"}
            onclick={() => handleOpenModal("")}
          />
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
      <AddModal open={open} udata={id} handleClose={handleCloseModal} />
      <DeleteConfirmation
        open={deleteModal}
        title="User"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleDeleteSubAdmin()}
      />
    </div>
  );
};

export default UserMgt;
