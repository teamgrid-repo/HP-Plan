import { Close } from "@mui/icons-material";
import {
  Checkbox,
  Chip,
  Grid,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "../../../components/UI/CustomButton";
import CustomReactSelect from "../../../components/UI/CustomReactSelect";
import CustomTextArea from "../../../components/UI/CustomTextArea";
import FormGroup from "../../../components/UI/FormGroup";
import LoadingComponent from "../../../components/UI/LoadingComponent";
import config from "../../../config";
import {
  createSearchLink,
  udpdateSearchLink,
  getSearchLinkById,
} from "../../../redux/actions/Admin/AdminActions";
import { getCat } from "../../../redux/actions/category/categoryAction";
import { getIdRole } from "../../../redux/actions/profile/profileActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import CancelToken from "../../../utils/cancelClass";
import UsStates from "../../../utils/UsStates";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  aboutContainer: {
    paddingTop: "8em",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
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
  updateBtn: {
    width: "182px",
    height: "56px",
    backgroundColor: "#7dbaaf",
    borderRadius: "26px 26px 57px 28px",
    marginBottom: "17px",
  },
}));
const selectProps = {
  sx: { maxHeight: "400px", marginLeft: "5px" },
};
const AddSearch = (props) => {
  const loc = useNavigate();

  const classes = useStyle();
  const params = useParams();
  const lloc = useLocation();

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      getCat,
      getIdRole,
      setTitle,
      createSearchLink,
      udpdateSearchLink,
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
  const [, setDisplayError] = useState(false);
  const [searchData, setSearchData] = useState({
    searchLink: "",
    searchName: "",
    notes: "",
    states: [],
    linkType: "",
    claimStatus: false,
    category: [],
    subcategory: [],
    selCat: [],
  });
  const [cat, setCat] = useState([]);

  const getCate = async () => {
    setLoading(true);
    ctc.createToken();
    if (!catRes) await actions.getCat(ctc.getToken());
    setLoading(false);
  };
  const makeCat = async () => {
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
      await setCat(() => catData);
    }
  };
  useEffect(async () => {
    if (params.id) {
      loadData();
    } else {
      makeCat();
    }
  }, [catRes]);
  useEffect(() => {
    actions.setTitle({ title: props.title });
    getCate();
    setLoading(() => false);
    return () => ctc.cancelTheApi();
  }, []);
  const loadData = async () => {
    setLoading(() => true);
    if (params.id) {
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
        ctc.createToken();
        const res = await actions.getSearchLinkById(params.id, ctc.getToken());
        if (res) {
          const data = {
            searchLink: res.searchLink,
            searchName: res.searchName,
            notes: res.notes,
            states: UsStates.find((u) => u.value === res.states),
            linkType: { value: res.linkType, label: res.linkType },
            claimStatus: res.claimStatus,
            category: res.category,
            subcategory: res.subcategory,
            selCat: [],
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
          await setSearchData(() => data);
          await setCat(() => catData);
        }
      }
    }
    setLoading(() => false);
  };
  const setData = (field, data) => {
    setSearchData((o) => {
      return {
        ...o,
        [field]: data,
      };
    });
  };
  const selCat = (data) => {
    const newLoc = { ...searchData };
    if (data) {
      const cids = data.map((c) => c.category_id);
      const subIds = data.map((c) => c._id);

      newLoc["category"] = [...new Set(cids)];
      newLoc["subcategory"] = subIds;
      newLoc["selCat"] = data;
    }
    setSearchData(() => newLoc);
  };
  const removeOneSubCat = (id) => {
    const newLoc = { ...searchData };
    if (id) {
      const data = newLoc.selCat.filter((i) => i._id !== id);

      const cids = data.map((c) => c.category_id);
      const subIds = data.map((c) => c._id);

      newLoc["category"] = [...new Set(cids)];
      newLoc["subcategory"] = subIds;
      newLoc["selCat"] = data;
    }
    setSearchData(() => newLoc);
  };
  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  const addSearch = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      setLoading(true);
      const data = {
        ...searchData,
        update: false,
        linkType: searchData.linkType.value,
        states: searchData.states.value,
      };
      delete data.selCat;

      if (params.id && !lloc.pathname.includes("add-search")) {
        await actions.udpdateSearchLink(data, params.id);
      } else {
        await actions.createSearchLink(data);
      }
      loc("/management-search");
      setLoading(false);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
    //
  };
  return (
    <div className={classes.aboutContainer}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormGroup
              type="text"
              label="Search Name"
              value={searchData.searchName}
              onChange={(e) => setData("searchName", e)}
              required={true}
              onBlur={() => blurSetup("Search Name")}
              validator={simpleValidator.current.message(
                "Search Name",
                searchData.searchName,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormGroup
              type="text"
              label="Source Of Finding"
              value={searchData.searchLink}
              onChange={(e) => setData("searchLink", e)}
              required={true}
              onBlur={() => blurSetup("Source Of Finding")}
              validator={simpleValidator.current.message(
                "Source Of Finding",
                searchData.searchLink,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <CustomReactSelect
              required
              label="State"
              isMulti={false}
              onChange={(data) => setData("states", data)}
              value={searchData.states}
              onBlur={() => blurSetup("State")}
              options={UsStates}
              validator={simpleValidator.current.message(
                "State",
                searchData.states,
                "required",
                {
                  className: "errorClass",
                }
              )}
            />
          </Grid>
          <Grid item lg={6} sm={12} xs={12} md={6}>
            <CustomReactSelect
              required
              label="Link Type"
              onChange={(data) => setData("linkType", data)}
              value={searchData.linkType}
              onBlur={() => blurSetup("Link Type")}
              options={[
                { label: "Potential Primary", value: "Potential Primary" },
                { label: "Must Search to Sort", value: "Must Search to Sort" },
              ]}
              validator={simpleValidator.current.message(
                "Link Type",
                searchData.linkType,
                "required",
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
                value={searchData.selCat}
                renderValue={(selected) => (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {selected.map((value) => {
                      return value ? (
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
                      ) : null;
                    })}
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
                          checked={searchData.subcategory.indexOf(c._id) > -1}
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
              label="Notes"
              value={searchData.notes}
              onChange={(data) => setData("notes", data)}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12} md={12} textAlign="left">
            <CustomButton
              name={
                params.id && !lloc.pathname.includes("add-search")
                  ? "Edit Search Link"
                  : "Add Search Link"
              }
              varient="contained"
              className={classes.updateBtn}
              onclick={addSearch}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AddSearch;
