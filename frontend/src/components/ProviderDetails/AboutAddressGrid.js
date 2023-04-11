import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MyMap from "../GoogleMap/Map";
import CustomButton from "../UI/CustomButton";
import MapModal from "../UI/MapModal";
import { useEffect, useState } from "react";
import config from "../../config";
import { toast } from "react-toastify";
import SavedToListModal from "../UI/SavedToListModal";
import { useDispatch, useSelector } from "react-redux";
import { addSiteClaim } from "../../redux/actions/Admin/AdminActions";
import { getProvider } from "../../redux/actions/Provider/ProviderActions";
import LoginModal from "../UI/LoginModal";
import ClaimModal from "../UI/ClaimModal";
import CustomModal from "../UI/CustomModal";
import { bindActionCreators } from "redux";
import ClaimUserModal from "./ClaimUserModal";
import CancelToken from "../../utils/cancelClass";
import { useParams } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
  headerCard: {
    color: "#0f2f64",
    fontSize: "40px",
    lineHeight: 1.2,
    marginBottom: "0.5em",
    fontWeight: "500",
  },
  subHeaderCard: {
    color: "#0f2f64",
    fontSize: "22px",
    lineHeight: 1.2,
    marginBottom: "0.5em",
    fontWeight: 500,
  },
  aboutCardDesc: {
    width: "95%",
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: "#536288",
  },
  btn: {
    maxHeight: "36px",
  },
  addressBtnDiv: {
    fontSize: "22px",
    fontWeight: 500,
    color: "#2c4877",
    zIndex: "22",
    position: "absolute",
    right: "12%",
    top: "37%",
    [theme.breakpoints.down("lg")]: {
      top: "58%",
      right: "11%",
    },
  },
  uaddressBtnDiv: {
    fontSize: "22px",
    fontWeight: 500,
    color: "#2c4877",
    zIndex: "22",
    position: "absolute",
    right: "12%",
    top: "50%",
    [theme.breakpoints.down("lg")]: {
      top: "78%",
      right: "11%",
    },
  },
  siteHeader: {
    marginTop: "0.3em",
    fontSize: "22px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#0f2f64",
    marginBottom: "1.2em",
  },
  siteLink: {
    fontSize: "18px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.6,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#536288",
    marginBottom: "7px",
  },
  siteLocationHeader: {
    fontSize: "20px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "normal",
    color: "#0f2f64",
    marginBottom: "6px",
  },
  claimSiteDiv: {
    fontSize: "18px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#7dbaaf",
    marginBottom: "21px",
    cursor: "pointer",
  },
  siteLocationNameDiv: {
    fontSize: "36px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    color: "#1d3c6e",
  },
  doctorTxt: {
    paddingLeft: "0.3em",
    color: "#92929d",
    fontSize: "12px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  docAvatar: {
    width: "24px !important",
    height: "24px !important",
    fontSize: "1em !important",
  },
  docContainer: {
    display: "flex",
  },
  root: {
    "& .MuiAvatar-root": {
      width: "24px !important",
      height: "24px !important",
      fontSize: "1em !important",
    },
  },
  btnContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "250px",
  },
  pollClass: {
    height: "38px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "rgba(0, 0, 0, 0.2)",
  },
  siteAddressContainerClass: {
    maxWidth: "283px",
    fontStyle: "16px",
    lineHeight: 1.3,
    color: "#2c4877",
  },
}));

const AboutAddressGrid = ({
  siteID,
  siteSelected,
  uid,
  marker,
  urlId,
  orgName,
  primaryAccountOwnerInfo,
  orgDetails,
}) => {
  const classes = useStyle();
  const [openAdd, setOpenAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [myLocation, setMyLocation] = useState("");
  const [islogin, setIsLogin] = useState(false);
  const [openClaim, setOpenClaim] = useState(false);
  const [openClaimUser, setOpenClaimUser] = useState(false);
  const [openClaimUserModal, setOpenClaimUserModal] = useState(false);
  const [openClaimModal, setOpenClaimModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [claimData, setClaimData] = useState({
    name: "",
    jobTitle: "",
    howUHeard: "",
    fName: "",
    lName: "",
  });
  const uu = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const actions = bindActionCreators({ addSiteClaim, getProvider }, dispatch);
  const ctc = new CancelToken();
  const params = useParams();

  const loadMyloc = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      if (lat && long) {
        setMyLocation({
          lat: lat,
          lng: long,
        });
      }
    });
    // let lat = 39.1492746;
    // let long = -76.7752493;
    // setMyLocation({ lat: lat, lng: long });
  };
  const print = () => {
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  useEffect(() => {
    if (uu) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [uu]);
  const copyMsg = () => {
    navigator.clipboard.writeText(
      `${config.url}provider-details/${urlId.split(",")[0]},${siteID}`
    );
    toast.success("url copied!");
  };
  useEffect(() => {
    loadMyloc();
  }, []);

  const spliteAddress =
    siteSelected.address?.includes(siteSelected.state) ||
    siteSelected.address?.includes(siteSelected.city) ||
    siteSelected.address?.includes(siteSelected.zipcode)
      ? siteSelected.address?.split(",")[0]
      : siteSelected.address;

  const handleClaim = async () => {
    const data = {
      isGeneralUser: true,
      name: uu?.profileId?.name,
      jobTitle: claimData?.jobTitle,
      howYouHeard: claimData?.howYouHeard,
      firstName: claimData?.fName,
      lastName: claimData?.lName,
      email: uu?.email,
      siteId: siteID,
    };
    actions.addSiteClaim(data);
    actions.getProvider(params.id.split(",")[0], ctc.getToken());
    setOpenClaimUserModal(false);
    setOpenClaimUser(false);
  };

  return (
    <>
      <Grid container textAlign="left" spacing={4} marginBottom={5}>
        {siteID && (
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <div className={classes.siteLocationHeader}>
                  {siteSelected.name}
                </div>
                {uu
                  ? uu?.role === "user"
                    ? orgDetails?.claimStatus === undefined
                      ? primaryAccountOwnerInfo?.length === 0 && (
                          <div
                            className={classes.claimSiteDiv}
                            onClick={() => setOpenClaimUserModal(true)}
                          >
                            Claim Site
                          </div>
                        )
                      : (!orgDetails?.claimStatus ||
                          primaryAccountOwnerInfo?.length === 0) && (
                          <div
                            className={classes.claimSiteDiv}
                            onClick={() => setOpenClaimUserModal(true)}
                          >
                            Claim Site
                          </div>
                        )
                    : ""
                  : orgDetails?.claimStatus === undefined
                  ? primaryAccountOwnerInfo?.length === 0 && (
                      <div
                        className={classes.claimSiteDiv}
                        onClick={() => setOpenClaimModal(true)}
                      >
                        Claim Site
                      </div>
                    )
                  : (!orgDetails?.claimStatus ||
                      primaryAccountOwnerInfo?.length === 0) && (
                      <div
                        className={classes.claimSiteDiv}
                        onClick={() => setOpenClaimModal(true)}
                      >
                        Claim Site
                      </div>
                    )}
                <div style={{ display: "flex", gap: "15px" }}>
                  {!siteSelected?.virtual && !siteSelected?.homeVisit && (
                    <div>
                      <div
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          fontWeight: 500,
                          fontStretch: "normal",
                          fontStyle: "normal",
                          lineHeight: 1.2,
                          letterSpacing: "normal",
                          textAlign: "left",
                          color: "#0f2f64",
                        }}
                      >
                        Address
                      </div>
                      <div className={classes.siteAddressContainerClass}>
                        {spliteAddress}
                        <br />
                        {siteSelected.city || "-"},{" "}
                        {(siteSelected.state && siteSelected.state[0]) || "-"}{" "}
                        <br />
                        {siteSelected.zipcode || "-"}
                      </div>
                    </div>
                  )}

                  <div className={classes.btnContainer}>
                    <CustomButton
                      name={"Add to List"}
                      varient="contained"
                      className={classes.btn}
                      fullWidth={true}
                      onclick={() => setOpenAdd(true)}
                    />

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <CustomButton
                        name="Share"
                        varient="contained"
                        classNameI="greyContained"
                        fullWidth={true}
                        onclick={() => copyMsg()}
                      />
                      <CustomButton
                        name="Print"
                        varient="contained"
                        fullWidth={true}
                        classNameI={"greyContained"}
                        onclick={print}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        )}
        {siteID && !siteSelected?.virtual && (
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <MyMap
              size="230px"
              singleMarker={true}
              marker={marker || ""}
              direction={false}
            />
            <div
              className={uid ? classes.uaddressBtnDiv : classes.addressBtnDiv}
            >
              <CustomButton
                name="Get Directions"
                varient="contained"
                className={classes.btn}
                onclick={() => setOpen(true)}
              />
            </div>
          </Grid>
        )}
      </Grid>
      <MapModal
        open={open}
        handleClose={() => setOpen(false)}
        marker={marker}
        myLocation={myLocation}
      />

      {islogin ? (
        <SavedToListModal
          open={openAdd}
          handleClose={() => setOpenAdd(false)}
          orgId={urlId.split(",")[0]}
          siteId={siteID}
        />
      ) : (
        <LoginModal open={openAdd} handleClose={() => setOpenAdd(false)} />
      )}

      <CustomModal
        open={openClaimModal}
        title="Claim Site"
        handleClose={() => setOpenClaimModal(false)}
        content={"Select option for you want to claim site."}
        actions={() => {
          return (
            <>
              <CustomButton
                varient="contained"
                onclick={() => setOpenLogin(true)}
                name="Login"
                // styled={{ backgroundColor: "red" }}
                size="large"
                fullWidth={true}
              />
              <CustomButton
                varient="outlined"
                onclick={() => setOpenClaim(true)}
                name="Create an account"
                size="large"
                fullWidth={true}
              />
            </>
          );
        }}
      />

      <CustomModal
        open={openClaimUser}
        title="Claim Site"
        handleClose={() => setOpenClaimUser(false)}
        content={
          "This action will create a new provider user account, but it will keep the past quizzes, saved searches, and saved lists linked to it. Except these, all the other data linked to the old general user account will be lost."
        }
        actions={() => {
          return (
            <>
              <CustomButton
                varient="contained"
                onclick={() => setOpenClaimUser(false)}
                name="Cancel"
                styled={{ backgroundColor: "red" }}
                size="large"
                fullWidth={true}
              />
              <CustomButton
                varient="outlined"
                onclick={handleClaim}
                name="Submit"
                size="large"
                fullWidth={true}
              />
            </>
          );
        }}
      />

      <LoginModal open={openLogin} handleClose={() => setOpenLogin(false)} />

      <ClaimUserModal
        siteID={siteID}
        open={openClaimUserModal}
        orgName={orgName}
        setOpenClaimUser={setOpenClaimUser}
        setClaimData={setClaimData}
        claimData={claimData}
        handleClose={() => setOpenClaimUserModal(false)}
      />

      <ClaimModal
        siteID={siteID}
        open={openClaim}
        uu={uu}
        orgName={orgName}
        setOpenClaimModal={setOpenClaimModal}
        handleClose={() => setOpenClaim(false)}
      />
    </>
  );
};

export default AboutAddressGrid;
