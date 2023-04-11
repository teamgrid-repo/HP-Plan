import { LocationOnOutlined } from "@mui/icons-material";
import { Grid, Card, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../UI/CustomButton";

const useStyle = makeStyles((theme) => ({
  savedListingCard: {
    borderRadius: "10px",
    border: "solid 1px #fff",
    backgroundColor: "#fff",
  },
  catDiv: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#7dbaaf",
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
    fontSize: "18px",
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

const SavedAppointmentListingCard = ({
  name,
  address,
  CutomComponent,
  handleOpenView,
  cat,
}) => {
  const classes = useStyle();

  return (
    <Grid item lg={12} md={12} sm={12} xs={12}>
      <Card className={classes.savedListingCard}>
        <Grid container direction="row" padding={2}>
          {/* <Grid item lg={2} md={2} sm={2} xs={12} textAlign="left">
            <img src={img} className={classes.imgDiv} />
          </Grid> */}
          <Grid
            item
            lg={6}
            md={8}
            sm={8}
            xs={6}
            textAlign="left"
            paddingLeft={3}
            paddingTop={1}
          >
            <div className={classes.nameDiv}>{name}</div>

            {address && (
              <div className={classes.addressDIvContainer}>
                <LocationOnOutlined />
                <div className={classes.addressDiv}>{address}</div>
              </div>
            )}
            <CustomButton
              varient="texted"
              name="View Appointment"
              className={classes.catDiv}
              onclick={() => handleOpenView()}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={4}
            sm={4}
            xs={6}
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

export default SavedAppointmentListingCard;
