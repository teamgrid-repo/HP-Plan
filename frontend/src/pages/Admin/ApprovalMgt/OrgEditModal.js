import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../../../components/UI/CustomButton";
import CustomTextField from "../../../components/UI/FormGroup";
import GeneralSelect from "../../../components/UI/GeneralSelect";
import CustomTextArea from "../../../components/UI/CustomTextArea";
import CustomReactSelect from "../../../components/UI/CustomReactSelect";
import UsStates from "../../../utils/UsStates";
import CustomAutoComp from "../../../components/GooglePlaceAuto/CustomAutoComp";
import CustomPhone from "../../../components/UI/CustomPhone";
import {
  updateOrg,
  getAdminOrg,
  getAdminOrgSite,
} from "../../../redux/actions/Admin/AdminActions";
import config from "../../../config";
import { convertToBase64 } from "../../../utils/getBase64";
import { BasicSwitch } from "../../../components/UI/CustomSwitch";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";
import ModalLoading from "../../../components/UI/ModalLoading";

const lead = [
  {
    label: "Ph1.1 Prospecting - General by Analyst",
    value: "Ph1.1 Prospecting - General by Analyst",
  },
  {
    label: "Ph1.2 Prospecting - Custom by State Coordinator",
    value: "Ph1.2 Prospecting - Custom by State Coordinator",
  },
  {
    label: "Ph1.3 PHC Prospecting",
    value: "Ph1.3 PHC Prospecting",
  },
  {
    label: "Ph1.4 Prospecting - Personal by State Coordinator",
    value: "Ph1.4 Prospecting - Personal by State Coordinator",
  },
  {
    label: "Ph3 Details & Compliance Underway",
    value: "Ph3 Details & Compliance Underway",
  },
  // {
  //   label: "Ph4 Publish Export Sent – Public Gap/Additional Network",
  //   value: "Ph4 Publish Export Sent – Public Gap/Additional Network",
  // },

  {
    label: "Ph4 Publish Sent - Public Pro-life Main Network",
    value: "Ph4 Publish Sent - Public Pro-life Main Network",
  },

  {
    label: "Ph4 Publish Sent - Public Gap/Additional Network",
    value: "Ph4 Publish Sent - Public Gap/Additional Network",
  },
  {
    label: "Ph5 Published - Public Pro-life Main Network",
    value: "Ph5 Published - Public Pro-life Main Network",
  },

  {
    label: "Ph5 Published - Public Gap/Additional Network",
    value: "Ph5 Published - Public Gap/Additional Network",
  },
];
const OrgEditModal = ({
  open,
  handleClose,
  cat,
  classes,
  orgSData,
  orgSDataNew,
  getData,
  id = "",
}) => {
  const [aid, setAId] = useState("");

  const [org, setOrg] = useState({
    address: "",
    contact: "",
    website: "",
    name: "",
    category: [],
    subcategory: [],
    selCat: [],
    orgType: [],
    publicName: "",
    recordStatus: false,
    logo: "",
    geospan: [],
    publish: false,
    logoUrl: "",
    sourceOfFinding: "",
    searchResults: false,
    leadStatus: "",
  });
  const [, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { updateOrg, getAdminOrg, getAdminOrgSite },
    dispatch
  );
  const selectProps = {
    sx: { maxHeight: "400px", marginLeft: "5px" },
  };

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

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  const ud = useSelector((state) => state.auth.user);

  const selCat = (data) => {
    const newLoc = { ...org };
    if (data) {
      const cids = data.map((c) => c.category_id);
      const subIds = data.map((c) => c._id);

      newLoc["category"] = [...new Set(cids)];
      newLoc["subcategory"] = subIds;
      newLoc["selCat"] = data;
    }
    setOrg(() => newLoc);
  };
  const removeOneSubCat = (id) => {
    const newLoc = { ...org };
    if (id) {
      const data = newLoc.selCat.filter((i) => i._id !== id);

      const cids = data.map((c) => c.category_id);
      const subIds = data.map((c) => c._id);

      newLoc["category"] = [...new Set(cids)];
      newLoc["subcategory"] = subIds;
      newLoc["selCat"] = data;
    }
    setOrg(() => newLoc);
  };
  useEffect(() => {
    setLoading(true);
    if (id) {
      setAId(id);
    }
    if (orgSData) {
      const state = UsStates.filter((s) => s.value === orgSData.state)[0] || "";
      const geospan = orgSData.geospan
        ? orgSData.geospan.map((a) => UsStates.find((b) => b.value === a))
        : [];
      const dd = {
        category: orgSData.category || [],
        subcategory: orgSData.subcategory || [],
        selCat: [],
        orgType: orgSData.orgType || [],
        state: state,
        geospan: geospan,
        sourceOfFinding: orgSData.sourceOfFinding,
      };
      if (dd.leadStatus) {
        dd.leadStatus = lead.find((a) => a.value === dd.leadStatus);
      }
      const selCat = [];
      for (let i = 0; i < dd.subcategory.length; i++) {
        for (let j = 0; j < cat.length; j++) {
          if (dd.subcategory[i] === cat[j]._id) {
            selCat.push(cat[j]);
          }
        }
      }

      dd["selCat"] = selCat;

      setOrg(() => {
        return { ...orgSData, ...dd, logo: "", logoUrl: orgSData.logo };
      });
    }
    setLoading(false);
  }, [orgSData]);
  useEffect(() => {}, [cat]);
  const grabAddress = async (loc) => {
    const state = UsStates.filter((s) => s.value === loc.state)[0] || "";
    setOrg((old) => {
      return {
        ...old,
        location: loc.location,
        city: loc.city,
        address: loc.address,
        state: state,
      };
    });
  };
  const updateOrgInfo = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const data = {
        contact:
          typeof org.contact === "string"
            ? org.contact.replace("(", "").replace(")", "").replace("-", "")
            : org.contact,
        providerId: aid,
        name: org.name,
        address: org.address,
        website: org.website,
        zipcode: org.zipcode,
        state: org.state ? org.state.value || "" : "",
        about: org.about,
        category: org.category,
        subcategory: org.subcategory,
        orgType: org.orgType,
        altWebsite: org.altWebsite,
        email: org.email,
        city: org.city,
        location: org.location,
        publicName: org.publicName,
        recordStatus: org.recordStatus,
        geospan: org.geospan.map((a) => a.value),
        publish: org.publish,
        searchResults: org.searchResults,
        sourceOfFinding: org.sourceOfFinding,
        leadStatus: org.leadStatus
          ? typeof org.leadStatus === "string"
            ? org.leadStatus
            : org.leadStatus.value || ""
          : "",
        approvalId: orgSDataNew._id,
      };
      if (
        data.leadStatus &&
        orgSData.leadStatus &&
        data.leadStatus === orgSData.leadStatus
      ) {
        delete data.leadStatus;
      }
      if (org.logo) {
        data.logo = org.logo;
      }
      await actions.updateOrg(id, data);
      handleClose();
      getData();
      setLoading(false);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };
  const setData = (field, data) => {
    setOrg((o) => {
      return {
        ...o,
        [field]: data,
      };
    });
  };
  const setFileData = async (f) => {
    const file = f.target.files[0];
    if (
      file &&
      file.size &&
      file.size < config.maxFileSize &&
      file.type &&
      file.type.includes("image")
    ) {
      const fb = await convertToBase64(file);
      setOrg((old) => {
        return { ...old, logo: fb };
      });
    } else {
      toast.error("Please Select less then 1mb image");
    }
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
        <div className={classes.dailogHeader}>Organization Edit</div>
        {/* <span style={{ fontSize: "10px", color: "grey" }}>
          Red Color Text Is New Data
        </span> */}
      </DialogTitle>
      <Divider />
      <DialogContent>
        {loading ? (
          <ModalLoading />
        ) : (
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <div className={classes.formGroupContainer}>
                <div className={classes.labelName}>Logo</div>
                <TextField
                  type={"file"}
                  fullWidth
                  variant="outlined"
                  placeholder={"Logo"}
                  onBlur={() => blurSetup("Logo")}
                  onChange={(e) => setFileData(e)}
                />
                {org.logoUrl}
              </div>
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomTextField
                type="text"
                label="Organization Name"
                value={org.name}
                onChange={(e) => setData("name", e)}
                required={true}
                onBlur={() => blurSetup("name")}
                validator={simpleValidator.current.message(
                  "name",
                  org.name,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>

            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomTextField
                type="text"
                label="Public Name"
                value={org.publicName}
                onChange={(e) => setData("publicName", e)}
                required={true}
                onBlur={() => blurSetup("Public Name")}
                validator={simpleValidator.current.message(
                  "Public Name",
                  org.publicName,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  orgSData.publicName !== orgSDataNew.publicName
                    ? orgSDataNew.publicName
                    : ""
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomPhone
                value={org.contact}
                label="Phone"
                onChange={(d) => setData("contact", d)}
                onBlur={() => blurSetup("phone")}
                validator={simpleValidator.current.message(
                  "phone",
                  org.contact,
                  "phone",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  orgSDataNew.contact &&
                  orgSData.contact !== orgSDataNew.contact
                    ? [orgSDataNew.contact]
                    : ""
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomAutoComp
                label="Address"
                value={org.address}
                onchange={(data) => setData("address", data)}
                onSelect={(a) => grabAddress(a)}
                oldData={
                  orgSData.address !== orgSDataNew.address
                    ? orgSDataNew.address
                    : ""
                }
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                label="City"
                type="text"
                value={org.city}
                onChange={(data) => setData("city", data)}
                oldData={
                  orgSData.city !== orgSDataNew.city ? orgSDataNew.city : ""
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomTextField
                type="number"
                label="Zipcode"
                value={org.zipcode}
                onChange={(e) => setData("zipcode", e)}
                onBlur={() => blurSetup("Zipcode")}
                validator={simpleValidator.current.message(
                  "Zipcode",
                  org.zipcode,
                  "numeric",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  orgSData.zipcode !== orgSDataNew.zipcode
                    ? orgSDataNew.zipcode
                    : ""
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomReactSelect
                label="State"
                onChange={(data) => setData("state", data)}
                value={org.state}
                options={UsStates}
                oldData={
                  orgSDataNew.state && orgSData.state !== orgSDataNew.state
                    ? [orgSDataNew.state]
                    : ""
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomTextField
                type="text"
                label="Website"
                value={org.website}
                onChange={(e) => setData("website", e)}
                required={true}
                onBlur={() => blurSetup("website")}
                validator={simpleValidator.current.message(
                  "website",
                  org.website,
                  "required|newUrl",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomTextField
                type="text"
                label="Alternative URL"
                value={org.altWebsite}
                onChange={(e) => setData("altWebsite", e)}
                onBlur={() => blurSetup("altWebsite")}
                validator={simpleValidator.current.message(
                  "altWebsite",
                  org.altWebsite,
                  "newUrl",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  orgSData.altWebsite !== orgSDataNew.altWebsite
                    ? orgSDataNew.altWebsite
                    : ""
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <GeneralSelect
                name="Organization Type"
                value={org.orgType}
                multi={true}
                onChange={(d) => setData("orgType", d)}
                blurSetup={() => blurSetup("orgType")}
                menuItem={[
                  {
                    value: "Assistance Provider",
                    label: "Assistance Provider",
                  },
                  { value: "Community Org", label: "Community Org" },
                ]}
              />
            </Grid>

            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomTextField
                label="Organization Email"
                value={org.email}
                onChange={(d) => setData("email", d)}
                onBlur={() => blurSetup("email")}
                validator={simpleValidator.current.message(
                  "email",
                  org.email,
                  "email",
                  {
                    className: "errorClass",
                  }
                )}
                oldData={
                  orgSData.email !== orgSDataNew.email ? orgSDataNew.email : ""
                }
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <CustomReactSelect
                required
                label="Geospan"
                isMulti={true}
                onChange={(data) => setData("geospan", data)}
                value={org.geospan}
                onBlur={() => blurSetup("Geospan")}
                options={UsStates}
                validator={simpleValidator.current.message(
                  "Geospan",
                  org.geospan,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomTextField
                label="Source Of Finding"
                type="text"
                value={
                  (org.sourceOfFinding && org.sourceOfFinding.searchName) || ""
                }
                disabled={true}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <CustomReactSelect
                options={lead}
                value={org.leadStatus}
                onChange={(e) => setData("leadStatus", e)}
                label="Lead Status"
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <div className={classes.formGroupContainer}>
                <div className={classes.labelName}>
                  Services(Category & Subcategories)
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "red",
                      fontWeight: 500,
                      fontSize: "18px !important",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {orgSDataNew.subcategory
                      ? orgSDataNew.subcategory.reduce(
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
                  value={org.selCat}
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
                            checked={org.subcategory.indexOf(c._id) > -1}
                          />
                          <ListItemText primary={c.name} />
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
              </div>
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <span
                style={{
                  marginLeft: "5px",
                  color: "red",
                  fontWeight: 500,
                  fontSize: "18px !important",
                  fontFamily: "Montserrat",
                }}
              >
                {orgSData.about !== orgSDataNew.about ? orgSDataNew.about : ""}
              </span>
              <CustomTextArea
                label="About"
                value={org.about}
                onChange={(data) => setData("about", data)}
              />
            </Grid>

            <Grid item lg={12} sm={12} xs={12} md={12}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {ud && ud.subRole && ud.subRole !== "analyst" && (
                  <div className={classes.switchContainer}>
                    <div className={classes.switch}>
                      <BasicSwitch
                        checked={org.publish}
                        onChange={(e) => setData("publish", e.target.checked)}
                      />
                    </div>
                    <div className={classes.switchTitle}>Publish</div>
                  </div>
                )}
                <div className={classes.switchContainer}>
                  <div className={classes.switch}>
                    <BasicSwitch
                      checked={org.searchResults || false}
                      onChange={(e) =>
                        setData("searchResults", e.target.checked)
                      }
                    />
                  </div>
                  <div className={classes.switchTitle}>
                    Org Visible in Search Results
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12} textAlign="left">
              <CustomButton
                name="Update"
                varient="contained"
                onclick={updateOrgInfo}
                size="large"
              />
              <CustomButton
                name="cancel"
                varient="contained"
                styled={{ marginLeft: "5px", background: "red" }}
                onclick={handleClose}
                size="large"
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrgEditModal;
