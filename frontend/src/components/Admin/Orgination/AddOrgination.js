import {
  Card,
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
  addOrg,
  getAdminOrg,
  getSearchLinkById,
} from "../../../redux/actions/Admin/AdminActions";
import { getCat } from "../../../redux/actions/category/categoryAction";
import { makeStyles } from "@mui/styles";
import { getIdRole } from "../../../redux/actions/profile/profileActions";
import config from "../../../config";
import { BasicSwitch } from "../../UI/CustomSwitch";
import { convertToBase64 } from "../../../utils/getBase64";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";
import LoadingComponent from "../../UI/LoadingComponent";
import { cloneDeep } from "lodash";

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
const useStyle = makeStyles((theme) => ({
  profileHeaderCard: {
    background: "white",
    margin: "50px",
    padding: "10px",
    [theme.breakpoints.down("md")]: {
      margin: "0px",
    },
  },
  updateBtn: {
    width: "182px",
    height: "56px",
    backgroundColor: "#7dbaaf",
    borderRadius: "26px 26px 57px 28px",
    marginBottom: "17px",
  },
  titleHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.08,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#252222",
    textAlign: "left",
    marginBottom: "7px",
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
    marginTop: "19px",
    width: "289px",
    padding: "9.4px 14px 9.4px 24px",
    borderRadius: "24px",
    backgroundColor: "#fafafa",
    display: "flex",
  },
  switchTitle: {
    margin: "auto",
    marginLeft: "14px",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    color: "#000",
  },
}));

const selectProps = {
  sx: { maxHeight: "400px", marginLeft: "5px" },
};
const AddOrgination = () => {
  const classes = useStyle();
  const loc = useNavigate();
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
    searchResults: false,
    leadStatus: "",
    sourceOfFindingName: "",
  });
  const [, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);
  const params = useParams();

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      addOrg,
      getAdminOrg,
      getCat,
      getIdRole,
      getSearchLinkById,
    },
    dispatch
  );

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
  const catRes = useSelector((state) => state.cat.cats);
  const ud = useSelector((state) => state.auth.user);

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  const getCate = async () => {
    setLoading(true);
    await actions.getCat();
    setLoading(false);
  };
  const makeCat = () => {
    if (catRes && catRes.length) {
      const catData = [];
      for (let i = 0; i < catRes.length; i++) {
        //category //subCategory
        catData.push(
          {
            ...catRes[i].category,
            cat: true,
          },
          ...Object.values(catRes[i].subCategory).map((e) => {
            return { ...e, cat: false };
          })
        );
      }
      setCat(() => catData);
    }
  };
  const loadData = async () => {
    if (params.id) {
      setLoading(true);
      if (catRes && catRes.length) {
        const catData = [];
        for (let i = 0; i < catRes.length; i++) {
          //category //subCategory
          catData.push(
            {
              ...catRes[i].category,
              cat: true,
            },
            ...Object.values(catRes[i].subCategory).map((e) => {
              return { ...e, cat: false };
            })
          );
        }

        const res = await actions.getSearchLinkById(params.id);
        if (res) {
          const data = {
            ...org,
            sourceOfFinding: res._id,
            geospan: UsStates.find((u) => u.value === res.states),
            category: res.category,
            subcategory: res.subcategory,
            selCat: [],
            sourceOfFindingName: res.searchLink,
          };
          if (
            data.subcategory &&
            data.subcategory.length &&
            catData &&
            catData.length
          ) {
            const selc = data.subcategory.map((a) =>
              catData.find((c) => c._id === a)
            );
            data.selCat = selc;
          }
          await setOrg(() => data);
        }
        await setCat(() => catData);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params.id) loadData();
    else makeCat();
  }, [catRes]);
  useEffect(() => {
    getCate();
  }, []);

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
      const { id } = actions.getIdRole();
      const yes = await actions.addOrg({
        providerId: id,
        name: org.name,
        address: org.address,
        website: org.website,
        zipcode: org.zipcode,
        state: org.state ? org.state.value || "" : "",
        about: org.about,
        contact:
          typeof org.contact === "string"
            ? org.contact.replace("(", "").replace(")", "").replace("-", "")
            : org.contact,
        category: org.category,
        subcategory: org.subcategory,
        orgType: org.orgType,
        altWebsite: org.altWebsite,
        email: org.email,
        city: org.city,
        location: org.location,
        publicName: org.publicName,
        recordStatus: org.recordStatus,
        logo: org.logo,
        geospan: org.geospan.map((a) => a.value),
        publish: org.publish,
        sourceOfFinding: org.sourceOfFinding,
        sourceOfFindingName: org.sourceOfFindingName,
        searchResults: org.searchResults,
        leadStatus:
          org.leadStatus && org.leadStatus.value ? org.leadStatus.value : "",
      });
      simpleValidator.current.visibleFields = [];
      setOrg({
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
        sourceOfFinding: "",
        searchResults: false,
        leadStatus: "",
        sourceOfFindingName: "",
      });
      setLoading(false);
      if (yes && params.id) {
        loc("/management-search");
      } else {
        loc("/organizations-list");
      }
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
    <LoadingComponent />
  ) : (
    <div>
      <Card className={classes.profileHeaderCard}>
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
            </div>
          </Grid>
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <CustomTextField
              type="text"
              label="Organization Name"
              value={org.name}
              onChange={(e) => setData("name", e)}
              required={true}
              onBlur={() => blurSetup("Organization Name")}
              validator={simpleValidator.current.message(
                "Organization Name",
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
              onChange={(data) => setData("sourceOfFindingName", data)}
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
                value={org.selCat}
                MenuProps={selectProps}
                renderValue={(selected) => (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {selected.map((value) =>
                      value ? (
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
                      ) : null
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
              )}{" "}
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
              name="Add Organization"
              varient="contained"
              className={classes.updateBtn}
              onclick={updateOrgInfo}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default AddOrgination;
