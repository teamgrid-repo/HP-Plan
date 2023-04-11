import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import DOMPurify from "dompurify";

const RegisterModel = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xl"
      style={{ textAlign: "center", fontFamily: "Montserrat" }}
    >
      <DialogTitle id="alert-dialog-title">Terms Of Use</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ overflow: "auto" }}
        >
          <div
            className="show-native-styles"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.providerTerms),
            }}
          />

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
            <Button variant="outlined" size="large" onClick={props.cancel}>
              Cancel
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions style={{ margin: "auto" }}>

      </DialogActions> */}
    </Dialog>
  );
};

export default RegisterModel;
