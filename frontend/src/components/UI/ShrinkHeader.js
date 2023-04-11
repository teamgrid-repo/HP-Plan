import { Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  container: { position: "relative" },
  headerImg: {
    height: "300px",
    width: "100%",
    objectFit: "cover",
  },
  siteProfileContainer: {
    position: "absolute",
    top: "200px",
    width: "100%",
  },
  siteProfileInnerContainer: {
    width: "90%",
    textAlign: "center",
    margin: "auto",
    marginBottom: "8em",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  profileCard: {
    borderRadius: "10px",
    backgroundColor: "#fff",
    overflow: "visible",
  },
  profileCardImgContainer: {
    borderRadius: "30px",
    backgroundColor: "#fff",
    border: "solid 8px #fafafb",
    width: "180px",
    height: "180px",
    marginTop: "-80px",
  },
  profileCardImg: {
    height: "100%",
    width: "100%",
  },
  profileCardNameDiv: {
    fontSize: "2em",
    fontWeight: 600,
    paddingBottom: "0.5em",
  },
  profileCardAddressDiv: {
    color: "#92929d",
    width: "100%",
    fontSize: "1em",
    lineHeight: 1.57,
    letterSpacing: "0.1px",
  },
  profileCardTitleDivContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileBoxDiv: {
    marginTop: "3.2em",
    [theme.breakpoints.down("md")]: {
      marginTop: "1em",
    },
  },
  profileCardTitleDiv: {
    paddingRight: "1em",
    color: "#92929d",
    fontSize: "1.2em",
    fontFamily: "OpenSans",
  },
  profileCardDescDiv: {
    color: "#44444f",
    fontSize: "1.2em",
    fontFamily: "OpenSans",
  },
  onlyProfileClassAddressDiv: {
    maxWidth: "30%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "80%",
    },
  },
}));

const ShrinkHeader = ({
  backImg,
  profileImg,
  profileAddress,
  firstCardData,
  secoundCardData,
  profileTitle,
}) => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <img src={backImg} className={classes.headerImg} />
      <div className={classes.siteProfileContainer}>
        <div className={classes.siteProfileInnerContainer}>
          <Card className={classes.profileCard}>
            <Grid container direction="row" spacing={2} margin={2}>
              <Grid item lg={2} md={3} sm={4} xs={12}>
                <Card className={classes.profileCardImgContainer}>
                  <img src={profileImg} className={classes.profileCardImg} />
                </Card>
              </Grid>
              <Grid
                item
                lg={firstCardData && firstCardData.first ? 3 : 10}
                md={firstCardData && firstCardData.first ? 3.5 : 8.5}
                sm={8}
                xs={12}
                textAlign="left"
              >
                <div className={classes.profileCardNameDiv}>{profileTitle}</div>
                <div
                  className={`${classes.profileCardAddressDiv} ${
                    firstCardData && firstCardData.first
                      ? ""
                      : classes.onlyProfileClassAddressDiv
                  }`}
                >
                  {profileAddress}
                </div>
                <div className={classes.profileBoxDiv}></div>
              </Grid>
              {firstCardData && firstCardData.first && (
                <Grid
                  item
                  lg={secoundCardData && secoundCardData.first ? 3 : 7}
                  md={secoundCardData && secoundCardData.first ? 3 : 5}
                  sm={secoundCardData && secoundCardData.first ? 6 : 12}
                  xs={secoundCardData && secoundCardData.first ? 6 : 12}
                  textAlign="left"
                >
                  {firstCardData.first && (
                    <div className={classes.profileBoxDiv}></div>
                  )}
                  {firstCardData.first && (
                    <div className={classes.profileCardTitleDivContainer}>
                      <div className={classes.profileCardTitleDiv}>
                        {firstCardData.first.title}
                      </div>
                      <div className={classes.profileCardDescDiv}>
                        {firstCardData.first.data}
                      </div>
                    </div>
                  )}
                  {firstCardData.secound && (
                    <div
                      className={classes.profileBoxDiv}
                      style={{ marginTop: "0.5em" }}
                    ></div>
                  )}
                  {firstCardData.secound && (
                    <div className={classes.profileCardTitleDivContainer}>
                      <div className={classes.profileCardTitleDiv}>
                        {firstCardData.secound.title}
                      </div>
                      <div className={classes.profileCardDescDiv}>
                        {firstCardData.secound.data}
                      </div>
                    </div>
                  )}
                  {firstCardData.secound && (
                    <div className={classes.profileBoxDiv}></div>
                  )}
                </Grid>
              )}
              {secoundCardData && secoundCardData.first && (
                <Grid item lg={4} md={2} sm={6} xs={6} textAlign="left">
                  <div className={classes.profileBoxDiv}></div>
                  <div className={classes.profileCardTitleDivContainer}>
                    <div className={classes.profileCardTitleDiv}>
                      {secoundCardData.first.title}
                    </div>
                    <div className={classes.profileCardDescDiv}>
                      {secoundCardData.first.title}
                    </div>
                  </div>
                  {secoundCardData.secound && (
                    <div style={{ paddingBottom: "1em" }}></div>
                  )}
                  {secoundCardData.secound && (
                    <div className={classes.profileCardTitleDivContainer}>
                      <div className={classes.profileCardTitleDiv}>
                        {secoundCardData.secound.title}
                      </div>
                      <div className={classes.profileCardDescDiv}>
                        {secoundCardData.secound.title}
                      </div>
                    </div>
                  )}
                </Grid>
              )}
            </Grid>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShrinkHeader;
