import { Grid, Tooltip } from "@mui/material";
import GoogleLogin from "react-google-login";
import FormGroup from "../UI/FormGroup";
import themeConfig from "../../themeConfig";
import { NavLink } from "react-router-dom";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import RegisterModel from "../../components/UI/RegisterModel";
import { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import FacebookLogin from "react-facebook-login";
// import CustomAutoComp from "../GooglePlaceAuto/CustomAutoComp";
import { useStyle } from "../common/registerLoginStyle";
import CustomButton from "../UI/CustomButton";
import CustomAutoComp from "../GooglePlaceAuto/CustomAutoComp";
import CustomNotiSwitch from "../Profile/NotificationSwitchCard";

import Usstates from "../../utils/UsStates";
import CustomReactSelect from "../UI/CustomReactSelect";
import PasswordFormGroup from "../UI/PasswordFormGroup";
import { HelpOutline } from "@mui/icons-material";

const ProviderRegForm = ({
  responseFacebook,
  responseGoogle,
  setLoading,
  udata,
}) => {
  const classes = useStyle();

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

  useEffect(() => {
    if (udata)
      setSignUp((old) => {
        return { ...old, ...udata };
      });
  }, []);

  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
    address: "",
    city: "",
    state: "",
    fname: "",
    lname: "",
    orgName: "",
    howUHeard: "",
    jobTitle: "",
    zipcode: "",
    hippa: false,
  });
  const [, setDisplayError] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  const history = useNavigate();

  const dispatch = useDispatch();
  const signUpAction = bindActionCreators(register, dispatch);
  const cms = useSelector((state) => state.cms);

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
      setModelOpen(true);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };
  const grabAddress = async (loc) => {
    const st = loc.state ? Usstates.find((a) => a.value === loc.state) : "";
    setSignUp((old) => {
      return {
        ...old,
        location: loc.location,
        address: loc.address,
        state: st || "",
        city: loc.city || "",
        zipcode: loc.zipcode ? +loc.zipcode : "",
      };
    });
  };
  const normalLogin = async () => {
    setLoading(true);

    const data = {
      firstName: signUp.fname,
      lastName: signUp.lname,
      orgName: signUp.orgName,
      howYouHeard: signUp.howUHeard,
      jobTitle: signUp.jobTitle,
      zipcode: signUp.zipcode,
      name: signUp.name,
      email: signUp.email,
      role: "provider",
      address: signUp.address,
      city: signUp.city,
      state: signUp.state.value,
      location: signUp.location,
      hippa: signUp.hippa,
      password: signUp.pass,
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
            label="Name(Preferred Name)"
            required={true}
            type="text"
            value={signUp.name}
            onChange={(data) => setData("name", data)}
            onBlur={() => blurSetup("Name(Preferred Name)")}
            validator={simpleValidator.current.message(
              "Name(Preferred Name)",
              signUp.name,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <FormGroup
            label="First Name"
            required={true}
            type="text"
            value={signUp.fname}
            onChange={(data) => setData("fname", data)}
            onBlur={() => blurSetup("First Name")}
            validator={simpleValidator.current.message(
              "First Name",
              signUp.fname,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <FormGroup
            label="Last Name"
            required={true}
            type="text"
            value={signUp.lname}
            onChange={(data) => setData("lname", data)}
            onBlur={() => blurSetup("Last Name")}
            validator={simpleValidator.current.message(
              "Last Name",
              signUp.lname,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormGroup
            label="Job Title"
            required={true}
            type="text"
            value={signUp.jobTitle}
            onChange={(data) => setData("jobTitle", data)}
            onBlur={() => blurSetup("Job Title")}
            validator={simpleValidator.current.message(
              "Job Title",
              signUp.jobTitle,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormGroup
            label="Organization Name"
            required={true}
            type="text"
            value={signUp.orgName}
            onChange={(data) => setData("orgName", data)}
            onBlur={() => blurSetup("Organization Name")}
            validator={simpleValidator.current.message(
              "Organization Name",
              signUp.orgName,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <FormGroup
            label="How you heard about Her PLAN"
            required={true}
            type="text"
            value={signUp.howUHeard}
            onChange={(data) => setData("howUHeard", data)}
            onBlur={() => blurSetup("How you heard about Her plan")}
            validator={simpleValidator.current.message(
              "How you heard about Her plan",
              signUp.howUHeard,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CustomAutoComp
            // required={true}
            label="Address"
            // onBlur={() => blurSetup("address")}
            onSelect={(a) => grabAddress(a)}
            value={signUp.address}
            onchange={(data) => setData("address", data)}
            // validator={simpleValidator.current.message(
            //   "address",
            //   signUp.address,
            //   "required",
            //   {
            //     className: "errorClass",
            //   }
            // )}
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <FormGroup
            label="City"
            required={true}
            type="text"
            value={signUp.city}
            onChange={(data) => setData("city", data)}
            onBlur={() => blurSetup("city")}
            validator={simpleValidator.current.message(
              "city",
              signUp.city,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <CustomReactSelect
            label="State"
            required={true}
            onChange={(data) => setData("state", data)}
            onBlur={() => blurSetup("state")}
            value={signUp.state}
            options={Usstates}
            validator={simpleValidator.current.message(
              "state",
              signUp.state,
              "required",
              {
                className: "errorClass",
              }
            )}
          />
        </Grid>
        <Grid item lg={12} sm={12} xs={12} md={12}>
          <FormGroup
            type="number"
            label="Zipcode"
            value={signUp.zipcode}
            onChange={(e) => setData("zipcode", e)}
            required={true}
            onBlur={() => blurSetup("Zipcode")}
            validator={simpleValidator.current.message(
              "Zipcode",
              signUp.zipcode,
              "required|numeric",
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
                "confirm password",
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
            Already have an account?{" "}
            <NavLink color={themeConfig.color1} to="/login">
              Login
            </NavLink>
          </div>
        </Grid>
      </Grid>
      <RegisterModel
        open={modelOpen}
        hippa={signUp.hippa}
        providerTerms={cms.providerTerms}
        login={false}
        setData={(e) => setData("hippa", e)}
        handelClose={() => setModelOpen(false)}
        approve={handleAgree}
        cancel={() => setModelOpen(false)}
      />
    </Grid>
  );
};

export default ProviderRegForm;
