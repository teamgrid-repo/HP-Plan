import FormGroup from "../../components/UI/FormGroup";
import SimpleReactValidator from "simple-react-validator";
import { bindActionCreators } from "redux";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import themeConfig from "../../themeConfig";
import { makeStyles } from "@mui/styles";
import CustomButton from "../UI/CustomButton";
import { sendMail, verifyForgot } from "../../redux/actions/auth/authActions";
import config from "../../config";
import PasswordFormGroup from "../UI/PasswordFormGroup";
import HerPlanIcon from "../../assets/images/colorHerPlan.png";
import LoadingComponent from "../UI/LoadingComponent";

const useStyle = makeStyles((theme) => ({
  register: {
    padding: "0 0px 22em 0px",
    width: "70%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  logo: {
    height: "7em",
    // filter: "brightness(1) invert(1)",
  },
  title: {
    fontWeight: 700,
    fontSize: 35,
    color: themeConfig.color1,
    fontFamily: "Montserrat",
    margin: "0px 0px 20px 0px",
  },
}));
const ForgotPassComponent = () => {
  const classes = useStyle();
  const history = useNavigate();
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

  const [forgot, setForgot] = useState({
    email: "",
    pass: "",
    repass: "",
    code: "",
    codeSent: false,
  });
  const [loading, setLoading] = useState(false);
  const [, setDisplayError] = useState(false);

  const dispatch = useDispatch();
  const actions = bindActionCreators({ sendMail, verifyForgot }, dispatch);

  const send = async () => {
    if (simpleValidator.current.fieldValid("email")) {
      setLoading(true);
      await actions.sendMail({ email: forgot.email });
      setForgot((old) => {
        return { ...old, codeSent: true };
      });
      setLoading(false);
    } else {
      simpleValidator.current.showMessageFor("email");
      await setDisplayError(() => true);
    }
  };

  const verify = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setLoading(true);

      const data = {
        password: forgot.pass,
        code: forgot.code,
      };
      await actions.verifyForgot(data, history);
      setLoading(false);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const setData = (field, data) =>
    setForgot((old) => {
      return { ...old, [field]: data };
    });

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  return (
    <div className={classes.register}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <img
              src={HerPlanIcon}
              className={classes.logo}
              style={{ marginTop: "124px" }}
              alt="logo"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.title}>Forgot Password</div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              label="Email Address"
              required={true}
              type="email"
              value={forgot.email}
              onChange={(data) => setData("email", data)}
              onBlur={() => blurSetup("email")}
              validator={simpleValidator.current.message(
                "email",
                forgot.email,
                "required|email",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} textAlign="right">
            <CustomButton
              varient="contained"
              name={forgot.codeSent ? "Resend" : "Send Code"}
              size="large"
              onclick={() => send()}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup
              disabled={!forgot.codeSent}
              label="Code"
              required={true}
              type="text"
              value={forgot.code}
              onChange={(data) => setData("code", data)}
              onBlur={() => blurSetup("code")}
              validator={simpleValidator.current.message(
                "code",
                forgot.code,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <PasswordFormGroup
              disabled={!forgot.codeSent}
              label="Password"
              required={true}
              value={forgot.pass}
              onChange={(data) => setData("pass", data)}
              onBlur={() => blurSetup("password")}
              validator={simpleValidator.current.message(
                "password",
                forgot.pass,
                "required|newPass",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <PasswordFormGroup
              disabled={!forgot.codeSent}
              label="Re-enter Password"
              required={true}
              value={forgot.repass}
              onChange={(data) => setData("repass", data)}
              onBlur={() => blurSetup("Re-enter Password")}
              validator={simpleValidator.current.message(
                "Re-enter Password",
                forgot.repass,
                `required|in:${forgot.pass}`,
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <CustomButton
              disabled={!forgot.codeSent}
              varient="contained"
              name="Reset Password"
              fullWidth={true}
              size="large"
              onclick={() => verify()}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div
              style={{
                color: themeConfig.color4,
                margin: "10px 0px 80px 0px",
              }}
            >
              Return to{" "}
              <NavLink color={themeConfig.color1} to="/login">
                Login
              </NavLink>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ForgotPassComponent;
