import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Grid,
  Stack,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";
import NavTabs from "../components/UI/NavTabs";
import NavDrawer from "../components/UI/NavDrawer";
import themeConfig from "../themeConfig";
import HerPlanIcon from "../assets/images/HerPlan.png";
import HeaderImg from "../assets/images/Header-background.png";
import HeaderImg2 from "../assets/images/Header-image2.png";

import CustomButton from "../components/UI/CustomButton";
import { useSelector } from "react-redux";
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "5em",
  },
  logo: {
    height: "7em",
    padding: "1em",
    paddingLeft: "5em",
    filter: "brightness(0) invert(1)",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      height: "6em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
    paddingRight: "5em",
  },
  drawerIconContainer: {
    marginLeft: "auto !important",
    paddingRight: "1em !important",
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
    color: "white !important",
  },
  drawerItem: {
    ...theme.typography.tab,
    margin: "10px",
  },
  drawer: {
    width: "60% !important",
    backgroundColor: `${themeConfig.color1} !important`,
    color: "white !important",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: "10 !important",
    marginLeft: "25px !important",
    color: "white !important",
  },
  appBar: {
    backgroundColor: `${themeConfig.color1} !important`,
    color: "white !important",
    position: "relative",
    zIndex: 1,
  },
  appBarColor: {
    backgroundColor: "black !important",
  },
}));

const Header = () => {
  const loc = useLocation();
  const classes = useStyles();
  const chistory = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  useEffect(() => {
    setTabActive(loc.pathname);
  }, [loc.pathname]);
  const [tabActive, setTabActive] = useState(loc.pathname);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleTabChange = (e, value) => setTabActive(value);
  const cms = useSelector((state) => state.cms);
  const title = useSelector((state) => state.theme.title);

  const dd = [classes.appBar];
  if (title.color) dd.push(classes.appBarColor);

  return (
    <>
      <ElevationScroll>
        <AppBar
          className={dd.toString().replaceAll(",", " ")}
          style={
            loc.pathname === "/"
              ? {
                  backgroundImage: `url(${HeaderImg})`,
                }
              : {}
          }
        >
          <Toolbar disableGutters>
            <img
              src={HerPlanIcon}
              className={classes.logo}
              alt="logo"
              onClick={() => chistory("/")}
            />

            {matches ? (
              <NavDrawer
                iOS={iOS}
                openDrawer={openDrawer}
                setOpenDrawer={() => setOpenDrawer(true)}
                setCloseDrawer={() => setOpenDrawer(false)}
                classes={classes}
                shistory={(link) => {
                  chistory(link);
                  setOpenDrawer(false);
                }}
                loc={loc.pathname}
              />
            ) : (
              <NavTabs
                tabActive={tabActive}
                classes={classes}
                handleTabChange={handleTabChange}
                shistory={(link) => chistory(link)}
              />
            )}
          </Toolbar>
          {loc.pathname === "/" && (
            <Grid
              container
              spacing={matches ? 0 : 2}
              pl={matches ? "1em" : "7em"}
              pr={matches ? "1em" : "0em"}
              mb="3em"
            >
              <Grid item lg={6.5} md={6} sm={12} xs={12} mt="auto" mb="auto">
                <Stack>
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: matches ? "40px" : "56px",
                      fontWeight: 600,
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: 1.42,
                      letterSpacing: "normal",
                      textAlign: "left",
                      color: "#fff",
                    }}
                  >
                    {cms.homeHeader || "Collaborating for Comprehensive Care"}
                  </div>
                  <div
                    style={{
                      marginTop: "50px",
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      fontWeight: "normal",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: 1.75,
                      letterSpacing: "normal",
                      textAlign: "left",
                      color: "#fff",
                    }}
                  >
                    {" "}
                    {cms.homeText ||
                      `Why seven categories of care? Women cite seven reasons for abortion, and we transformed them to seven categories of care. We break it down further into 25 subcategories, and we research your state to find any life-affirming organization offering care in these areas.
                      `}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      // justifyContent: "center",
                      gap: "10px",
                      marginTop: "50px",
                    }}
                  >
                    <CustomButton
                      name="Search for Providers"
                      varient="contained"
                      size="large"
                      classNameI="special"
                      onclick={() => chistory("/provider-search")}
                    />
                    <CustomButton
                      name="Take the Quiz"
                      varient="outlined"
                      size="large"
                      classNameI="specialOutline"
                      onclick={() => chistory("/quiz")}
                    />
                  </div>
                </Stack>
              </Grid>
              {!matches && (
                <Grid item lg={5.5} md={6} sm={6} xs={6} pl="43px">
                  <div
                    style={{
                      maxHeight: "550px",
                      maxWidth: "500px",
                      margin: "auto",
                    }}
                  >
                    <img
                      src={cms.homeImage || HeaderImg2}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "550px",
                        maxWidth: "500px",
                        marginLeft: "30px",
                      }}
                    />
                  </div>
                </Grid>
              )}
            </Grid>
          )}
        </AppBar>
      </ElevationScroll>
      {/* <div className={classes.toolbarMargin}></div> */}
    </>
  );
};

export default Header;
