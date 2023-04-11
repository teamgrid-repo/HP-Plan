import { toast } from "react-toastify";
import CustomReactSelect from "../../../components/UI/CustomReactSelect";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

import CustomButton from "../../../components/UI/CustomButton";

const AssignUser = (props) => {
  const [orgEdit, setOrgEdit] = useState({
    orgid: "",
  });
  const setData = (field, data) =>
    setOrgEdit((old) => {
      return { ...old, [field]: data };
    });
  useEffect(() => {
    setOrgEdit({
      orgid: "",
    });
  }, [props]);
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
          Assign User
        </div>
      </DialogTitle>
      <Divider />

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <CustomReactSelect
              label={"User's"}
              options={props.userData || []}
              value={orgEdit.orgid}
              onChange={(e) => setData("orgid", e)}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              name={"Add"}
              varient="contained"
              size="large"
              fullWidth={true}
              onclick={() =>
                orgEdit.orgid && orgEdit.orgid.value
                  ? props.handleAssign(props.id, orgEdit.orgid.value)
                  : toast.error("Please Select Organization")
              }
            />
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <CustomButton
              varient="outlined"
              name="Cancel"
              onclick={props.handleClose}
              size="large"
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AssignUser;
