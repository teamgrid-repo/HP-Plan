import { Button, Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import { contanctUs } from "../../redux/actions/auth/authActions";
import CustomPhone from "../UI/CustomPhone";
import FormGroup from "../UI/FormGroup";
import CustomTextArea from "../UI/CustomTextArea";
import CustomButton from "../UI/CustomButton";
const useStyle = makeStyles((theme) => ({
  contactUsContainer: {
    paddingTop: "8em",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    fontFamily: "Montserrat",
  },
  contanctUsCard: {
    padding: "2em 4em 2em 4em",
  },
  formGroupContainer: {
    textAlign: "left !important",
  },
  labelName: {
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
  },
}));
const ContanctForm = () => {
  const [contanct, setContanct] = useState({
    name: "",
    email: "",
    contact: "",
    org: "",
    msg: "",
  });
  const [displayError, setDisplayError] = useState(false);
  const userDataaa = useSelector((state) => state.auth.user);
  const cms = useSelector((state) => state.cms);
  useEffect(() => {}, [cms, userDataaa]);
  const simpleValidator = useRef(new SimpleReactValidator());
  const classes = useStyle();

  const dispatch = useDispatch();
  const action = bindActionCreators({ contanctUs }, dispatch);

  const handleContactus = async () => {
    if (simpleValidator.current.allValid()) {
      const data = {
        name: contanct.name,
        email: contanct.email,
        contact: contanct.contact
          .replace("(", "")
          .replace(")", "")
          .replace("-", ""),
        subject: contanct.org,
        message: contanct.msg,
      };
      simpleValidator.current.visibleFields = [];
      const ok = await action.contanctUs(data);
      if (ok) {
        simpleValidator.current.visibleFields = [];
        await setContanct({
          name: "",
          email: "",
          contact: "",
          org: "",
          msg: "",
        });
      }
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };
  const setData = (field, data) =>
    setContanct((old) => {
      return { ...old, [field]: data };
    });

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  return (
    <div className={classes.contactUsContainer}>
      {userDataaa ? (
        <Card className={classes.contanctUsCard}>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <FormGroup
                label="Your Name"
                required={true}
                type="text"
                value={contanct.name}
                onChange={(data) => setData("name", data)}
                onBlur={() => blurSetup("name")}
                displayError={
                  !simpleValidator.current.fieldValid("name") && displayError
                }
                validator={simpleValidator.current.message(
                  "name",
                  contanct.name,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <FormGroup
                label="Email"
                required={true}
                type="email"
                value={contanct.email}
                onChange={(data) => setData("email", data)}
                onBlur={() => blurSetup("email")}
                displayError={
                  !simpleValidator.current.fieldValid("email") && displayError
                }
                validator={simpleValidator.current.message(
                  "email",
                  contanct.email,
                  "required|email",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>

            <Grid item lg={6} sm={12} xs={12} md={12}>
              <CustomPhone
                label="Phone"
                type="number"
                value={contanct.contact}
                onChange={(data) => setData("contact", data)}
                onBlur={() => blurSetup("phone")}
                validator={simpleValidator.current.message(
                  "phone",
                  contanct.contact,
                  "phone",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <FormGroup
                label="Subject"
                type="text"
                required={true}
                value={contanct.org}
                onChange={(data) => setData("org", data)}
                onBlur={() => blurSetup("subject")}
                displayError={
                  !simpleValidator.current.fieldValid("subject") && displayError
                }
                validator={simpleValidator.current.message(
                  "subject",
                  contanct.org,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <CustomTextArea
                label="Message"
                required={true}
                value={contanct.msg}
                onChange={(data) => setData("msg", data)}
                onBlur={() => blurSetup("message")}
                validator={simpleValidator.current.message(
                  "message",
                  contanct.msg,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <Button
                variant="contained"
                fullWidth
                style={{ background: "#7DBAAF", textTransform: "none" }}
                onClick={handleContactus}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Card className={classes.contanctUsCard}>
          <Grid container spacing={2}>
            <Grid container spacing={2} item lg={6} sm={6} xs={12} md={6}>
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.5,
                    letterSpacing: "normal",
                    textAlign: "left",
                    color: "#252222",
                    fontWeight: 500,
                  }}
                >
                  Contact Information
                </div>
                <div
                  style={{
                    maxHeight: "80%",
                    fontSize: "16px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.75,
                    letterSpacing: "normal",
                    textAlign: "left",
                    color: "#7e7e7e",
                    overflow: "auto",
                    width: "80%",
                    marginTop: "91px",
                    marginBottom: "91px",
                  }}
                >
                  {cms.contactInfo}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.75,
                    letterSpacing: "normal",
                    textAlign: "left",
                    color: "#524f4f",
                    fontWeight: 500,
                  }}
                >
                  Email :
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.75,
                    letterSpacing: "normal",
                    textAlign: "left",
                    color: "#7e7e7e",
                  }}
                >
                  {cms.contactEmail}
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} item lg={6} sm={6} xs={12} md={6}>
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.5,
                    letterSpacing: "normal",
                    textAlign: "left",
                    color: "#252222",
                    fontWeight: 500,
                  }}
                >
                  Send Us a Message{" "}
                </div>
              </Grid>
              <Grid item lg={6} sm={12} xs={12} md={6}>
                <FormGroup
                  label="Your Name"
                  required={true}
                  type="text"
                  value={contanct.name}
                  onChange={(data) => setData("name", data)}
                  onBlur={() => blurSetup("name")}
                  displayError={
                    !simpleValidator.current.fieldValid("name") && displayError
                  }
                  validator={simpleValidator.current.message(
                    "name",
                    contanct.name,
                    "required",
                    {
                      className: "errorClass",
                    }
                  )}
                />
              </Grid>
              <Grid item lg={6} sm={12} xs={12} md={6}>
                <FormGroup
                  label="Email"
                  required={true}
                  type="email"
                  value={contanct.email}
                  onChange={(data) => setData("email", data)}
                  onBlur={() => blurSetup("email")}
                  displayError={
                    !simpleValidator.current.fieldValid("email") && displayError
                  }
                  validator={simpleValidator.current.message(
                    "email",
                    contanct.email,
                    "required|email",
                    {
                      className: "errorClass",
                    }
                  )}
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <FormGroup
                  label="Subject"
                  type="text"
                  required={true}
                  value={contanct.org}
                  onChange={(data) => setData("org", data)}
                  onBlur={() => blurSetup("subject")}
                  displayError={
                    !simpleValidator.current.fieldValid("subject") &&
                    displayError
                  }
                  validator={simpleValidator.current.message(
                    "subject",
                    contanct.org,
                    "required",
                    {
                      className: "errorClass",
                    }
                  )}
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <CustomTextArea
                  label="Message"
                  required={true}
                  value={contanct.msg}
                  onChange={(data) => setData("msg", data)}
                  onBlur={() => blurSetup("message")}
                  validator={simpleValidator.current.message(
                    "message",
                    contanct.msg,
                    "required",
                    {
                      className: "errorClass",
                    }
                  )}
                />
              </Grid>
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <CustomButton
                  varient="contained"
                  fullWidth={true}
                  classNameI="special"
                  onclick={handleContactus}
                  name="Send"
                />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </div>
  );
};

export default ContanctForm;
