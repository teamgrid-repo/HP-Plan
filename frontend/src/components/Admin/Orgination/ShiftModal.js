import { Dialog, DialogContent, Grid } from "@mui/material";
import CustomButton from "../../UI/CustomButton";

const ShiftModal = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xs"
      style={{
        textAlign: "center",
        fontFamily: "Montserrat",
        margin: "16px",
        borderRadius: "8px",
      }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            This email is associated with an existing provider account. Are you
            sure you want to associate that user with this organization?
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              name={"Yes"}
              varient="contained"
              size="large"
              fullWidth={true}
              onclick={props.shiftOrg}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              name="Cancel"
              varient="outlined"
              size="large"
              fullWidth={true}
              onclick={props.handleClose}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftModal;
