import { makeStyles } from "@mui/styles";
import themeConfig from "../../themeConfig";

export const useStyle = makeStyles((theme) => ({
  register: {
    padding: "8em 0px 22em 0px",
    width: "80%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  logo: {
    margin: "20px 0px 10px 0px",
    height: "10em",
  },
  title: {
    fontWeight: 700,
    fontSize: 35,
    color: themeConfig.color1,
    fontFamily: "Montserrat",
    margin: "10px 0px 20px 0px",
  },
  tabsContainer: {
    width: "100%",
    textAlign: "center",
    margin: "auto",
  },
  tabs: {
    background: "#EAECED",
    borderRadius: "12px",
  },
  activeTab: {
    background: `${themeConfig.color1} !important`,
    color: "white !important",
    margin: "5px !important",
    borderRadius: "12px !important",
  },
  signUpButton: {
    margin: "20px 0px 10px 0px !important",
    width: "80%",
    fontSize: "14px",
  },
  gridImg: {
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
  googlebtn: {
    background: `#7dbaaf !important`,
    color: "white !important",
    marginRight: "10px",
    marginBottom: "10px",
    boxShadow: "none",
    border: "0px",
    "&:hover": {
      background: `${themeConfig.color1} !important`,
    },
  },
  formGroupContainer: {
    textAlign: "left !important",
  },
  labelName: {
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
  },
}));
