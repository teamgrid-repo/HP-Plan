import {
  Grid,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Chip,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/UI/CustomButton";
import {
  getIdRole,
  getSiteLoc,
  addFilter,
  getSubUser,
} from "../../../redux/actions/profile/profileActions";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomTextField from "../../../components/UI/FormGroup";
import { BasicSwitch } from "../../../components/UI/CustomSwitch";
import GeneralSelect from "../../../components/UI/GeneralSelect";
import { getAdminOrgSite } from "../../../redux/actions/Admin/AdminActions";
import ModalLoading from "../../../components/UI/ModalLoading";

const selectProps = {
  sx: { maxHeight: "400px", marginLeft: "5px" },
};
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
  formGroupContainer: {
    textAlign: "left !important",
  },
  labelName: {
    color: "black",
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
  },
  switchContainer: {
    padding: "9.4px 14px 9.4px 8px",
    borderRadius: "24px",
    backgroundColor: "#fafafa",
    display: "flex",
  },
  switchTitle: {
    margin: "auto",
    marginLeft: "0px",
    fontSize: "18px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    color: "black",
  },
  switch: {
    margin: "auto",
    marginRight: "0px",
    textAlign: "right",
  },
});
const priceListData = [
  { value: "Free", label: "Free" },
  {
    value: "Discounted,Negotiable-rates",
    label: "Discounted/Negotiable rates",
  },
  { value: "Market", label: "Market" },
  { value: "Sliding-fee-scale", label: "Sliding-fee-scale" },
  { value: "Medicaid", label: "Medicaid" },
];

const SiteDetailsEditModal = ({
  open,
  handleClose,
  editData,
  editDataNew,
  allPoc,
  getData,
}) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const actions = bindActionCreators(
    { getIdRole, getSiteLoc, addFilter, getSubUser, getAdminOrgSite },
    dispatch
  );
  const [suData, setSuData] = useState([]);

  const spaceRes = useSelector((state) => state.cat.space);
  const [loading, setLoading] = useState(false);
  const [selFilterData, setSelFilterData] = useState({
    serviceName: "",
    serviceDescription: "",
    serviceWebpage: "",
    leaf: false,
    specialQualiFlag: false,
    price: [],
    user1: "",
    user2: "",
    specialQues: "",
    subCatName: "",
  });
  const [displayQue, setDisplayQue] = useState(false);
  const [leafAppli, setLeafAppli] = useState(false);
  const [spaceData, setSpaceData] = useState([]);
  useEffect(() => {
    if (editData) {
      setLeafAppli(() =>
        editData.subCategoryId ? editData.subCategoryId.applicable : false
      );
      setSuData(() =>
        allPoc
          ? allPoc.map((s) => {
              return { label: s.name, value: s.userId };
            })
          : []
      );
      const f =
        spaceRes && spaceRes.find((s) => s._id === editData.subCategoryId._id);
      if (f && f.specialQualification && f.specialQualification.length) {
        setSpaceData(() => f.specialQualification);
        setDisplayQue(true);
      } else {
        setSpaceData(() => []);
        setDisplayQue(false);
      }
      const data = {
        ...editData,
        user1: editData.poc[0] ? editData.poc[0]._id : "",
        user2: editData.poc[1] ? editData.poc[1]._id : "",
        subCatName: editData.subCategoryId.name,
        subCategoryId: editData.subCategoryId._id,
        siteId: editDataNew.siteId._id,
      };
      setSelFilterData(() => data);
    }
  }, [editData]);
  const setData = (field, data) => {
    const newLoc = { ...selFilterData };
    newLoc[field] = data;
    setSelFilterData(() => newLoc);
  };
  const handleEdit = async () => {
    setLoading(true);

    const ms = [];
    if (selFilterData.user1) ms.push(selFilterData.user1);
    if (
      selFilterData.user2 &&
      selFilterData.user1 &&
      selFilterData.user1 !== selFilterData.user2
    )
      ms.push(selFilterData.user2);
    const newPrice =
      selFilterData.price && selFilterData.price.length
        ? selFilterData.price.filter(
            (a) => a && priceListData.find((b) => b.value === a)
          )
        : [];
    let a = {
      serviceName: selFilterData.serviceName,
      serviceDescription: selFilterData.serviceDescription,
      serviceWebpage: selFilterData.serviceWebpage,
      specialQualiFlag: selFilterData.specialQualiFlag,
      specialQualif: selFilterData.specialQualif,
      price: newPrice,
      leaf: selFilterData.leaf,
      poc: Array.from(new Set(ms)),
      subCategoryId: selFilterData.subCategoryId,
      siteId: selFilterData.siteId,
      specialQues: selFilterData.specialQues || "",
      approvalId: editDataNew._id,
    };
    await actions.addFilter({ appData: a });
    handleClose();
    getData();
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xl"
      className={classes.container}
      onClose={handleClose}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ backgroundColor: "#fafafb" }}
      >
        <div className={classes.dailogHeader}>Site Location Filter</div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {loading ? (
          <ModalLoading />
        ) : (
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <CustomTextField
                type="text"
                value={selFilterData.subCatName}
                label="Subcategory"
                disabled={true}
              />
            </Grid>
            <Grid item lg={6} sm={6} xs={12} md={6}>
              <CustomTextField
                type="text"
                value={selFilterData.serviceName}
                label="Service Name"
                onChange={(d) => setData("serviceName", d)}
                oldData={
                  editDataNew.serviceName !== editData.serviceName &&
                  editDataNew.serviceName
                }
              />
            </Grid>
            <Grid item lg={6} sm={6} xs={12} md={6}>
              <CustomTextField
                type="text"
                value={selFilterData.serviceDescription}
                label="Service Description"
                onChange={(d) => setData("serviceDescription", d)}
                oldData={
                  editDataNew.serviceDescription !==
                    editData.serviceDescription &&
                  editDataNew.serviceDescription
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <CustomTextField
                type="text"
                value={selFilterData.serviceWebpage}
                label="Service Webpage"
                onChange={(d) => setData("serviceWebpage", d)}
                oldData={
                  editDataNew.serviceWebpage !== editData.serviceWebpage &&
                  editDataNew.serviceWebpage
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <GeneralSelect
                name="Price Type"
                multi={true}
                value={selFilterData.price}
                onChange={(d) => setData("price", d)}
                menuItem={priceListData}
                oldData={editDataNew.price}
              />
            </Grid>
            {displayQue && (
              <Grid
                item
                lg={selFilterData.specialQualiFlag ? 12 : 12}
                sm={selFilterData.specialQualiFlag ? 12 : 12}
                xs={selFilterData.specialQualiFlag ? 12 : 12}
                md={selFilterData.specialQualiFlag ? 12 : 12}
              >
                <SwitchFilter
                  method={(e) => setData("specialQualiFlag", e.target.checked)}
                  value={selFilterData.specialQualiFlag}
                  label="Special Qualification"
                  classes={classes}
                />
              </Grid>
            )}

            {displayQue && selFilterData.specialQualiFlag && (
              <Grid item lg={6} sm={12} xs={12} md={6}>
                <div className={classes.formGroupContainer}>
                  <div className={classes.labelName}>
                    Special Qualifications
                  </div>
                  <Select
                    fullWidth
                    multiple
                    value={selFilterData.specialQualif || []}
                    MenuProps={{
                      sx: {
                        maxHeight: "300px",
                      },
                    }}
                    renderValue={(selected) => (
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 5 }}
                      >
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            style={{ margin: "5px 0px 5px 0px" }}
                          />
                        ))}
                      </div>
                    )}
                    onChange={(e) => setData("specialQualif", e.target.value)}
                  >
                    {spaceData.map((c) => {
                      if (c.cat) {
                        return (
                          <ListSubheader key={c._id}>{c.name}</ListSubheader>
                        );
                      } else {
                        return (
                          <MenuItem value={c.name} key={c._id}>
                            <Checkbox
                              checked={
                                selFilterData.specialQualif &&
                                selFilterData.specialQualif.indexOf(c.name) > -1
                              }
                            />
                            <ListItemText primary={c.name} />
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </div>
              </Grid>
            )}
            {displayQue && selFilterData.specialQualiFlag && (
              <Grid item lg={6} sm={12} xs={12} md={12}>
                <CustomTextField
                  type="text"
                  value={selFilterData.specialQues}
                  label="Special Qualification"
                  onChange={(d) => setData("specialQues", d)}
                  oldData={
                    editDataNew.specialQues !== selFilterData.specialQues &&
                    editDataNew.specialQues
                  }
                />
              </Grid>
            )}
            {leafAppli && (
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <SwitchFilter
                  method={(e) => setData("leaf", e.target.checked)}
                  value={selFilterData.leaf}
                  label="Leaf"
                  classes={classes}
                />
              </Grid>
            )}
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <span
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: 500,
                  fontSize: "18px !important",
                  fontFamily: "Montserrat",
                }}
              >
                {editDataNew && editData
                  ? editDataNew.poc[0] && editData.poc[0]
                    ? editDataNew.poc[0]._id !== editData.poc[0]._id
                      ? editDataNew.poc[0].name
                      : null
                    : (editDataNew.poc[0] && editDataNew.poc[0].name) || ""
                  : ""}
              </span>
              <GeneralSelect
                name="Point Of Contact 1"
                value={selFilterData.user1}
                onChange={(d) => setData("user1", d)}
                menuItem={suData}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <span
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: 500,
                  fontSize: "18px !important",
                  fontFamily: "Montserrat",
                }}
              >
                {editDataNew && editData
                  ? editDataNew.poc[1] && editData.poc[1]
                    ? editDataNew.poc[1]._id !== editData.poc[1]._id
                      ? editDataNew.poc[1].name
                      : null
                    : (editDataNew.poc[1] && editDataNew.poc[1].name) || ""
                  : ""}
              </span>
              <GeneralSelect
                name="Point Of Contact 2"
                value={selFilterData.user2}
                onChange={(d) => setData("user2", d)}
                menuItem={suData}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <CustomButton
          name="Update"
          onclick={handleEdit}
          varient="contained"
          styled={{ width: "200px" }}
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

export default SiteDetailsEditModal;
const SwitchFilter = ({ classes, method, label, value }) => {
  return (
    <div className={classes.switchContainer}>
      <div className={classes.switchTitle}>{label}</div>
      <div className={classes.switch}>
        <BasicSwitch checked={value} onChange={method} />
      </div>
    </div>
  );
};
