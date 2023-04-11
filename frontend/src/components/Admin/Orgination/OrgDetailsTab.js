import {
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
import CustomButton from "../../UI/CustomButton";
import CustomTextField from "../../UI/FormGroup";
import GeneralSelect from "../../UI/GeneralSelect";
import CustomTextArea from "../../UI/CustomTextArea";
import CustomReactSelect from "../../UI/CustomReactSelect";
import UsStates1 from "../../../utils/UsStates";
import CustomAutoComp from "../../GooglePlaceAuto/CustomAutoComp";
import CustomPhone from "../../UI/CustomPhone";
import {
  updateOrg,
  getAdminOrg,
  getAdminOrgSite,
} from "../../../redux/actions/Admin/AdminActions";
import config from "../../../config";
import { convertToBase64 } from "../../../utils/getBase64";
import { BasicSwitch } from "../../UI/CustomSwitch";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";
import LoadingComponent from "../../UI/LoadingComponent";
import { cloneDeep } from "lodash";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const UsStates = cloneDeep(UsStates1);

UsStates.push({ label: "National", value: "National" });

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
const OrgDetailsTab = ({ classes, cat, id }) => {
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
    sourceOfFindingName: "",
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
  const orgSData = useSelector((state) => state.admin.orgD);
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
      };
      if (orgSData.leadStatus) {
        dd.leadStatus = lead.find((a) => a.value === orgSData.leadStatus);
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
    return () => ctc.cancelTheApi();
  }, [orgSData]);
  const grabAddress = async (loc) => {
    const st = loc.state ? UsStates1.find((a) => a.value === loc.state) : "";
    setOrg((old) => {
      return {
        ...old,
        location: loc.location,
        address: loc.address,
        state: st || "",
        city: loc.city || "",
        zipcode: loc.zipcode ? +loc.zipcode : "",
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
        leadStatus: org.leadStatus
          ? typeof org.leadStatus === "string"
            ? org.leadStatus
            : org.leadStatus.value || ""
          : "",
        sourceOfFindingName: org.sourceOfFindingName,
      };
      // if (
      //   data.leadStatus &&
      //   orgSData.leadStatus &&
      //   data.leadStatus === orgSData.leadStatus
      // ) {
      //   delete data.leadStatus;
      // }
      if (org.logo) {
        data.logo = org.logo;
      }
      await actions.updateOrg(id, data);
      ctc.createToken();
      await Promise.all([
        actions.getAdminOrg(id, ctc.getToken()),
        actions.getAdminOrgSite(org._id, ctc.getToken()),
      ]);
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
  return loading ? (
    <Grid item lg={12} sm={12} xs={12} md={12}>
      <LoadingComponent />
    </Grid>
  ) : (
    <>
      {org.hubspotId ? (
        <Grid item lg={12} sm={12} xs={12} md={12}>
          <div
            style={{
              padding: "7px 10px 6px",
              borderRadius: "5px",
              backgroundColor: "rgba(125, 186, 175, 0.1)",
              fontSize: "12px",
              fontWeight: 600,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "normal",
              color: "#7dbaaf",
              textAlign: "center",
              maxHeight: "15px",
              textTransform: "capitalize",
            }}
          >
            {org.complianceComplete
              ? "Record is pushed To Hubspot and ready to published"
              : "Record is pushed To Hubspot"}
          </div>
        </Grid>
      ) : (
        <Grid item lg={12} sm={12} xs={12} md={12}>
          <div
            style={{
              padding: "7px 10px 6px",
              borderRadius: "5px",
              backgroundColor: "rgba(255, 197, 66, 0.1)",
              fontSize: "12px",
              fontWeight: 600,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "normal",
              color: "#ffc542",
              textAlign: "center",
              maxHeight: "15px",
              textTransform: "capitalize",
            }}
          >
            Record Is not Pushed to Hubspot
          </div>
        </Grid>
      )}

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
        />
      </Grid>
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <CustomAutoComp
          label="Address"
          value={org.address}
          onchange={(data) => setData("address", data)}
          onSelect={(a) => grabAddress(a)}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <CustomTextField
          label="City"
          type="text"
          value={org.city}
          onChange={(data) => setData("city", data)}
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
        />
      </Grid>
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <CustomReactSelect
          label="State"
          onChange={(data) => setData("state", data)}
          value={org.state}
          options={UsStates1}
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
            { value: "Assistance Provider", label: "Assistance Provider" },
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
          value={org.sourceOfFindingName}
          onChange={(d) => setData("sourceOfFindingName", d)}
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
                return <ListSubheader key={c._id}>{c.name}</ListSubheader>;
              } else {
                return (
                  <MenuItem value={c} key={c._id}>
                    <Checkbox checked={org.subcategory.indexOf(c._id) > -1} />
                    <ListItemText primary={c.name} />
                  </MenuItem>
                );
              }
            })}
          </Select>
        </div>
      </Grid>
      <Grid item lg={12} sm={12} xs={12} md={12}>
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
          {/* <div className={classes.switchContainer}>
            <div className={classes.switch}>
              <BasicSwitch
                checked={org.recordStatus}
                onChange={(e) => setData("recordStatus", e.target.checked)}
              />
            </div>
            <div className={classes.switchTitle}>Record Status</div>
          </div> */}
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
                onChange={(e) => setData("searchResults", e.target.checked)}
              />
            </div>
            <div className={classes.switchTitle}>
              Org Visible in Search Results
            </div>
          </div>

          {/* <div className={classes.switchContainer}>
            <div className={classes.switch}>
              <BasicSwitch
                checked={org.hippa}
                onChange={(e) => setData("hippa", e.target.checked)}
              />
            </div>
            <div className={classes.switchTitle}>HIPPA</div>
          </div> */}
        </div>
      </Grid>
      <Grid item lg={12} sm={12} xs={12} md={12} textAlign="left">
        <CustomButton
          name="Update"
          varient="contained"
          className={classes.updateBtn}
          onclick={updateOrgInfo}
        />
      </Grid>
    </>
  );
};

export default OrgDetailsTab;
