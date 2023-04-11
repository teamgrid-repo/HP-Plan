import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import CustomButton from "../../UI/CustomButton";

const useStyle = makeStyles((theme) => ({
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
}));

const AppointmentViewModal = ({
  open,
  handleClose,
  appointmentData,
  changeStatus,
  user,
}) => {
  const classes = useStyle();
  const loc = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      style={{
        textAlign: "center",
        fontFamily: "Montserrat",
        margin: "16px",
        borderRadius: "8px",
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div
          style={{
            fontFamily: "Montserrat",
            fontSize: "22px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.71,
            letterSpacing: "0.1px",
            textAlign: "left",
            color: "#92929d",
          }}
        >
          Appointment Details
        </div>
      </DialogTitle>
      <Divider />

      <DialogContent>
        <Grid container spacing={2} mb="12px">
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            className={classes.formTitle}
            textAlign="left"
          >
            Site of Interest
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
            {(appointmentData.siteData && appointmentData.siteData.name) || "-"}
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
            Site Address
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
            {(appointmentData.siteData && appointmentData.siteData.address) ||
              "-"}
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
            Service
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
            {(appointmentData.service && appointmentData.service.serviceName) ||
              (appointmentData.subCategoryData &&
                appointmentData.subCategoryData.name) ||
              ""}
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
            Date
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
            {" "}
            {(appointmentData.date &&
              moment(appointmentData.date).format("MMM, DD yyyy")) ||
              "-"}{" "}
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
            Status
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
            {appointmentData.status || "-"}
          </Grid>
          {appointmentData.status === "cancelled" ? (
            <>
              <Grid
                item
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.formTitle}
                textAlign="left"
              >
                Canceled By
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
                {(appointmentData.canceledByData[0] &&
                  appointmentData.canceledByData[0].name) ||
                  "-"}
              </Grid>
            </>
          ) : null}
        </Grid>
        <div style={{ display: "flex", gap: "10px" }}>
          {appointmentData.providerId || appointmentData.room ? (
            <CustomButton
              name="Message Provider"
              varient="contained"
              size="large"
              className={classes.btn}
              onclick={() =>
                loc(
                  appointmentData.room
                    ? `/message/${appointmentData.room}`
                    : `/message/${user.id}-${appointmentData.providerId || ""}`
                )
              }
            />
          ) : null}
          {appointmentData.status !== "cancelled" && (
            <CustomButton
              name="Cancel Appointment"
              varient="contained"
              size="large"
              styled={{ backgroundColor: "red" }}
              onclick={changeStatus}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentViewModal;
