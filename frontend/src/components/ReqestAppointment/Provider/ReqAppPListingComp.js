import { Grid, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  savedListingCard: {
    borderRadius: "10px",
    border: "solid 1px #fff",
    backgroundColor: "#fff",
  },
  catDiv: {
    fontSize: "18px",
    color: "#92929d",
    letterSpacing: "0.1px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
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
    paddingBottom: "1em",
    display: "flex",
  },
  addressDiv: {
    paddingTop: "0.2em",
    paddingLeft: "0.2em",
  },
  addressDIvContainer: {
    fontSize: "14px",
    color: "#92929d",
    display: "flex",
    flexDirection: "row",
    paddingBottom: "1em",
  },
  nameDiv: {
    fontSize: "30px",
    fontWeight: 600,
    color: "#171725",
    paddingBottom: "0.5em",
  },
  imgDiv: {
    height: "150px",
    width: "100%",
    borderRadius: "10px",
  },
}));

const ReqAppPListingComp = ({
  name,
  cat,
  CutomComponent,
  date,
  classD,
  status,
}) => {
  const classes = useStyle();

  return (
    <Grid item lg={12} md={12} sm={12} xs={12}>
      <Card className={classes.savedListingCard}>
        <Grid container direction="row" padding={2}>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            textAlign="left"
            margin="auto"
            paddingLeft={3}
          >
            <div className={classes.nameDiv}>
              <div style={{ display: "flex", gap: "12px" }}>
                {name}{" "}
                <div className={classD[status]}>
                  {status === "cancelled" ? "canceled" : status}
                </div>
              </div>
            </div>
            <div className={classes.addressDIvContainer}>
              <div className={classes.catDiv}>Category of Care: {cat}</div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "20px",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "normal",
                color: "#7dbaaf",
              }}
            >
              <div
                style={{
                  margin: "auto",
                  marginLeft: "0px",
                  marginRight: "0px",
                }}
              >
                {date && moment(date).format("MMM, DD yyyy")}
              </div>
            </div>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={6}
            xs={12}
            textAlign="right"
            paddingRight={2}
          >
            {CutomComponent}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ReqAppPListingComp;
