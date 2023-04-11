import {
  Avatar,
  Grid,
  Divider,
  Card,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../UI/CustomButton";
import { BasicSwitch } from "../../UI/CustomSwitch";
import CustomTextField from "../../UI/FormGroup";
import {
  updateProfile,
  getIdRole,
  getProfile,
  uploadImage,
} from "../../../redux/actions/profile/profileActions";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import ChangePasswordModal from "../../UI/ChangePasswordModal";
import AddTeamCard from "./AddTeamCard";
import SiteInfoCard from "./SiteInfoCard";
import CustomPhone from "../../UI/CustomPhone";
import { convertToBase64 } from "../../../utils/getBase64";
import { toast } from "react-toastify";
import config from "../../../config";
import profileImg from "../../../assets/images/person-img.png";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();
const useStyle = makeStyles((theme) => ({
  formTitle: {
    fontSize: "18px",
    fontWeight: 600,
    paddingTop: "14px",
  },
  formField: {
    fontSize: "18px",
    color: "#7e7e7e",
    paddingTop: "14px",
    overflow: "auto",
  },

  profileTitle: {
    fontSize: "24px",
    fontWeight: "800",
    textAlign: "left",
  },
  profileHeaderCard: {
    background: "white",
    margin: "10px",
    marginLeft: "0px",
  },
  img: {
    width: "121px",
    height: "121px",
  },
  nameContainer: {
    marginTop: "20px",
    textAlign: "left",
    marginLeft: "2em",
    letterSpacing: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
  },
  nameDiv: {
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: 2.08,
    color: "#252222",
  },
  changePassDiv: {
    color: "#7dbaaf",
    fontSize: "18px",
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
  infoDiv: {
    fontSize: "18px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.78,
    letterSpacing: "normal",
    color: "#252222",
    display: "flex",
    justifyContent: "space-between",
  },
  editField: {
    fontSize: "14px",
    color: "#7dbaaf",
    margin: "auto",
    marginRight: "10px",
    fontFamily: "Montserrat",
    fontWeight: 700,
  },
  lineOne: {
    background: "#4f8ead",
    height: "2px",
    width: "76px",
    zIndex: 2,
    position: "absolute",
  },
  lineTwo: {
    background: "#ededf2",
    height: "2px",
  },
  marginDiv: {
    margin: "20px 0px 20px 20px",
    [theme.breakpoints.down("md")]: {
      margin: "0px",
    },
  },
  switchContainer: {
    marginTop: "19px",
    width: "289px",
    padding: "9.4px 14px 9.4px 24px",
    borderRadius: "24px",
    backgroundColor: "#fafafa",
    display: "flex",
  },
  switchTitle: {
    margin: "auto",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    color: "#000",
    marginLeft: "14px",
  },
  btn: {
    width: "182px",
    height: "56px",
    backgroundColor: "#7dbaaf",
    borderRadius: "26px 26px 57px 28px",
    marginBottom: "17px",
  },
}));

const ProviderProfileCard = () => {
  const classes = useStyle();
  const [openM, setOpenM] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    makeAccountPrimary: true,
  });
  const [ud, setUd] = useState({ id: "", role: "" });
  const [toggleProfile, setToggleProfile] = useState(false);
  const [, setDisplayError] = useState(false);
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { getIdRole, updateProfile, getProfile, uploadImage },
    dispatch
  );

  const pdata = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);

  const simpleValidator = useRef(new SimpleReactValidator());
  useEffect(() => {
    const f = document.getElementById("my-file");
    f.addEventListener("change", uploadFile);
    return () => {
      f.removeEventListener("change", uploadFile);
      ctc.cancelTheApi();
    };
  }, []);
  useEffect(() => {
    const { id, role, email } = actions.getIdRole();
    if (id && role) {
      setUd({ id: id, role: role, email: email });
    }
    if (pdata) {
      setProfileData({ ...pdata });
      setImg(() => pdata.image || profileImg);
    }
  }, [pdata]);

  const editToggle = () => setToggleProfile((t) => !t);

  const updateProfileData = async (data) => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      if (data.contact) {
        data.contact = data.contact
          .replace("(", "")
          .replace(")", "")
          .replace("-", "");
      }
      await actions.updateProfile(ud.id, ud.role, data);
      ctc.createToken();
      await actions.getProfile(ud.id, ud.role, ud.email, ctc.getToken());
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
    setToggleProfile(false);
  };
  const selectLogic = () => {
    const f = document.getElementById("my-file");
    f.click();
  };
  const setData = (field, fdata) =>
    setProfileData((old) => {
      return { ...old, [field]: fdata };
    });
  const uploadFile = async (e) => {
    const file = (e && e.target.files[0]) || "";
    if (
      file &&
      file.size &&
      file.size < config.maxFileSize &&
      file.type &&
      file.type.includes("image")
    ) {
      const fd = await convertToBase64(file);
      if (fd) {
        const note = await actions.uploadImage({ image: fd });
        if (note) {
          setImg(URL.createObjectURL(file));
        }
      }
    } else {
      toast.error("Please Select less then 1mb image");
    }
  };
  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  return (
    <Grid item lg={8} xs={12} md={12} sm={12}>
      <Grid item lg={12} xs={12} md={12} sm={12}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={classes.profileTitle}>My Profile</div>
          {user?.profileId?.claimStatus !== undefined ? (
            user?.profileId?.claimStatus !== "approved" && (
              <div
                style={{
                  padding: "7px 10px 6px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(252, 90, 90, 0.1)",
                  fontSize: "10px",
                  fontWeight: 600,
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  letterSpacing: "normal",
                  color: "#fc5a5a",
                  textAlign: "center",
                  maxHeight: "15px",
                  textTransform: "capitalize",
                }}
              >
                Your account is under approval please contact to admin for more
                details
              </div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </Grid>
      <Grid item lg={12} xs={12} md={12} sm={12}>
        <Card className={classes.profileHeaderCard}>
          <Grid container item xs={12} md={12} sm={12}>
            <Grid
              item
              lg={2}
              md={5}
              sm={12}
              xs={12}
              className={classes.marginDiv}
            >
              <IconButton onClick={() => selectLogic()}>
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  multiple={false}
                  id="my-file"
                />
                <Avatar src={img} alt="Remy Sharp" className={classes.img} />
              </IconButton>
            </Grid>
            <Grid
              item
              lg={9}
              md={7}
              sm={12}
              xs={12}
              margin={1}
              marginTop={2}
              textAlign="left"
            >
              <div className={classes.nameContainer}>
                <div className={classes.nameDiv}>{profileData.name}</div>
                <ButtonBase
                  className={classes.changePassDiv}
                  onClick={() => setOpenM(true)}
                >
                  Change Password &gt;
                </ButtonBase>
                <div className={classes.switchContainer}>
                  <div className={classes.switch}>
                    <BasicSwitch
                      checked={profileData.makeAccountPrimary}
                      disabled={
                        profileData.approvedStatus === "approved" ? false : true
                      }
                      onChange={(e) => {
                        updateProfileData({
                          makeAccountPrimary: e.target.checked,
                        });
                      }}
                    />
                  </div>
                  <div className={classes.switchTitle}>
                    Make Account Primary
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
              sm={12}
              marginLeft={2}
              marginRight={2}
              textAlign="left"
            >
              <div className={classes.infoDiv}>
                Information{" "}
                <ButtonBase onClick={editToggle} className={classes.editField}>
                  {toggleProfile ? "CANCEL" : "EDIT"}
                </ButtonBase>{" "}
              </div>
              <Divider variant="fullWidth" className={classes.lineOne} />
              <Divider variant="fullWidth" className={classes.lineTwo} />
            </Grid>
            <Grid
              item
              container
              direction="row"
              lg={12}
              md={12}
              sm={12}
              xs={12}
              textAlign="left"
              padding="21px 21px 25px 21px"
            >
              {!toggleProfile && (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={classes.formTitle}
                  textAlign="left"
                >
                  Email
                </Grid>
              )}
              <Grid
                item
                lg={toggleProfile ? 12 : 6}
                md={toggleProfile ? 12 : 6}
                sm={toggleProfile ? 12 : 6}
                xs={toggleProfile ? 12 : 6}
                className={classes.formField}
              >
                {toggleProfile ? (
                  <CustomTextField
                    type="email"
                    label="Email"
                    value={profileData.email}
                    onChange={(e) => setData("email", e)}
                    required={true}
                    disabled={true}
                    onBlur={() => blurSetup("email")}
                    validator={simpleValidator.current.message(
                      "email",
                      profileData.email,
                      "required|email",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                ) : (
                  profileData.email
                )}
              </Grid>

              {!toggleProfile && (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={classes.formTitle}
                  textAlign="left"
                >
                  Phone Number
                </Grid>
              )}
              <Grid
                item
                lg={toggleProfile ? 12 : 6}
                md={toggleProfile ? 12 : 6}
                sm={toggleProfile ? 12 : 6}
                xs={toggleProfile ? 12 : 6}
                className={classes.formField}
              >
                {toggleProfile ? (
                  <CustomPhone
                    value={profileData.contact}
                    label="Phone Number"
                    onChange={(e) => setData("contact", e)}
                    onBlur={() => blurSetup("contact")}
                    validator={simpleValidator.current.message(
                      "contact",
                      profileData.contact,
                      "phone",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                ) : (
                  profileData.contact
                )}
              </Grid>

              {toggleProfile && (
                <Grid item lg={12} md={12} sm={12} xs={12} marginTop={2}>
                  <CustomButton
                    name="Update Profile"
                    varient="contained"
                    className={classes.btn}
                    onclick={() =>
                      updateProfileData({ contact: profileData.contact })
                    }
                  />
                </Grid>
              )}
            </Grid>
            {profileData.makeAccountPrimary && <AddTeamCard />}

            <SiteInfoCard />
          </Grid>
        </Card>
      </Grid>
      <ChangePasswordModal open={openM} handleClose={() => setOpenM(false)} />
    </Grid>
  );
};

export default ProviderProfileCard;
