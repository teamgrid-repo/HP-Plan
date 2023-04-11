import CustomNotiSwitch from "../Profile/NotificationSwitchCard";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Tooltip,
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
import DOMPurify from "dompurify";

const GeneralRegModal = (props) => {
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
              __html: DOMPurify.sanitize(props.userTerms),
            }}
          />

          {!props?.login && (
            <>
              <Divider
                style={{
                  margin: "10px 0 10px 0",
                }}
              />
              <div
                style={{
                  width: "50%",
                  margin: "auto",
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                <CustomNotiSwitch
                  title="Accept the terms of use agreement"
                  value={props.acceptTerms}
                  method={(e) => props.setData("acceptTerms", e.target.checked)}
                />
                <div style={{ display: "flex" }}>
                  {" "}
                  <div style={{ width: "100%" }}>
                    <CustomNotiSwitch
                      title="Allow providers to contact other Her PLAN providers on your behalf."
                      value={props.optShareData}
                      method={(e) =>
                        props.setData("optShareData", e.target.checked)
                      }
                    />
                  </div>
                  <Tooltip
                    title={
                      <div>
                        Allow providers to contact other Her PLAN providers on
                        your behalf. To do this, providers may need to share
                        your Her PLAN information with other providers. Some Her
                        PLAN providers that are required to abide by HIPAA will
                        obtain additional consent from you. Her PLAN does NOT
                        obtain consent required under HIPAA.
                      </div>
                    }
                  >
                    <HelpOutline />
                  </Tooltip>
                </div>
              </div>
            </>
          )}
          <div
            style={{
              margin: "10px 0 10px 0",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button
              disabled={!props.acceptTerms}
              variant="contained"
              size="large"
              onClick={props.approve}
            >
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

export default GeneralRegModal;
