import { MenuItem, Select, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import DeleteConfirmation from "../../../components/UI/DeleteConfirmation";
import config from "../../../config";
import {
  getFrezeList,
  deleteFrezeList,
  updateFrezeList,
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
const GeneralUserMgt = (props) => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [order, setOrder] = useState("de");
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setTitle, getFrezeList, deleteFrezeList, updateFrezeList },
    dispatch
  );

  const getData = async () => {
    setLoading(true);
    setOrder("de");
    ctc.createToken();
    const res = await actions.getFrezeList("user", ctc.getToken());
    if (res && res.length) {
      setUserData(() => res);
      setOldData(() => res);
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

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const handleFrezeDelete = async (id, d, status) => {
    setDeleteModal(false);

    setLoading(true);
    if (d) {
      if (id) await actions.deleteFrezeList("user", id);
      setDelId("");
    } else {
      await actions.updateFrezeList({ id: id, status: status, type: "user" });
    }
    await getData();
    setLoading(false);
  };

  const handleOrd = (o) => {
    if (o !== "de") {
      const fd = [];
      switch (o) {
        case 0: {
          oldData.forEach((a) => {
            if (a.freeze) fd.push(a);
          });
          break;
        }
        case 1: {
          oldData.forEach((a) => {
            if (!a.freeze) fd.push(a);
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
  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 120,
    },
    {
      headerName: "Phone",
      minWidth: 120,
      flex: 1,
      field: "profileId1",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.profileId && row.profileId.contact) {
          result = row.profileId.contact;
        }
        return result;
      },
    },
    {
      headerName: "Date Of Birth",
      minWidth: 120,
      field: "profileId2",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.profileId && row.profileId.dob) {
          result = moment(row.profileId.dob).format("MMM, DD yyyy");
        }
        return result;
      },
    },
    {
      headerName: "Gender",
      field: "profileId3",
      minWidth: 120,
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.profileId && row.profileId.gender) {
          result = row.profileId.gender;
        }
        return result;
      },
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 190,
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
              name={row.freeze ? "Unfreeze" : "Freeze"}
              varient={"contained"}
              onclick={() => handleFrezeDelete(row._id, false, !row.freeze)}
            />
            <CustomButton
              name={"Delete"}
              styled={{ backgroundColor: "red" }}
              varient={"contained"}
              onclick={() => handleDeleteModalOpen(row._id)}
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
              <em>All</em>
            </MenuItem>
            <MenuItem value={0}>Freeze</MenuItem>
            <MenuItem value={1}>Unfreeze</MenuItem>
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
        title="General User"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => handleFrezeDelete(delId, true, "")}
      />
    </div>
  );
};

export default GeneralUserMgt;
