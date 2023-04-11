import { makeStyles } from "@mui/styles";
import CustomButton from "../UI/CustomButton";
import { LocalShipping, Computer, Apartment, Close } from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";
import MapComponent from "../GoogleMap/Map";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeafIcon from "../../assets/icons/leaf.png";
import _ from "underscore";

const useStyle = makeStyles((theme) => ({
  mapTopCardContainer: {
    zIndex: "22",
    position: "absolute",
    right: "30%",
    [theme.breakpoints.down("md")]: {
      right: "10%",
    },
  },
  mapTopCardInnerContainer: {
    width: "320px",
    height: "fit",
    background: "white",
    marginLeft: "auto",
    marginTop: "10px",
    borderRadius: "10px",
    padding: "10px",
  },
  mapCardIconContainer: { display: "flex" },
  mapCardIconOuterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2px",
  },
  mapStarIcon: {
    color: "#018CC1",
    fontSize: "20px",
  },
  mapLibIcon: {
    fontSize: "44px",
  },
  mapSIconContainer: {
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  mapSpaIcon: {
    color: "#60A730",
  },
  mapTitleDiv: {
    display: "flex",
    gap: "10px",
    color: "#018DC2",
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "8px",
  },
  mapSubTitleDiv: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  catDiv: {
    textAlign: "left",
    marginTop: "10px",
  },
  catInnerDiv: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  catImg: {
    height: "40px",
    width: "40px",
    margin: "0 0 0 10px",
  },
  catHeader: {
    fontSize: "16px",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.83,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#2b4c5b",
    margin: "auto",
    marginBottom: "2px",
    marginLeft: "0",
    marginTop: "6px",
    fontSize: "14px",
  },
  mainFDiv: {
    display: "flex",
  },
  textIconClass: { color: "black" },
}));

const MapMiddelCard = () => {
  const classes = useStyle();

  const loc = useNavigate();

  const providerSearchRes = useSelector((state) => state.cat.ps, _.isEqual);
  const dis = useSelector((state) => state.cat.dis, _.isEqual);

  const [selData, seSelData] = useState("");
  const [marker, setMarker] = useState([]);
  const distace = useSelector((state) => state.admin.distace, _.isEqual);
  const state = localStorage.getItem("localFilterData");
  const stateLength = JSON.parse(state)?.states?.length === 1;

  const loadData = () => {
    if (providerSearchRes) {
      const data = [];
      for (let i = 0; i < providerSearchRes.length; i++) {
        if (
          providerSearchRes[i] &&
          providerSearchRes[i].location &&
          providerSearchRes[i].location.lat &&
          providerSearchRes[i].location.lang &&
          providerSearchRes[i].distance < distace
        ) {
          data.push({
            ...providerSearchRes[i],
            marker: {
              lat: providerSearchRes[i].location.lat,
              lng: providerSearchRes[i].location.lang,
            },
          });
        }
      }
      setMarker(() => data);
    }
    seSelData(() => "");
  };
  useEffect(() => {
    loadData();
  }, [providerSearchRes, distace, dis]);
  return (
    <Grid item lg={12} md={12} sm={12} xs={12}>
      {selData && (
        <div className={classes.mapTopCardContainer}>
          <div className={classes.mapTopCardInnerContainer}>
            {selData.organisationId.logo && (
              <div
                style={{
                  display: "flex",
                  height: "67px",
                  // width: "89px",
                  marginLeft: "10px",
                  marginBottom: "10px",
                }}
              >
                {selData.organisationId && (
                  <img
                    src={selData.organisationId.logo || ""}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                )}
              </div>
            )}
            <div className={classes.mapCardIconContainer}>
              {/* <div className={classes.mapCardIconOuterContainer}>
                <Star className={classes.mapStarIcon} />
                <LocalLibraryOutlined className={classes.mapLibIcon} />
              </div> */}

              <div className={classes.mapSIconContainer}>
                <div className={classes.mapTitleDiv}>
                  <div>
                    {selData && selData.homeVisit && (
                      <LocalShipping className={classes.textIconClass} />
                    )}
                    {selData && !selData.virtual && !selData.homeVisit && (
                      <Apartment className={classes.textIconClass} />
                    )}
                    {selData && selData.virtual && (
                      <Computer className={classes.textIconClass} />
                    )}
                    {/* {selData &&
                    selData.organisationId &&
                    selData.organisationId.hippa && (
                      <img
                        src={HippaCoverdIcon}
                        style={{
                          marginBottom: "-5px",
                          marginLeft: "5px",
                        }}
                      />
                    )} */}
                  </div>
                  <div>{selData.name}</div>
                </div>
                <div className={classes.mapSubTitleDiv}>{selData.address}</div>
              </div>
              <div
                style={{ marginLeft: "auto", cursor: "pointer" }}
                onClick={() => seSelData("")}
              >
                <Close />
              </div>
            </div>
            <Divider />
            <div className={classes.catDiv}>Category of Care</div>
            <div style={{ maxHeight: "100px", overflow: "auto" }}>
              {selData.categoryInfo && selData.categoryInfo.length
                ? selData.categoryInfo.map((a) => (
                    <div>
                      <div className={classes.catInnerDiv}>
                        <img
                          alt="cat icon"
                          src={(a && a.icon) || ""}
                          className={classes.catImg}
                        />
                        <div className={classes.catHeader}>{a.name}</div>
                      </div>
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
                          flexDirection: "column",
                          color: "#97A0B3",
                        }}
                      >
                        {a && a.subCat && a.subCat.length
                          ? a.subCat.map((b) => (
                              <div style={{ textAlign: "left" }}>
                                {b.name}
                                {b.leaf && (
                                  <img
                                    src={LeafIcon}
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      //marginTop: -5,
                                    }}
                                  />
                                )}
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  ))
                : null}
            </div>
            {selData &&
              selData._id &&
              selData.organisationId &&
              selData.organisationId._id && (
                <CustomButton
                  name="See More"
                  varient="contained"
                  fullWidth={true}
                  styled={{ marginTop: "20px" }}
                  onclick={() =>
                    loc(
                      `/provider-details/${selData.organisationId._id},${selData._id}`
                    )
                  }
                />
              )}
          </div>
        </div>
      )}
      <MapComponent
        zoom={dis || stateLength ? 8 : 4}
        isState={stateLength}
        size="500px"
        marker={marker}
        zoomLoc={dis}
        singleMarker={false}
        selData={(d) => seSelData(() => d)}
      />
    </Grid>
  );
};

export default MapMiddelCard;
