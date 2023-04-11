import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import HerPlanIcon from "../assets/images/colorHerPlan.png";

import themeConfig from "../themeConfig";
const useStyles = makeStyles((theme) => ({
  logo: {
    height: "9em !important",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      height: "6em !important",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5em !important",
    },
    // padding: "1em",
    // filter: "brightness(1) invert(1)",
  },
  navLinkClass: {
    padding: "10px",
    textDecoration: "none",
    color: themeConfig.color4,
    fontSize: "16px",
    fontWeight: 600,
  },
  thirdDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    fontSize: "16px",
    color: themeConfig.color4,
    margin: "0px 130px 0px 130px",
    [theme.breakpoints.down("md")]: {
      margin: "0px",
    },
  },
  thirdDivLink: {
    fontSize: "16px",
    color: themeConfig.color4,
    textDecoration: "none",
    padding: "0 10px 0px 10px",
  },
}));

const PrivateFooter = () => {
  const classes = useStyles();

  return (
    <div style={{ height: "14em", position: "sticky" }}>
      <Grid container direction="column">
        <Grid container textAlign="center">
          <Grid item lg={12} sm={12} md={12} xs={12} mb={5}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                className={classes.logo}
                src={HerPlanIcon}
                alt="footer logo"
              />{" "}
            </div>
          </Grid>
        </Grid>
        <Grid container marginBottom={2}>
          <Grid item lg={12} sm={12} md={12} xs={12} textAlign="center">
            <NavLink className={classes.navLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={classes.navLinkClass} to="/about-us">
              About Us
            </NavLink>
            <NavLink className={classes.navLinkClass} to="/maps-tips">
              Map Tips
            </NavLink>
            <NavLink className={classes.navLinkClass} to="/contact-us">
              Contact Her Plan
            </NavLink>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <div className={classes.thirdDiv}>
              <div>
                © Her PLAN {new Date().getFullYear()} All Rights Reserved
              </div>
              <div>
                <NavLink className={classes.thirdDivLink} to="/privacy-policy">
                  Privacy Policy
                </NavLink>
                |
                <NavLink
                  className={classes.thirdDivLink}
                  to="/terms-conditions"
                >
                  Terms of Use
                </NavLink>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PrivateFooter;
