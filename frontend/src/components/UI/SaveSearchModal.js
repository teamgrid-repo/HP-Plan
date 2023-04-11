import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  saveShareProvider,
  editSaveShareProvider,
  getSaveShareProvider,
} from "../../redux/actions/Provider/ProviderActions";
import CustomButton from "./CustomButton";
import FormGroup from "./FormGroup";
import ModalLoading from "./ModalLoading";

const SaveSearchModal = (props) => {
  const dispatch = useDispatch();
  const action = bindActionCreators(
    { saveShareProvider, editSaveShareProvider, getSaveShareProvider },
    dispatch
  );

  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);

  const saveToList = async () => {
    setLoader(true);
    if (name) {
      if (props.edit && props.id) {
        const data = {
          all: false,
          id: props.id,
          update: true,
          name: props.oldName,
          updatedName: name,
        };
        await action.editSaveShareProvider(data);
        await action.getSaveShareProvider();
      } else {
        const data = {
          name: name,
          url: props.url,
          count: props.count,
        };
        await action.saveShareProvider(data);
      }
      setName("");
      props.handleClose();
    }
    setLoader(false);
  };
  useEffect(() => {
    if (props.edit) {
      setName(props.oldName);
    } else {
      setName("");
    }
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
          {props.edit ? "Edit Search Name" : "Save Search Action"}
        </div>
      </DialogTitle>
      <Divider />

      {loader ? (
        <ModalLoading />
      ) : (
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormGroup
                label="Search Name"
                onChange={(e) => setName(e)}
                value={name}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton
                name={props.edit ? "Edit" : "Save"}
                varient="contained"
                size="large"
                fullWidth={true}
                onclick={() => saveToList()}
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
      )}
    </Dialog>
  );
};

export default SaveSearchModal;
