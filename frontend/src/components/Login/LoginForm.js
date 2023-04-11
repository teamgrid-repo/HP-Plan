import { Checkbox, Grid, FormControlLabel } from "@mui/material";
import createImg from "../../assets/images/login-img1.PNG";
import themeConfig from "../../themeConfig";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FormGroup from "../../components/UI/FormGroup";
import PasswordFormGroup from "../../components/UI/PasswordFormGroup";

import SimpleReactValidator from "simple-react-validator";
import { useStyle } from "../common/registerLoginStyle";
import GoogleLogin from "react-google-login";
import config from "../../config";
import ReactFacebookLogin from "react-facebook-login";
import {
  login,
  approveTerms,
  logout,
} from "../../redux/actions/auth/authActions";
import { getCms } from "../../redux/actions/Admin/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../UI/CustomButton";
import { useEffect } from "react";
import { getFBToken, regNotiData } from "../../firebaseConfig";
import LoadingComponent from "../UI/LoadingComponent";
import HerPlanIcon from "../../assets/images/colorHerPlan.png";
import GeneralRegModal from "../UI/GeneralRegModal";
import RegisterModel from "../UI/RegisterModel";
import { SET_LOGIN_USER } from "../../redux/constants";

var CryptoJS = require("crypto-js");

const LoginForm = ({ page, close }) => {
  const classes = useStyle();
  const history = useNavigate();
  const simpleValidator = useRef(new SimpleReactValidator());
  const [fcm, setFcm] = useState("");
  const [loginData, setLoginData] = useState();
  const [res, setRes] = useState();
  const cms = useSelector((state) => state.cms);
  const getTok = async () => {
    Notification.requestPermission(async (res) => {
      const toc = await getFBToken();
      if (toc) {
        setFcm(() => toc);
        regNotiData(history);
      }
    });
  };

  const [signUp, setSignUp] = useState({
    email: "",
    pass: "",
    re: false,
  });
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setDisplayError] = useState(false);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { login, approveTerms, getCms, logout },
    dispatch
  );

  const setData = (field, data) =>
    setSignUp((old) => {
      return { ...old, [field]: data };
    });

  useEffect(() => {
    actions.getCms();
  }, []);

  useEffect(() => {
    getTok();
    if (
      localStorage.getItem("reme") &&
      localStorage.getItem("reme") == "true" &&
      localStorage.getItem("pwd") &&
      localStorage.getItem("email")
    ) {
      // Decrypt
      var bytes = CryptoJS.AES.decrypt(
        localStorage.getItem("pwd"),
        config.passKeyForSave
      );
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      setSignUp(() => {
        return {
          email: localStorage.getItem("email"),
          pass: originalText,
          re: true,
        };
      });
    }
  }, []);

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const data = {
        email: signUp.email,
        password: signUp.pass,
        type: "web",
        socialToken: "",
        fcmToken: fcm,
      };
      const res = await actions.login(data, history, page, close, signUp.re);

      setRes(res);
      setLoginData(res?.user?.role);
      setModelOpen(!res?.isTermSigned);
      setLoading(false);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const responseGoogle = async (res) => {
    setLoading(true);
    if (res && res.profileObj && res.profileObj.email && res.googleId) {
      const data = {
        email: res.profileObj.email,
        password: "",
        type: "google",
        socialToken: res.googleId,
        fcmToken: fcm,
      };
      await actions.login(data, history, page, close);
    }
    setLoading(false);
  };

  const responseFacebook = async (res) => {
    setLoading(true);
    if (res.id && res.email) {
      const data = {
        email: res.email,
        password: "",
        type: "facebook",
        socialToken: res.id,
        fcmToken: fcm,
      };
      await actions.login(data, history, page, close);
    }
    setLoading(false);
  };

  const handleAgree = async (type) => {
    await actions.approveTerms({ type: type }, history, res);
    setModelOpen(false);
  };

  const handleClose = async () => {
    setLoading(false);
    await actions.logout();
    setModelOpen(false);
  };

  return (
    <div className={page ? classes.register : ""}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={3}>
          <Grid
            item
            lg={page ? 6 : 12}
            md={12}
            sm={12}
            xs={12}
            // order={{ md: 2 }}
            textAlign="center"
          >
            <Grid item lg={12}>
              <img
                src={HerPlanIcon}
                className={classes.logo}
                style={page ? { marginTop: "124px" } : {}}
                alt="logo"
              />
            </Grid>

            <Grid item lg={12}>
              <div className={classes.title}>Welcome Back</div>
            </Grid>
            <Grid item lg={12}>
              <Grid container spacing={2} marginTop="10px">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormGroup
                    label="Email Address"
                    required={true}
                    type="email"
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
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <PasswordFormGroup
                    label="Password"
                    required={true}
                    value={signUp.pass}
                    onChange={(data) => setData("pass", data)}
                    onBlur={() => blurSetup("password")}
                    validator={simpleValidator.current.message(
                      "password",
                      signUp.pass,
                      "required",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={signUp.re}
                          onChange={(e) => setData("re", e.target.checked)}
                        />
                      }
                      label={
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                        >
                          Remember me
                        </div>
                      }
                    />
                    <div style={{ paddingTop: "8px" }}>
                      <NavLink
                        to="/forgot-password"
                        style={{
                          textDecoration: "none",
                          color: themeConfig.color1,
                          fontSize: "14px",
                          fontWeight: "900",
                          fontFamily: "Montserrat",
                        }}
                      >
                        Forgot password?
                      </NavLink>
                    </div>
                  </div>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomButton
                    className={classes.signUpButton}
                    varient="contained"
                    name="Login"
                    onclick={(e) => handleSignUp(e)}
                    size="large"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <GoogleLogin
                    clientId={config.googleClientId}
                    onSuccess={(e) => responseGoogle(e)}
                    cookiePolicy={"single_host_origin"}
                    className={classes.googlebtn}
                  />
                  <ReactFacebookLogin
                    appId={config.facebookAppId}
                    fields="name,email,picture"
                    textButton="Sign in with Facebook"
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

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      color: themeConfig.color4,
                      margin: "10px 0px 80px 0px",
                    }}
                  >
                    Don't have account ?{" "}
                    <NavLink color={themeConfig.color1} to="/register">
                      Create an account
                    </NavLink>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {page && (
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              className={classes.gridImg}
              //  order={{ md: 1 }}
            >
              <img
                src={createImg}
                alt="create account image1"
                style={{ height: "100%" }}
              />
            </Grid>
          )}
        </Grid>
      )}
      {loginData === "user" && (
        <GeneralRegModal
          open={modelOpen}
          acceptTerms={true}
          optShareData={loginData.optShareData}
          setData={(a, e) => setData(a, e)}
          handelClose={() => handleClose(false)}
          approve={() => handleAgree("user")}
          login={true}
          userTerms={cms?.userTerms}
          cancel={() => handleClose()}
        />
      )}
      {loginData === "provider" && (
        <RegisterModel
          open={modelOpen}
          hippa={loginData.hippa}
          login={true}
          providerTerms={cms.providerTerms}
          setData={(e) => setData("hippa", e)}
          handelClose={() => handleClose()}
          approve={() => handleAgree("provider")}
          cancel={() => handleClose()}
        />
      )}
    </div>
  );
};

export default LoginForm;
