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
import { addFeedbacks } from "../../redux/actions/Feeback/FeedbackAction";
import CustomButton from "./CustomButton";
import CustomTextArea from "./CustomTextArea";
import FormGroup from "./FormGroup";
import ModalLoading from "./ModalLoading";

const FeedbackModal = (props) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const dispatch = useDispatch();
  const actions = bindActionCreators({ addFeedbacks }, dispatch);
  const [feedData, setFeedData] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const [, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFeedBackSubmit = async () => {
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const data = {
        name: feedData.name,
        email: feedData.email,
        feedback: feedData.msg,
        siteId: props.siteId,
      };
      await actions.addFeedbacks(data);
      setLoading(false);
      simpleValidator.current.visibleFields = [];

      setFeedData(() => {
        return { name: "", email: "", msg: "" };
      });
      props.handleClose();
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const setData = (field, data) =>
    setFeedData((old) => {
      return { ...old, [field]: data };
    });

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
          Feedback
        </div>
      </DialogTitle>
      <Divider />
      {loading ? (
        <ModalLoading />
      ) : (
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormGroup
                label="Name"
                required={true}
                type="text"
                value={feedData.name}
                onChange={(data) => setData("name", data)}
                onBlur={() => blurSetup("Name")}
                validator={simpleValidator.current.message(
                  "Name",
                  feedData.name,
                  "required",
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
                value={feedData.email}
                onChange={(data) => setData("email", data)}
                onBlur={() => blurSetup("email")}
                validator={simpleValidator.current.message(
                  "email",
                  feedData.email,
                  "required|email",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomTextArea
                required={true}
                styled={{ width: "97%" }}
                label="Message"
                value={feedData.msg}
                onChange={(data) => setData("msg", data)}
                onBlur={() => blurSetup("Message")}
                validator={simpleValidator.current.message(
                  "Message",
                  feedData.msg,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton
                name="Submit Feedback"
                varient="contained"
                size="large"
                fullWidth={true}
                onclick={handleFeedBackSubmit}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton
                varient="outlined"
                name="Cancel"
                onclick={props.handleClose}
                size="large"
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default FeedbackModal;
