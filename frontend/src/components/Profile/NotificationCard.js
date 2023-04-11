import { Card, Grid, ButtonBase, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../UI/CustomButton";
import { logout } from "../../redux/actions/auth/authActions";
import {
  updateProfile,
  getIdRole,
  updateExternalData,
} from "../../redux/actions/profile/profileActions";
import { useNavigate } from "react-router-dom";
import CustomNotiSwitch from "./NotificationSwitchCard";
import { useEffect, useState } from "react";
import { HelpOutline } from "@mui/icons-material";
import RegisterModel from "../UI/RegisterModel";
import TcpaModal from "./TcpaModal";
const useStyle = makeStyles((theme) => ({
  cardTitle: { fontSize: "24px", fontWeight: "800", margin: "0px" },
  notificationCard: {
    background: "white",
    margin: "10px 10px 15px 10px",
    marginLeft: "0px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  notificationCardTitle: {
    fontSize: "14px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000",
  },

  btnL: {
    padding: "20px 6px 20px 22px",
    borderRadius: "5px",
    backgroundColor: "#7dbaaf",
    width: "100%",
    fontSize: "16px",
    fontWeight: "bold",
  },
  notiCardText: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#000",
    width: "100%",
    marginTop: "43px",
    margin: "auto",
  },
  notiCardSubText: {
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.71",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#7dbaaf",
    margin: "auto",
    marginTop: "10px",
  },
}));

const NotificationCard = ({ display }) => {
  const [data, setData] = useState({
    appointments: false,
    message: false,
    textMessage: false,
    EmailMessage: false,
    appNotification: false,
    communication: false,
    searchResults: false,
    optShareData: false,
    hippa: false,
  });
  const [ud, setUd] = useState({ id: "", role: "" });

  const location = useNavigate();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { logout, getIdRole, updateProfile, updateExternalData },
    dispatch
  );

  const pdata = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);
  const [hippaModal, setHippaModal] = useState(false);
  const [tcpaModal, setTcpaModal] = useState(false);
  const [preHippa, setPreHippa] = useState(false);
  const [preTcpa, setPreTcpa] = useState(false);
  useEffect(() => {
    const { id, role } = actions.getIdRole();
    if (id && role) {
      setUd({ id: id, role: role });
    }
    if (pdata) {
      setData({ ...pdata });
      setPreHippa(() => data.hippa);
    }
  }, [pdata]);
  const updateProfileData = async (field, fdata, opt) => {
    if (opt) {
      const up = await actions.updateProfile(ud.id, ud.role, {
        [field]: fdata,
        appointments: false,
        message: false,
        textMessage: false,
        EmailMessage: false,
        appNotification: false,
      });
      if (up) {
        setData((old) => {
          return {
            ...old,
            [field]: fdata,
            appointments: false,
            message: false,
            textMessage: false,
            EmailMessage: false,
            appNotification: false,
          };
        });
      }
    } else {
      const up = await actions.updateProfile(ud.id, ud.role, {
        [field]: fdata,
      });
      if (up) {
        if (
          field === "optShareData" ||
          field === "message" ||
          field === "appointments"
        ) {
          actions.updateExternalData(
            field === "optShareData" ? "shareD" : field,
            fdata
          );
        }
        setData((old) => {
          return { ...old, [field]: fdata };
        });
      }
    }
  };

  const handleLogout = async () => {
    await actions.logout();
    location("/");
  };

  const classes = useStyle();
  const disableClaims =
    !!user?.profileId?.claimStatus &&
    user?.profileId?.claimStatus !== "approved";
  return (
    <Grid
      item
      lg={4}
      xs={12}
      md={12}
      sm={12}
      textAlign="left"
      style={{ fontFamily: "Montserrat" }}
    >
      <Grid item lg={12}>
        <h3 className={classes.cardTitle}>My Notifications</h3>
      </Grid>
      <Grid item lg={12}>
        <Card className={classes.notificationCard}>
          <div className={classes.notificationCardTitle}>
            Communication Settings
          </div>
          <CustomNotiSwitch
            title="Appointments"
            value={data.appointments}
            disabled={data.communication || disableClaims}
            method={(e) => updateProfileData("appointments", e.target.checked)}
          />
          <CustomNotiSwitch
            title="Messages"
            value={data.message}
            disabled={data.communication || disableClaims}
            method={(e) => updateProfileData("message", e.target.checked)}
          />
          <div
            className={classes.notificationCardTitle}
            style={{ marginTop: "40px" }}
          >
            Preferred Communication Methods
          </div>
          <CustomNotiSwitch
            title="Opt-In Text Messages"
            disabled={data.communication || !pdata?.contact || disableClaims}
            value={data.textMessage}
            method={(e) => {
              if (e.target.checked) {
                setPreTcpa(() => e.target.checked);
                setTcpaModal(() => true);
              } else {
                updateProfileData("textMessage", preTcpa);
              }
            }}
          />
          <CustomNotiSwitch
            title="Email Message"
            value={data.EmailMessage}
            disabled={data.communication || disableClaims}
            method={(e) => updateProfileData("EmailMessage", e.target.checked)}
          />
          <CustomNotiSwitch
            title="In-app Notifications"
            disabled={data.communication || disableClaims}
            value={data.appNotification}
            method={(e) =>
              updateProfileData("appNotification", e.target.checked)
            }
          />
          <CustomNotiSwitch
            title="Opt-Out All Communications"
            value={data.communication}
            disabled={disableClaims}
            method={(e) =>
              updateProfileData(
                "communication",
                e.target.checked,
                e.target.checked
              )
            }
          />
          {display && (
            <div
              className={classes.notificationCardTitle}
              style={{ marginTop: "40px" }}
            >
              Search Visibility
            </div>
          )}
          {display && (
            <CustomNotiSwitch
              title="Org Visible in Search Results"
              value={data.searchResults}
              disabled={disableClaims}
              method={(e) =>
                updateProfileData("searchResults", e.target.checked)
              }
            />
          )}
          {!display && (
            <div style={{ display: "flex" }}>
              <div style={{ flex: 0.99 }}>
                <CustomNotiSwitch
                  title="Opt into sharing your data with providers"
                  value={data.optShareData}
                  method={(e) =>
                    updateProfileData("optShareData", e.target.checked)
                  }
                />
              </div>
              <Tooltip
                title={
                  <div>
                    If you opt into provider sharing, Her PLAN providers may
                    contact other Her PLAN providers on your behalf. In this
                    case, they may need to share your Her PLAN information with
                    other providers. Some Her PLAN providers that are required
                    to abide by HIPAA will obtain additional consent from you.
                    Her PLAN does NOT obtain consent required under HIPAA* on
                    your behalf.
                  </div>
                }
              >
                <HelpOutline
                  style={{ marginLeft: "0px", marginRight: "0px" }}
                  fontSize="small"
                />
              </Tooltip>
            </div>
          )}
        </Card>
        <CustomButton
          name="Logout"
          varient="contained"
          className={classes.btnL}
          onclick={handleLogout}
        />
        {display && (
          <ButtonBase
            className={classes.notiCardText}
            onClick={() => location("/contact-us")}
          >
            Contact Her PLAN for support updating your listing.
          </ButtonBase>
        )}
        {display && (
          <div className={classes.notiCardSubText}>
            View SBA /Her PLAN Pages
          </div>
        )}
      </Grid>
      <RegisterModel
        open={hippaModal}
        cancel={() => setHippaModal(false)}
        hippa={preHippa}
        approve={() => {
          setHippaModal(() => false);
          updateProfileData("hippa", preHippa);
        }}
      />
      <TcpaModal
        open={tcpaModal}
        handleClose={() => setTcpaModal(false)}
        approve={() => {
          setTcpaModal(() => false);
          updateProfileData("textMessage", preTcpa);
        }}
      />
    </Grid>
  );
};

export default NotificationCard;
