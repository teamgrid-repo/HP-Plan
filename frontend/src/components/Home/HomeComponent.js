import { Card, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Check } from "@mui/icons-material";
import CustomButton from "../UI/CustomButton";
import home1 from "../../assets/images/home1.png";
import home2 from "../../assets/images/home2.png";
import HomeMapCard from "./HomeMapCard";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllStateLoc,
  getUnique,
} from "../../redux/actions/Home/HomeActions";
import { getState } from "../../redux/actions/Admin/AdminActions";
import { useEffect, useState } from "react";
import UsStates from "../../utils/UsStates";
import { useSelector } from "react-redux";
import { getCat } from "../../redux/actions/category/categoryAction";
import ModalLoading from "../UI/ModalLoading";
import CancelToken from "../../utils/cancelClass";
import { orderBy } from "lodash";
import CookieConsent from "react-cookie-consent";

const ctc = new CancelToken();
const useStyle = makeStyles((theme) => ({
  container: {
    padding: "4em 0px 4em 0px",
    width: "80%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
  },
  catIcon: {
    width: "103px",
    height: "102px",
  },
  catDesc: {
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#524f4f",
  },
  catContainer: {
    cursor: "pointer",
    width: "150px",
  },
  headerTitle: {
    fontSize: "36px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.39,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#252222",
  },
  headerDesc: {
    width: "80%",
    fontSize: "16px",
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#7e7e7e",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  cardContainer: {
    maxWidth: "1110px",
    padding: "30px 74px 30px 74px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    margin: "auto",
    marginBottom: "50px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 20px 10px 20px",
    },
  },
  cardImage: {
    width: "100%",
    // width: "436px",
    //height: "484px",
    objectFit: "contain",
  },
  cardHeader: {
    fontSize: "29px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.24,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#524f4f",
    marginBottom: "25px",
  },
  cardDesc: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#7e7e7e",
    marginBottom: "25px",
  },
  checkListContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "50px",
  },
  checkList: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#524f4f",
  },
}));
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
const HomeComponent = () => {
  const [selCat, setSelCat] = useState("");
  const [cat, setCat] = useState([]);
  const [locD, setLocD] = useState([]);
  const [sated, setStated] = useState([]);
  const [stateImg, setStateImg] = useState([]);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(true);

  const [ss, setSetSS] = useState({
    category: [],
    price: [],
    leaf: false,
    specialQualification: [],
    additionalResource: false,
    keywords: "",
    states: [],
  });
  const cms = useSelector((state) => state.cms);

  const loc = useNavigate();
  const gotoPage = (path) => loc(path);
  const classes = useStyle();
  const dispatch = useDispatch();

  const actions = bindActionCreators(
    { getAllStateLoc, getUnique, getState, getCat },
    dispatch
  );

  const setCatToUI = (res0) => {
    setLoader1(() => true);
    if (res0) {
      const ds = {
        category: [],
        price: [],
        leaf: false,
        specialQualification: [],
        additionalResource: false,
        keywords: "",
        states: [],
      };
      setSetSS(() => ds);
      const selD = res0[0].category
        ? { ...res0[0].category, subCategory: res0[0].subCategory }
        : null;
      setSelCat(() => selD);
      setCat(() => res0 || []);
    }
    setLoader1(() => false);
  };
  const catRes = useSelector((state) => state.cat.cats);

  const getData = async () => {
    if (!catRes) {
      const res0 = await actions.getCat();
      setCatToUI(res0);
    } else {
      setCatToUI(catRes);
    }
    setLoader2(() => true);
    const data = await Promise.all([
      actions.getAllStateLoc(ctc.getToken()),
      actions.getUnique(ctc.getToken()),
      actions.getState(ctc.getToken()),
    ]);
    if (data && data[2]) {
      setStateImg(() => data[2]);
    }
    if (data && data[1]) {
      const locData = [];
      for (let i = 0; i < data[1].length; i++) {
        const lo = UsStates.find((l) => data[1][i].state === l.value);
        if (data[1][i].state && lo) {
          locData.push({ ...lo, count: data[1][i].stateCount });
        }
      }
      const states = orderBy(locData, "name", "asc");
      setStated(() => states);
    }
    if (data && data[0]) {
      const locData = [];
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].loc) {
          for (let j = 0; j < data[0][i].loc.length; j++) {
            if (
              data[0][i].loc[j].location &&
              data[0][i].loc[j].location.lat &&
              data[0][i].loc[j].location.lang
            ) {
              locData.push({
                lat: data[0][i].loc[j].location.lat,
                lng: data[0][i].loc[j].location.lang,
              });
            }
          }
        }
      }
      setLocD(() => locData);
    }
    setLoader2(() => false);
  };

  useEffect(() => {
    ctc.createToken();
    getData();
    return () => ctc.cancelTheApi();
  }, []);
  const setGoToFilter = () => {
    loc(`/provider-search?${JSON.stringify(ss)}`);
  };

  const subCatLoad = async (d) => {
    const data = {
      category: [],
      price: [],
      leaf: false,
      specialQualification: [],
      additionalResource: false,
      keywords: "",
      states: [],
    };
    data.category = d.subCategory.map((s) => s._id);
    const dataCatSel = { ...d.category, subCategory: d.subCategory };
    setSetSS(() => data);
    setSelCat(() => dataCatSel);
  };

  return (
    <div style={{ background: "#fafafa", fontFamily: "Montserrat" }}>
      <div className={classes.container}>
        <Stack
          direction="column"
          textAlign="center"
          justifyContent="center"
          marginBottom="18px"
        >
          <div className={classes.headerTitle}>Her PLAN Categories of Care</div>
          <div className={classes.headerDesc}>
            Know what you’re looking for? Click that icon below for a shortcut
            to a pre-filtered map  
          </div>
        </Stack>
        {loader1 ? (
          <ModalLoading />
        ) : (
          <Stack
            direction="row"
            gap="14px"
            marginBottom="75px"
            flexWrap="wrap"
            justifyContent="center"
          >
            {cat.map((e) => (
              <div
                className={classes.catContainer}
                key={e.category._id}
                onClick={() => subCatLoad(e)}
              >
                <img
                  alt={(e && e.category.icon) || ""}
                  src={(e && e.category.icon) || ""}
                  className={classes.catIcon}
                />
                <div
                  className={classes.catDesc}
                  style={
                    selCat && e.category._id === selCat._id
                      ? {
                          color: "#7dbaaf",
                        }
                      : {}
                  }
                >
                  {capitalizeFirstLetter(e.category.name)}
                </div>
              </div>
            ))}
          </Stack>
        )}
        {loader1 ? null : (
          <Card className={classes.cardContainer}>
            <Grid container>
              <Grid item lg={6} xs={12} md={6} sm={12}>
                <img src={home1} alt="home img" className={classes.cardImage} />
              </Grid>
              <Grid
                item
                lg={6}
                xs={12}
                md={6}
                sm={12}
                textAlign="left"
                margin="auto"
                marginTop="8%"
              >
                <div className={classes.cardHeader}>
                  {selCat && selCat.name && capitalizeFirstLetter(selCat.name)}
                </div>
                <div className={classes.cardDesc}>
                  {selCat && selCat.description}
                </div>
                <div className={classes.checkListContainer}>
                  {selCat &&
                    selCat.subCategory &&
                    selCat.subCategory.map((c) => (
                      <div className={classes.checkList} key={c._id}>
                        <Check
                          style={{ color: "#476ecf", marginRight: "5px" }}
                          fontSize="small"
                        />
                        {c.name}
                      </div>
                    ))}
                   
                </div>
                {selCat && (
                  <CustomButton
                    name="Search Providers"
                    varient="contained"
                    className={classes.btn}
                    onclick={() => setGoToFilter()}
                  />
                )}
              </Grid>
            </Grid>
          </Card>
        )}
        <Card className={classes.cardContainer}>
          <Grid container>
            <Grid
              item
              lg={6}
              xs={12}
              md={6}
              sm={12}
              textAlign="left"
              margin="auto"
              marginTop="8%"
            >
              <div className={classes.cardHeader}>
                {cms.homeTitleOne ||
                  "The Anti-Abortion-Rights Movement Prepares to Build a Post-Roe World"}
              </div>
              <div className={classes.cardDesc}>
                {cms.homeDescOne ||
                  `As activists move closer to their goal of making abortion illegal, they have started planning for the infrastructure needed for a world with more babies—and recruiting major CEOs to bankroll their cause.
                  \n \n By Emma Green`}{" "}
              </div>

              <CustomButton
                name={cms.homeButtonOneText || "Read More"}
                varient="contained"
                className={classes.btn}
                onclick={() =>
                  window.open(
                    cms.homeButtonOneUrl ||
                      "https://www.theatlantic.com/politics/archive/2020/08/anti-abortion-roe-wade-movement/615013/"
                  )
                }
              />
            </Grid>
            <Grid item lg={6} xs={12} md={6} sm={12}>
              <img
                alt="home 2"
                src={cms.homeOneImage || home2}
                className={classes.cardImage}
              />
            </Grid>
          </Grid>
        </Card>
      </div>
      {loader2 ? (
        <ModalLoading />
      ) : (
        <HomeMapCard
          loc={(path) => gotoPage(path)}
          sated={sated}
          pinD={locD}
          stateImg={stateImg}
        />
      )}
      <CookieConsent
        location="bottom"
        buttonText="I agree"
        cookieName="myCookie"
        expires={30}
      >
        This website uses cookies to enhance the user experience.{" "}
        <a href="/privacy-policy">Learn more</a>
      </CookieConsent>
    </div>
  );
};

export default HomeComponent;
