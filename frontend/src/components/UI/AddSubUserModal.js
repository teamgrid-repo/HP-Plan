import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "./CustomButton";
import CustomTextField from "./FormGroup";
import { getIdRole } from "../../redux/actions/profile/profileActions";
import { bindActionCreators } from "redux";
import CustomPhone from "./CustomPhone";
import { BasicSwitch } from "./CustomSwitch";
import {
  getAdminOrgSubUser,
  addContact,
  getPOC,
  addPOC,
} from "../../redux/actions/Admin/AdminActions";
import { getSubUser } from "../../redux/actions/profile/profileActions";
import ModalLoading from "./ModalLoading";

const useStyle = makeStyles({
  container: {
    textAlign: "center",
    fontFamily: "Montserrat",
    margin: "16px",
    borderRadius: "8px",
  },
  dailogHeader: {
    fontFamily: "Montserrat",
    fontSize: "22px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#92929d",
  },
  formGroupContainer: {
    textAlign: "left !important",
  },
  labelName: {
    color: "black",
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
  },
  btn: {
    width: "200px",
    background: "red",
    marginLeft: "20px",
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
});
const AddSubUserModal = ({
  open,
  handleClose,
  orgId,
  admin,
  handleShift,
  isAdmin,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { addContact, getIdRole, getAdminOrgSubUser, getPOC, addPOC, getSubUser },
    dispatch
  );
  const [, setDisplayError] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState(false);

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  const updateUser = async () => {
    if (isAdmin) {
      await setDisplayError(() => false);
      if (simpleValidator.current.allValid()) {
        const { id } = actions.getIdRole();
        setLoading(true);
        const data = {
          contact:
            subUser.contact &&
            subUser.contact.replace("(", "").replace(")", "").replace("-", ""),
          name: subUser.name,
          email: subUser.email,
          firstName: subUser.fname,
          lastName: subUser.lname,
          jobTitle: subUser.jobTitle,
        };
        data.organisationId = orgId;
        data.userId = id;
        const res = await actions.addPOC(data, admin);
        if (res && admin) {
          handleShift(subUser.email);
        }
        await actions.getPOC(orgId);
        simpleValidator.current.visibleFields = [];
        setSubUser({
          name: "",
          contact: "",
          email: "",
          site: [],
          fname: "",
          lname: "",
          jobTitle: "",
          hippa: false,
          makeAccountPrimary: false,
        });
        handleClose();
        setLoading(false);
      } else {
        simpleValidator.current.showMessages();
        await setDisplayError(() => true);
      }
    } else {
      await setDisplayError(() => false);
      if (simpleValidator.current.allValid()) {
        const { id } = actions.getIdRole();
        setLoading(true);
        const data = {
          contact:
            subUser.contact &&
            subUser.contact.replace("(", "").replace(")", "").replace("-", ""),
          name: subUser.name,
          email: subUser.email,
          firstName: subUser.fname,
          lastName: subUser.lname,
          jobTitle: subUser.jobTitle,
          makeAccountPrimary: subUser.makeAccountPrimary,
          hippa: subUser.hippa,
        };
        data.organisationId = orgId;
        data.userId = id;
        const res = await actions.addContact(data, admin);
        if (res && admin) {
          handleShift(subUser.email);
        }
        await actions.getSubUser(id);
        simpleValidator.current.visibleFields = [];
        setSubUser({
          name: "",
          contact: "",
          email: "",
          site: [],
          fname: "",
          lname: "",
          jobTitle: "",
          hippa: false,
          makeAccountPrimary: false,
        });
        handleClose();
        setLoading(false);
      } else {
        simpleValidator.current.showMessages();
        await setDisplayError(() => true);
      }
    }
  };
  const [subUser, setSubUser] = useState({
    name: "",
    contact: "",
    email: "",
    site: [],
    fname: "",
    lname: "",
    jobTitle: "",
    hippa: false,
    makeAccountPrimary: false,
  });

  const setData = (field, data) => {
    const newLoc = { ...subUser };
    newLoc[field] = data;
    setSubUser(() => newLoc);
  };
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
        style={{ backgroundColor: "#fafafb" }}
      >
        <div className={classes.dailogHeader}>Add Team Member</div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {loading ? (
          <ModalLoading />
        ) : (
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <CustomTextField
                type="text"
                value={subUser.name}
                label="Name(Preferred Name)"
                onChange={(d) => setData("name", d)}
                required={true}
                onBlur={() => blurSetup("Name(Preferred Name)")}
                validator={simpleValidator.current.message(
                  "Name(Preferred Name)",
                  subUser.name,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            {admin ? (
              <>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="First Name"
                    type="text"
                    value={subUser.fname}
                    onChange={(data) => setData("fname", data)}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Last Name"
                    type="text"
                    value={subUser.lname}
                    onChange={(data) => setData("lname", data)}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Job Title"
                    type="text"
                    value={subUser.jobTitle}
                    onChange={(data) => setData("jobTitle", data)}
                  />
                </Grid>
                <Grid item lg={6} sm={12} xs={12} md={6}>
                  <CustomTextField
                    type="text"
                    value={subUser.email}
                    label="Email"
                    onChange={(d) => setData("email", d)}
                  />
                </Grid>
                <Grid item lg={6} sm={12} xs={12} md={6}>
                  <CustomPhone
                    value={subUser.contact}
                    label="Phone"
                    onChange={(d) => setData("contact", d)}
                    onBlur={() => blurSetup("phone")}
                    validator={simpleValidator.current.message(
                      "phone",
                      subUser.contact,
                      "phone",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                {/* <Grid item lg={6} md={12} xs={12} sm={12}>
                  <div className={classes.switchContainer}>
                    <div className={classes.switch}>
                      <BasicSwitch
                        checked={subUser.makeAccountPrimary}
                        onChange={(e) =>
                          setData("makeAccountPrimary", e.target.checked)
                        }
                      />
                    </div>
                    <div className={classes.switchTitle}>
                      Make Account Primary
                    </div>
                  </div>
                </Grid> */}
              </>
            ) : (
              <>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="First Name"
                    required={true}
                    type="text"
                    value={subUser.fname}
                    onChange={(data) => setData("fname", data)}
                    onBlur={() => blurSetup("First Name")}
                    validator={simpleValidator.current.message(
                      "First Name",
                      subUser.fname,
                      "required",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Last Name"
                    required={true}
                    type="text"
                    value={subUser.lname}
                    onChange={(data) => setData("lname", data)}
                    onBlur={() => blurSetup("Last Name")}
                    validator={simpleValidator.current.message(
                      "Last Name",
                      subUser.lname,
                      "required",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Job Title"
                    required={true}
                    type="text"
                    value={subUser.jobTitle}
                    onChange={(data) => setData("jobTitle", data)}
                    onBlur={() => blurSetup("Job Title")}
                    validator={simpleValidator.current.message(
                      "Job Title",
                      subUser.jobTitle,
                      "required",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={6} sm={12} xs={12} md={6}>
                  <CustomTextField
                    type="text"
                    value={subUser.email}
                    label="Email"
                    onChange={(d) => setData("email", d)}
                    required={true}
                    onBlur={() => blurSetup("email")}
                    validator={simpleValidator.current.message(
                      "email",
                      subUser.email,
                      "required|email",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={6} sm={12} xs={12} md={6}>
                  <CustomPhone
                    value={subUser.contact}
                    label="Phone"
                    onChange={(d) => setData("contact", d)}
                    onBlur={() => blurSetup("phone")}
                    validator={simpleValidator.current.message(
                      "phone",
                      subUser.contact,
                      "phone",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={12} xs={12} sm={12}>
                  <div className={classes.switchContainer}>
                    <div className={classes.switch}>
                      <BasicSwitch
                        checked={subUser.makeAccountPrimary}
                        onChange={(e) =>
                          setData("makeAccountPrimary", e.target.checked)
                        }
                      />
                    </div>
                    <div className={classes.switchTitle}>
                      Make Account Primary
                    </div>
                  </div>
                </Grid>
                {/* <Grid item lg={6} md={12} xs={12} sm={12}>
                  <div className={classes.switchContainer}>
                    <div className={classes.switch}>
                      <BasicSwitch
                        checked={subUser.hippa}
                        onChange={(e) => setData("hippa", e.target.checked)}
                      />
                    </div>
                    <div className={classes.switchTitle}>HIPAA Chat</div>
                  </div>
                </Grid> */}
              </>
            )}{" "}
            <Grid item lg={12} sm={12} xs={12} md={12} textAlign="right">
              <CustomButton
                name="Add"
                varient="contained"
                onclick={updateUser}
                styled={{ width: "200px" }}
              />
              <CustomButton
                name="Cancel"
                varient="contained"
                className={classes.btn}
                onclick={() => handleClose()}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddSubUserModal;
