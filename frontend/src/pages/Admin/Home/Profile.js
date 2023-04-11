import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import {
  getAdminProfile,
  updateSubAdmin,
} from "../../../redux/actions/Admin/AdminActions";
import SimpleReactValidator from "simple-react-validator";
import { useRef } from "react";
import FormGroup from "../../../components/UI/FormGroup";
import CustomPhone from "../../../components/UI/CustomPhone";
import CustomButton from "../../../components/UI/CustomButton";
import ChangePasswordModal from "../../../components/UI/ChangePasswordModal";
import { updateExternalData } from "../../../redux/actions/profile/profileActions";
import LoadingComponent from "../../../components/UI/LoadingComponent";
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
}));

const Profile = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setTitle, getAdminProfile, updateSubAdmin, updateExternalData },
    dispatch
  );

  const simpleValidator = useRef(new SimpleReactValidator());

  const [open, setOpen] = useState(false);
  const [udata, setUData] = useState({
    name: "",
    email: "",
    contact: "",
    subRole: "",
    providerEmail: "",
  });
  const [loading, setLoading] = useState(true);
  const [, setDisplayError] = useState(false);
  const [oldDataP, setOldDataP] = useState("");
  const loadData = async () => {
    setLoading(true);
    ctc.createToken();
    const res = await actions.getAdminProfile(ctc.getToken());
    if (res) {
      if (res.assigningId) {
        setUData(() => {
          return { ...res, providerEmail: res.assigningId.email };
        });
        setOldDataP(() => res.assigningId.email || "");
      } else {
        setOldDataP(() => "");
        setUData(() => res);
      }
      actions.updateExternalData("assigningId", res.assigningId);
    } else {
      setUData(() => "");
    }
    setLoading(false);
  };
  useEffect(() => {
    actions.setTitle({ title: props.title });
    loadData();
    return () => ctc.cancelTheApi();
  }, []);
  const handleFeedBackSubmit = async () => {
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const data = {
        name: udata.name,
        id: udata._id,
      };
      if (udata.providerEmail !== oldDataP) {
        if (!udata.providerEmail) {
          data.remove = true;
        } else {
          data.providerEmail = udata.providerEmail;
        }
      }
      if (typeof udata.contact === "number") {
        data.contact = udata.contact;
      } else if (udata.contact) {
        data.contact = udata.contact
          .replace("(", "")
          .replace(")", "")
          .replace("-", "");
      }
      await actions.updateSubAdmin(data);
      await loadData();
      setLoading(false);
      simpleValidator.current.visibleFields = [];
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const setData = (field, data) =>
    setUData((old) => {
      return { ...old, [field]: data };
    });

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className={classes.aboutContainer}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <FormGroup
            label="Name"
            required={true}
            type="text"
            value={udata.name}
            onChange={(data) => setData("name", data)}
            onBlur={() => blurSetup("Name")}
            validator={simpleValidator.current.message(
              "Name",
              udata.name,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <CustomPhone
            value={udata.contact}
            label="Phone Number"
            onChange={(e) => setData("contact", e)}
            onBlur={() => blurSetup("phone")}
            validator={simpleValidator.current.message(
              "phone",
              udata.contact,
              "phone",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <FormGroup
            label="Email"
            required={true}
            type="email"
            disabled={true}
            value={udata.email}
            onChange={(data) => setData("name", data)}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <FormGroup
            label="Role"
            required={true}
            type="text"
            disabled={true}
            value={udata.subRole}
            onChange={(data) => setData("name", data)}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormGroup
            label="Provider Email"
            type="text"
            value={udata.providerEmail}
            onChange={(data) => setData("providerEmail", data)}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CustomButton
            name="Update Profile"
            varient="contained"
            size="large"
            styled={{ width: "50%" }}
            onclick={handleFeedBackSubmit}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CustomButton
            name="Change Password"
            varient="outlined"
            size="large"
            onclick={() => setOpen(true)}
          />
        </Grid>
      </Grid>
      <ChangePasswordModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Profile;
