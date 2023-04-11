import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Stack,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import { makeStyles } from "@mui/styles";
import themeConfig from "../themeConfig";
import HeaderImg from "../assets/images/Header-background.png";
import HeaderImg2 from "../assets/images/Header-image2.png";
import HerPlanIcon from "../assets/images/HerPlan.png";
import {
  PersonOutlineOutlined,
  Menu as MenuIcon,
  ArrowBack,
  WorkOutlineOutlined,
  KeyboardReturnOutlined,
  ApartmentOutlined,
  HelpOutline,
  ContactMailOutlined,
  LockOutlined,
  AccountBoxOutlined,
  MessageOutlined,
  ListOutlined,
  FeedOutlined,
  AccountBalanceOutlined,
  ManageAccountsOutlined,
  AdminPanelSettingsOutlined,
  ApprovalOutlined,
  BookmarkAddedOutlined,
  ManageSearchOutlined,
  AccountCircleOutlined,
  ExplicitOutlined,
  SwitchAccountOutlined,
  TimelineOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { bindActionCreators } from "redux";
import { logout } from "../redux/actions/auth/authActions";
import { getIdRole } from "../redux/actions/profile/profileActions";
import CustomButton from "../components/UI/CustomButton";
import { toast } from "react-toastify";
import { switchProfile } from "../redux/actions/Admin/AdminActions";

const sxObj = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    zIndex: 0,
  },
};
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "13em",
  },
  logo: {
    height: "7em !important",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      height: "6em !important",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5em !important",
    },
    padding: "1em",
    filter: "brightness(0) invert(1)",
  },
  appBar: {
    backgroundColor: `${themeConfig.color1} !important`,
    color: "white !important",
    height: "17em",
    position: "relative",
    zIndex: 1,
    fontFamily: "Montserrat",
  },
  icons: { height: "40px", width: "40px", color: "white !important" },
  title: {
    textAlign: "center",
    fontSize: "36px",
    marginTop: "0.5em",
  },
  backBtnContainer: {
    margin: "auto",
    paddingLeft: "3em",
    paddingTop: "2em",
    marginTop: "0px",
  },
  backBtn: {
    paddingLeft: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.53px",
    textAlign: "left",
    color: "#fff",
  },
  menuBtn: {
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.53px",
    textAlign: "right",
    color: "#fff",
    marginRight: "2px",
  },
  menuBtnContainer: {
    paddingRight: "3em",
    paddingTop: "2em",
    textAlign: "right",
  },
  logoContainer: {
    margin: "auto",
    textAlign: "center",
  },
  headerSelect: {
    color: "black",
    background: "white",
    borderRadius: "5px",
    marginRight: "0.5em",
  },
  headerSelectDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      gap: "0.2em",
    },
  },
  appbarShirnk: {
    height: "10em",
  },
  appBarColor: {
    backgroundColor: "black !important",
  },
}));

const PrivateHeader = () => {
  const classes = useStyles();

  const location = useNavigate();

  const path = useLocation();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const title = useSelector((state) => state.theme.title);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { logout, getIdRole, switchProfile },
    dispatch
  );
  const { role, shareD, subRole } = actions.getIdRole();
  const cms = useSelector((state) => state.cms);
  const profileData = useSelector((state) => state.auth.user);

  const [c, setC] = useState([classes.appBar]);
  const [enchorEl, setEnchorEl] = useState(null);
  const [openP, setOpenP] = useState(false);

  const handleLogout = async () => {
    await actions.logout();
    location("/");
    window.location.reload();
  };

  const handleClick = (event) => {
    setEnchorEl(event.currentTarget);
    setOpenP(true);
  };

  const handleClose = () => {
    setEnchorEl(null);
    setOpenP(false);
  };

  const handleRoute = (path) => {
    setEnchorEl(null);
    setOpenP(false);
    location(path);
  };
  const handleChange = async () => {
    setEnchorEl(null);
    setOpenP(false);
    await actions.switchProfile();
    location("/");
  };
  useEffect(() => {
    const dd = [classes.appBar];
    if (title.color) dd.push(classes.appBarColor);
    if (title.shrink) dd.push(classes.appbarShirnk);
    setC(() => dd);
  }, [title, cms, profileData]);

  const hideMenu =
    !!user?.profileId?.claimStatus &&
    user?.profileId?.claimStatus !== "approved";
  return (
    <>
      <AppBar
        className={c.toString().replaceAll(",", " ")}
        style={
          path.pathname === "/" && role !== "admin"
            ? {
                backgroundImage: `url(${HeaderImg})`,
                height: matches ? "40em" : "50em",
              }
            : {}
        }
      >
        <Toolbar disableGutters>
          <Grid container direction="row">
            <Grid container direction="row">
              <Grid item lg={4} sm={4} xs={4} md={4}>
                {path.pathname !== "/" ? (
                  <div className={classes.backBtnContainer}>
                    <IconButton onClick={() => location(title.backUrl || -1)}>
                      <ArrowBack className={classes.icons} />
                    </IconButton>
                    <div className={classes.backBtn}>BACK</div>
                  </div>
                ) : (
                  <div
                    className={classes.logoContainer}
                    onClick={() => location("/")}
                    style={{ textAlign: "left", paddingLeft: "5em" }}
                  >
                    <img
                      src={HerPlanIcon}
                      className={classes.logo}
                      alt="logo"
                    />
                  </div>
                )}
              </Grid>
              <Grid item lg={4} sm={4} xs={4} md={4}>
                {path.pathname !== "/" && (
                  <div
                    className={classes.logoContainer}
                    onClick={() => location("/")}
                  >
                    <img
                      src={HerPlanIcon}
                      className={classes.logo}
                      alt="logo"
                    />
                  </div>
                )}
              </Grid>
              <Grid item lg={4} sm={4} xs={4} md={4}>
                <div className={classes.menuBtnContainer}>
                  <IconButton onClick={handleClick}>
                    <MenuIcon className={classes.icons} />
                  </IconButton>
                  <div className={classes.menuBtn}>MENU</div>
                </div>
              </Grid>
            </Grid>
            {path.pathname === "/" || (title && title.shrink) ? null : (
              <Grid item lg={12} sm xs md>
                <h4 className={classes.title}>
                  {(title && title.title) || ""}
                </h4>
              </Grid>
            )}
          </Grid>
        </Toolbar>
        {path.pathname === "/" && role !== "admin" && (
          <Grid
            container
            spacing={matches ? 0 : 2}
            pl={matches ? "1em" : "7em"}
            pr={matches ? "1em" : "0em"}
            mb="3em"
          >
            <Grid item lg={6} md={6} sm={12} xs={12} mt="auto" mb="auto">
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
                    onclick={() => location("/provider-search")}
                  />
                  <CustomButton
                    name="Take the Quiz"
                    varient="outlined"
                    size="large"
                    classNameI="specialOutline"
                    onclick={() => location("/quiz")}
                  />
                </div>
              </Stack>
            </Grid>
            {!matches && (
              <Grid item lg={6} md={6} sm={6} xs={6} pl="43px">
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
      {role !== "admin" ? (
        <Menu
          anchorEl={enchorEl}
          open={openP}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: { ...sxObj },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => handleRoute("/my-profile")}>
            <ListItemIcon>
              <PersonOutlineOutlined />{" "}
            </ListItemIcon>
            My Profile
          </MenuItem>
          {!hideMenu && (
            <MenuItem onClick={() => handleRoute("/message/xyz")}>
              <ListItemIcon>
                <MessageOutlined />{" "}
              </ListItemIcon>
              Messages
            </MenuItem>
          )}
          <MenuItem onClick={() => handleRoute("/my-searches")}>
            <ListItemIcon>
              <WorkOutlineOutlined />
            </ListItemIcon>
            Saved Searches
          </MenuItem>
          {role && role === "provider" ? (
            <MenuItem onClick={() => handleRoute("/my-clients")}>
              <ListItemIcon>
                <AccountBoxOutlined />
              </ListItemIcon>
              Saved Clients
            </MenuItem>
          ) : null}
          <MenuItem onClick={() => handleRoute("/save-quiz-result")}>
            <ListItemIcon>
              <ListOutlined />{" "}
            </ListItemIcon>
            Saved Quizzes
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/my-providers")}>
            <ListItemIcon>
              <ApartmentOutlined />
            </ListItemIcon>
            Provider Lists
          </MenuItem>
          {!hideMenu && (
            <MenuItem onClick={() => handleRoute("/my-appointments")}>
              <ListItemIcon>
                <ContactMailOutlined />
              </ListItemIcon>
              Appointments
            </MenuItem>
          )}
          <Divider />

          <MenuItem onClick={() => handleRoute("/provider-search")}>
            <ListItemIcon>
              <KeyboardReturnOutlined />
            </ListItemIcon>
            Return To Provider Search
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/maps-tips")}>
            <ListItemIcon>
              <HelpOutline />
            </ListItemIcon>
            Map Tips
          </MenuItem>
          {profileData && profileData.assigningId ? (
            <MenuItem onClick={() => handleChange()}>
              <ListItemIcon>
                <SwitchAccountOutlined />
              </ListItemIcon>
              Switch to Admin
            </MenuItem>
          ) : null}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LockOutlined />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          anchorEl={enchorEl}
          open={openP}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: { ...sxObj },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => handleRoute("/")}>
            <ListItemIcon>
              <PersonOutlineOutlined />{" "}
            </ListItemIcon>
            Admin Home
          </MenuItem>

          {subRole !== "analyst" && (
            <MenuItem onClick={() => handleRoute("/statistics")}>
              <ListItemIcon>
                <TimelineOutlined />{" "}
              </ListItemIcon>
              Statistics
            </MenuItem>
          )}

          <MenuItem onClick={() => handleRoute("/admin-profile")}>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={() => handleRoute("/organizations-list")}>
            <ListItemIcon>
              <AccountBalanceOutlined />
            </ListItemIcon>
            Organizations
          </MenuItem>
          {subRole === "master" && (
            <MenuItem onClick={() => handleRoute("/user-manage")}>
              <ListItemIcon>
                <ManageAccountsOutlined />
              </ListItemIcon>
              Admin Users
            </MenuItem>
          )}
          <MenuItem onClick={() => handleRoute("/provider-user-manage")}>
            <ListItemIcon>
              <ManageAccountsOutlined />
            </ListItemIcon>
            Provider Users
          </MenuItem>
          {(subRole === "master" || subRole === "officer") && (
            <MenuItem onClick={() => handleRoute("/general-user-manage")}>
              <ListItemIcon>
                <ManageAccountsOutlined />
              </ListItemIcon>
              General Users
            </MenuItem>
          )}
          {subRole === "master" && (
            <MenuItem onClick={() => handleRoute("/non-active-user-manage")}>
              <ListItemIcon>
                <ManageAccountsOutlined />
              </ListItemIcon>
              Ghost Users
            </MenuItem>
          )}
          {(subRole === "master" ||
            subRole === "manager" ||
            subRole === "officer") && (
            <MenuItem onClick={() => handleRoute("/admin-feedback")}>
              <ListItemIcon>
                <FeedOutlined />
              </ListItemIcon>
              Feedback
            </MenuItem>
          )}
          {(subRole === "master" ||
            subRole === "manager" ||
            subRole === "officer") && (
            <MenuItem onClick={() => handleRoute("/claim-manage")}>
              <ListItemIcon>
                <AdminPanelSettingsOutlined />
              </ListItemIcon>
              Org Claims
            </MenuItem>
          )}

          <MenuItem onClick={() => handleRoute("/management-search")}>
            <ListItemIcon>
              <ManageSearchOutlined />
            </ListItemIcon>
            Search Link Management
          </MenuItem>
          {subRole === "master" && (
            <MenuItem onClick={() => handleRoute("/cms-and-state")}>
              <ListItemIcon>
                <ExplicitOutlined />
              </ListItemIcon>
              CMS & State
            </MenuItem>
          )}
          {(subRole === "master" ||
            subRole === "manager" ||
            subRole === "officer") && (
            <MenuItem onClick={() => handleRoute("/approval-manage")}>
              <ListItemIcon>
                <ApprovalOutlined />
              </ListItemIcon>
              Organization Approval
            </MenuItem>
          )}
          {/* {(subRole === "master" ||
            subRole === "manager" ||
            subRole === "officer") && (
            <MenuItem onClick={() => handleRoute("/acc-approval-manage")}>
              <ListItemIcon>
                <BookmarkAddedOutlined />
              </ListItemIcon>
              Account Approval
            </MenuItem>
          )}
          <Divider /> */}
          {profileData && profileData.assigningId ? (
            <MenuItem onClick={() => handleChange()}>
              <ListItemIcon>
                <SwitchAccountOutlined />
              </ListItemIcon>
              Switch to Provider
            </MenuItem>
          ) : null}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LockOutlined />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}

      {/* <div
        className={classes.toolbarMargin}
        style={
          title && title.shrink
            ? {
                marginBottom: "6em",
              }
            : {}
        }
      ></div> */}
    </>
  );
};

export default PrivateHeader;
