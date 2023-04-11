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
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "./CustomButton";
import {
  getIdRole,
  getSiteLoc,
  addFilter,
  getSubUser,
} from "../../redux/actions/profile/profileActions";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomTextField from "./FormGroup";
import { BasicSwitch } from "./CustomSwitch";
import GeneralSelect from "./GeneralSelect";
import { getAdminOrgSite } from "../../redux/actions/Admin/AdminActions";
import { toast } from "react-toastify";
import ModalLoading from "./ModalLoading";
const selectProps = {
  sx: { maxHeight: "400px", marginLeft: "5px" },
};
const dummy = {
  serviceName: "",
  serviceDescription: "",
  serviceWebpage: "",
  leaf: false,
  isHippa: false,
  specialQualiFlag: false,
  price: [],
  user1: "",
  user2: "",
  specialQues: "",
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

const FilterModal = ({ open, handleClose, editData, oid, admin }) => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const actions = bindActionCreators(
    { getIdRole, getSiteLoc, addFilter, getSubUser, getAdminOrgSite },
    dispatch
  );
  const catRes = useSelector((state) => state.cat.cats);

  const subUserData = useSelector((state) => state.profile.subUser);
  const subPocData = useSelector((state) => state.profile.poc);
  const spaceRes = useSelector((state) => state.cat.space);
  // const spaceOtherRes = useSelector((state) => state.cat.otherSpace);
  const [spaceData, setSpaceData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [oldId, setOldId] = useState("");
  const [selFilterData, setSelFilterData] = useState({ ...dummy });
  const [displayQue, setDisplayQue] = useState(false);
  const [leafAppli, setLeafAppli] = useState(false);
  const orgId = useSelector((state) => state.profile.org._id);
  const [, setDisplayError] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState(false);
  const [suData, setSuData] = useState([]);
  const [cat, setCat] = useState([]);

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  const handleEdit = async () => {
    if (siteLoc.selCat._id) {
      setLoading(true);
      // const newD = { ...filterData };
      // newD[siteLoc.selCat._id] = { ...selFilterData };
      // if (!newD[siteLoc.selCat._id].subCategoryId) {
      //   newD[siteLoc.selCat._id].subCategoryId = siteLoc.selCat._id;
      // }
      // const newDarr = Object.values(newD);

      // const finalData = [];
      // for (let i = 0; i < newDarr.length; i++) {
      //   const ms = [];
      //   if (newDarr[i].user1) ms.push(newDarr[i].user1);
      //   if (newDarr[i].user2) ms.push(newDarr[i].user2);
      //   let a = {
      //     serviceName: newDarr[i].serviceName,
      //     serviceDescription: newDarr[i].serviceDescription,
      //     serviceWebpage: newDarr[i].serviceWebpage,
      //     specialQualiFlag: newDarr[i].specialQualiFlag,
      //     specialQualif: newDarr[i].specialQualif,
      //     price: newDarr[i].price,
      //     leaf: newDarr[i].leaf,
      //     poc: Array.from(new Set(ms)),
      //     subCategoryId: newDarr[i].subCategoryId,
      //     siteId: editData._id,
      //     specialQues: newDarr[i].specialQues || "",
      //   };
      //   finalData.push(a);
      // }
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
        isHippa: selFilterData.isHippa,
        poc: Array.from(new Set(ms)),
        subCategoryId: selFilterData.subCategoryId,
        siteId: editData._id,
        specialQues: selFilterData.specialQues || "",
      };
      await actions.addFilter({ appData: a });
      if (admin) {
        await actions.getAdminOrgSite(oid);
      } else {
        const { id } = actions.getIdRole();
        await actions.getSiteLoc(id, orgId);
        await actions.getSubUser(id);
      }
      setLoading(false);
    } else {
      toast.error("please select service!");
    }
  };
  useEffect(() => {
    if (subUserData || subPocData) {
      let temp = subPocData?.map((s) => {
        return { label: s.name, value: s._id };
      });
      const temp2 = subUserData?.map((s) => {
        return { label: s.name, value: s.userId };
      });
      temp.push(...temp2);
      setSuData(() => temp);
    }
    if (editData) {
      if (catRes && editData.category && editData.subcategory) {
        const cc = [];
        const uniqueCC = Array.from(new Set(editData.category));
        for (let i = 0; i < uniqueCC.length; i++) {
          const dcc = catRes.find((r) => r.category._id === uniqueCC[i]);
          if (dcc && dcc.subCategory && dcc.category) {
            const subCC = [];
            editData.subcategory.forEach((gg) => {
              let scc = dcc.subCategory.find((ggg) => ggg._id === gg);
              if (scc) {
                subCC.push(scc);
              }
            });
            cc.push(
              {
                ...dcc.category,
                cat: true,
              },
              ...subCC
            );
          }
        }
        setCat(cc);
      }
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
      da["price"] = [];
      setSiteLoc(() => da);
    } else {
      setSiteLoc(() => {
        return {
          category: [],
          subcategory: [],
          selCat: "",
        };
      });
      simpleValidator.current.visibleFields = [];
    }
    if (editData.siteSubCategoryInfo) {
      const d = editData.siteSubCategoryInfo;
      const newData = {};
      for (let i = 0; i < d.length; i++) {
        const user2 =
          d[i]?.poc?.length === 0
            ? d[i]?.staticPoc[1]?.staticPocId || ""
            : d[i]?.staticPoc[0]?.staticPocId || "";
        newData[d[i].subCategoryId] = {
          ...d[i],
          user1: d[i].poc[0] || d[i]?.staticPoc[0]?.staticPocId || "",
          user2: d[i].poc[1] || user2,
        };
      }
      setFilterData(() => newData);
    } else {
      setFilterData(() => {
        return {};
      });
    }
    setSelFilterData(() => dummy);
  }, [editData]);

  const [siteLoc, setSiteLoc] = useState({
    category: [],
    subcategory: [],
    selCat: "",
  });

  const setData = (field, data) => {
    console.log(field, data);
    if (siteLoc.selCat._id) {
      const newLoc = { ...selFilterData };
      if (!newLoc.subCategoryId) {
        newLoc.subCategoryId = siteLoc.selCat._id;
      }
      newLoc[field] = data;
      setSelFilterData(() => newLoc);
    }
  };

  const selCat = async (data) => {
    const newLoc = { ...siteLoc };
    if (data) {
      const id = data._id;
      setLeafAppli(() => (data.applicable ? data.applicable : false));
      newLoc["selCat"] = data;
      const f = spaceRes && spaceRes.find((s) => s._id === data._id);
      if (f && f.specialQualification && f.specialQualification.length) {
        setSpaceData(() => f.specialQualification);
        setDisplayQue(true);
      } else {
        setSpaceData(() => []);
        setDisplayQue(false);
      }
      // subCategoryId
      if (oldId) {
        await setFilterData((old) => {
          return { ...old, [oldId]: { ...selFilterData } };
        });
      }
      await setSelFilterData(
        () => filterData[id] || { ...dummy, subCategoryId: id }
      );
      await setOldId(() => id);
    }
    await setSiteLoc(() => newLoc);
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
              <div className={classes.formGroupContainer}>
                <div style={{ display: "flex" }}>
                  <div className={classes.labelName}>Subcategory *</div>
                </div>
                <Select
                  fullWidth
                  MenuProps={selectProps}
                  value={siteLoc.selCat}
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
            <Grid item lg={6} sm={6} xs={12} md={6}>
              <CustomTextField
                type="text"
                value={selFilterData.serviceName}
                label="Service Name"
                onChange={(d) => setData("serviceName", d)}
              />
            </Grid>
            <Grid item lg={6} sm={6} xs={12} md={6}>
              <CustomTextField
                type="text"
                value={selFilterData.serviceDescription}
                label="Service Description"
                onChange={(d) => setData("serviceDescription", d)}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <CustomTextField
                type="text"
                value={selFilterData.serviceWebpage}
                label="Service Webpage"
                onChange={(d) => setData("serviceWebpage", d)}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={12}>
              <GeneralSelect
                name="Price Type"
                multi={true}
                value={selFilterData.price}
                onChange={(d) => setData("price", d)}
                menuItem={priceListData}
              />
            </Grid>
            {admin && displayQue && (
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <SwitchFilter
                  method={(e) => setData("specialQualiFlag", e.target.checked)}
                  value={selFilterData.specialQualiFlag}
                  label="Special Qualification"
                  classes={classes}
                />
              </Grid>
            )}

            {admin && displayQue && selFilterData.specialQualiFlag && (
              <Grid item lg={12} sm={12} xs={12} md={12}>
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
            {admin && (
              <Grid item lg={12} sm={12} xs={12} md={12}>
                <CustomTextField
                  type="text"
                  value={selFilterData.specialQues}
                  label="Special Qualification"
                  onChange={(d) => setData("specialQues", d)}
                />
              </Grid>
            )}
            {admin && leafAppli && (
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
              <GeneralSelect
                name="Point Of Contact 1"
                value={selFilterData.user1}
                onChange={(d) => setData("user1", d)}
                menuItem={suData}
              />
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
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
        {selFilterData._id ? (
          selFilterData.approvalPending && !admin ? (
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
                marginRight: "10px",
              }}
            >
              Under Approval
            </div>
          ) : (
            <CustomButton
              name="Update"
              onclick={handleEdit}
              varient="contained"
              styled={{ width: "200px" }}
            />
          )
        ) : null}
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

export default FilterModal;

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
