import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({
  formTitle: {
    fontSize: "18px",
    fontWeight: 600,
    paddingTop: "14px",
  },
  formField: {
    fontSize: "18px",
    color: "#7e7e7e",
    paddingTop: "14px",
    overflow: "auto",
  },
}));
const OrgListingView = () => {
  const classes = useStyle();

  const orgSData = useSelector((state) => state.profile.org);
  useEffect(() => {}, [orgSData]);
  return (
    <Grid container margin={2}>
      <Grid
        item
        lg={2}
        md={2}
        sm={6}
        xs={6}
        className={classes.formTitle}
        textAlign="left"
      >
        Organization Name
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6} className={classes.formField}>
        {orgSData.name || "-"}
      </Grid>
      <Grid
        item
        lg={2}
        md={2}
        sm={6}
        xs={6}
        className={classes.formTitle}
        textAlign="left"
      >
        Phone Number
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6} className={classes.formField}>
        {orgSData.contact || "-"}
      </Grid>

      <Grid
        item
        lg={2}
        md={2}
        sm={6}
        xs={6}
        className={classes.formTitle}
        textAlign="left"
      >
        Zipcode
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6} className={classes.formField}>
        {orgSData.zipcode || "-"}
      </Grid>
      <Grid
        item
        lg={2}
        md={2}
        sm={6}
        xs={6}
        className={classes.formTitle}
        textAlign="left"
      >
        state
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6} className={classes.formField}>
        {orgSData.state || "-"}
      </Grid>
      <Grid
        item
        lg={2}
        md={2}
        sm={6}
        xs={6}
        className={classes.formTitle}
        textAlign="left"
      >
        Address
      </Grid>
      <Grid item lg={10} md={10} sm={6} xs={6} className={classes.formField}>
        {orgSData.address || "-"}
      </Grid>
      <Grid
        item
        lg={2}
        md={2}
        sm={6}
        xs={6}
        className={classes.formTitle}
        textAlign="left"
      >
        Website
      </Grid>
      <Grid item lg={10} md={10} sm={6} xs={6} className={classes.formField}>
        {orgSData.website || "-"}
      </Grid>
      <Grid
        item
        lg={2}
        md={2}
        sm={6}
        xs={6}
        className={classes.formTitle}
        textAlign="left"
      >
        About
      </Grid>
      <Grid item lg={10} md={10} sm={6} xs={6} className={classes.formField}>
        {orgSData.about || "-"}
      </Grid>
    </Grid>
  );
};

export default OrgListingView;
