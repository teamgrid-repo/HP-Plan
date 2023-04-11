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

const EmailQuiz = (props) => {
  const simpleValidator = useRef(new SimpleReactValidator({}));

  const [email, setEmail] = useState("");
  const [, setDisplayError] = useState(false);
  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
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
          Email Quiz Results
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              required={true}
              label="Email"
              onChange={(e) => setEmail(e)}
              value={email}
              onBlur={() => blurSetup("email")}
              validator={simpleValidator.current.message(
                "email",
                email,
                "required|email",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              name={props.edit ? "Edit" : "Send"}
              varient="contained"
              size="large"
              fullWidth={true}
              onclick={() => {
                if (simpleValidator.current.allValid()) {
                  props.handleQuiz(email);
                } else {
                  simpleValidator.current.showMessages();
                  setDisplayError(() => true);
                }
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              name="Cancel"
              varient="outlined"
              size="large"
              fullWidth={true}
              onclick={props.handleClose}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EmailQuiz;
