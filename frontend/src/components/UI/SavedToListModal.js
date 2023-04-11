import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import {
  createProviderList,
  saveItemToList,
} from "../../redux/actions/Provider/ProviderActions";
import CustomButton from "./CustomButton";
import CustomReactSelect from "./CustomReactSelect";
import { BasicSwitch } from "./CustomSwitch";
import FormGroup from "./FormGroup";
import ModalLoading from "./ModalLoading";

const SavedToListModal = (props) => {
  const dispatch = useDispatch();
  const action = bindActionCreators(
    { createProviderList, saveItemToList },
    dispatch
  );
  const listRes = useSelector((state) => state.provider.sListName);

  const [name, setName] = useState("");
  const [list, setList] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [create, setCreate] = useState(false);

  const saveToList = async () => {
    setLoader(true);
    const data = {
      saveListingId: list.value,
      siteId: props.siteId,
      organisationId: props.orgId,
    };
    await action.saveItemToList(data);
    setList("");
    props.handleClose();
    setLoader(false);
  };
  const addListName = async () => {
    if (name) {
      setLoader(true);

      const data = {
        listingName: name,
        update: false,
        updatedName: "",
      };
      await action.createProviderList(data);
      setName(() => "");
      setLoader(false);
    }
  };

  const load = () => {
    const l = [];
    for (let i = 0; i < listRes.length; i++) {
      l.push({ value: listRes[i]._id, label: listRes[i].name });
    }
    setDisplayList(() => l);
  };
  useEffect(() => {
    if (listRes) load();
  }, [listRes]);
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
        style={{
          backgroundColor: "#fafafb",
        }}
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
          Saved To List
        </div>
      </DialogTitle>
      <Divider />

      {loader ? (
        <ModalLoading />
      ) : (
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{
                    margin: "auto",
                    marginLeft: "0",
                    marginRight: "0",
                    fontWeight: 500,
                    fontSize: "18px !important",
                    fontFamily: "Montserrat",
                  }}
                >
                  Create New List{" "}
                </div>
                <BasicSwitch
                  checked={create}
                  onChange={(e) => setCreate(e.target.checked)}
                />
              </div>
            </Grid>

            {create && (
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <FormGroup
                  label="Create New List"
                  onChange={(e) => setName(e)}
                  value={name}
                />
              </Grid>
            )}
            {create && (
              <Grid item lg={2} md={2} sm={2} xs={2} margin="auto" mb={0}>
                <CustomButton
                  name="Add"
                  varient="contained"
                  size="large"
                  fullWidth={true}
                  styled={{ height: "56px" }}
                  onclick={() =>
                    name ? addListName() : toast.error("Please Enter Name")
                  }
                />{" "}
              </Grid>
            )}

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomReactSelect
                label="Select List To Save"
                value={list}
                onChange={(e) => setList(e)}
                options={displayList}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton
                name="Save"
                varient="contained"
                size="large"
                onclick={() => saveToList()}
                fullWidth={true}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={6}>
              <CustomButton
                name="Cancel"
                varient="outlined"
                fullWidth={true}
                size="large"
                onclick={props.handleClose}
              />
            </Grid>
          </Grid>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SavedToListModal;
