import { LocationOnOutlined } from "@mui/icons-material";
import { Grid, Card, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import SaveSearchModal from "../UI/SaveSearchModal";

const useStyle = makeStyles((theme) => ({
  savedListingCard: {
    borderRadius: "10px",
    border: "solid 1px #fff",
    backgroundColor: "#fff",
    fontFamily: "Montserrat",
  },
  catDiv: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#44444f",
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
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#92929d",
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
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#171725",
    marginBottom: "21px",
  },
  imgDiv: {
    height: "150px",
    width: "100%",
    borderRadius: "10px",
  },
}));

const SavedSearchListingCard = ({ name, count, id, CutomComponent }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12} key={id}>
        <Card className={classes.savedListingCard}>
          <Grid container direction="row">
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              textAlign="left"
              margin="auto"
              mt={1}
              padding={2}
            >
              <div className={classes.nameDiv}>
                {name}{" "}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1.71",
                    letterSpacing: "normal",
                    textAlign: "left",
                    color: "#7dbaaf",
                    marginLeft: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(true)}
                >
                  Edit
                </span>{" "}
              </div>
              <div className={classes.addressDIvContainer}>
                <LocationOnOutlined />
                <div className={classes.addressDiv}>
                  View Results on Map ({count} Results)
                </div>
              </div>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xs={6}
              textAlign="right"
              paddingRight={1}
            >
              {CutomComponent}
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <SaveSearchModal
        open={open}
        handleClose={() => setOpen(false)}
        id={id}
        oldName={name}
        edit={true}
      />
    </>
  );
};

export default SavedSearchListingCard;
