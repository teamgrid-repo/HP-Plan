import { bindActionCreators } from "redux";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import {
  daleteFeedbacks,
  getFeedbacks,
} from "../../../redux/actions/Feeback/FeedbackAction";
import CustomButton from "../../../components/UI/CustomButton";
import DeleteConfirmation from "../../../components/UI/DeleteConfirmation";
import config from "../../../config";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select, Stack } from "@mui/material";
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

const Feedbackmgt = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setTitle, daleteFeedbacks, getFeedbacks },
    dispatch
  );
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [arch, setArch] = useState("unArchive");

  useEffect(() => {
    actions.setTitle({ title: props.title });
    loadData();
    return () => ctc.cancelTheApi();
  }, []);

  const loadData = async () => {
    setLoading(() => true);
    ctc.createToken();
    const res = await actions.getFeedbacks(ctc.getToken());
    if (res) {
      setData(() => res);
    } else {
      setData(() => []);
    }
    setLoading(() => false);
  };

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };
  const deleteFeedback = async (id) => {
    setDeleteModal(false);
    setLoading(true);
    if (delId || id) {
      await actions.daleteFeedbacks(delId || id);
      await loadData();
    }
    setLoading(() => false);
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
      headerName: "Organization",
      minWidth: 120,
      field: "profileId1",
      valueGetter: ({ row }) => {
        let result = "-";
        if (
          row.siteId &&
          row.siteId.organisationId &&
          row.siteId.organisationId.name
        ) {
          result = row.siteId.organisationId.name;
        }
        return result;
      },
    },
    {
      headerName: "Site",
      minWidth: 120,
      field: "profileId2",
      flex: 1,
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.siteId && row.siteId.name) {
          result = row.siteId.name;
        }
        return result;
      },
    },
    {
      flex: 1,
      headerName: "Feedback",
      field: "feedback",
      minWidth: 120,
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 190,
      renderCell: ({ row }) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {" "}
            <CustomButton
              name={arch === "archive" ? "unarchive" : "archive"}
              varient={"contained"}
              onclick={() => deleteFeedback(row._id)}
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
            size="small"
            variant="standard"
            value={arch}
            onChange={(e) => setArch(e.target.value)}
          >
            <MenuItem value={"archive"}>archive</MenuItem>
            <MenuItem value={"unArchive"}>unarchive</MenuItem>
          </Select>
        </div>
      </Stack>
      <div style={{ height: 550, overflow: "auto", width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data[arch] || []}
          disableExtendRowFullWidth={false}
          columns={columns}
          disableSelectionOnClick
          loading={loading}
          rowHeight={100}
          rowsPerPageOptions={[...config.pageSlot]}
        />
      </div>
      <DeleteConfirmation
        open={deleteModal}
        title="Site"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => deleteFeedback()}
      />
    </div>
  );
};

export default Feedbackmgt;
