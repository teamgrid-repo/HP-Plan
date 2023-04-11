import { Apartment, Computer, LocalShipping } from "@mui/icons-material";
import ReactDOMServer from "react-dom/server";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SavedProviderListingCard from "./SavedProviderListingCard";
import ListingComponent from "../UI/ListingComponent";
import SavedProviderCard from "./SavedProviderCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllList,
  deleteListItem,
} from "../../redux/actions/Provider/ProviderActions";
import HeaderComponent from "./HeaderComponent";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useParams } from "react-router-dom";
import MapModal from "../UI/MapModal";
import HerPlanIcon from "../../assets/images/HerPlan.png";
import DeleteConfirmation from "../UI/DeleteConfirmation";
import HippaCoverdIcon from "../../assets/images/hipaa_icon.png";
import LoadingComponent from "../UI/LoadingComponent";
import CancelToken from "../../utils/cancelClass";
const ctc = new CancelToken();
const useStyle = makeStyles((theme) => ({
  shareProviderButton: {
    width: "164px",
  },
  directionProviderButton: {
    width: "164px",
    marginBottom: "1em",
  },
  contactProviderButton: {
    width: "164px",
    marginBottom: "1.5em",
  },
  btnContainer: {
    marginLeft: "auto",
    maxWidth: "180px",
  },
}));

const SavedProvidersComponent = () => {
  const classes = useStyle();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [oldName, setOldName] = useState("");
  const id = useParams();
  const [open, setOpen] = useState(false);
  const [marker, setMarker] = useState("");
  const [myLocation, setMyLocation] = useState("");
  const [delId, setDelId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const [printData, setPrintData] = useState("");

  const dispatch = useDispatch();
  const action = bindActionCreators(
    { getAllList, setTitle, deleteListItem },
    dispatch
  );
  const sp = useSelector((state) => state.provider.saveProviders);

  const get = async () => {
    setLoading(true);
    ctc.createToken();
    await action.getAllList(ctc.getToken());
    setLoading(false);
  };

  const loadData = () => {
    if (sp) {
      const fsp = sp.find((i) => i._id === id.id);
      action.setTitle({ title: (fsp && fsp.name) || "" });
      setOldName((fsp && fsp.name) || "");

      if (fsp && fsp.directoryItems) setData(() => fsp.directoryItems);
    }
  };
  const openAddressModal = (d) => {
    if (d && d.location && d.location.lat && d.location.lang) {
      setMarker({
        lat: d.location.lat,
        lng: d.location.lang,
      });
    }
    setOpen(true);
  };
  //providerInfo
  useEffect(() => {
    if (!sp) {
      get();
    }
    return () => ctc.cancelTheApi();
  }, []);
  useEffect(() => {
    if (sp) loadData();
  }, [sp]);
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
  useEffect(() => {
    loadMyloc();
  }, []);

  const handleDeleteModalOpen = (id) => {
    setDelId(() => id);
    setDeleteModal(() => true);
  };

  const removePro = async () => {
    setDeleteModal(false);
    setLoading(true);
    if (delId) {
      await action.deleteListItem(delId);
      ctc.createToken();
      await action.getAllList(ctc.getToken());
    }
    setLoading(false);
  };

  const changeOrder = (o) => {
    if (sp) {
      if (o !== "de") {
        const data1 = [...data];
        if (o === 1) {
          data1.sort((a, b) =>
            a.siteDetails.name.localeCompare(b.siteDetails.name)
          );
        } else {
          data1.sort((a, b) =>
            b.siteDetails.name.localeCompare(a.siteDetails.name)
          );
        }
        setData(data1);
      } else {
        const fsp = sp.find((i) => i._id === id.id);
        if (fsp && fsp.directoryItems) setData(() => fsp.directoryItems);
      }
    }
  };
  const handlePrint = (p, i) => {
    if (p === "all") {
      setPrintData(() => data);
    } else {
      const dd = data.find((d) => d._id === i);
      setPrintData(() => (dd ? [dd] : ""));
    }
    setTimeout(() => {
      handlePrintData();
    }, 500);
  };
  const handlePrintData = () => {
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <ListingComponent>
      <HeaderComponent
        edit={true}
        print={true}
        oldName={oldName}
        changeOrder={(o) => changeOrder(o)}
        handlePrint={() => handlePrint("all", "")}
      />
      <Grid container spacing={2}>
        {data && data.length ? (
          data.map((e) => (
            <SavedProviderListingCard
              name={(e.siteDetails && e.siteDetails.name) || ""}
              address={(e.siteDetails && e.siteDetails.address) || ""}
              id={e._id}
              data={e}
              removePro={() => handleDeleteModalOpen(e._id)}
              handlePrint={() => handlePrint("notAll", e._id)}
              CutomComponent={
                <SavedProviderCard
                  classes={classes}
                  id={e._id}
                  data={e}
                  openModal={(a) => openAddressModal(a)}
                />
              }
            />
          ))
        ) : (
          <Grid item lg={12} md={12} xs={12} sm={12} textAlign={"center"}>
            No Saved Provider Found!
          </Grid>
        )}
      </Grid>
      <MapModal
        open={open}
        handleClose={() => setOpen(false)}
        marker={marker}
        myLocation={myLocation}
      />
      <DeleteConfirmation
        open={deleteModal}
        title="Provider From List"
        handleClose={() => setDeleteModal(false)}
        handleDelete={() => removePro()}
      />
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
          {printData && printData.length
            ? printData.map((data, id) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                  key={id}
                >
                  {data.siteDetails && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        // justifyContent: "center",
                        marginBottom: "12px",
                      }}
                    >
                      {data.siteDetails.organisationId &&
                      data.siteDetails.organisationId.logo ? (
                        <img
                          src={data.siteDetails.organisationId.logo}
                          alt={data.siteDetails.organisationId.logo}
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
                          <div style={{ marginTop: "6px" }}>
                            {data.siteDetails.name}
                          </div>
                          {data.siteDetails.homeVisit && (
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
                          {!data.siteDetails.virtual &&
                            !data.siteDetails.homeVisit && (
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
                          {data.siteDetails.virtual && (
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
                          {/* {data.siteDetails.organisationId &&
                            data.siteDetails.organisationId.hippa && (
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
                          {data.siteDetails.website && (
                            <a href={data.siteDetails.website}>
                              {data.siteDetails.website.slice(0, 25)}
                            </a>
                          )}
                          <div>{data.siteDetails.address} it's me</div>
                          <div>
                            {data.siteDetails.city}, {data.siteDetails.state}{" "}
                            {data.siteDetails.zipcode}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.siteDetails &&
                    data.siteDetails.organisationId &&
                    data.siteDetails.organisationId.about && (
                      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        {data.siteDetails.organisationId.about}
                      </div>
                    )}

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
                    <tbody>
                      {data.siteSubCategoryInfo &&
                      data.siteSubCategoryInfo.length
                        ? data.siteSubCategoryInfo.map((b) => (
                            <tr>
                              <td
                                style={{
                                  border: "1px solid black",
                                  borderCollapse: "collapse",
                                  padding: "10px",
                                }}
                              >
                                {b.categoryName || "-"}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  borderCollapse: "collapse",
                                  padding: "10px",
                                }}
                              >
                                {b.serviceName || b.name || "-"}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  borderCollapse: "collapse",
                                  padding: "10px",
                                }}
                              >
                                {b.serviceDescription || "-"}
                              </td>

                              <td
                                style={{
                                  border: "1px solid black",
                                  borderCollapse: "collapse",
                                  padding: "10px",
                                }}
                              >
                                {b.serviceWebpage || "-"}
                              </td>
                              <td
                                style={{
                                  border: "1px solid black",
                                  borderCollapse: "collapse",
                                  padding: "10px",
                                }}
                              >
                                {b.poc.length
                                  ? b.poc.map((c) => (
                                      <div>
                                        {c.name} {c.email} {c.contact}
                                      </div>
                                    ))
                                  : data.primaryAccountOwnerInfo &&
                                    data.primaryAccountOwnerInfo.length
                                  ? data.primaryAccountOwnerInfo.map((c) => (
                                      <div>
                                        {c.name} {c.email} {c.contact}
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
                                {b.leaf ? "Yes" : "No"}
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                  <hr style={{ margin: "40px" }}></hr>
                </div>
              ))
            : null}
        </div>
      </iframe>
    </ListingComponent>
  );
};

export default SavedProvidersComponent;
