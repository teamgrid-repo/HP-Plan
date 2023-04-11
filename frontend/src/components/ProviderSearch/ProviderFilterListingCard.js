import {
  Apartment,
  Computer,
  LocalShipping,
  HourglassEmpty,
} from "@mui/icons-material";
import { Divider, Grid, Stack, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../UI/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import SavedToListModal from "../UI/SavedToListModal";
import LoginModal from "../UI/LoginModal";
import HerPlanIcon from "../../assets/images/HerPlan.png";
import LeafIcon from "../../assets/icons/leaf.png";
import { cloneDeep } from "lodash";
import {
  loadMoreProviderSarch,
  shareFi,
  setLocCountViaFilter,
} from "../../redux/actions/ProviderSearch/ProviderSearchAction";
import { bindActionCreators } from "redux";
import ModalLoading from "../UI/ModalLoading";
import _ from "underscore";

const ProviderFilterListingCard = ({ classes }) => {
  const loc = useNavigate();
  const dispatch = useDispatch();
  const action = bindActionCreators(
    { loadMoreProviderSarch, shareFi, setLocCountViaFilter },
    dispatch
  );
  const parms = useLocation();
  const [openAdd, setOpenAdd] = useState(false);
  const [order, setOrder] = useState("de");
  const [pData, setPdata] = useState([]);
  const [filter, setFilter] = useState("all");
  const [pcount, setPcount] = useState({
    all: 0,
    homeVist: 0,
    inOffice: 0,
    virtual: 0,
  });

  const [loadBtnLoader, setLoadBtnLoader] = useState(false);
  const [ordId, setOrgId] = useState("");
  const [siteID, setSiteID] = useState("");
  const [islogin, setIsLogin] = useState(false);
  const uu = useSelector((state) => state.auth.user, _.isEqual);

  useEffect(() => {
    if (uu) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [uu]);

  const distace = useSelector((state) => state.admin.distace, _.isEqual);
  const dis = useSelector((state) => state.cat.dis, _.isEqual);

  const openAddModal = (o, s) => {
    setSiteID(s);
    setOrgId(o);
    setOpenAdd(true);
  };
  const copyMsg = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("url copied to clipboard!");
  };
  const providerSearchRes2 = useSelector((state) => state.cat.ps2);
  const providerSearchRes = useSelector((state) => state.cat.ps);
  const proviederLength = useSelector(
    (state) => state.cat.loadLength,
    _.isEqual
  );
  const loading = useSelector((state) => state.cat.loading, _.isEqual);
  const totalCount = useSelector((state) => state.admin.totalCount, _.isEqual);

  const alignData = () => {
    if (providerSearchRes2) {
      const ac = {};
      ac.all = providerSearchRes2.filter((p) => p.distance < distace).length;
      action.setLocCountViaFilter(ac.all);
      ac.homeVist = providerSearchRes2.filter(
        (a) => a && a.homeVisit === true && a.distance < distace
      ).length;

      ac.virtual = providerSearchRes2.filter(
        (a) => a && a.virtual === true && a.distance < distace
      ).length;
      ac.inOffice = providerSearchRes2.filter(
        (a) => a && !a.virtual && !a.homeVisit && a.distance < distace
      ).length;
      setPcount(() => ac);
      setPdata(() => providerSearchRes2.filter((p) => p.distance < distace));
    }
  };
  const ordGeneral = (ord, data) => {
    const data2 = cloneDeep(data);

    if (data && data.length) {
      switch (ord) {
        case "de":
          break;
        case 1:
          data2.sort((a, b) => a.distance - b.distance);
          break;
        case 2:
          for (let i = 0; i < data.length; i++) {
            if (
              data2[i].categoryInfo &&
              data2[i].categoryInfo.length &&
              data2[i].categoryInfo.length > 1
            ) {
              data2[i].categoryInfo.sort((a, b) => a.weight - b.weight);
            }
          }
          break;

        default:
          break;
      }
    }
    return data2;
  };
  const sortOrder = (ord) => {
    const data = ordGeneral(ord, pData);
    setPdata(() => data);
    setOrder(() => ord);
  };
  const setFilterData = (f) => {
    if (providerSearchRes2) {
      const data = ordGeneral(order, providerSearchRes2);
      if (f === "all") {
        setPdata(() => data.filter((p) => p.distance < distace));
      } else if (f === "ino") {
        setPdata(() =>
          data.filter(
            (a) => a && !a.virtual && !a.homeVisit && a.distance < distace
          )
        );
      } else {
        setPdata(() =>
          data.filter((a) => a && a[f] === true && a.distance < distace)
        );
      }
    }
    action.shareFi(f);
    setFilter(() => f);
  };

  useEffect(() => {
    alignData();
    setFilterData(filter);
  }, [providerSearchRes2, distace]);

  const psdatar = useSelector((state) => state.admin.share, _.isEqual);
  const addRes = useSelector((state) => state.admin.addtionalRes, _.isEqual);

  useEffect(() => {
    loadFromUrl();
  }, []);
  const loadFromUrl = async () => {
    if (parms.search.split("?")[1]) {
      try {
        const data = await JSON.parse(decodeURI(parms.search.split("?")[1]));
        if (data && data.ss2) {
          setFilterData(data.ss2);
        }
      } catch (error) {}
    }
  };
  // useEffect(() => {}, [psdatar, loading, addRes, proviederLength]);
  const loadMore = async () => {
    setLoadBtnLoader(true);
    await action.loadMoreProviderSarch({
      ...psdatar,
      index: proviederLength,
    });
    setLoadBtnLoader(false);
  };

  const addressFunc = (address, city, state, zipcode) => {
    if (
      address?.includes(state) ||
      address?.includes(city) ||
      address?.includes(zipcode)
    ) {
      return address;
    } else {
      const temp = `${address}, ${city}, ${state && state[0]}, ${zipcode}`;
      return temp;
    }
  };

  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12} mt={2} mb={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          mb={2}
          flexWrap="wrap"
          gap="10px"
        >
          <div
            className={`${classes.filterSCard} ${
              filter === "all"
                ? addRes
                  ? classes.fboxActiveBlack
                  : classes.fboxActive
                : null
            }`}
            onClick={() => setFilterData("all")}
          >
            <div className={classes.filterSIcon}>
              {pcount.all}
              {/* {psdatar.locFilter ? pcount.all : totalCount.total || 0} */}
              {/* {totalCount.total || 0} */}
            </div>
            <div className={classes.filterSText}>ALL RESULTS</div>
          </div>
          <div
            className={`${classes.filterSCard} ${
              filter === "ino"
                ? addRes
                  ? classes.fboxActiveBlack
                  : classes.fboxActive
                : null
            }`}
            onClick={() => setFilterData("ino")}
          >
            <div className={classes.filterSIcon}>
              <Apartment />
              {pcount.inOffice}
              {/* {psdatar.locFilter ? pcount.inOffice : totalCount.inOffice || 0} */}
              {/* {totalCount.inOffice || 0} */}
            </div>
            <div className={classes.filterSText}>IN-OFFICE</div>
          </div>
          <div
            className={`${classes.filterSCard} ${
              filter === "virtual"
                ? addRes
                  ? classes.fboxActiveBlack
                  : classes.fboxActive
                : null
            }`}
            onClick={() => setFilterData("virtual")}
          >
            <div className={classes.filterSIcon}>
              <Computer />
              {pcount.virtual}
              {/* {psdatar.locFilter ? pcount.virtual : totalCount.virtualSite || 0} */}
            </div>
            <div className={classes.filterSText}>VIRTUAL</div>
          </div>
          <div
            className={`${classes.filterSCard} ${
              filter === "homeVisit"
                ? addRes
                  ? classes.fboxActiveBlack
                  : classes.fboxActive
                : null
            }`}
            onClick={() => setFilterData("homeVisit")}
          >
            <div className={classes.filterSIcon}>
              <LocalShipping />
              {/* {totalCount.homeVisit || 0} */}
              {pcount.homeVist}
              {/* {psdatar.locFilter ? pcount.homeVist : totalCount.homeVisit || 0} */}
            </div>
            <div className={classes.filterSText}>HOME VISITS</div>
          </div>
          {psdatar.locFilter ||
          (totalCount &&
            totalCount.total &&
            providerSearchRes &&
            providerSearchRes.length >= totalCount.total) ? (
            ""
          ) : (
            <div
              className={classes.filterSCard}
              style={{
                background: "#7dbaaf",
                color: "white",
              }}
              onClick={() => loadMore()}
            >
              {loadBtnLoader ? (
                <ModalLoading color="white" />
              ) : (
                <>
                  <div className={classes.filterSIcon}>
                    <HourglassEmpty />
                  </div>
                  <div className={classes.filterSText}>Load More</div>
                </>
              )}{" "}
            </div>
          )}
        </Stack>
        <Divider />
        <div
          style={{
            textAlign: "right",
            width: "156px",
            marginLeft: "auto",
            marginRight: 0,
            marginTop: "5px",
          }}
        >
          <div className={classes.sortContainer}>
            <div className={classes.sortLabel}>Sort by:</div>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={order}
              size="small"
              variant="standard"
              onChange={(e) => sortOrder(e.target.value)}
            >
              <MenuItem value="de">
                <em>Accuracy</em>
              </MenuItem>
              <MenuItem value={1}>Location</MenuItem>
              <MenuItem value={2}>Category of care</MenuItem>
            </Select>
          </div>
        </div>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} mt={2} mb={1}>
        <div
          style={{ maxHeight: "800px", overflowY: "auto", overflowX: "hidden" }}
        >
          {loading ? (
            <ModalLoading />
          ) : pData && pData.length ? (
            pData.map((data, id) => {
              return (
                <div key={id}>
                  <Grid container spacing={2}>
                    <Grid item lg={10.5} md={10} xs={12} sm={10}>
                      <div
                        style={{
                          marginLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          data &&
                          data.organisationId &&
                          data.organisationId._id &&
                          data._id &&
                          loc(
                            `/provider-details/${data.organisationId._id},${data._id}`
                          )
                        }
                      >
                        <div style={{ display: "flex", gap: "10px" }}>
                          <div
                            style={{
                              display: "flex",
                              height: "67px",
                              // width: "89px",
                            }}
                          >
                            {data.organisationId && (
                              <img
                                src={data.organisationId.logo || ""}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <div
                              style={{
                                color: "#018DC2",
                                fontSize: "20px",
                                fontWeight: 800,
                                marginBottom: "8px",
                              }}
                            >
                              {data && data.name}
                            </div>
                            <div
                              style={{
                                fontSize: "18px",
                                marginBottom: "15px",
                              }}
                            >
                              {data &&
                                !data.virtual &&
                                !data.homeVisit &&
                                addressFunc(
                                  data.address,
                                  data.city,
                                  data.state,
                                  data.zipcode
                                )}
                            </div>
                          </div>
                          {data && data.homeVisit && <LocalShipping />}

                          {data && !data.virtual && !data.homeVisit && (
                            <Apartment />
                          )}
                          {data && data.virtual && <Computer />}
                        </div>

                        <div>
                          <div style={{ overflow: "auto" }}>
                            {data.categoryInfo && data.categoryInfo.length
                              ? data.categoryInfo.map((a, id) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      padding: "10px 10px 20px",
                                    }}
                                    key={id}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "10px",
                                        marginBottom: "15px",
                                      }}
                                    >
                                      <img
                                        alt="cat icon"
                                        src={(a && a.icon) || ""}
                                        style={{
                                          height: "60px",
                                          width: "60px",
                                          margin: "0 0 0 10px",
                                        }}
                                      />
                                      <div
                                        className={classes.dropHeader}
                                        style={{
                                          margin: "auto",
                                          marginLeft: "0",
                                          fontSize: "16px",
                                          textAlign: "left",
                                        }}
                                      >
                                        {a.name}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginBottom: "5px",
                                        flexDirection: "column",
                                      }}
                                    >
                                      {a && a.subCat && a.subCat.length
                                        ? a.subCat.map((b) => (
                                            <div
                                              style={{
                                                margin: "auto",
                                                marginBottom: "0",
                                                marginLeft: "0",
                                                marginTop: "0",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                display: "flex",
                                                paddingLeft: "60px",
                                                gap: "5px",
                                                color: "#97A0B3",
                                              }}
                                              key={b._id}
                                            >
                                              <div>
                                                {b.serviceName || b.name}{" "}
                                              </div>
                                              {b.leaf && (
                                                <img
                                                  src={LeafIcon}
                                                  style={{
                                                    width: "24px",
                                                    height: "24px",
                                                    marginTop: -5,
                                                  }}
                                                />
                                              )}
                                            </div>
                                          ))
                                        : null}
                                    </div>
                                  </div>
                                ))
                              : null}{" "}
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={1.5} md={2} xs={12} sm={2}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          marginRight: "2px",
                        }}
                      >
                        <CustomButton
                          name="Save"
                          varient="contained"
                          classNameI="greyContained"
                          onclick={() =>
                            data &&
                            data.organisationId &&
                            data.organisationId._id &&
                            data._id
                              ? openAddModal(data.organisationId._id, data._id)
                              : null
                          }
                        />

                        <CustomButton
                          name="Share"
                          varient="contained"
                          classNameI="greyContained"
                          onclick={() =>
                            data &&
                            data.organisationId &&
                            data.organisationId._id &&
                            data._id &&
                            copyMsg(
                              `${config.url}provider-details/${data.organisationId._id},${data._id}`
                            )
                          }
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Divider variant="fullWidth" style={{ margin: "50px" }} />
                </div>
              );
            })
          ) : (
            <div>No Provider Found</div>
          )}
        </div>
        {pData && pData.length && !loading ? (
          loadBtnLoader ? (
            <ModalLoading />
          ) : psdatar.locFilter ? (
            ""
          ) : (
            <CustomButton
              name="Load More"
              varient="contained"
              onclick={() => loadMore()}
            />
          )
        ) : null}
      </Grid>
      {islogin ? (
        <SavedToListModal
          open={openAdd}
          handleClose={() => setOpenAdd(false)}
          orgId={ordId}
          siteId={siteID}
        />
      ) : (
        <LoginModal open={openAdd} handleClose={() => setOpenAdd(false)} />
      )}
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

          {pData && pData.length
            ? pData.map((data, id) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                  key={id}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      // justifyContent: "center",
                      marginBottom: "12px",
                    }}
                  >
                    {data.organisationId && data.organisationId.logo ? (
                      <img
                        src={data.organisationId.logo}
                        alt={data.organisationId.logo}
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
                        <div style={{ marginTop: "6px" }}>{data.name}</div>
                        {data && data.homeVisit && (
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
                        {data && !data.virtual && !data.homeVisit && (
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
                        {data && data.virtual && (
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
                        {/* {data &&
                          data.organisationId &&
                          data.organisationId.hippa && (
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
                        {data.website && (
                          <a href={data.website}>{data.website.slice(0, 25)}</a>
                        )}
                        <div>{data.address}</div>
                        <div>
                          {data.city}, {data.state} {data.zipcode}
                        </div>
                      </div>
                    </div>
                  </div>
                  {data.organisationId && data.organisationId.about && (
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      {data.organisationId.about}
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
                      {data.categoryInfo && data.categoryInfo.length
                        ? data.categoryInfo.map((a) =>
                            a.subCat && a.subCat.length
                              ? a.subCat.map((b) => (
                                  <tr>
                                    <td
                                      style={{
                                        border: "1px solid black",
                                        borderCollapse: "collapse",
                                        padding: "10px",
                                      }}
                                    >
                                      {a.name}
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
                                        ? b.poc.map((a) => (
                                            <div>
                                              {a.name} {a.email} {a.contact}
                                            </div>
                                          ))
                                        : b.mainProvider &&
                                          b.mainProvider.length
                                        ? b.mainProvider.map((a) => (
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
                                      {b.leaf ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                ))
                              : null
                          )
                        : null}
                    </tbody>
                  </table>
                  <hr style={{ margin: "40px" }}></hr>
                </div>
              ))
            : null}
        </div>
      </iframe>
    </>
  );
};

export default React.memo(ProviderFilterListingCard);
