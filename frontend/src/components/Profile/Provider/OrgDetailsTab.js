import {
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import {
  updateOrg,
  getIdRole,
  getOrg,
  getSiteLoc,
} from "../../../redux/actions/profile/profileActions";
import CustomButton from "../../UI/CustomButton";
import CustomTextField from "../../UI/FormGroup";
import CustomTextArea from "../../UI/CustomTextArea";
import CustomReactSelect from "../../UI/CustomReactSelect";
import UsStates from "../../../utils/UsStates";
import CustomAutoComp from "../../GooglePlaceAuto/CustomAutoComp";
import CustomPhone from "../../UI/CustomPhone";
import config from "../../../config";
import { Close } from "@mui/icons-material";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const selectProps = {
  sx: { maxHeight: "400px", marginLeft: "5px" },
};

const OrgDetailsTab = ({ classes, cat, pdata }) => {
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
  });
  const [, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { updateOrg, getIdRole, getOrg, getSiteLoc },
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

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  const orgSData = useSelector((state) => state.profile.org);
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
  useEffect(() => {
    setLoading(true);

    const { id } = actions.getIdRole();
    if (id) {
      setAId(id);
    }
    if (orgSData) {
      const state = UsStates.filter((s) => s.value === orgSData.state)[0] || "";

      const dd = {
        approvalPending: orgSData.approvalPending,
        category: orgSData.category || [],
        subcategory: orgSData.subcategory || [],
        selCat: [],
        orgType: orgSData.orgType || [],
        state: state,
      };
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
        return { ...orgSData, ...dd };
      });
    }
    setLoading(false);
    return () => ctc.cancelTheApi();
  }, [orgSData]);
  const grabAddress = async (loc) => {
    const st = loc.state ? UsStates.find((a) => a.value === loc.state) : "";
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
  const updateOrgInfo = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const { id } = actions.getIdRole();

      await actions.updateOrg({
        providerId: aid,
        publicName: org.publicName,
        address: org.address,
        zipcode: org.zipcode,
        state: org.state ? org.state.value || "" : "",
        email: org.email,
        city: org.city,
        contact:
          typeof org.contact === "string"
            ? org.contact.replace("(", "").replace(")", "").replace("-", "")
            : org.contact,
        about: org.about,
        category: org.category,
        subcategory: org.subcategory,
        altWebsite: org.altWebsite,
      });
      ctc.createToken();
      await Promise.all([
        actions.getOrg(id, ctc.getToken()),
        actions.getSiteLoc(id, org._id, ctc.getToken()),
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
  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      {pdata.approvedStatus !== "approved" || org.approvalPending ? (
        <Grid item lg={12} sm={12} xs={12} md={12}>
          <div
            style={{
              padding: "7px 10px 6px",
              borderRadius: "5px",
              backgroundColor: "rgba(252, 90, 90, 0.1)",
              fontSize: "10px",
              fontWeight: 600,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "normal",
              color: "#fc5a5a",
              textAlign: "center",
              maxHeight: "15px",
              textTransform: "capitalize",
            }}
          >
            {pdata.approvedStatus !== "approved"
              ? "Your account is under approval please contact to admin for more details"
              : "Your request send to admin and, it's in pending mode contact admin for more details"}
          </div>
        </Grid>
      ) : null}
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <CustomTextField
          type="text"
          label="Organization Name"
          value={org.publicName}
          onChange={(e) => setData("publicName", e)}
          required={true}
          onBlur={() => blurSetup("name")}
          validator={simpleValidator.current.message(
            "name",
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
          required={false}
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
          options={UsStates}
        />
      </Grid>
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <CustomTextField
          type="text"
          label="URL"
          value={org.altWebsite}
          onChange={(e) => setData("altWebsite", e)}
          onBlur={() => blurSetup("URL")}
          validator={simpleValidator.current.message(
            "URL",
            org.altWebsite,
            "newUrl",
            {
              className: "errorClass",
            }
          )}
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
      {pdata.approvedStatus !== "approved" || org.approvalPending ? null : (
        <Grid item lg={12} sm={12} xs={12} md={12} textAlign="left">
          <CustomButton
            name="Update"
            varient="contained"
            className={classes.updateBtn}
            onclick={updateOrgInfo}
          />{" "}
        </Grid>
      )}
    </>
  );
};

export default OrgDetailsTab;
