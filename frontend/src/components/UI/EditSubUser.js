import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import CustomButton from "./CustomButton";
import CustomTextField from "./FormGroup";
import {
  editSubUser,
  editSiteUser,
  getIdRole,
  getSubUser,
  deleteSiteLocUser,
} from "../../redux/actions/profile/profileActions";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomPhone from "./CustomPhone";
import { BasicSwitch } from "./CustomSwitch";
import {
  updateContact,
  getAdminOrgSubUser,
  updatePOC,
  getPOC,
} from "../../redux/actions/Admin/AdminActions";
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
  btn: {
    width: "200px",
    background: "red",
    marginLeft: "20px",
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
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    color: "#000",
    marginLeft: "14px",
  },
});
const EditSubUser = ({ open, handleClose, ed, admin, orgId, isPoc }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      editSiteUser,
      editSubUser,
      getIdRole,
      getSubUser,
      deleteSiteLocUser,
      updateContact,
      getAdminOrgSubUser,
      updatePOC,
      getPOC,
    },
    dispatch
  );
  const [editData, setEditData] = useState();
  const [, setDisplayError] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [loading, setLoading] = useState(false);

  const subUserData = useSelector((state) => state.profile.subUser);
  const POCData = useSelector((state) => state.profile.poc);

  const blurSetup = async (field) => {
    await setDisplayError(() => false);
    simpleValidator.current.showMessageFor(field);
    await setDisplayError(() => true);
  };
  const intialFun = (data) => {
    if (data) {
      setEditData(() => data);
      // const st = [];
      // const stOp = [];
      // if (data.siteInfo && siteData) {
      //   data.siteInfo.forEach((e) => {
      //     st.push(e.siteId._id);
      //     stOp.push(siteData.find((s) => s._id === e.siteId._id));
      //   });
      // }
      // setSiteCat((old) => {
      //   return {
      //     ...old,
      //     category: [],
      //     subcategory: [],
      //     selCat: [],
      //     site: "",
      //     pcat: [],
      //     siteDataOptions: stOp,
      //   };
      // });
      const da = {
        ...data,
        contact: data.contact && data.contact.toString(),
        fname: data.firstName || "",
        lname: data.lastName || "",
        hippa: data.hippa || false,
      };

      setSubUser(() => da);
    }
  };
  useEffect(() => {
    const sb = isPoc
      ? POCData && POCData.find((e) => e._id === ed._id)
      : subUserData && subUserData.find((e) => e._id === ed._id);

    intialFun(sb);
    simpleValidator.current.visibleFields = [];
  }, [subUserData, ed, open, admin, isPoc, POCData]);

  // const selectSiteUser = (data) => {
  //   setSubUser((old) => {
  //     return { ...old, site: data };
  //   });
  // };

  // const selectSite = (id) => {
  //   const site = siteData.find((v) => v._id === id);
  //   const avCat = [];
  //   if (cat && cat.length && site) {
  //     for (let i = 0; i < site.subcategory.length; i++) {
  //       avCat.push(cat.find((c) => c._id === site.category[i]));
  //       avCat.push(cat.find((c) => c._id === site.subcategory[i]));
  //     }
  //   }

  //   const c = [];
  //   const subC = [];
  //   const selC = [];
  //   if (editData.siteInfo && editData.siteInfo.length) {
  //     const selSite = editData.siteInfo.find((e) => e.siteId._id === id);
  //     if (selSite) {
  //       selSite.categoryInfo.forEach((e) => {
  //         if (e.subcategory) {
  //           selC.push(...Object.values(e.subcategory));
  //         }
  //       });
  //       c.push(...selSite.category);
  //       subC.push(...selSite.subcategory);
  //     }
  //   }
  //   setSiteCat((old) => {
  //     return {
  //       ...old,
  //       site: site._id,
  //       pcat: avCat,
  //       category: c,
  //       subcategory: subC,
  //       selCat: selC,
  //     };
  //   });
  // };
  // const selCategory = (data) => {
  //   const newLoc = { ...siteCat };

  //   const cids = data.map((c) => c.category_id);
  //   const subIds = data.map((c) => c._id);

  //   newLoc["category"] = cids;
  //   newLoc["subcategory"] = subIds;

  //   newLoc["selCat"] = data;
  //   setSiteCat(() => newLoc);
  // };
  const updateUser = async () => {
    await setDisplayError(() => false);
    if (simpleValidator.current.allValid()) {
      const { id } = actions.getIdRole();
      setLoading(true);
      const data = {
        contact:
          subUser.contact &&
          subUser.contact.replace("(", "").replace(")", "").replace("-", ""),
        name: subUser.name,
        firstName: subUser.fname,
        lastName: subUser.lname,
        email: subUser.email,
        jobTitle: subUser.jobTitle,
        hippa: subUser.hippa,
        makeAccountPrimary: subUser.makeAccountPrimary,
      };

      // const deleteIds = [];
      // const addIdds = [];
      // const st = [];

      // if (editData.siteInfo) {
      //   editData.siteInfo.forEach((e) => {
      //     st.push(e.siteId._id);
      //   });
      // }
      // if (subUser.site && subUser.site.length) {
      //   if (st && st.length) {
      //     for (let i = 0; i < st.length; i++) {
      //       deleteIds.push(st[i]);
      //       for (let j = 0; j < subUser.site.length; j++) {
      //         if (st[i] === subUser.site[j]) {
      //           deleteIds.pop();
      //         }
      //       }
      //     }
      //     for (let i = 0; i < subUser.site.length; i++) {
      //       addIdds.push(subUser.site[i]);
      //       for (let j = 0; j < st.length; j++) {
      //         if (subUser.site[i] === st[j]) {
      //           addIdds.pop();
      //         }
      //       }
      //     }
      //   } else {
      //     addIdds.push(...subUser.site);
      //   }
      // } else {
      //   if (st && st.length) {
      //     deleteIds.push(...st);
      //   }
      // }
      // const deleteFun = [];
      // const addFun = [];

      // for (let i = 0; i < deleteIds.length; i++) {
      //   deleteFun.push(
      //     actions.deleteSiteLocUser(deleteIds[i], editData.userId)
      //   );
      // }
      // for (let i = 0; i < addIdds.length; i++) {
      //   let data = {
      //     category: [],
      //     subcategory: [],
      //     userId: editData.userId,
      //     siteId: addIdds[i],
      //   };
      //   addFun.push(actions.editSiteUser(data));
      // }
      // await Promise.all([
      //   ...deleteFun,
      //   ...addFun,
      //   actions.editSubUser(editData._id, id, data),
      // ]);
      if (admin) {
        if (isPoc) {
          await actions.updatePOC(orgId, editData._id, data);
          await actions.getPOC(orgId);
        } else {
          await actions.updateContact(editData._id, id, data);
          await actions.getAdminOrgSubUser(id, orgId);
        }
      } else {
        await actions.editSubUser(editData._id, id, data);
        await actions.getSubUser(id);
      }
      setLoading(false);
    } else {
      simpleValidator.current.showMessages();
      await setDisplayError(() => true);
    }
  };
  const [subUser, setSubUser] = useState({
    name: "",
    contact: "",
    email: "",
    site: [],
    fname: "",
    lname: "",
    jobTitle: "",
    hippa: false,
  });

  // const updateUserSiteData = async () => {
  //   setLoading(true);

  //   const data = {
  //     category: siteCat.category,
  //     subcategory: siteCat.subcategory,
  //     userId: editData.userId,
  //     siteId: siteCat.site,
  //   };
  //   await actions.editSiteUser(data);

  //   setLoading(false);
  // };

  // const [siteCat, setSiteCat] = useState({
  //   category: [],
  //   subcategory: [],
  //   selCat: [],
  //   site: "",
  //   pcat: [],
  //   siteDataOptions: [],
  // });
  const setData = (field, data) => {
    const newLoc = { ...subUser };
    newLoc[field] = data;
    setSubUser(() => newLoc);
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
        <div className={classes.dailogHeader}>User Details</div>
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
                value={subUser.name}
                label="Name(Preferred Name)"
                onChange={(d) => setData("name", d)}
                required={true}
                onBlur={() => blurSetup("Name(Preferred Name)")}
                validator={simpleValidator.current.message(
                  "Name(Preferred Name)",
                  subUser.name,
                  "required",
                  {
                    className: "errorClass",
                  }
                )}
              />
            </Grid>

            {admin ? (
              <>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="First Name"
                    type="text"
                    value={subUser.fname}
                    onChange={(data) => setData("fname", data)}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Last Name"
                    type="text"
                    value={subUser.lname}
                    onChange={(data) => setData("lname", data)}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Job Title"
                    type="text"
                    value={subUser.jobTitle}
                    onChange={(data) => setData("jobTitle", data)}
                  />
                </Grid>
                <Grid item lg={6} sm={12} xs={12} md={6}>
                  <CustomTextField
                    type="text"
                    value={subUser.email}
                    label="Email"
                    onChange={(d) => setData("email", d)}
                    required={true}
                    disabled={!isPoc}
                    onBlur={() => blurSetup("email")}
                    validator={simpleValidator.current.message(
                      "email",
                      subUser.email,
                      "required|email",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={6} sm={12} xs={12} md={6}>
                  <CustomPhone
                    value={subUser.contact}
                    label="Phone"
                    onChange={(d) => setData("contact", d)}
                    onBlur={() => blurSetup("phone")}
                    validator={simpleValidator.current.message(
                      "phone",
                      subUser.contact,
                      "phone",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                {!isPoc && (
                  <Grid item lg={6} md={12} xs={12} sm={12}>
                    <div className={classes.switchContainer}>
                      <div className={classes.switch}>
                        <BasicSwitch
                          checked={subUser.makeAccountPrimary}
                          onChange={(e) =>
                            setData("makeAccountPrimary", e.target.checked)
                          }
                        />
                      </div>
                      <div className={classes.switchTitle}>
                        Make Account Primary
                      </div>
                    </div>
                  </Grid>
                )}
              </>
            ) : (
              <>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="First Name"
                    required={true}
                    type="text"
                    value={subUser.fname}
                    onChange={(data) => setData("fname", data)}
                    onBlur={() => blurSetup("First Name")}
                    validator={simpleValidator.current.message(
                      "First Name",
                      subUser.fname,
                      "required",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Last Name"
                    required={true}
                    type="text"
                    value={subUser.lname}
                    onChange={(data) => setData("lname", data)}
                    onBlur={() => blurSetup("Last Name")}
                    validator={simpleValidator.current.message(
                      "Last Name",
                      subUser.lname,
                      "required",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CustomTextField
                    label="Job Title"
                    required={true}
                    type="text"
                    value={subUser.jobTitle}
                    onChange={(data) => setData("jobTitle", data)}
                    onBlur={() => blurSetup("Job Title")}
                    validator={simpleValidator.current.message(
                      "Job Title",
                      subUser.jobTitle,
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
                    value={subUser.email}
                    label="Email"
                    onChange={(d) => setData("email", d)}
                    required={true}
                    disabled={true}
                    onBlur={() => blurSetup("email")}
                    validator={simpleValidator.current.message(
                      "email",
                      subUser.email,
                      "required|email",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                <Grid item lg={6} sm={12} xs={12} md={6}>
                  <CustomPhone
                    value={subUser.contact}
                    label="Phone"
                    onChange={(d) => setData("contact", d)}
                    onBlur={() => blurSetup("phone")}
                    validator={simpleValidator.current.message(
                      "phone",
                      subUser.contact,
                      "phone",
                      {
                        className: "errorClass",
                      }
                    )}
                  />
                </Grid>
                {!isPoc && (
                  <Grid item lg={6} md={12} xs={12} sm={12}>
                    <div className={classes.switchContainer}>
                      <div className={classes.switch}>
                        <BasicSwitch
                          checked={subUser.makeAccountPrimary}
                          onChange={(e) =>
                            setData("makeAccountPrimary", e.target.checked)
                          }
                        />
                      </div>
                      <div className={classes.switchTitle}>
                        Make Account Primary
                      </div>
                    </div>
                  </Grid>
                )}
              </>
            )}
            {/* <Grid item lg={6} sm={12} xs={12} md={6}>
              <div className={classes.formGroupContainer}>
                <div className={classes.labelName}>Site</div>
                <Select
                  fullWidth
                  value={subUser.site}
                  multiple
                  onChange={(e) => selectSiteUser(e.target.value)}
                >
                  {siteData
                    ? siteData.map((e) => (
                        <MenuItem value={e._id} key={e._id}>
                          {e.name}
                        </MenuItem>
                      ))
                    : []}
                </Select>
              </div>
            </Grid> */}
            <Grid item lg={12} sm={12} xs={12} md={12} textAlign="right">
              <CustomButton
                name="Update User"
                varient="contained"
                onclick={updateUser}
                styled={{ width: "200px" }}
              />
              <CustomButton
                name="Cancel"
                varient="contained"
                className={classes.btn}
                onclick={() => handleClose()}
              />
            </Grid>

            {/* <Grid item lg={6} sm={12} xs={12} md={6}>
              <div className={classes.formGroupContainer}>
                <div className={classes.labelName}>Site</div>
                <Select
                  fullWidth
                  value={siteCat.site}
                  onChange={(e) => selectSite(e.target.value)}
                >
                  {siteCat.siteDataOptions
                    ? siteCat.siteDataOptions.map((e) => (
                        <MenuItem value={e._id} key={e._id}>
                          {e.name}
                        </MenuItem>
                      ))
                    : []}
                </Select>
              </div>
            </Grid>
            <Grid item lg={6} sm={12} xs={12} md={6}>
              <div className={classes.formGroupContainer}>
                <div className={classes.labelName}>Category</div>
                <Select
                  fullWidth
                  multiple
                  value={siteCat.selCat}
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
                  onChange={(e) => selCategory(e.target.value)}
                  onBlur={() => blurSetup("Category")}
                >
                  {siteCat.pcat &&
                    siteCat.pcat.map((c) => {
                      if (c.cat) {
                        return (
                          <ListSubheader key={c._id}>{c.name}</ListSubheader>
                        );
                      } else {
                        return (
                          <MenuItem value={c} key={c._id}>
                            <Checkbox
                              checked={siteCat.subcategory.indexOf(c._id) > -1}
                            />
                            <ListItemText primary={c.name} />
                          </MenuItem>
                        );
                      }
                    })}
                </Select>
              </div>
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12} textAlign="right">
              <CustomButton
                name="Update User Sites"
                varient="contained"
                onclick={updateUserSiteData}
                styled={{ width: "200px" }}
              />
              <CustomButton
                name="Cancel"
                varient="contained"
                className={classes.btn}
                onclick={() => handleClose()}
              />
            </Grid> */}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSubUser;
