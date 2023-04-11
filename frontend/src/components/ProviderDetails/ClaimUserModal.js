import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../UI/CustomButton";
import FormGroup from "../UI/FormGroup";

const ClaimUserModal = ({
  open,
  handleClose,
  claimData,
  setClaimData,
  setOpenClaimUser,
}) => {
  const [, setDisplayError] = useState(false);

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

  const handleOpen = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setOpenClaimUser(true);
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

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              varient="contained"
              name="Submit Claim"
              onclick={handleOpen}
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

export default ClaimUserModal;
