import { Grid, Tab, Tabs, Tooltip, useMediaQuery } from "@mui/material";
import createImg from "../../assets/images/create-account-img1.png";
import { useTheme } from "@emotion/react";

import { useEffect, useState } from "react";
import { useStyle } from "../common/registerLoginStyle";
import ProviderRegForm from "./ProviderRegForm";
import GeneralUserRegForm from "./GeneralUserRegForm";
import { toast } from "react-toastify";
import LoadingComponent from "../UI/LoadingComponent";
import HerPlanIcon from "../../assets/images/colorHerPlan.png";
import { HelpOutline } from "@mui/icons-material";
const geocoder = new window.google.maps.Geocoder();
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const RegisterForm = () => {
  const classes = useStyle();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const [udata, setUData] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState("");
  const getStateFromAdd = (arr) => {
    let f = "";
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].types &&
        arr[i].types.find((a) => a === "political") &&
        !arr[i].types.find((a) => a === "country")
      ) {
        f = arr[i].short_name;
      }
    }
    return f;
  };
  useEffect(() => {
    locFromAdd();
  }, []);
  function locFromAdd() {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        const add = await geocoder.geocode({ location: { lng, lat } });
        if (add && add.results[0] && add.results[0].address_components) {
          const state = getStateFromAdd(add.results[0].address_components);
          setUserState(() => state || "");
        } else {
          setUserState(() => "");
        }
      },
      (e) => {
        setUserState(() => "");
      },
      options
    );
  }
  const responseGoogle = async (res) => {
    setLoading(true);
    if (res && res.profileObj && res.googleId) {
      const data = {
        email: res.profileObj.email,
        name: res.profileObj.name,
        type: "google",
        socialToken: res.googleId,
      };
      setUData(() => data);
      toast.success(
        "You are authorised! Please add required field and press signup"
      );
    }
    setLoading(false);
  };

  const responseFacebook = async (res) => {
    setLoading(true);
    if (res.id && res.email) {
      const data = {
        email: res.email,
        type: "facebook",
        socialToken: res.id,
        name: res.name,
      };
      setUData(() => data);
      toast.success(
        "You are authorised! Please add required field and press signup"
      );
    }
    setLoading(false);
  };

  return (
    <div className={classes.register}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            // order={{ md: 2 }}
            paddingRight={matches ? "0" : "40px"}
          >
            <Grid item lg={12}>
              <img src={HerPlanIcon} className={classes.logo} alt="logo" />
            </Grid>
            <Grid item lg={12}>
              <div className={classes.title}>Create An Account</div>
            </Grid>
            <Grid item lg={12}>
              <div className={classes.tabsContainer}>
                <Tabs
                  value={activeTab}
                  className={classes.tabs}
                  variant="fullWidth"
                  TabIndicatorProps={{
                    style: { background: "#EAECED", fontFamily: "Montserrat" },
                  }}
                  onChange={(e, v) => setActiveTab(v)}
                >
                  <Tab
                    label={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "4px" }}>
                          I'm a Provider User
                        </span>
                        <Tooltip
                          title={
                            <div>
                              We use this for organizations offering direct
                              services to women and families.
                            </div>
                          }
                        >
                          <HelpOutline
                            style={{ marginLeft: "0px", marginRight: "0px" }}
                            fontSize="small"
                          />
                        </Tooltip>
                      </div>
                    }
                    className={activeTab === 0 ? classes.activeTab : ""}
                  />

                  <Tab
                    label={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "4px" }}>
                          I'm a General User
                        </span>
                        <Tooltip
                          title={
                            <div>
                              We use this for clients and community leaders
                              without direct service programs.
                            </div>
                          }
                        >
                          <HelpOutline
                            style={{ marginLeft: "0px", marginRight: "0px" }}
                            fontSize="small"
                          />
                        </Tooltip>
                      </div>
                    }
                    className={activeTab === 1 ? classes.activeTab : ""}
                  />
                </Tabs>
              </div>
            </Grid>
            {activeTab === 0 ? (
              <ProviderRegForm
                responseFacebook={(r) => responseFacebook(r)}
                responseGoogle={(r) => responseGoogle(r)}
                setLoading={(v) => setLoading(v)}
                udata={udata}
              />
            ) : (
              <GeneralUserRegForm
                responseFacebook={(r) => responseFacebook(r)}
                responseGoogle={(r) => responseGoogle(r)}
                setLoading={(v) => setLoading(v)}
                udata={udata}
                userState={userState}
              />
            )}
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={6}
            className={classes.gridImg}
            //  order={{ md: 1 }}
            container
          >
            <div style={{ margin: "auto" }}>
              <img
                src={createImg}
                alt="create account image1"
                style={{ height: "1050px", width: "auto" }}
              />
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default RegisterForm;
