import {
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import config from "../../../config";
import {
  getAccClaim,
  updateAccClaim,
} from "../../../redux/actions/Admin/AdminActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";

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
const AccAppMgt = (props) => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [order, setOrder] = useState("de");
 
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setTitle, getAccClaim, updateAccClaim },
    dispatch
  );

  const getData = async () => {
    setLoading(true);
    const res = await actions.getAccClaim();
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
  }, []);

  const handleClaimStatus = async (id, status) => {
    setLoading(true);
    await actions.updateAccClaim({ id, approvedStatus: status });
    await getData();
    setLoading(false);
  };
  const handleOrder = (o) => {
    if (o !== "de") {
      setUserData(() => oldData.filter((a) => a.approvedStatus === o));
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
      headerName: "Organization",
      minWidth: 120,
      field: "Organization",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.organization && row.organization.name) {
          result = row.organization.name;
        }
        return result;
      },
    },

    {
      flex: 1,
      headerName: "Address",
      minWidth: 120,
      field: "address",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.organization && row.organization.address) {
          result = row.organization.address;
        }
        return result;
      },
    },

    {
      flex: 1,
      headerName: "City",
      minWidth: 120,
      field: "city",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.organization && row.organization.city) {
          result = row.organization.city;
        }
        return result;
      },
    },

    {
      flex: 1,
      headerName: "State",
      minWidth: 90,
      field: "state",
      valueGetter: ({ row }) => {
        let result = "-";
        if (row.organization && row.organization.state) {
          result = row.organization.state;
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
      renderCell: ({ row }) => {
        return row.approvedStatus === "pending" ? (
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <CustomButton
              name={"Approve"}
              varient={"contained"}
              onclick={() => handleClaimStatus(row._id, "approved")}
            />
            <CustomButton
              name={"Reject"}
              varient={"contained"}
              onclick={() => handleClaimStatus(row._id, "cancelled")}
            />
          </div>
        ) : (
          row.approvedStatus
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
    </div>
  );
};

export default AccAppMgt;
