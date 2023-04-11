import { Card, Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AboutAddressGrid from "./AboutAddressGrid";
import CategoryGrid from "./CategoryGrid";
// import ProviderImageGrid from "./ProviderImageGrid";
import {
  getProvider,
  getListName,
} from "../../redux/actions/Provider/ProviderActions";
import { getIdRole } from "../../redux/actions/profile/profileActions";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AppointmentModel from "../UI/AppointmentModel";
import HerPlanIcon from "../../assets/images/HerPlan.png";
import CustomButton from "../UI/CustomButton";
import FeedbackModal from "../UI/FeedbackModal";
import LoginModal from "../UI/LoginModal";
import { getClients } from "../../redux/actions/client/clientActions";
import { Apartment, Computer, LocalShipping } from "@mui/icons-material";
import HippaCoverdIcon from "../../assets/images/hipaa_icon.png";
import ReactDOMServer from "react-dom/server";
import { cloneDeep } from "lodash";
import LoadingComponent from "../UI/LoadingComponent";
import CancelToken from "../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  mainContainer: {
    height: "100%",
    width: "80%",
    textAlign: "center",
    margin: "auto",
    marginBottom: "7em",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    fontFamily: "Montserrat",
  },
  openCard: {
    margin: "auto",
    maxWidth: "263px",
    width: "fit-content",
    overflow: "hidden",
    height: "32px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    padding: "8px 16px 8px 8px",
    borderRadius: "2px",
    backgroundColor: "#f5f9fe",
    position: "relative",
    top: "-2em",
    zIndex: 2,
  },
  openCardOpenLabel: {
    width: "82px",
    height: "32px",
    fontSize: "20px",
    flexGrow: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    fontWeight: "normal",
    padding: "1px 6px",
    borderRadius: "2px",
    background: "#7dbaaf",
    color: "white",
    lineHeight: 1.6,
    letterSpacing: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
  },
  webSite: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.6,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#536288",
  },
  webSiteLinkS: {
    textDecoration: "none",
    color: "#536288",
    cursor: "pointer",
  },
  root: {
    "& .MuiAvatar-root": {
      width: "24px !important",
      height: "24px !important",
      fontSize: "1em !important",
    },
  },
  headerCard: {
    color: "#0f2f64",
    fontSize: "25px",
    lineHeight: 1.2,
    marginBottom: "0.5em",
    fontWeight: "600",
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
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.6,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#536288",
  },
  btn: {
    maxHeight: "36px",
  },
  addressBtnDiv: {
    fontSize: "22px",
    fontWeight: 500,
    color: "#2c4877",
    marginTop: "1em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  siteHeader: {
    marginTop: "0.3em",
    fontSize: "25px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.2,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#0f2f64",
    marginBottom: "0.5em",
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
    cursor: "pointer",
  },
  siteLocationHeader: {
    fontSize: "25px",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2,
    letterSpacing: "normal",
    color: "#1d3c6e",
  },
  claimSiteDiv: {
    fontSize: "12px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#7dbaaf",
    margin: "auto",
    marginLeft: "0px",
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
    paddingTop: "17px",
    paddingBottom: "23px",
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
  },
  pollClass: {
    height: "38px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "rgba(0, 0, 0, 0.2)",
  },
  siteAddressContainerClass: {
    maxWidth: "70%",
    fontStyle: "18px",
  },
}));

const ProviderDetailsComponent = () => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const action = bindActionCreators(
    {
      getProvider,
      setTitle,
      getIdRole,
      getListName,
      getClients,
    },
    dispatch
  );

  const parms = useParams();
  const provider = useSelector((state) => state.provider.provider);

  const [loading, setLoading] = useState(true);
  const [siteLoc, setSiteLoc] = useState([]);
  const [siteID, setSiteID] = useState();
  const [siteSelected, setSiteSelected] = useState("");
  const [marker, setMarker] = useState("");
  const [openFeedback, setOpenFeedback] = useState(false);
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [savedC, setSavedC] = useState();
  const [allSubCats, setAllSubCats] = useState([]);
  const [additional, setAddition] = useState(false);

  const handleClose = () => setOpen(false);
  const handleLoginLogic = () => {
    setOpen(() => false);
    setOpenAdd(() => true);
  };
  const setLoc = async (i) => {
    if (i) {
      if (i.name) {
        setAddition(() => (i.additional ? true : false));
        action.setTitle({ title: i.name, color: i.additional ? true : false });
      }
      if (i && i.siteSubCategoryInfo && i.siteSubCategoryInfo.length) {
        const ss = cloneDeep(i.siteSubCategoryInfo);
        ss.sort((a, b) => a.weight - b.weight);
        const ddd = [];
        for (let i = 0; i < ss.length; i++) {
          ddd.push(...Object.values(ss[i].subCat));
        }
        await setAllSubCats(() => ddd);
        await setCat(() => ss);
      }
      if (i.location && i.location.lat && i.location.lang) {
        await setMarker(() => {
          return { lat: i.location.lat, lng: i.location.lang };
        });
      }
      await setSiteID(() => i._id);
      await setSiteSelected(() => i);
    }
  };
  const [one, setOne] = useState(true);
  useEffect(() => {
    if (siteSelected && parms.id.split(",")[2] && one) {
      setOne(false);
      handleAppointmentModal(parms.id.split(",")[2]);
    }
  }, [siteSelected]);
  async function get() {
    setLoading(true);
    if (parms && parms.id) {
      const { id, role } = action.getIdRole();
      if (id) {
        ctc.createToken();
        await Promise.all([
          action.getProvider(parms.id.split(",")[0], ctc.getToken()),
          action.getListName(ctc.getToken()),
        ]);
        if (role === "provider") {
          const c = await action.getClients();
          if (c && c.length) {
            const saveClientWithShare = [];
            c.forEach((a) => {
              a.optShareData &&
                saveClientWithShare.push({
                  value: a.userId._id,
                  label: a.name,
                });
            });
            setSavedC(() => saveClientWithShare);
          }
        }
      } else {
        ctc.createToken();
        await action.getProvider(parms.id.split(",")[0], ctc.getToken());
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    get();
    return () => ctc.cancelTheApi();
  }, []);
  useEffect(() => {
    if (provider) {
      setCategory();
    }
  }, [provider]);

  const setCategory = async () => {
    action.setTitle({ title: (provider && provider.name) || "" });
    if (provider && provider.sitesInfo) {
      const ps = [];
      ps.push(...provider.sitesInfo);
      await setSiteLoc(() => ps);
      await setLoc(
        provider.sitesInfo.find((s) => s._id === parms.id.split(",")[1])
      );
    }
  };
  const handleAppointmentModal = (id) => {
    const dd = { ...siteSelected };
    if (siteSelected && id) {
      const data = allSubCats.find((s) => s.subCategoryId === id) || "";
      if (data) {
        dd.selectedSubCat = data;
        dd.psite = (provider && provider.altWebsite) || "";
        dd.pdesc = (provider && provider.about) || "";
        dd.primaryAcc = (provider && provider.primaryAccountOwnerInfo) || "";
        dd.POCAcc = (provider && provider.poc) || [];
        dd.SubProviderAcc = (provider && provider.subProvider) || [];
        setAppointmentData(() => dd);
        setOpen(true);
      }
    }
  };

  const siteAddressWithoutUSA = siteSelected.address?.replace(", USA", " ");
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div style={{ background: "#fafafa" }}>
          <Card className={classes.openCard}>
            {/* <span className={classes.openCardOpenLabel}>Website</span> */}
            <span className={classes.webSite}>
              <a
                href={
                  siteSelected && siteSelected.website
                    ? siteSelected.website.includes("http")
                      ? siteSelected.website
                      : "http://" + siteSelected.website
                    : (provider && provider.altWebsite
                        ? provider.altWebsite.includes("http")
                          ? provider.altWebsite
                          : "http://" + provider.altWebsite
                        : "#") || "#"
                }
                className={classes.webSiteLinkS}
                target={"_blank"}
                rel="noopener noreferrer"
              >
                {siteSelected && siteSelected.website
                  ? siteSelected.website
                  : provider && provider.altWebsite
                  ? provider.altWebsite
                  : ""}
              </a>
            </span>
          </Card>

          <div className={classes.mainContainer}>
            <AboutAddressGrid
              urlId={parms.id || ""}
              siteID={siteID}
              siteSelected={siteSelected}
              uid={action.getIdRole().id}
              primaryAccountOwnerInfo={provider?.primaryAccountOwnerInfo}
              orgDetails={provider}
              marker={marker}
              orgName={provider.name || ""}
            />
            <CategoryGrid
              cats={cat || []}
              setOpen={(id) => handleAppointmentModal(id)}
            />
            <Grid container textAlign="left" spacing={2} marginBottom={5}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Divider orientation="horizontal" variant="fullWidth" />
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <div className={classes.headerCard}>About Provider</div>
                <div className={classes.aboutCardDesc}>
                  {(provider && provider.about) || "-"}
                </div>
                <div style={{ marginTop: "10px", marginBottom: "40px" }}>
                  <CustomButton
                    name="Provide Feedback"
                    varient="contained"
                    classNameI="greyContained"
                    onclick={() => setOpenFeedback(true)}
                  />
                </div>
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <div className={classes.siteHeader}>Site Locations</div>
                {siteLoc &&
                  siteLoc.map((s) => (
                    <div
                      className={classes.siteLink}
                      style={
                        siteID && siteID === s._id
                          ? {
                              color: "#7dbaaf",
                            }
                          : {}
                      }
                      key={s._id}
                      onClick={() => setLoc(s)}
                    >
                      <u>{s.name}</u>
                    </div>
                  ))}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      <AppointmentModel
        open={open}
        handleClose={() => handleClose()}
        appointmentData={appointmentData}
        handleLoginLogic={handleLoginLogic}
        savedC={savedC}
        additional={additional}
      />
      <FeedbackModal
        open={openFeedback}
        handleClose={() => setOpenFeedback(false)}
        siteId={siteID || ""}
      />
      <LoginModal open={openAdd} handleClose={() => setOpenAdd(false)} />

      <iframe
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      >
        <div id="divcontents">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                padding: "1em",
                filter: "brightness(1) invert(1)",
                height: "145px !important",
              }}
              src={HerPlanIcon}
              alt="footer logo"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                // justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              {provider && provider.logo ? (
                <img
                  src={provider.logo}
                  alt={provider.logo}
                  style={{
                    maxHeight: "40px",
                    marginTop: "-10px",
                  }}
                />
              ) : null}
              <div>
                <div
                  style={{
                    marginTop: "9px",
                    fontSize: "18px",
                    fontWeight: 500,
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <div style={{ marginTop: "6px" }}>{siteSelected.name}</div>
                  {siteSelected && siteSelected.homeVisit && (
                    <svg
                      style={{
                        maxHeight: "34px",
                        maxWidth: "34px",
                        marginTop: "-5px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: ReactDOMServer.renderToStaticMarkup(
                          <LocalShipping />
                        ),
                      }}
                    />
                  )}
                  {siteSelected &&
                    !siteSelected.virtual &&
                    !siteSelected.homeVisit && (
                      <svg
                        style={{
                          maxHeight: "34px",
                          maxWidth: "34px",
                          marginTop: "-5px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: ReactDOMServer.renderToStaticMarkup(
                            <Apartment />
                          ),
                        }}
                      />
                    )}
                  {siteSelected && siteSelected.virtual && (
                    <svg
                      style={{
                        maxHeight: "34px",
                        maxWidth: "34px",
                        marginTop: "-5px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: ReactDOMServer.renderToStaticMarkup(
                          <Computer />
                        ),
                      }}
                    />
                  )}
                  {/* {siteSelected && provider && provider.hippa && (
                    <img
                      src={HippaCoverdIcon}
                      style={{
                        marginTop: "-10px",
                        maxHeight: "50px",
                      }}
                    />
                  )} */}
                </div>
                <div style={{ textAlign: "left" }}>
                  {siteSelected.website && (
                    <a href={siteSelected.website}>
                      {siteSelected.website.slice(0, 25)}
                    </a>
                  )}
                  <div>{siteAddressWithoutUSA}</div>
                  <div>
                    {siteSelected.city}, {siteSelected.state}{" "}
                    {siteSelected.zipcode}
                  </div>
                </div>
              </div>
            </div>
            <table
              style={{
                width: "100%",
                border: "1px solid black",
                textAlign: "left",
                borderCollapse: "collapse",
              }}
            >
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: "10px",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: "10px",
                  }}
                >
                  Subcategory
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: "10px",
                  }}
                >
                  Service Description
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: "10px",
                  }}
                >
                  Service Website
                </th>

                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: "10px",
                  }}
                >
                  Contact
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: "10px",
                  }}
                >
                  Leaf
                </th>
              </tr>
              {allSubCats && allSubCats.length
                ? allSubCats.map((data, id) => (
                    <tr key={id}>
                      <td
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          padding: "10px",
                        }}
                      >
                        {data.categoryName}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          padding: "10px",
                        }}
                      >
                        {data.serviceName || data.subCategoryName || "-"}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          padding: "10px",
                        }}
                      >
                        {data.serviceDescription || "-"}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          padding: "10px",
                        }}
                      >
                        {data.serviceWebpage || "-"}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          padding: "10px",
                        }}
                      >
                        {data.poc.length
                          ? data.poc.map((a) => (
                              <div>
                                {a.name} {a.email} {a.contact}
                              </div>
                            ))
                          : provider.primaryAccountOwnerInfo &&
                            provider.primaryAccountOwnerInfo.length
                          ? provider.primaryAccountOwnerInfo.map((a) => (
                              <div>
                                {a.name} {a.email} {a.contact}
                              </div>
                            ))
                          : "-"}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          padding: "10px",
                        }}
                      >
                        {data.leaf ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))
                : null}
            </table>
          </div>
        </div>
      </iframe>
    </>
  );
};

export default ProviderDetailsComponent;
