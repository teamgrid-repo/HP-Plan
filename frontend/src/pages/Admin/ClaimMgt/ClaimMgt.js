import { MenuItem, Select, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import CustomModal from "../../../components/UI/CustomModal";
import config from "../../../config";
import {
  getSiteClaim,
  updateSiteClaim,
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
const ClaimMgt = (props) => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [order, setOrder] = useState("de");
  const [openClaimUser, setOpenClaimUser] = useState(false);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setTitle, getSiteClaim, updateSiteClaim },
    dispatch
  );

  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getSiteClaim(ctc.getToken());
    setOrder("de");
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

  const handleClaimStatus = async (id, status) => {
    setLoading(true);
    await actions.updateSiteClaim(id, { status: status });
    await getData();
    setLoading(false);
  };
  const handleOrder = (o) => {
    if (o !== "de") {
      setUserData(() => oldData.filter((a) => a.status === o));
    } else {
      setUserData(() => oldData);
    }
    setOrder(o);
  };

  const handleOpenModal = (row) => {
    setOpenClaimUser(true);
    console.log(row?._id);
    setUserId(row?._id);
  };

  const handleClose = () => {
    setOpenClaimUser(false);
    setUserId("");
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
      headerName: "Alternative Email",
      minWidth: 120,
      flex: 1,
      field: "altEmail",
    },
    {
      flex: 1,
      headerName: "Job Title",
      minWidth: 120,
      field: "jobTitle",
    },
    {
      flex: 1,
      headerName: "How You Heard",
      field: "howYouHeard",
      minWidth: 120,
    },
    {
      flex: 1,
      headerName: "Site Name",
      minWidth: 130,
      field: "Site Name",
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
      headerName: "Organization",
      minWidth: 120,
      field: "Organization",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.organisationId && row.organisationId.name) {
          result = row.organisationId.name;
        }
        return result;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 200,
      flex: 1,
      renderCell: ({ row }) => {
        return row.status === "pending" ? (
          <div
            style={{
              display: "flex",
              gap: "10px",
              maxWidth: 190,
            }}
          >
            <CustomButton
              name={"Approve"}
              varient={"contained"}
              onclick={
                row?.isGeneralUser
                  ? () => handleOpenModal(row)
                  : () => handleClaimStatus(row?._id, "approved")
              }
            />
            <CustomButton
              name={"Reject"}
              varient={"contained"}
              styled={{ background: "red" }}
              onclick={() => handleClaimStatus(row._id, "cancelled")}
            />
          </div>
        ) : (
          row.status
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
            value={order}
            onChange={(e) => handleOrder(e.target.value)}
          >
            <MenuItem value="de">
              <em>All</em>
            </MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"approved"}>Approved</MenuItem>
            <MenuItem value={"cancelled"}>Rejected</MenuItem>
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
          rowHeight={100}
          rowsPerPageOptions={[...config.pageSlot]}
        />
      </div>

      <CustomModal
        open={openClaimUser}
        title="Claim Site Confirmation"
        handleClose={handleClose}
        content={
          "This action will create a new provider user account, but it will keep the past quizzes, saved searches, and saved lists linked to it. Except these, all the other data linked to the old general user account will be lost."
        }
        actions={() => {
          return (
            <>
              <CustomButton
                varient="contained"
                onclick={() => setOpenClaimUser(false)}
                name="Cancel"
                styled={{ backgroundColor: "red" }}
                size="large"
                fullWidth={true}
              />
              <CustomButton
                varient="outlined"
                onclick={() => {
                  handleClaimStatus(userId, "approved");
                  setOpenClaimUser(false);
                }}
                name="Submit"
                size="large"
                fullWidth={true}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default ClaimMgt;
