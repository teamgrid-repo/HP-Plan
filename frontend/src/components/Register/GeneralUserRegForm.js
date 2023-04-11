import themeConfig from "../../themeConfig";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";
import GoogleLogin from "react-google-login";
import FormGroup from "../UI/FormGroup";
import config from "../../config";
import FacebookLogin from "react-facebook-login";
import { useStyle } from "../common/registerLoginStyle";
import { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../UI/CustomButton";
import GeneralRegModal from "../UI/GeneralRegModal";
import PasswordFormGroup from "../UI/PasswordFormGroup";

const GeneralUserRegForm = ({
  responseFacebook,
  responseGoogle,
  setLoading,
  udata,
  userState,
}) => {
  const classes = useStyle();
  const cms = useSelector((state) => state.cms);

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

  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
    acceptTerms: false,
    optShareData: true,
  });
  useEffect(() => {
    if (udata)
      setSignUp((old) => {
        return { ...old, ...udata };
      });
  }, []);

  const [modelOpen, setModelOpen] = useState(false);
  const [, setDisplayError] = useState(false);
  const history = useNavigate();

  const dispatch = useDispatch();
  const signUpAction = bindActionCreators(register, dispatch);

  const setData = (field, data) =>
    setSignUp((old) => {
      return { ...old, [field]: data };
    });

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  const handleSignUp = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      await setModelOpen(true);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };
  const normalLogin = async () => {
    setLoading(true);
    const data = {
      name: signUp.name,
      email: signUp.email,
      role: "user",
      acceptTerms: signUp.acceptTerms,
      optShareData: signUp.optShareData,
      password: signUp.pass,
      userState,
    };
    if (udata && udata.socialToken) {
      data.type = udata.type;
      data.socialToken = udata.socialToken;
    } else {
      data.type = "web";
    }
    await signUpAction(data, history);
    setLoading(false);
  };
  const handleAgree = async () => {
    setModelOpen(false);
    normalLogin();
  };
  return (
    <Grid item lg={12}>
      <Grid container spacing={2} marginTop="10px">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormGroup
            label="Your Name"
            required={true}
            type="text"
            value={signUp.name}
            onChange={(data) => setData("name", data)}
            onBlur={() => blurSetup("name")}
            validator={simpleValidator.current.message(
              "name",
              signUp.name,
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
            value={signUp.email}
            onChange={(data) => setData("email", data)}
            onBlur={() => blurSetup("email")}
            validator={simpleValidator.current.message(
              "email",
              signUp.email,
              "required|email",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>

        {udata && udata.socialToken ? null : (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <PasswordFormGroup
              label="Password"
              required={true}
              value={signUp.pass}
              onChange={(data) => setData("pass", data)}
              onBlur={() => blurSetup("password")}
              validator={simpleValidator.current.message(
                "password",
                udata.socialToken ? "Test@123" : signUp.pass,
                "required|newPass",
                {
                  className: "errorClass",
                }
              )}
            />{" "}
          </Grid>
        )}
        {udata && udata.socialToken ? null : (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <PasswordFormGroup
              label="Confirm Password"
              required={true}
              value={signUp.confirmPass}
              onChange={(data) => setData("confirmPass", data)}
              onBlur={() => blurSetup("confrim password")}
              validator={simpleValidator.current.message(
                "confrim password",
                udata.socialToken ? "Test@123" : signUp.confirmPass,
                `required|in:${signUp.pass}`,
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
        )}

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CustomButton
            className={classes.signUpButton}
            varient="contained"
            name="Sign Up"
            onclick={handleSignUp}
            size="large"
          />
        </Grid>
        {udata && udata.socialToken ? null : (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <GoogleLogin
              clientId={config.googleClientId}
              onSuccess={(e) => responseGoogle(e)}
              cookiePolicy={"single_host_origin"}
              className={classes.googlebtn}
              buttonText="Sign up with Google"
            />

            <FacebookLogin
              appId={config.facebookAppId}
              fields="name,email,picture"
              textButton="Sign up with Facebook"
              callback={responseFacebook}
              size="medium"
              icon="fa-facebook"
              buttonStyle={{
                backgroundColor: "#7dbaaf",
                textTransform: "none",
                padding: "13px 10px 10px 10px",
                fontWeight: 500,
                fontFamily: "Montserrat",
                fontSize: "14px",
                borderColor: "#7dbaaf",
              }}
            />
          </Grid>
        )}
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div
            style={{
              color: themeConfig.color4,
              margin: "10px 0px 20px 0px",
            }}
          >
            Already Have an account?{" "}
            <NavLink color={themeConfig.color1} to="/login">
              Login
            </NavLink>
          </div>
        </Grid>
      </Grid>
      <GeneralRegModal
        open={modelOpen}
        acceptTerms={signUp.acceptTerms}
        optShareData={signUp.optShareData}
        setData={(a, e) => setData(a, e)}
        handelClose={() => setModelOpen(false)}
        approve={handleAgree}
        login={false}
        userTerms={cms?.userTerms}
        cancel={() => setModelOpen(false)}
      />
    </Grid>
  );
};

export default GeneralUserRegForm;
