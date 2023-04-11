import { AccessTime } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../UI/CustomButton";
import { useNavigate } from "react-router";
import { getAllAppointment } from "../../redux/actions/appointment/appointmentActions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import LoadingComponent from "../UI/LoadingComponent";
// const img =
//   "https://media.istockphoto.com/photos/empty-road-at-building-exterior-picture-id479842074?k=20&m=479842074&s=612x612&w=0&h=HS6lsU1f9W21IkotS3cxdvU5KeEO-gLMUa6xrIBbR6k=";

const useStyle = makeStyles((theme) => ({
  providerCard: {
    background: "white",
    //  width: "321px !important",
    height: "300px",
    borderRadius: "30px",
    margin: "0px 24px 10px 27px",
    padding: "0 25px 0 0",
    border: "solid 0.5px #e0e7fe",
    display: "inline-block",
  },
  providerCardImg: {
    width: "220px",
    height: "300px",
  },
  appoTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#292968",
    whiteSpace: "break-spaces",
    paddingBottom: "6px",
  },
  starContainer: { paddingBottom: "11px", paddingTop: "3px", color: "#70708c" },
  cat: {
    color: "#70708c",
    fontSize: "16px",
    whiteSpace: "break-spaces",
  },
  timeConatiner: {
    color: "#70708c",
    fontSize: "16px",
    display: "flex",
    direction: "row",
    paddingTop: "3px",
    fontSize: "14px",
    // paddingBottom: "48px",
  },
  apBtn: {
    margin: "14px 0px 0px 0px",
    padding: "13px 69px 11px",
    backgroundColor: "#7dbaaf",
    textTransform: "none",
    borderRadius: "20px 10px 40px 20px",
    color: "white",
    "&:hover": {
      background: "#7dbaaf",
    },
  },
  msgBtn: {
    padding: "13px 69px 11px",
    textTransform: "none",
    borderRadius: "20px 10px 40px 20px",
    border: "solid 4px #4f8ead",
    color: "#4f8ead",
    "&:hover": {
      borderColor: "blue",
    },
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
    marginRight: "auto",
    textAlign: "center",
    maxHeight: "15px",
    textTransform: "capitalize",
    margin: "0 0 10px 0",
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
    marginRight: "auto",
    textAlign: "center",
    maxHeight: "15px",
    textTransform: "capitalize",
    margin: "0 0 10px 0",
  },
}));

const ProfileAppointmentCard = ({ role, id }) => {
  const loc = useNavigate();
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getAllAppointment }, dispatch);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(() => true);
    const res = await actions.getAllAppointment();
    if (res && res.length) {
      const s = [];
      for (let i = 0; i < res.length; i++) {
        if (
          res[i].date &&
          new Date(res[i].date) >= new Date() &&
          res[i].status !== "cancelled"
        ) {
          s.push(res[i]);
        }
      }
      setData(() => s);
    }
    setLoading(() => false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : data && data.length ? (
    data.map((d) => (
      <div className={classes.providerCard} key={d._id}>
        {/* <Grid item lg={5} md={5} sm={5} xs={5}>
            <img src={img} alt="title" className={classes.providerCardImg} />
          </Grid> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "15px 25px 15px 25px",
          }}
        >
          <div className={classes[d.status]}>{d.status}</div>
          <div className={classes.appoTitle}>
            {(d.siteData && d.siteData.name) || "-"}
          </div>
          <div className={classes.cat}>
            Care:{" "}
            {(d.service && d.service.serviceName) ||
              (d.subCategoryData && d.subCategoryData.name) ||
              "-"}
          </div>
          <div className={classes.starContainer}>
            Client:{" "}
            {role && role === "provider"
              ? d.clientId && d.clientId.name
                ? d.clientId.name
                : "-"
              : " "}{" "}
          </div>
          <div
            className={classes.timeConatiner}
            // style={role === "provider" ? {} : { paddingBottom: "64px" }}
          >
            <div>
              <AccessTime fontSize="small" style={{ paddingRight: "5px" }} />
            </div>{" "}
            <div style={{ paddingTop: "2px" }}>
              {(d.date && moment(d.date).format("MMM, DD yyyy")) || "-"}{" "}
            </div>
          </div>
          <CustomButton
            variant="outlined"
            name="Send Message"
            classNameI={"specialOutline"}
            disabled={role !== "provider" ? !d.providerId && !d.room : false}
            styled={{ color: "#7dbaaf", border: "1px solid #7dbaaf" }}
            onclick={() =>
              loc(
                d.room
                  ? `/message/${d.room}`
                  : `/message/${role === "provider" ? id : d.providerId}-${
                      role === "provider" ? d.clientId._id : id
                    }`
              )
            }
          />
          <CustomButton
            variant="contained"
            onclick={() => loc("/my-appointments")}
            name="See Appointment"
            className={classes.apBtn}
          />
        </div>
      </div>
    ))
  ) : (
    <h4>No appointment found</h4>
  );
};

export default ProfileAppointmentCard;
