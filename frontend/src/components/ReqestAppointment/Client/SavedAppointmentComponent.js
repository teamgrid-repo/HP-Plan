import { Grid } from "@mui/material";
import ListingComponent from "../../UI/ListingComponent";
import ListingHeader from "../Provider/ProviderAppointmentHeader";
import AppointmentCard from "./SavedAppointmentCard";
import { makeStyles } from "@mui/styles";
import SavedAppointmentListingCard from "./SavedAppointmentListingCard";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllAppointment,
  updateStatus,
} from "../../../redux/actions/appointment/appointmentActions";
import { useEffect } from "react";
import { useState } from "react";
import MapModal from "../../UI/MapModal";
import AppointmentViewModal from "./AppointmentViewModal";
import { getIdRole } from "../../../redux/actions/profile/profileActions";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  directionProviderButton: {
    width: "164px",
    margin: "5em 0px 0px 1em",
    [theme.breakpoints.down("lg")]: {
      margin: "1em 0px 0px 1em",
    },
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
    margin: "5em 0px 0px 1em",
    [theme.breakpoints.down("lg")]: {
      margin: "1em 0px 0px 1em",
    },
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
    marginLeft: "auto",
    textAlign: "center",
    maxHeight: "15px",
    textTransform: "capitalize",
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
    marginLeft: "auto",
    textAlign: "center",
    maxHeight: "15px",
    textTransform: "capitalize",
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
    marginLeft: "auto",
    textAlign: "center",
    maxHeight: "15px",
    textTransform: "capitalize",
  },
}));

const AppointmentComponent = () => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [olddata, setoldData] = useState([]);

  const [user, setUser] = useState("");
  const [openP, setOpenP] = useState(false);
  const [selData, setSelData] = useState("");

  const [open, setOpen] = useState(false);
  const [marker, setMarker] = useState("");
  const [myLocation, setMyLocation] = useState("");

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { getAllAppointment, getIdRole, updateStatus },
    dispatch
  );

  const handleOpenView = (a) => {
    setSelData(a);
    setOpenP(true);
  };

  const loadMyloc = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      if (lat && long) {
        setMyLocation({
          lat: lat,
          lng: long,
        });
      }
    });
    // let lat = 39.1492746;
    // let long = -76.7752493;
    // setMyLocation({ lat: lat, lng: long });
  };
  useEffect(() => {
    loadMyloc();
    return () => ctc.cancelTheApi();
  }, []);

  const loadData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getAllAppointment(ctc.getToken());
    if (res && res.length) {
      setData(() => res);
      setoldData(() => res);
    }
    setLoading(false);
  };

  const openAddressModal = (d) => {
    if (d && d.location && d.location.lat && d.location.lang) {
      setMarker({
        lat: d.location.lat,
        lng: d.location.lang,
      });
    }
    setOpen(true);
  };
  const changeStatus = async (id, status) => {
    setLoading(true);
    setOpenP(false);
    await actions.updateStatus(id, { status: status, providerId: user.id });
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

  useEffect(() => {
    const u = actions.getIdRole();
    if (u) setUser(() => u);

    loadData();
  }, []);

  return (
    <ListingComponent>
      <ListingHeader
        headerName="Appointments"
        changeOrder={(e) => changeOrder(e)}
      />
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={2}>
          {data && data.length ? (
            data.map((e, idx) => (
              <SavedAppointmentListingCard
                key={e._id}
                name={(e.siteData && e.siteData.name) || ""}
                address={(e.siteData && e.siteData.address) || ""}
                status={e.status}
                handleOpenView={() => handleOpenView(e)}
                subId={e.subCategoryData._id || ""}
                CutomComponent={
                  <AppointmentCard
                    classes={classes}
                    status={e.status}
                    date={e.date}
                    organisationId={
                      (e.siteData && e.siteData.organisationId) || ""
                    }
                    siteId={(e.siteData && e.siteData._id) || ""}
                    openModal={() => openAddressModal(e.siteData)}
                    subId={e.subCategoryData._id || ""}
                  />
                }
              />
            ))
          ) : (
            <Grid item lg={12} md={12} xs={12} sm={12} textAlign={"center"}>
              No appointment found!
            </Grid>
          )}
        </Grid>
      )}
      <MapModal
        open={open}
        handleClose={() => setOpen(false)}
        marker={marker}
        myLocation={myLocation}
      />
      <AppointmentViewModal
        open={openP}
        handleClose={() => setOpenP(false)}
        appointmentData={selData}
        changeStatus={() => changeStatus(selData._id || "", "cancelled")}
        user={user}
      />
    </ListingComponent>
  );
};

export default AppointmentComponent;
