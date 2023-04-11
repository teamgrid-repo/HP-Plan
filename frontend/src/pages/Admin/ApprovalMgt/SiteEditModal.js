import {
  Checkbox,
  Grid,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../../../components/UI/CustomButton";
import CustomTextField from "../../../components/UI/FormGroup";
import { updateSiteLoc } from "../../../redux/actions/profile/profileActions";

import { bindActionCreators } from "redux";
import { BasicSwitch } from "../../../components/UI/CustomSwitch";
import CustomAutoComp from "../../../components/GooglePlaceAuto/CustomAutoComp";
import CustomReactSelect from "../../../components/UI/CustomReactSelect";
import UsStates from "../../../utils/UsStates";
import config from "../../../config";
import { Close } from "@mui/icons-material";
import ModalLoading from "../../../components/UI/ModalLoading";

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

const selectProps = {
  sx: { maxHeight: "400px", marginLeft: "5px" },
};

const SiteEditModal = ({
  open,
  handleClose,
  editData,
  editDataNew,
  getData,
}) => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      updateSiteLoc,
    },
    dispatch
  );
  const [, setDisplayError] = useState(false);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: {
        newUrl: {
          // name the rule
          message: "The Url must be valid url",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, config.urlRegex);
          },
          messageReplace: (message, params) =>
            message.replace(":values", this.helpers.toSentence(params)), // optional
          required: false, // optional
        },
      },
    })
  );
  const [loading, setLoading] = useState(true);

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  useEffect(() => {
    setLoading(true);
    if (editData) {
      const da = {
        ...editData,
      };
      const selCatData = [];
      for (let i = 0; i < editData.organisationCat.length; i++) {
        //category //subCategory
        selCatData.push(
          {
            ...editData.organisationCat[i].category,
            cat: true,
          },
          ...Object.values(editData.organisationCat[i].subcategory).map((e) => {
            return { ...e, cat: false };
          })
        );
      }
      da["avCat"] = selCatData;
      const selCat = [];
      for (let i = 0; i < da.subcategory.length; i++) {
        for (let j = 0; j < selCatData.length; j++) {
          if (da.subcategory[i] === selCatData[j]._id) {
            selCat.push(selCatData[j]);
          }
        }
      }

      da["selCat"] = selCat;
      da["state"] =
        typeof da.state === "string"
          ? ""
          : UsStates.filter((a) => da.state.find((s) => s === a.value));
      setSiteLoc(() => da);
    }
    setLoading(false);
  }, [editData, open]);
  const addSiteLocMethod = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const data = {
        name: siteLoc.name,
        address: siteLoc.address,
        location: siteLoc.location,
        website: siteLoc.website,
        zipcode: siteLoc.zipcode,
        state: siteLoc.virtual
          ? siteLoc.state.map((s) => s.value)
          : siteLoc.state && siteLoc.state.length
          ? siteLoc.state.map((s) => s.value)
          : siteLoc.state && siteLoc.state.value
          ? [siteLoc.state.value]
          : [],
        category: siteLoc.category,
        subcategory: siteLoc.subcategory,
        HQ: siteLoc.HQ,
        city: siteLoc.city,
        virtual: siteLoc.virtual,
        homeVisit: siteLoc.homeVisit,
        radius: siteLoc.radius,
        additional: siteLoc.additional,
        approvalId: editDataNew._id,
      };
      let err = false;

      err = await actions.updateSiteLoc(data, editData._id);

      if (!err) {
        setSiteLoc(() => {
          return {
            name: "",
            address: "",
            location: "",
            website: "",
            zipecode: "",
            state: "",
            category: [],
            subcategory: [],
            selCat: [],
            city: "",
            virtual: true,
            homeVisit: false,
            additional: false,
            avCat: [],
          };
        });
        simpleValidator.current.visibleFields = [];
        setLoading(false);
        handleClose();
        getData();
      } else {
        setLoading(false);
      }
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const [siteLoc, setSiteLoc] = useState({
    name: "",
    address: "",
    location: "",
    website: "",
    zipecode: "",
    state: "",
    category: [],
    subcategory: [],
    selCat: [],
    city: "",
    virtual: true,
    homeVisit: false,
    additional: false,
    avCat: [],
    radius: 0,
  });

  const grabAddress = async (loc) => {
    if (siteLoc.virtual) {
      setSiteLoc((old) => {
        return {
          ...old,
          location: loc.location,
          address: loc.address,
        };
      });
    } else {
      setSiteLoc((old) => {
        return {
          ...old,
          location: loc.location,
          address: loc.address,
        };
      });
    }
  };
  const setData = (field, data) => {
    const newLoc = { ...siteLoc };
    if (field === "virtual") {
      newLoc["homeVisit"] = false;
      newLoc["state"] = [];
    } else if (field === "homeVisit") {
      newLoc["virtual"] = false;
      newLoc["state"] = [];
    }
    newLoc[field] = data;
    setSiteLoc(() => newLoc);
  };
  const selCat = (data) => {
    const newLoc = { ...siteLoc };
    const cids = data.map((c) => c.categoryId);
    const subIds = data.map((c) => c._id);

    newLoc["category"] = cids;
    newLoc["subcategory"] = subIds;
    newLoc["selCat"] = data;

    setSiteLoc(() => newLoc);
  };
  const removeOneSubCat = (id) => {
    const newLoc = { ...siteLoc };
    if (id) {
      const data = newLoc.selCat.filter((i) => i._id !== id);

      const cids = data.map((c) => c.category_id);
      const subIds = data.map((c) => c._id);

      newLoc["category"] = [...new Set(cids)];
      newLoc["subcategory"] = subIds;
      newLoc["selCat"] = data;
    }
    setSiteLoc(() => newLoc);
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
        <div className={classes.dailogHeader}>Site Location</div>
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
                value={siteLoc.name}
                label="Name"
                onChange={(d) => setData("name", d)}
                required={true}
                onBlur={() => blurSetup("Name")}
                validator={simpleValidator.current.message(
                  "Name",
                  siteLoc.name,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={editDataNew.name !== editData.name && editDataNew.name}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <CustomAutoComp
                required={siteLoc.virtual ? false : true}
                label="Address"
                value={siteLoc.address}
                onchange={(data) => setData("address", data)}
                onBlur={() => blurSetup("address")}
                onSelect={(a) => grabAddress(a)}
                validator={simpleValidator.current.message(
                  "address",
                  siteLoc.address,
                  siteLoc.virtual ? "" : "required",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  editDataNew.address !== editData.address &&
                  editDataNew.address
                }
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomTextField
                label="City"
                required={siteLoc.virtual ? false : true}
                type="text"
                value={siteLoc.city}
                onChange={(data) => setData("city", data)}
                onBlur={() => blurSetup("city")}
                validator={simpleValidator.current.message(
                  "city",
                  siteLoc.city,
                  siteLoc.virtual ? "" : "required",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={editDataNew.city !== editData.city && editDataNew.city}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomTextField
                type="number"
                value={siteLoc.zipcode}
                label="Zipcode"
                onChange={(d) => setData("zipcode", d)}
                required={siteLoc.virtual ? false : true}
                onBlur={() => blurSetup("zipcode")}
                validator={simpleValidator.current.message(
                  "zipcode",
                  siteLoc.zipcode,
                  siteLoc.virtual ? "numeric" : "required|numeric",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  editDataNew.zipcode !== editData.zipcode &&
                  editDataNew.zipcode
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomReactSelect
                label="State"
                required={true}
                isMulti={siteLoc.virtual ? true : false}
                onChange={(data) => setData("state", data)}
                onBlur={() => blurSetup("state")}
                value={siteLoc.state}
                options={UsStates}
                validator={simpleValidator.current.message(
                  "state",
                  siteLoc.state,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={editDataNew.state}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <CustomTextField
                type="text"
                value={siteLoc.website}
                label="Website"
                onChange={(d) => setData("website", d)}
                required={true}
                onBlur={() => blurSetup("Web Site")}
                validator={simpleValidator.current.message(
                  "Web Site",
                  siteLoc.website,
                  "required|newUrl",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  editDataNew.website !== editData.website &&
                  editDataNew.website
                }
              />
            </Grid>

            <Grid item lg={6} sm={12} xs={12} md={12}>
              <CustomTextField
                type="number"
                value={siteLoc.radius}
                label="Radius served"
                onChange={(d) => setData("radius", d)}
                required={true}
                disabled={!siteLoc.homeVisit}
                onBlur={() => blurSetup("Radius served")}
                validator={
                  siteLoc.homeVisit
                    ? simpleValidator.current.message(
                        "Radius served",
                        siteLoc.radius,
                        "required|numeric",
                        {
                          className: "errorClass",
                        }
                      )
                    : null
                }
                oldData={
                  editDataNew.radius !== editData.radius
                    ? editDataNew.radius
                    : ""
                }
              />
            </Grid>

            <Grid item lg={4} sm={4} xs={4} md={4}>
              <span
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: 500,
                  fontSize: "18px !important",
                  fontFamily: "Montserrat",
                }}
              >
                {editData.HQ !== editDataNew.HQ
                  ? editDataNew.HQ
                    ? "Yes"
                    : "No"
                  : null}
              </span>
              <SwitchFilter
                method={(e) => setData("HQ", e.target.checked)}
                value={siteLoc.HQ}
                label="HQ"
                classes={classes}
              />
            </Grid>

            <Grid item lg={4} sm={4} xs={4} md={4}>
              <span
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: 500,
                  fontSize: "18px !important",
                  fontFamily: "Montserrat",
                }}
              ></span>
              <SwitchFilter
                method={(e) => setData("additional", e.target.checked)}
                value={siteLoc.additional}
                label="Additional"
                classes={classes}
              />
            </Grid>

            <Grid item lg={4} sm={6} xs={6} md={4}>
              <span
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: 500,
                  fontSize: "18px !important",
                  fontFamily: "Montserrat",
                }}
              >
                {editData.virtual !== editDataNew.virtual
                  ? editDataNew.virtual
                    ? "Yes"
                    : "No"
                  : null}
              </span>
              <SwitchFilter
                method={(e) => setData("virtual", e.target.checked)}
                value={siteLoc.virtual}
                label="Virtual"
                classes={classes}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={6} md={4}>
              <span
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: 500,
                  fontSize: "18px !important",
                  fontFamily: "Montserrat",
                }}
              >
                {editData.homeVisit !== editDataNew.homeVisit
                  ? editDataNew.homeVisit
                    ? "Yes"
                    : "No"
                  : null}
              </span>
              <SwitchFilter
                method={(e) => setData("homeVisit", e.target.checked)}
                value={siteLoc.homeVisit}
                label="Home Visit"
                classes={classes}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <div className={classes.formGroupContainer}>
                <div className={classes.labelName}>
                  Category *
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "red",
                      fontWeight: 500,
                      fontSize: "18px !important",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {editDataNew.subcategory
                      ? editDataNew.subcategory.reduce(
                          (a, b) => a + `${a ? ", " : ""}` + b.name,
                          ""
                        )
                      : "-"}
                  </span>
                </div>
                <Select
                  fullWidth
                  multiple
                  MenuProps={selectProps}
                  value={siteLoc.selCat}
                  renderValue={(selected) => (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {selected.map(
                        (value) =>
                          value && (
                            <Chip
                              key={value._id}
                              label={value.name}
                              style={{ margin: "5px 0px 5px 0px" }}
                              icon={
                                <Close
                                  style={{ cursor: "pointer" }}
                                  fontSize="small"
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                  }}
                                  onClick={() => removeOneSubCat(value._id)}
                                />
                              }
                            />
                          )
                      )}
                    </div>
                  )}
                  onChange={(e) => selCat(e.target.value)}
                  onBlur={() => blurSetup("Category")}
                >
                  {siteLoc.avCat.map((c) => {
                    if (c.cat) {
                      return (
                        <ListSubheader key={c._id}>{c.name}</ListSubheader>
                      );
                    } else {
                      return (
                        <MenuItem value={c} key={c._id}>
                          <Checkbox
                            checked={siteLoc.subcategory.indexOf(c._id) > -1}
                          />
                          <ListItemText primary={c.name} />
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
                {simpleValidator.current.message(
                  "Category",
                  siteLoc.category,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <CustomButton
          name={"Update"}
          varient="contained"
          onclick={addSiteLocMethod}
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

export default SiteEditModal;
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
