import {
  Avatar,
  Grid,
  Divider,
  Card,
  Select,
  MenuItem,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomTextField from "../../UI/FormGroup";
import {
  updateProfile,
  getIdRole,
  uploadImage,
} from "../../../redux/actions/profile/profileActions";
import CustomButton from "../../UI/CustomButton";
import SimpleReactValidator from "simple-react-validator";
import CustomPhone from "../../UI/CustomPhone";
import CustomDateComp from "../../UI/CustomDateComp";
import ChangePasswordModal from "../../UI/ChangePasswordModal";
import { convertToBase64 } from "../../../utils/getBase64";
import { toast } from "react-toastify";
import config from "../../../config";
import profileImg from "../../../assets/images/person-img.png";

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
  },
  //   tab: {
  //     textTransform: "none !important",
  //     fontSize: "16px",
  //     fontWeight: 700,
  //     color: "black",
  //   },
  //   scrollTab: {
  //     maxWidth: "100%",
  //     [theme.breakpoints.down("sm")]: {
  //       maxWidth: "65%",
  //     },
  //   },
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
  editField: {
    fontSize: "14px",
    color: "#7dbaaf",
    margin: "auto",
    marginRight: "10px",
    fontFamily: "Montserrat",
    fontWeight: 700,
  },
  formGroupContainer: {
    textAlign: "left !important",
  },
  labelName: {
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
    color: "black",
  },
  btn: {
    width: "182px",
    height: "56px",
    backgroundColor: "#7dbaaf",
    borderRadius: "26px 26px 57px 28px",
    marginBottom: "17px",
  },
}));

const ClientProfileCard = () => {
  const classes = useStyle();
  const [openM, setOpenM] = useState(false);
  const [img, setImg] = useState();
  const [toggleProfile, setToggleProfile] = useState(false);
  const [, setDisplayError] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [ud, setUd] = useState({ id: "", role: "" });

  const simpleValidator = useRef(new SimpleReactValidator());

  const editToggle = () => setToggleProfile((t) => !t);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { getIdRole, updateProfile, uploadImage },
    dispatch
  );

  const pdata = useSelector((state) => state.profile.profile);

  useEffect(() => {
    const { id, role } = actions.getIdRole();
    const yr = new Date().getFullYear() - 10;
    if (id && role) {
      setUd({ id: id, role: role });
    }
    if (pdata) {
      setProfileData({
        ...pdata,
        dob: pdata.dob ? new Date(pdata.dob) : new Date(`01/01/${yr}`),
      });
      setImg(() => pdata.image || profileImg);
    }
  }, []);

  const setData = (field, fdata) =>
    setProfileData((old) => {
      return { ...old, [field]: fdata };
    });
  const updateProfileData = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      const data = {
        contact: profileData.contact
          ? profileData.contact
              .replace("(", "")
              .replace(")", "")
              .replace("-", "")
          : profileData.contact,
        religion: profileData.religion,
        gender: profileData.gender,
        occupation: profileData.occupation,
        martialStatus: profileData.martialStatus,
        dob: profileData.dob ? new Date(profileData.dob) : "",
      };
      await actions.updateProfile(ud.id, ud.role, data);
      editToggle();
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };
  useEffect(() => {
    const f = document.getElementById("my-file");
    f.addEventListener("change", uploadFile);
    return () => {
      f.removeEventListener("change", uploadFile);
    };
  }, []);

  const selectLogic = () => {
    const f = document.getElementById("my-file");
    f.click();
  };
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

  return (
    <Grid item lg={8} md={12} sm={12}>
      <Grid item lg={12}>
        <div className={classes.profileTitle}>My Profile</div>
      </Grid>
      <Grid item lg={12}>
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
              marginTop={5}
              textAlign="left"
            >
              <div className={classes.nameContainer}>
                <div className={classes.nameDiv}>{profileData.name}</div>
                <ButtonBase
                  className={classes.changePassDiv}
                  onClick={() => setOpenM(true)}
                >
                  Change Password &gt;
                </ButtonBase>{" "}
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
              {/* <div className={classes.scrollTab}>
            <Tabs
              value={activeTab}
              onChange={(e, n) => setActiveTab(n)}
              variant={match ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              style={{ textAlign: "left", color: "black" }}
            >
              <Tab label="Information" className={classes.tab} />
               <Tab label="Visits" className={classes.tab} />
              <Tab label="Lab" className={classes.tab} />
              <Tab label="Prescription" className={classes.tab} />
            </Tabs>
          </div>
        */}
              <div className={classes.infoDiv}>
                Information
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
              padding="21px 21px 21px 21px"
            >
              {!toggleProfile && (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={classes.formTitle}
                >
                  Date Of Birth
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
                  <CustomDateComp
                    label="Date Of Birth"
                    value={profileData.dob}
                    onChange={(e) => setData("dob", e)}
                  />
                ) : profileData.dob ? (
                  new Date(profileData.dob).toDateString()
                ) : (
                  "-"
                )}
              </Grid>

              {/* <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className={classes.formTitle}
              >
                Age
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className={classes.formField}
              >
                25 Years old
              </Grid> */}

              {!toggleProfile && (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={classes.formTitle}
                >
                  Religion
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
                    type="text"
                    label="Religion"
                    value={profileData.religion}
                    onChange={(e) => setData("religion", e)}
                    required={false}
                  />
                ) : (
                  profileData.religion || "-"
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
                >
                  Gender
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
                  <div className={classes.formGroupContainer}>
                    <div className={classes.labelName}>Gender</div>
                    <Select
                      fullWidth
                      value={profileData.gender}
                      onChange={(e) => setData("gender", e.target.value)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </div>
                ) : (
                  profileData.gender || "-"
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
                >
                  Occupation
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
                    type="text"
                    label="Occupation"
                    value={profileData.occupation}
                    onChange={(e) => setData("occupation", e)}
                  />
                ) : (
                  profileData.occupation || "-"
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
                >
                  Marital Status
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
                  <div className={classes.formGroupContainer}>
                    <div className={classes.labelName}>Marital Status</div>
                    <Select
                      fullWidth
                      value={profileData.martialStatus}
                      onChange={(e) => setData("martialStatus", e.target.value)}
                    >
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Single">Single</MenuItem>
                    </Select>
                  </div>
                ) : (
                  profileData.martialStatus || "-"
                )}
              </Grid>

              {!toggleProfile && (
                <Grid
                  item
                  lg={toggleProfile ? 12 : 6}
                  md={toggleProfile ? 12 : 6}
                  sm={toggleProfile ? 12 : 6}
                  xs={toggleProfile ? 12 : 6}
                  className={classes.formTitle}
                >
                  Phone
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
                    label="Phone"
                    value={profileData.contact}
                    onChange={(data) => setData("contact", data)}
                  />
                ) : (
                  profileData.contact || "-"
                )}
              </Grid>
              {toggleProfile && (
                <Grid item lg={12} md={12} sm={12} xs={12} marginTop={2}>
                  <CustomButton
                    name="Update Profile"
                    varient="contained"
                    className={classes.btn}
                    onclick={() => updateProfileData()}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <ChangePasswordModal open={openM} handleClose={() => setOpenM(false)} />
    </Grid>
  );
};

export default ClientProfileCard;
