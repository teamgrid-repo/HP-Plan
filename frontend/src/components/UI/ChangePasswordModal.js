import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { getIdRole } from "../../redux/actions/profile/profileActions";
import { changePassword } from "../../redux/actions/auth/authActions";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "./CustomButton";
import config from "../../config";
import PasswordFormGroup from "./PasswordFormGroup";
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
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
});

const ChangePasswordModal = ({ open, handleClose }) => {
  const classes = useStyle();

  const [changePass, setChangePass] = useState({
    currentPass: "",
    password: "",
    rePassword: "",
  });
  const [, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const action = bindActionCreators({ changePassword, getIdRole }, dispatch);
  //currentPassword,password,_id

  const handleChangePassword = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      const { id } = action.getIdRole();
      setLoading(true);
      const data = {
        _id: id,
        currentPassword: changePass.currentPass,
        password: changePass.password,
      };
      const isError = await action.changePassword(data);
      setLoading(false);
      if (!isError) {
        handleClose();
      }
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const simpleValidator = useRef(
    new SimpleReactValidator({
      messages: {
        in: "Password need to match!",
      },
      validators: {
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

  useEffect(() => {}, []);
  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  const setData = (field, value) =>
    setChangePass((old) => {
      return {
        ...old,
        [field]: value,
      };
    });

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      className={classes.container}
      onClose={handleClose}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div className={classes.dailogHeader}>Change Password</div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {loading ? (
          <ModalLoading />
        ) : (
          <div className={classes.formGroup}>
            <PasswordFormGroup
              label="Current Password"
              required={true}
              value={changePass.currentPass}
              onChange={(data) => setData("currentPass", data)}
              onBlur={() => blurSetup("Current Password")}
              validator={simpleValidator.current.message(
                "Current Password",
                changePass.currentPass,
                `required`,
                {
                  className: "errorClass",
                }
              )}
            />
            <PasswordFormGroup
              label="New Password"
              required={true}
              value={changePass.password}
              onChange={(data) => setData("password", data)}
              onBlur={() => blurSetup("New Password")}
              validator={simpleValidator.current.message(
                "New Password",
                changePass.password,
                "required|newPass",
                {
                  className: "errorClass",
                }
              )}
            />
            <PasswordFormGroup
              label="Confirm Password"
              required={true}
              value={changePass.rePassword}
              onChange={(data) => setData("rePassword", data)}
              onBlur={() => blurSetup("Confirm Password")}
              validator={simpleValidator.current.message(
                "Confirm Password",
                changePass.rePassword,
                `required|in:${changePass.password}`,
                {
                  className: "errorClass",
                }
              )}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <CustomButton
          name="Change Password"
          varient="contained"
          fullWidth={true}
          size="large"
          onclick={handleChangePassword}
        />
        <CustomButton
          name="Cancel"
          varient="outlined"
          fullWidth={true}
          size="large"
          onclick={() => handleClose()}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
