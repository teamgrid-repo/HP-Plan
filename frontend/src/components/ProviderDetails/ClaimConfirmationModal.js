import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import CustomButton from "./CustomButton";

const ClaimConfirmationModal = (props) => {
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
          {props.title} ?
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {/* Are you sure you want to delete this{" "}
          <span style={{ textTransform: "lowercase" }}>{props.title}</span>? */}
      </DialogContent>
      <DialogActions>
        <CustomButton
          varient="contained"
          onclick={props.handleClose}
          name="Login"
          // styled={{ backgroundColor: "red" }}
          size="large"
          fullWidth={true}
        />
        <CustomButton
          varient="outlined"
          onclick={props.handleDelete}
          name="Signup"
          size="large"
          fullWidth={true}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ClaimConfirmationModal;
