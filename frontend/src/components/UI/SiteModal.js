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
import CustomButton from "./CustomButton";
import CustomTextField from "./FormGroup";
import {
  addSiteLoc,
  updateSiteLoc,
  getIdRole,
  getSiteLoc,
} from "../../redux/actions/profile/profileActions";
import {
  getAdminOrgSite,
  addSite,
} from "../../redux/actions/Admin/AdminActions";

import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { BasicSwitch } from "./CustomSwitch";
import CustomAutoComp from "../GooglePlaceAuto/CustomAutoComp";
import CustomReactSelect from "./CustomReactSelect";
import UsStates from "../../utils/UsStates";
import config from "../../config";
import { Close } from "@mui/icons-material";
import ModalLoading from "./ModalLoading";

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

const SiteModal = ({ cat, open, handleClose, edit, editData, admin, id }) => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const actions = bindActionCreators(
    {
      getIdRole,
      addSiteLoc,
      updateSiteLoc,
      getSiteLoc,
      getAdminOrgSite,
      addSite,
    },
    dispatch
  );
  const orgId = useSelector((state) => state.profile.org._id);
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
  const [select, setSelected] = useState(false);

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
    if (!select) {
      setSiteLoc((old) => {
        return {
          ...old,
          address: "",
        };
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (edit && editData) {
      const da = {
        ...editData,
      };
      const selCat = [];
      for (let i = 0; i < da.subcategory.length; i++) {
        for (let j = 0; j < cat.length; j++) {
          if (da.subcategory[i] === cat[j]._id) {
            selCat.push(cat[j]);
          }
        }
      }
      da["selCat"] = selCat;
      da["state"] =
        typeof da.state === "string"
          ? ""
          : UsStates.filter((a) => da.state.find((s) => s === a.value));
      setSiteLoc(() => da);
    } else {
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
          virtual: false,
          homeVisit: false,
          additional: false,
        };
      });
      simpleValidator.current.visibleFields = [];
    }
    setLoading(false);
  }, [edit, editData, open]);

  const addSiteLocMethod = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const userInfo = actions.getIdRole();
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
      };
      let err = false;

      if (edit && editData) {
        err = await actions.updateSiteLoc(data, editData._id);
      } else {
        data.userId = userInfo.id;
        if (admin) {
          data.organisationId = id;
          err = await actions.addSiteLoc(data);
        } else {
          data.organisationId = orgId;
          err = await actions.addSiteLoc(data);
        }
      }
      if (admin) {
        await actions.getAdminOrgSite(id);
      } else {
        await actions.getSiteLoc(userInfo.id, orgId);
      }
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
          };
        });
        simpleValidator.current.visibleFields = [];
        setLoading(false);
        handleClose();
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
  });

  const grabAddress = async (loc) => {
    const st = loc.state ? UsStates.find((a) => a.value === loc.state) : "";
    if (siteLoc.virtual) {
      setSelected(true);
      setSiteLoc((old) => {
        return {
          ...old,
          location: loc.location,
          address: loc.address,
          state: st || "",
          city: loc.city || "",
          zipcode: loc.zipcode ? +loc.zipcode : "",
        };
      });
    } else {
      setSelected(true);
      setSiteLoc((old) => {
        return {
          ...old,
          location: loc.location,
          address: loc.address,
          state: st || "",
          city: loc.city || "",
          zipcode: loc.zipcode ? +loc.zipcode : "",
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
    } else if (field === "address") {
      setSelected(false);
    }
    newLoc[field] = data;
    setSiteLoc(() => newLoc);
  };
  const selCat = (data) => {
    const newLoc = { ...siteLoc };

    const cids = data.map((c) => c.category_id);
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
              />
            </Grid>
            <Grid item lg={siteLoc.homeVisit ? 6 : 12} sm={12} xs={12} md={12}>
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
              />
            </Grid>

            {siteLoc.homeVisit && (
              <Grid item lg={6} sm={12} xs={12} md={12}>
                <CustomTextField
                  type="number"
                  value={siteLoc.radius}
                  label="Radius served"
                  onChange={(d) => setData("radius", d)}
                  required={true}
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
                      : {}
                  }
                />
              </Grid>
            )}

            <Grid item lg={4} sm={4} xs={4} md={4}>
              <SwitchFilter
                method={(e) => setData("HQ", e.target.checked)}
                value={siteLoc.HQ}
                label="HQ"
                classes={classes}
              />
            </Grid>

            {admin && (
              <Grid item lg={4} sm={4} xs={4} md={4}>
                <SwitchFilter
                  method={(e) => setData("additional", e.target.checked)}
                  value={siteLoc.additional}
                  label="Additional"
                  classes={classes}
                />
              </Grid>
            )}
            <Grid item lg={4} sm={6} xs={6} md={4}>
              <SwitchFilter
                method={(e) => setData("virtual", e.target.checked)}
                value={siteLoc.virtual}
                label="Virtual"
                classes={classes}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={6} md={4}>
              <SwitchFilter
                method={(e) => setData("homeVisit", e.target.checked)}
                value={siteLoc.homeVisit}
                label="Home Visit"
                classes={classes}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <div className={classes.formGroupContainer}>
                <div className={classes.labelName}>Category *</div>
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
                  {cat.map((c) => {
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
          name={edit ? "Update" : "Add"}
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

export default SiteModal;

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
