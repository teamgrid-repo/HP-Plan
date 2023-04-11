import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UsStates from "../../utils/UsStates";
import CustomButton from "./CustomButton";

const useStyle = makeStyles({
  container: {
    textAlign: "center",
    fontFamily: "Montserrat",
    margin: "16px",
    borderRadius: "8px",
  },
  dailogHeader: {
    fontFamily: "Montserrat",
    fontSize: "22px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#92929d",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: 600,
    paddingTop: "14px",
  },
  formField: {
    fontSize: "20px",
    color: "#7e7e7e",
    paddingTop: "14px",
    maxHeight: "250px",
    overflow: "auto",
  },
});

const ViewSiteDataModal = ({
  handleClose,
  open,
  handleOpenEdit,
  viewD,
  cat,
}) => {
  const classes = useStyle();

  const [states, setStates] = useState("");
  const subUserData = useSelector((state) => state.profile.subUser);

  useEffect(() => {
    if (viewD) {
      let isState = "";
      if (viewD.state && typeof viewD.state !== "string") {
        isState = UsStates.filter((a) =>
          viewD.state.find((s) => s === a.value)
        );
      } else {
        setStates(viewD.state);
      }
      if (isState) {
        let orgState = "";
        isState.forEach((s, idx) => {
          orgState =
            orgState +
            `${idx !== 0 && idx !== isState.length ? "," : ""} ` +
            s.label;
        });
        setStates(orgState);
      }
    }
  }, [viewD, cat, subUserData]);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xl"
      className={classes.container}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        <div className={classes.dailogHeader}>Site Location</div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Name
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.name || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Website
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.website || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Address
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.address || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            City
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.city || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Zipcode
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.zipcode || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            State
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {states || "-"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            HQ
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.HQ ? "Yes" : "No"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Virtual
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.virtual ? "Yes" : "No"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Home Visit
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.homeVisit ? "Yes" : "No"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Home Visit
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.homeVisit ? "Yes" : "No"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Radius served
          </Grid>
          <Grid
            item
            lg={9}
            md={9}
            sm={6}
            xs={6}
            className={classes.formField}
            textAlign="left"
          >
            {viewD.radius || "Not Applicable"}
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Category
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} textAlign="left">
            <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Subcategory</TableCell>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Service Description</TableCell>
                    <TableCell>Webpage</TableCell>
                    <TableCell>Leaf</TableCell>
                    <TableCell>Price Type</TableCell>
                    <TableCell>Special Qualifications</TableCell>
                    <TableCell>POC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {viewD.status &&
                  viewD.subcategory &&
                  viewD.subcategory.length ? (
                    viewD.subcategory.map((s) => (
                      <TableRow key={s._id}>
                        <TableCell align="left">{s.name}</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                        <TableCell align="left">-</TableCell>
                      </TableRow>
                    ))
                  ) : viewD.siteSubCategoryInfo &&
                    viewD.siteSubCategoryInfo.length ? (
                    viewD.siteSubCategoryInfo.map((s) => (
                      <TableRow key={s._id}>
                        <TableCell align="left">
                          {cat && cat.length
                            ? cat.find((c) => c._id === s.subCategoryId)
                              ? cat.find((c) => c._id === s.subCategoryId).name
                              : "-"
                            : "-"}
                        </TableCell>
                        <TableCell align="left">
                          {s.serviceName || "-"}
                        </TableCell>
                        <TableCell align="left">
                          {s.serviceDescription || "-"}
                        </TableCell>
                        <TableCell align="left">
                          {s.serviceWebpage || "-"}
                        </TableCell>
                        <TableCell align="left">
                          {s.leaf ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="left">
                          {s.price ? s.price.map((p) => p + ", ") : "-"}
                        </TableCell>
                        <TableCell align="left">
                          {s.specialQualiFlag
                            ? s.specialQualif
                              ? s.specialQualif.map((s) => s + ", ")
                              : "-"
                            : "-"}
                        </TableCell>
                        <TableCell align="left">
                          {s.poc &&
                          s.poc.length &&
                          subUserData &&
                          subUserData.length
                            ? s.poc.map((p) =>
                                subUserData.find((u) => u.userId === p)
                                  ? subUserData.find((u) => u.userId === p)
                                      .name + ", "
                                  : "-"
                              )
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No Service Data Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton
          name="Edit"
          varient="contained"
          styled={{ width: "200px" }}
          onclick={() => handleOpenEdit()}
        />
        <CustomButton
          name="Cancel"
          varient="contained"
          styled={{ width: "200px", background: "red" }}
          onclick={() => handleClose()}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ViewSiteDataModal;
