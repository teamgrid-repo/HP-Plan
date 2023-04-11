import { Grid, Divider } from "@mui/material";
import ListingComponent from "../../UI/ListingComponent";
import ListingHeader from "./ProviderAppointmentHeader";
import AppointmentCard from "./ReqAppPCustomComp";
import { makeStyles } from "@mui/styles";
import SavedAppointmentListingCard from "./ReqAppPListingComp";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllAppointment,
  updateStatus,
} from "../../../redux/actions/appointment/appointmentActions";
// import UsStates from "../../../utils/UsStates";
import AppointmentViewModal from "./AppointmentViewModal";
import { getIdRole } from "../../../redux/actions/profile/profileActions";
import {
  getClients,
  addClient,
  deleteClient,
} from "../../../redux/actions/client/clientActions";
//import { groupBy } from "lodash";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  directionProviderButton: {
    width: "164px",
    marginLeft: "auto",
  },
  monthDiv: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#92929d",
    textTransform: "uppercase",
    letterSpacing: "1px",
    paddingBottom: "1px",
  },
  contactProviderButton: {
    width: "164px",
    marginLeft: "auto",
  },
  dateDiv: {
    fontSize: "26px",
    fontWeight: 600,
    color: "#7dbaaf",
    letterSpacing: "0.12px",
    paddingBottom: "1px",
  },
  approved: {
    padding: "7px 10px 6px",
    borderRadius: "5px",
    backgroundColor: "rgba(125, 186, 175, 0.1)",
    fontSize: "10px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#7dbaaf",
    width: "64px",
    textAlign: "center",
    textTransform: "capitalize",
    marginLeft: "0",
    height: "fit-content",
  },
  pending: {
    padding: "7px 10px 6px",
    borderRadius: "5px",
    backgroundColor: "rgba(255, 197, 66, 0.1)",
    fontSize: "10px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#ffc542",
    width: "64px",
    textAlign: "center",
    textTransform: "capitalize",
    marginLeft: "0",
    height: "fit-content",
  },
  cancelled: {
    padding: "7px 10px 6px",
    borderRadius: "5px",
    backgroundColor: "rgba(252, 90, 90, 0.1)",
    fontSize: "10px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#fc5a5a",
    width: "64px",
    textAlign: "center",
    textTransform: "capitalize",
    marginLeft: "0",
    height: "fit-content",
  },
  stateName: {
    textAlign: "left",
    fontSize: "18px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.78,
    letterSpacing: "normal",
    color: "#252222",
  },
  lineOne: {
    background: "#4f8ead",
    height: "5px",
    width: "76px",
    zIndex: 2,
    position: "absolute",
  },
  lineTwo: {
    background: "#ededf2",
    height: "5px",
  },
}));

const ReqAppointmentPC = () => {
  const classes = useStyle();
  const [user, setUser] = useState("");

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      getAllAppointment,
      updateStatus,
      getIdRole,
      getClients,
      addClient,
      deleteClient,
    },
    dispatch
  );

  const [open, setOpen] = useState(false);
  const [selData, setSelData] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [olddata, setoldData] = useState([]);
  const [saveClient, setSaveClient] = useState([]);

  const handleOpenView = (a) => {
    setSelData(a);
    setOpen(true);
  };

  useEffect(() => {
    const u = actions.getIdRole();
    if (u) setUser(() => u);

    loadData();
    return () => ctc.cancelTheApi();
  }, []);

  const loadData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getAllAppointment(ctc.getToken());

    if (res && res.length) {
      // console.log(groupBy(res, (a) => a.siteId.state[0]));
      // const data1 = {};
      // for (let i = 0; i < res.length; i++) {
      //   if (res[i].siteId && res[i].siteId.state[0]) {
      //     const dataState = res[i].siteId.state[0];
      //     const datai = res[i];
      //     if (data1[dataState]) {
      //       data1[dataState].push(datai);
      //     } else {
      //       data1[dataState] = [datai];
      //     }
      //   }
      // }
      // const newData = [];
      // for (const key in data1) {
      //   newData.push(
      //     {
      //       isState: true,
      //       state: UsStates.find((u) => u.value === key)
      //         ? UsStates.find((u) => u.value === key).label
      //         : key,
      //     },
      //     ...data1[key].map((e) => {
      //       return { ...e, isState: false };
      //     })
      //   );
      // }
      // console.log(newData);
      // if (newData && newData.length) {
      //   setData(() => newData);
      // } else {
      setData(() => res);
      // }
      setoldData(() => res);
    }
    setLoading(false);
    ctc.createToken();

    const res2 = await actions.getClients(ctc.getToken());

    if (res2 && res2.length) {
      setSaveClient(() => res2);
    } else {
      setSaveClient(() => []);
    }
  };

  const changeStatus = async (id, status) => {
    setLoading(true);
    setOpen(false);
    await actions.updateStatus(id, { status: status, providerId: user.id });
    await loadData();
    setLoading(false);
  };
  const addToClient = async (id, add) => {
    setLoading(true);
    setOpen(false);
    if (add) {
      await actions.addClient(id);
    } else {
      await actions.deleteClient(id);
    }
    loadData();
    setLoading(false);
  };

  const changeOrder = (o) => {
    if (data && olddata) {
      if (o !== "de") {
        const data1 = olddata.filter((s) => s.status === o);
        setData(data1);
      } else {
        setData(olddata);
      }
    }
  };

  return (
    <ListingComponent>
      <ListingHeader
        headerName="Requested Appointments"
        changeOrder={(e) => changeOrder(e)}
      />
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={2}>
          {data && data.length ? (
            data.map((e, idx) =>
              e.isState ? (
                <Grid item lg={12} md={12} sm={12} xs={12} key={idx}>
                  <div className={classes.stateName}>{e.state}</div>
                  <Divider
                    variant="fullWidth"
                    style={{
                      background: "#4f8ead",
                      height: "5px",
                      width: "76px",
                      zIndex: 2,
                      position: "absolute",
                    }}
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ background: "#ededf2", height: "5px" }}
                  />
                </Grid>
              ) : (
                <SavedAppointmentListingCard
                  key={e._id}
                  date={e.date}
                  name={(e.clientData && e.clientData.name) || ""}
                  address={(e.siteData && e.siteData.address) || ""}
                  cat={
                    (e.service && e.service.serviceName) ||
                    (e.subCategoryData && e.subCategoryData.name) ||
                    ""
                  }
                  classD={classes}
                  status={e.status}
                  CutomComponent={
                    <AppointmentCard
                      classes={classes}
                      status={e.status}
                      handleOpenView={() => handleOpenView(e)}
                      changeStatus={(status) => changeStatus(e._id, status)}
                    />
                  }
                />
              )
            )
          ) : (
            <Grid item lg={12} md={12} xs={12} sm={12} textAlign={"center"}>
              No appointment found!
            </Grid>
          )}
        </Grid>
      )}
      <AppointmentViewModal
        open={open}
        handleClose={() => setOpen(false)}
        appointmentData={selData}
        savedClinet={saveClient}
        changeStatus={() => changeStatus(selData._id || "", "cancelled")}
        addToClient={(id, add) => addToClient(id, add)}
        user={user}
      />
    </ListingComponent>
  );
};

export default ReqAppointmentPC;
