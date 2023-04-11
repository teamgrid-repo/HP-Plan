import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "./CustomButton";
import FormGroup from "./FormGroup";
import { addSiteClaim } from "../../redux/actions/Admin/AdminActions";
import PasswordFormGroup from "./PasswordFormGroup";
import config from "../../config";
import { useParams } from "react-router-dom";
import CancelToken from "../../utils/cancelClass";
const ClaimModal = ({
  open,
  handleClose,
  siteID,
  orgName,
  setOpenClaimModal,
}) => {
  const [claimData, setClaimData] = useState({
    name: "",
    jobTitle: "",
    howUHeard: "",
    fName: "",
    lName: "",
  });

  const dispatch = useDispatch();
  const actions = bindActionCreators({ addSiteClaim }, dispatch);
  const [, setDisplayError] = useState(false);
  const parms = useParams();
  const ctc = new CancelToken();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        newRule: {
          // name the rule
          message: "The how you heard about Her PLAN field is required.",
          rule: (val, params, validator) => {
            return val && val.length > 0 ? true : false;
          },
          required: true, // optional
        },
        newPass: {
          // name the rule
          message:
            "Eight character minimum. at least 1 capital letter, at least one lowercase letter, at least one number, at least one symbol",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, config.passValiadtion);
          },
          messageReplace: (message, params) =>
            message.replace(":values", this.helpers.toSentence(params)), // optional
          required: false, // optional
        },
      },
    })
  );

  const setData = (field, data) =>
    setClaimData((old) => {
      return { ...old, [field]: data };
    });

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  const handleClaim = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      const data = {
        name: claimData.name,
        jobTitle: claimData.jobTitle,
        howYouHeard: claimData.howUHeard,
        email: claimData.email,
        siteId: siteID,
        altEmail: claimData.aemail,
        firstName: claimData.fName,
        lastName: claimData.lName,
        password: claimData.pass,
        isGeneralUser: false,
      };
      await actions.addSiteClaim(data);
      handleClose();
      actions.getProvider(parms.id.split(",")[0], ctc.getToken());
      simpleValidator.current.visibleFields = [];
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      style={{
        textAlign: "center",
        fontFamily: "Montserrat",
        margin: "16px",
        borderRadius: "8px",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div
          style={{
            fontFamily: "Montserrat",
            fontSize: "22px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "0.1px",
            textAlign: "left",
            color: "#92929d",
          }}
        >
          Claim Site
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="Preferred Name"
              required={true}
              type="text"
              value={claimData.name}
              onChange={(data) => setData("name", data)}
              onBlur={() => blurSetup("Preferred Name")}
              validator={simpleValidator.current.message(
                "Preferred Name",
                claimData.name,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="First Name"
              required={true}
              type="text"
              value={claimData.fName}
              onChange={(data) => setData("fName", data)}
              onBlur={() => blurSetup("First Name")}
              validator={simpleValidator.current.message(
                "First Name",
                claimData.fName,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="Last Name"
              required={true}
              type="text"
              value={claimData.lName}
              onChange={(data) => setData("lName", data)}
              onBlur={() => blurSetup("Last Name")}
              validator={simpleValidator.current.message(
                "Last Name",
                claimData.lName,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="Job Title"
              required={true}
              type="text"
              value={claimData.jobTitle}
              onChange={(data) => setData("jobTitle", data)}
              onBlur={() => blurSetup("Job Title")}
              validator={simpleValidator.current.message(
                "Job Title",
                claimData.jobTitle,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="Organization Name"
              required={true}
              type="text"
              disabled={true}
              value={orgName}
              onChange={(data) => setData("orgName", data)}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="How you heard about Her PLAN"
              required={true}
              type="text"
              value={claimData.howUHeard}
              onChange={(data) => setData("howUHeard", data)}
              onBlur={() => blurSetup("How you heard about Her Plan")}
              validator={simpleValidator.current.message(
                "How you heard about Her Plan",
                claimData.howUHeard,
                "newRule",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="Email"
              required={true}
              type="text"
              value={claimData.email}
              onChange={(data) => setData("email", data)}
              onBlur={() => blurSetup("email")}
              validator={simpleValidator.current.message(
                "email",
                claimData.email,
                "required|email",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="Alternative Email"
              type="text"
              value={claimData.aemail}
              onChange={(data) => setData("aemail", data)}
              onBlur={() => blurSetup("Alternative Email")}
              validator={simpleValidator.current.message(
                "Alternative Email",
                claimData.aemail,
                "email",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <PasswordFormGroup
              label="Password"
              required={true}
              value={claimData.pass}
              onChange={(data) => setData("pass", data)}
              onBlur={() => blurSetup("password")}
              validator={simpleValidator.current.message(
                "password",
                claimData.socialToken ? "Test@123" : claimData.pass,
                "required|newPass",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <PasswordFormGroup
              label="Confirm Password"
              required={true}
              value={claimData.confirmPass}
              onChange={(data) => setData("confirmPass", data)}
              onBlur={() => blurSetup("confrim password")}
              validator={simpleValidator.current.message(
                "confirm password",
                claimData.socialToken ? "Test@123" : claimData.confirmPass,
                `required|in:${claimData.pass}`,
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              varient="contained"
              name="Submit Claim"
              onclick={handleClaim}
              size="large"
              fullWidth={true}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              varient="outlined"
              name="Cancel"
              onclick={handleClose}
              size="large"
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimModal;
