import {
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../../UI/CustomButton";
import FormGroup from "../../UI/FormGroup";
import GeneralSelect from "../../UI/GeneralSelect";
import {
  updateOrg,
  getIdRole,
  getOrg,
} from "../../../redux/actions/profile/profileActions";
import LoadingComponent from "../../UI/LoadingComponent";

const menuListData = [
  { value: "yes", label: "yes" },
  { value: "no", label: "no" },
];

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

const OrgServiceTab = ({ classes, cat }) => {
  const [serviceData, setServiceData] = useState({
    category: [],
    subcategory: [],
    selCat: [],
    price: [],
  });
  const [, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { updateOrg, getIdRole, getOrg },
    dispatch
  );

  const simpleValidator = useRef(new SimpleReactValidator());

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };

  const orgD = useSelector((state) => state.profile.org);
  const setOrgD = () => {
    if (orgD) {
      setLoading(true);
      const dd = {
        category: orgD.category || [],
        subcategory: orgD.subcategory || [],
        virtual: orgD.virtual,
        homeVisit: orgD.homeVisit,
        leaf: orgD.leaf,
        price: orgD.price || [],
        specialQues: orgD.specialQues,
        selCat: [],
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
      setServiceData(() => dd);
      setLoading(false);
    }
  };
  useEffect(() => {
    setOrgD();
  }, [orgD]);

  const updateService = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      const { id } = actions.getIdRole();
      setLoading(true);
      const data = {
        providerId: id,
        category: serviceData.category,
        subcategory: serviceData.subcategory,
        virtual: serviceData.virtual,
        homeVisit: serviceData.homeVisit,
        leaf: serviceData.leaf,
        price: serviceData.price,
        specialQues: serviceData.specialQues,
      };
      await actions.updateOrg(data);
      await actions.getOrg(id);
      setLoading(false);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };

  const selCat = (data) => {
    const newLoc = { ...serviceData };

    const cids = data.map((c) => c.category_id);
    const subIds = data.map((c) => c._id);

    newLoc["category"] = [...new Set(cids)];
    newLoc["subcategory"] = [...new Set(subIds)];
    newLoc["selCat"] = data;

    setServiceData(() => newLoc);
  };

  const setData = (field, value) =>
    setServiceData((old) => {
      return { ...old, [field]: value };
    });

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <GeneralSelect
          name="virtual"
          value={serviceData.virtual || "no"}
          onChange={(d) => setData("virtual", d)}
          blurSetup={() => blurSetup("virtual")}
          menuItem={menuListData}
          validator={simpleValidator.current.message(
            "virtual",
            serviceData.virtual,
            "required",
            {
              className: "errorClass",
            }
          )}
          required={true}
        />
      </Grid>
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <GeneralSelect
          value={serviceData.homeVisit || "no"}
          name="Home Visit"
          onChange={(d) => setData("homeVisit", d)}
          blurSetup={() => blurSetup("Home Visit")}
          menuItem={menuListData}
          validator={simpleValidator.current.message(
            "Home Visit",
            serviceData.homeVisit,
            "required",
            {
              className: "errorClass",
            }
          )}
          required={true}
        />
      </Grid>
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <GeneralSelect
          name="Leaf"
          onChange={(d) => setData("leaf", d)}
          blurSetup={() => blurSetup("leaf")}
          menuItem={menuListData}
          value={serviceData.leaf || "no"}
          validator={simpleValidator.current.message(
            "Leaf",
            serviceData.leaf,
            "required",
            {
              className: "errorClass",
            }
          )}
          required={true}
        />
      </Grid>
      <Grid item lg={6} sm={12} xs={12} md={6}>
        <GeneralSelect
          name="Price"
          multi={true}
          value={serviceData.price}
          onChange={(d) => setData("price", d)}
          blurSetup={() => blurSetup("Price")}
          menuItem={priceListData}
          validator={simpleValidator.current.message(
            "Price",
            serviceData.price,
            "required",
            {
              className: "errorClass",
            }
          )}
          required={true}
        />
      </Grid>
      <Grid item lg={12} sm={12} xs={12} md={12}>
        <FormGroup
          value={serviceData.specialQues}
          type="text"
          required={true}
          label="Special Qualifications"
          onChange={(e) => setData("specialQues", e)}
          onBlur={() => blurSetup("Special Qualifications")}
          validator={simpleValidator.current.message(
            "Special Qualifications",
            serviceData.specialQues,
            "required",
            {
              className: "errorClass",
            }
          )}
        />
      </Grid>
      <Grid item lg={12} sm={12} xs={12} md={12}>
        <div className={classes.formGroupContainer}>
          <div className={classes.labelName}>Category</div>
          <Select
            fullWidth
            multiple
            value={serviceData.selCat}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value._id}
                    label={value.name}
                    style={{ margin: "5px 0px 5px 0px" }}
                  />
                ))}
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
                      checked={serviceData.subcategory.indexOf(c._id) > -1}
                    />
                    <ListItemText primary={c.name} />
                  </MenuItem>
                );
              }
            })}
          </Select>
        </div>
      </Grid>

      <Grid item lg={12} sm={12} xs={12} md={12} textAlign="left">
        <CustomButton
          name="Update"
          varient="contained"
          className={classes.updateBtn}
          onclick={updateService}
        />
      </Grid>
    </>
  );
};

export default OrgServiceTab;
