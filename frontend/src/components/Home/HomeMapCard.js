import CustomButton from "../UI/CustomButton";
import home3 from "../../assets/images/home3.png";
import { ButtonBase, Card, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MapComponent from "../GoogleMap/Map";
import HorizontalScrollContainer from "../UI/HorizontalScrollContainer";
import LocationCard from "./LocationCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({
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
  insideCardHeader: {
    fontSize: "29px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.24,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#524f4f",
  },
  blueContainer: {
    backgroundColor: "#2261ac",
    borderRadius: "0px 200px 0px 0px",
    padding: "5em 10px 0 10px",
  },
  blueH: {
    fontSize: "36px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.39,
    letterSpacing: "normal",
    color: "#fff",
  },
  blueSubH: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    color: "#eee",
  },
  blueMapDiv: {
    maxHeight: "400px",
    width: "600px",
  },
  blueMapLearnCard: {
    width: "350px",
    borderRadius: "15px",
    padding: "10px 20px 10px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  blueMLH: {
    fontSize: "28px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.07,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#476ecf",
    paddingBottom: "20px",
  },
  blueMLD: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#7e7e7e",
  },
  blueMLS: {
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#7dbaaf",
    marginTop: "10%",
    fontFamily: "Montserrat",
  },
}));
const HomeMapCard = ({ sated, pinD, stateImg = [] }) => {
  const classes = useStyle();
  const gotopage = useNavigate();
  const cms = useSelector((state) => state.cms);

  const loc = (name) => {
    const ss = {
      category: [],
      price: [],
      leaf: false,
      specialQualification: [],
      additionalResource: false,
      keywords: "",
      states: [name],
    };
    gotopage(`/provider-search?${JSON.stringify(ss)}`);
  };
  return (
    <div style={{ background: "#fff", paddingTop: "70px" }}>
      <Card className={classes.cardContainer}>
        <Grid container>
          <Grid item lg={6} xs={12} md={6} sm={12}>
            <img
              src={cms.homeTwoImage || home3}
              alt="home 3"
              className={classes.cardImage}
            />
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
              {cms.homeTitleTwo || "Engage Your Church"}
              <div className={classes.insideCardHeader}>
                {cms.homeTwoSubTitle ||
                  "Pathways to Life Guide and Church Questionnaire"}
              </div>
            </div>
            <div className={classes.cardDesc}>
              {cms.homeDescTwo ||
                `Have you been watching the news? It is entirely possible the
              Supreme Court will roll back or nullify the Roe v. Wade abortion
              decision within a year when it decides Dobbs v. Jackson Women’s
              Health Organization.`}
            </div>
            <CustomButton
              name={cms.homeButtonTwoText || "View Questionnaire"}
              varient="contained"
              className={classes.btn}
              onclick={() =>
                window.open(
                  cms.homeButtonTwoUrl || "https://herplan.org/community/"
                )
              }
            />
          </Grid>
        </Grid>
      </Card>
      <div className={classes.blueContainer}>
        <Stack
          direction="column"
          maxWidth="577px"
          margin="auto"
          textAlign="center"
          marginBottom="30px"
        >
          <div className={classes.blueH}>How To Use The Her PLAN Map</div>
          <div className={classes.blueSubH}>
            Type in an address or zip code to find local assistance providers.
            Use a keyword if you want more specific results.
          </div>
        </Stack>

        <Stack
          direction="row"
          gap="14px"
          flexWrap="wrap"
          justifyContent="center"
          marginBottom={4}
        >
          <div className={classes.blueMapDiv}>
            <MapComponent size="400px" onlyPins={true} marker={pinD} />
          </div>
          <Card className={classes.blueMapLearnCard}>
            <div className={classes.blueMLH}>How to Use</div>
            <div className={classes.blueMLD}>
              Her PLAN has located, vetted, and catalogued life-affirming
              assistance providers in your state. Let us show you how it can
              facilitate finding the help you, a friend, a family member, or a
              client needs.
            </div>
            <ButtonBase
              className={classes.blueMLS}
              onClick={() => gotopage("/provider-search")}
            >
              Start Search
            </ButtonBase>
          </Card>
        </Stack>
        <HorizontalScrollContainer
          color="#2261ac"
          fontColor="#fff"
          name="States"
        >
          {sated && sated.length
            ? sated.map((s) => (
                <LocationCard
                  name={s.label}
                  img={
                    stateImg.find((a) => a.name === s.value)
                      ? stateImg.find((a) => a.name === s.value).image
                      : "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/25/13/74.jpg"
                  }
                  id={s.value}
                  count={s.count}
                  loc={(path) => loc(path)}
                />
              ))
            : null}
        </HorizontalScrollContainer>
      </div>
    </div>
  );
};

export default HomeMapCard;
