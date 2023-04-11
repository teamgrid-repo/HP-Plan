import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
const TcpaModal = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xs"
      style={{ textAlign: "center", fontFamily: "Montserrat" }}
    >
      <DialogTitle id="alert-dialog-title">Terms Of Use</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ overflow: "auto" }}
        >
          By turning on this option and providing your mobile phone number, you
          agree to receive notification messages via text concerning your use of
          our services. Message and data rates apply. Consent is not required as
          a condition for using the Her PLAN Directory and communication
          platform. Reply HELP for help. STOP to cancel. See our Terms of
          Service and Privacy Policy for more information.
          <Divider
            style={{
              margin: "10px 0 10px 0",
            }}
          />
          <div
            style={{
              margin: "10px 0 10px 0",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" size="large" onClick={props.approve}>
              Approve
            </Button>
            <Button variant="outlined" size="large" onClick={props.handleClose}>
              Cancel
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default TcpaModal;
