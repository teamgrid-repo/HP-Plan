import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  DialogActions,
  Grid,
  Card,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "./CustomButton";
import DatePicker from "react-date-picker";
import CustomReactSelect from "./CustomReactSelect";
import { useState } from "react";
import { useEffect } from "react";
import { Apartment, Computer, LocalShipping } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getIdRole } from "../../redux/actions/profile/profileActions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { bookAppointment } from "../../redux/actions/appointment/appointmentActions";
// import HippaCoverdIcon from "../../assets/images/HippaEntity.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LeafIcon from "../../assets/icons/leaf.png";
import ModalLoading from "./ModalLoading";
import { isEmpty } from "lodash";

const useStyle = makeStyles((theme) => ({
  container: {
    fontFamily: "Montserrat",
  },
  dailogHeader: {
    fontSize: "28px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.86,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#4f8ead",
    marginBottom: "9px",
  },
  ADailogHeader: {
    fontSize: "28px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.86,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "white",
    marginBottom: "9px",
    background: "black",
  },
  dailogSubHeader: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#505050",
  },
  cardHeader: {
    fontSize: "25px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2,
    letterSpacing: "normal",
    color: "#1d3c6e",
    display: "flex",
    gap: "10px",
  },
  cardCat: {
    fontSize: "18px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.78,
    letterSpacing: "normal",
    color: "#4f8ead",
  },
  cardDesc: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.4,
    letterSpacing: "-0.5px",
    color: "#696871",
    marginBottom: "38px",
  },
  boxContainer: {
    border: "1px solid #ebe8e8",
    borderRadius: "2px",
    marginBottom: "1em",
    paddingBottom: "10px",
  },
  boxTitle: {
    fontSize: "18px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.56,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#2b4c5b",
    paddingLeft: "5px",
  },
  boxDesc: {
    fontSize: "18px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.56,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#2b4c5b",
    paddingLeft: "15px",
    paddingTop: "10px",
  },
  contactContainer: {
    marginBottom: "20px",
  },
  contactTitle: {
    fontSize: "20px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#505050",
    paddingBottom: "8px",
  },
  contactDes: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "0.1px",
    color: "#505050",
  },
  btn: {
    width: "234.8px",
    height: "69.5px",
    fontSize: "18px",
    backgroundColor: "#7dbaaf",
  },
  svBtn: {
    width: "234.8px",
    height: "69.5px",
    fontSize: "18px",
    color: "#7dbaaf",
    border: "solid 1px #7dbaaf",
  },
  appCard: {
    background: "#fafafb",
    padding: "2px",
  },
  appCardTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#505050",
    padding: "9px 9px 9px 9px",
  },
  appInnerCard: {
    padding: "20px",
  },
  dropDown: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#44444f",
    marginTop: "10px",
  },
  dropDownClass: {
    marginBottom: "25px",
  },
  dpSideClass: {
    flex: 1,
  },
  dpSideConatiner: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },
  btnContainer: {
    display: "flex",
    marginBottom: "25px",
    justifyContent: "space-around",
  },
  bookBtn: {
    width: "150px",
    height: "38px",
    fontSize: "18px",
    background: "#7dbaaf",
  },
  cancelBtn: {
    width: "150px",
    height: "38px",
    fontSize: "18px",
    color: "#7dbaaf",
    border: "solid 1px #7dbaaf",
  },
  dropDownCalender: {
    width: "100%",
  },
  susDiv: {
    height: "105px",
    padding: "10px 13px 17px 18px",
    borderRadius: "10px",
    border: "solid 3px #71afa1",
    backgroundColor: "#94cecb",
  },
}));

const AppointmentModel = ({
  open,
  handleClose,
  appointmentData,
  handleLoginLogic,
  savedC,
  additional,
}) => {

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const classes = useStyle();
  const userDataaa = useSelector((state) => state.auth.user);
  const [cid, setCid] = useState("");
  const [user, setUser] = useState("");
  const [poc, setPoc] = useState("");
  const [pocOp, setPocOp] = useState([]);
  const [displayApBtn, setDisplayApBtn] = useState(false);
  const dispatch = useDispatch();
  const actions = bindActionCreators({ getIdRole, bookAppointment }, dispatch);

  const loc = useNavigate();
  const handleAppointment = async () => {
    if (appointmentData && appointmentData.selectedSubCat) {
      setLoading(true);
      if (user.role === "provider" && !cid) {
        toast.error("Please Select From User");
      } else {
        const data = {
          clientId: user.role === "provider" ? cid : user.id,
          siteId: appointmentData._id,
          subCategoryId: appointmentData.selectedSubCat.subCategoryId,
          date: date,
          email: poc?.email,
          contact: poc?.contact,
        };
        if (poc.userId) {
          data.providerId = poc.userId._id;
        }
        if (user.id !== poc.userId._id) await actions.bookAppointment(data);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const u = actions.getIdRole();
    if (u) setUser(() => u);
    if (appointmentData && appointmentData.selectedSubCat) {
      let appointment = false;
      let goFornext = false;
      const po = [];
      if (
        appointmentData.selectedSubCat.poc &&
        appointmentData.selectedSubCat.poc.length
      ) {
        appointmentData.selectedSubCat.poc.forEach((p) => {
          if (p.appointments) appointment = p.appointments;
          po.push({ ...p, label: p.name, value: p._id });
        });
        goFornext = po.find((a) => a.message);
      }
      if (
        appointmentData.selectedSubCat.staticPoc &&
        appointmentData.selectedSubCat.staticPoc.length
      ) {
        appointmentData.selectedSubCat.staticPoc.forEach((p) => {
          if (p.appointments) appointment = p.appointments;
          po.push({ ...p, label: p.name, value: p._id });
        });
        goFornext = po.find((a) => a.message);
      }
      if (
        isEmpty(po) &&
        appointmentData &&
        appointmentData.primaryAccountOwnerInfo &&
        appointmentData.primaryAccountOwnerInfo.length
      ) {
        appointmentData.primaryAccountOwnerInfo.forEach((p) => {
          if (p.appointments) appointment = p.appointments;
          if (!goFornext && !po.find((a) => a._id === p._id))
            po.push({ ...p, label: p.name, value: p._id });
        });
      }
      if (userDataaa && !userDataaa.appointments) {
        appointment = false;
      }
      if (isEmpty(po)) {
        appointmentData?.primaryAccountOwnerInfo?.forEach((p) => {
          if (p.appointments) appointment = p.appointments;
          if (!goFornext && !po.find((a) => a._id === p._id))
            po.push({ ...p, label: p.name, value: p._id });
        });
      }
      if (isEmpty(po)) {
        appointmentData?.POCAcc?.forEach((p) => {
          if (p.appointments) appointment = p.appointments;
          if (!goFornext && !po.find((a) => a._id === p._id))
            po.push({ ...p, label: p.name, value: p._id });
        });
      }
      setPocOp(() => po);
      if (po.length) setPoc(() => po[0]);
      setDisplayApBtn(() => appointment);
    }
  }, [appointmentData]);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xl"
      className={classes.container}
      onClose={handleClose}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={additional ? { background: "black" } : {}}
      >
        <div
          className={additional ? classes.ADailogHeader : classes.dailogHeader}
        >
          {appointmentData.selectedSubCat
            ? appointmentData.selectedSubCat.subCategoryName
            : "-"}
        </div>
      </DialogTitle>
      <Divider />
      {loading ? (
        <ModalLoading />
      ) : (
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              container
              lg={displayApBtn && poc.userId && poc.userId.status ? 8 : 12}
              md={displayApBtn && poc.userId && poc.userId.status ? 8 : 12}
              sm={12}
              xs={12}
            >
              <Grid item lg={12} md={12} xs={12}>
                <div className={classes.cardHeader}>
                  <div>
                    {" "}
                    {appointmentData.selectedSubCat &&
                    appointmentData.selectedSubCat.serviceName
                      ? appointmentData.selectedSubCat.serviceName
                      : appointmentData.selectedSubCat
                      ? appointmentData.selectedSubCat.subCategoryName
                      : "-"}{" "}
                  </div>
                  {appointmentData && appointmentData.homeVisit && (
                    <LocalShipping
                      style={{
                        margin: "auto",
                        marginLeft: "0px",
                        marginRight: "0",
                      }}
                    />
                  )}
                  {appointmentData &&
                    !appointmentData.virtual &&
                    !appointmentData.homeVisit && (
                      <Apartment
                        style={{
                          margin: "auto",
                          marginLeft: "0px",
                          marginRight: "0",
                        }}
                      />
                    )}
                  {appointmentData && appointmentData.virtual && (
                    <Computer
                      style={{
                        margin: "auto",
                        marginLeft: "0px",
                        marginRight: "0",
                      }}
                    />
                  )}
                  {appointmentData &&
                    appointmentData.selectedSubCat &&
                    appointmentData.selectedSubCat.leaf && (
                      <img
                        src={LeafIcon}
                        style={{
                          width: "24px",
                          height: "24px",
                          marginTop: -5,
                        }}
                      />
                    )}
                </div>
                <div className={classes.cardCat}>
                  <a
                    href={
                      (appointmentData.selectedSubCat &&
                        appointmentData.selectedSubCat.serviceWebpage) ||
                      appointmentData.psite ||
                      ""
                    }
                  >
                    {" "}
                    {(appointmentData.selectedSubCat &&
                      appointmentData.selectedSubCat.serviceWebpage) ||
                      appointmentData.psite ||
                      "-"}
                  </a>
                </div>
                <div className={classes.cardDesc}>
                  {(appointmentData.selectedSubCat &&
                    appointmentData.selectedSubCat.serviceDescription) ||
                    appointmentData.pdesc ||
                    "-"}
                </div>
              </Grid>

              {pocOp && pocOp.length ? (
                <Grid item lg={12} md={12} sm={12} xs={12} mb={2}>
                  <CustomReactSelect
                    label="Contacts"
                    options={pocOp}
                    value={poc}
                    onChange={(e) => setPoc(e)}
                  />
                </Grid>
              ) : null}
              <Grid item lg={8} md={8}>
                <div className={classes.boxContainer}>
                  <div className={classes.boxTitle}>Price of Care</div>
                  <Divider />
                  {appointmentData.selectedSubCat &&
                  appointmentData.selectedSubCat.price &&
                  appointmentData.selectedSubCat.price.length ? (
                    appointmentData.selectedSubCat.price.map((p) => (
                      <div className={classes.boxDesc}>{p}</div>
                    ))
                  ) : (
                    <div className={classes.boxDesc}>-</div>
                  )}
                </div>
                <div className={classes.boxContainer}>
                  <div className={classes.boxTitle}>More Information</div>
                  <Divider />
                  <p style={{ wordBreak: "break-all" }}>
                    {appointmentData.selectedSubCat &&
                    appointmentData.selectedSubCat.specialQualiFlag &&
                    appointmentData.selectedSubCat.specialQualif &&
                    appointmentData.selectedSubCat.specialQualif.length
                      ? appointmentData.selectedSubCat.specialQualif.map(
                          (p) => <div className={classes.boxDesc}>{p}</div>
                        )
                      : null}
                    {appointmentData.selectedSubCat &&
                    appointmentData.selectedSubCat?.specialQues ? (
                      <div className={classes.boxDesc}>
                        {" "}
                        {appointmentData.selectedSubCat?.specialQues}
                      </div>
                    ) : null}
                    {(appointmentData.selectedSubCat &&
                      appointmentData.selectedSubCat.specialQualiFlag &&
                      appointmentData.selectedSubCat.specialQualif.length >=
                        0) ||
                    appointmentData.selectedSubCat?.specialQues
                      ? null
                      : "-"}
                  </p>
                </div>
              </Grid>
              <Grid item lg={4} md={4} paddingLeft={2}>
                <div className={classes.contactContainer}>
                  <div className={classes.contactTitle}>Contact</div>
                  {/* <div className={classes.contactDes}>
                    {poc.name || "-"}
                    {/* {poc.hippa && (
                      <img
                        src={HippaCoverdIcon}
                        style={{
                          margin: "auto",
                          marginLeft: "0px",
                          marginRight: "0",
                        }}
                      />
                    )}{" "}
                  </div> */}
                </div>
                <div className={classes.contactContainer}>
                  <div className={classes.contactTitle}>Phone No.</div>
                  <div className={classes.contactDes}>{poc.contact || "-"}</div>
                </div>
                <div
                  className={classes.contactContainer}
                  style={{ marginBottom: "0" }}
                >
                  <div className={classes.contactTitle}>Email</div>
                  <div className={classes.contactDes}>{poc.email || "-"}</div>
                </div>
              </Grid>
            </Grid>
            {displayApBtn && poc.userId && poc.userId.status ? (
              <Grid item container lg={4} md={4} sm={12} xs={12} spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className={classes.appCard}>
                    <div className={classes.appCardTitle}>
                      Appointment Booking
                    </div>
                    <Divider />
                    <Card
                      className={classes.appInnerCard}
                      style={{ overflow: "visible" }}
                    >
                      <div className={classes.dropDownClass}>
                        <InputLabel id="demo-simple-select-filled-label">
                          Category of Care
                        </InputLabel>
                        <div className={classes.dropDown}>
                          {appointmentData.selectedSubCat
                            ? appointmentData.selectedSubCat.categoryName
                            : "-"}
                          <Divider
                            style={{
                              height: "1px",
                              margin: "6px 0 0",
                              backgroundColor: "#4f8ead",
                            }}
                          />
                        </div>
                      </div>
                      {user && user.role && user.role === "provider" && (
                        <div className={classes.dropDownClass}>
                          <InputLabel id="demo-simple-select-filled-label">
                            From
                          </InputLabel>
                          <Select
                            label="Category of Care"
                            fullWidth
                            variant="standard"
                            className={classes.dropDown}
                            value={cid}
                            onChange={(e) => setCid(e.target.value)}
                          >
                            {savedC &&
                              savedC.length &&
                              savedC.map((s) => (
                                <MenuItem value={s.value} key={s.value}>
                                  {s.label}
                                </MenuItem>
                              ))}
                          </Select>
                        </div>
                      )}
                      <div className={classes.dropDownClass}>
                        <InputLabel id="demo-simple-select-filled-label">
                          Site of Interest
                        </InputLabel>
                        <div className={classes.dropDown}>
                          {appointmentData.name || "-"}
                          <Divider
                            style={{
                              height: "1px",
                              margin: "6px 0 0",
                              backgroundColor: "#4f8ead",
                            }}
                          />
                        </div>
                      </div>
                      <div className={classes.dpSideConatiner}>
                        <div className={classes.dpSideClass}>
                          <InputLabel id="demo-simple-select-filled-label">
                            Date
                          </InputLabel>
                          <div className={classes.dropDown}>
                            <DatePicker
                              className={classes.dropDownCalender}
                              minDate={new Date()}
                              value={date}
                              onChange={(e) => setDate(e)}
                              clearIcon={null}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={classes.btnContainer}>
                        <CustomButton
                          className={classes.bookBtn}
                          varient="contained"
                          name="Request"
                          onclick={() =>
                            user && user.id
                              ? user.role === "provider" ||
                                (user.role === "user" && user.shareD)
                                ? handleAppointment()
                                : toast.error(
                                    "Please Allow Data Share From Profile"
                                  )
                              : handleLoginLogic()
                          }
                        />
                        <CustomButton
                          className={classes.cancelBtn}
                          varient="outlined"
                          name="Cancel"
                          onclick={handleClose}
                        />
                      </div>
                    </Card>
                  </div>
                </Grid>
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className={classes.susDiv}>
                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                    fontWeight: 600,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.2,
                    letterSpacing: "0.1px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Success
                </div>
                <div
                  style={{
                    marginTop: "12px",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.53,
                    letterSpacing: "0.1px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  Your appointmest request has been submitted. View Appointments
                </div>
              </div>
            </Grid> */}
              </Grid>
            ) : null}
          </Grid>
        </DialogContent>
      )}
      <Divider />

      {user &&
      user.id &&
      user.message &&
      poc &&
      poc.userId &&
      poc.userId.status &&
      poc.message ? (
        user.id !== poc.userId._id ? (
          <DialogActions style={{ marginRight: "auto", padding: "20px" }}>
            <CustomButton
              name="Message Provider"
              varient="contained"
              size="large"
              onclick={() =>
                user.id && poc && poc.userId
                  ? user.role === "provider" ||
                    (user.role === "user" && user.shareD)
                    ? loc(`/message/${user.id}-${poc.userId._id}`)
                    : toast.error("Please Allow Data Share From Profile")
                  : handleLoginLogic()
              }
              className={classes.btn}
            />
          </DialogActions>
        ) : null
      ) : null}
    </Dialog>
  );
};

export default AppointmentModel;
