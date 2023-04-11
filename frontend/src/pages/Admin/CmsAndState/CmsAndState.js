import {
  Card,
  Collapse,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  styled,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import {
  getCms,
  postCms,
  getState,
  postState,
  updateCatRecordRe,
  updateTermsNdCondition,
  getTeamData,
  updateTeamData,
  deleteTeamData,
  postTeamData,
} from "../../../redux/actions/Admin/AdminActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { convertToBase64 } from "../../../utils/getBase64";
import FormGroup from "../../../components/UI/FormGroup";
import CustomReactSelect from "../../../components/UI/CustomReactSelect";
import UsStates from "../../../utils/UsStates";
import {
  getCat,
  getTerms,
} from "../../../redux/actions/category/categoryAction";
import { toast } from "react-toastify";
import AddEditTeamModal from "./AddEditTeamModal";
import { DataGrid } from "@mui/x-data-grid";
import config from "../../../config";
import LoadingComponent from "../../../components/UI/LoadingComponent";
import RichTextField from "../../../components/UI/RichTextField";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const selectProps = {
  sx: { maxHeight: "400px", marginLeft: "5px" },
};
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
  labelName: {
    marginBottom: "12px",
    fontWeight: 500,
    fontSize: "18px !important",
    fontFamily: "Montserrat",
  },
  formGroupContainer: {
    textAlign: "left !important",
  },
}));
const CmsAndState = (props) => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setTitle,
      getCms,
      postCms,
      getState,
      postState,
      getCat,
      getTerms,
      updateCatRecordRe,
      updateTermsNdCondition,
      getTeamData,
      updateTeamData,
      deleteTeamData,
      postTeamData,
    },
    dispatch
  );

  const [expandedA, setExpandedA] = useState(true);
  const [expandedB, setExpandedB] = useState(false);
  const [expandedC, setExpandedC] = useState(false);
  const [expandedD, setExpandedD] = useState(false);
  const [expandedE, setExpandedE] = useState(false);

  const [editData, setEditData] = useState("");
  const [open, setOpen] = useState(false);

  const [cat, setCat] = useState([]);
  const [catCms, setCatCms] = useState({ name: "", desc: "" });
  const [selCatCms, setSelCatCms] = useState({});
  const handleAddTeam = async (data) => {
    setOpen(() => false);
    setLoading(() => true);
    await actions.postTeamData(data);
    await loadTeam();
    setLoading(() => false);
  };
  const deleteTeamMem = async (id) => {
    setLoading(() => true);
    await actions.deleteTeamData(id);
    await loadTeam();
    setLoading(() => false);
  };
  const loadTeam = async () => {
    const d = await actions.getTeamData();
    setTeamData(() => d);
  };
  const handleEditTeam = async (id, data) => {
    setOpen(() => false);
    setLoading(() => true);
    await actions.updateTeamData(id, data);
    await loadTeam();
    setLoading(() => false);
  };
  const updateCatRecord = async () => {
    if (selCatCms && selCatCms._id) {
      if (selCatCms.cat) {
        if (catCms.name && catCms.desc) {
          setLoading(true);
          const data = {
            type: "category",
            id: selCatCms._id,
            updatedValue: {
              name: catCms.name,
              description: catCms.desc,
            },
          };
          await actions.updateCatRecordRe(data);
          setCatCms(() => {
            return { name: "", desc: "" };
          });
          setSelCatCms({});
          getData();
          setLoading(false);
        } else {
          toast.error("please provide name and description");
        }
      } else {
        if (catCms.name) {
          setLoading(true);
          const data = {
            type: "subcategory",
            id: selCatCms._id,
            updatedValue: {
              name: catCms.name,
            },
          };
          await actions.updateCatRecordRe(data);
          setCatCms(() => {
            return { name: "", desc: "" };
          });
          setSelCatCms({});
          getData();
          setLoading(false);
        } else {
          toast.error("please provide name");
        }
      }
    }
  };

  const handleSelectCat = (data) => {
    setSelCatCms(() => data);
    if (data) {
      setCatCms(() => {
        return { name: data.name, desc: data.description || "" };
      });
    }
  };

  const catRes = useSelector((state) => state.cat.cats);

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

  useEffect(() => {
    makeCat();
  }, [catRes]);

  const [cmsData, setCmsData] = useState({
    homeImage: "",
    homeHeader: "",
    homeText: "",
    homeButtonOneText: "",
    homeButtonOneUrl: "",
    homeButtonTwoText: "",
    homeButtonTwoUrl: "",
    mapTipsQuestion: "",
    mapTipsAnswer: "",
    aboutImage: "",
    aboutHeader: "",
    aboutText: "",
    contactInfo: "",
    contactEmail: "",
    homeOneImage: "",
    homeDescOne: "",
    homeTitleOne: "",
    homeDescTwo: "",
    homeTitleTwo: "",
    homeTwoImage: "",
    homeTwoSubTitle: "",
  });
  const [terms, setTerms] = useState({
    providerTerms: "",
    userTerms: "",
  });
  const [stateData, setStateData] = useState([]);
  const [selSatetData, setSelSateData] = useState("");
  const [selSatetImgData, setSelSateImgData] = useState("");

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const res = await Promise.all([
      actions.getCms(),
      actions.getState(),
      actions.getCat(),
      actions.getTeamData(),
      actions.getTerms(),
    ]);

    if (res[0]) {
      setCmsData(() => res[0]);
    }
    if (res[1]) {
      setStateData(() => res[1]);
    }
    if (res[3]) {
      setTeamData(() => res[3]);
    }
    if (res[4]) {
      setTerms((prev) => ({
        ...prev,
        providerTerms: res[4]?.providerTerms,
        userTerms: res[4]?.userTerms,
      }));
    }
    setLoading(false);
  };
  useEffect(() => {
    actions.setTitle({ title: props.title });
    getData();
  }, []);
  const [teamData, setTeamData] = useState([]);

  const uploadCms = async () => {
    setLoading(true);
    const data = { ...cmsData };
    if (cmsData.homeImage && typeof cmsData.homeImage !== "string") {
      data.homeImage = await convertToBase64(cmsData.homeImage);
    } else {
      delete data.homeImage;
    }
    if (cmsData.homeOneImage && typeof cmsData.homeOneImage !== "string") {
      data.homeOneImage = await convertToBase64(cmsData.homeOneImage);
    } else {
      delete data.homeOneImage;
    }
    if (cmsData.homeTwoImage && typeof cmsData.homeTwoImage !== "string") {
      data.homeTwoImage = await convertToBase64(cmsData.homeTwoImage);
    } else {
      delete data.homeTwoImage;
    }
    if (cmsData.aboutImage && typeof cmsData.aboutImage !== "string") {
      data.homeImage = await convertToBase64(cmsData.aboutImage);
    } else {
      delete data.aboutImage;
    }
    await actions.postCms(data);
    setLoading(false);
  };
  const setData = (field, value) => {
    setCmsData((data) => {
      return { ...data, [field]: value };
    });
  };
  const uploadState = async () => {
    setLoading(true);
    if (selSatetImgData && selSatetData && selSatetData.value) {
      let formData = new FormData();
      formData.append("image", selSatetImgData);
      formData.append("name", selSatetData.value);
      await actions.postState(formData);
      await getData();
    }
    setLoading(false);
  };
  const columns = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "job",
      headerName: "Job Title",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 120,
      renderCell: ({ row }) => {
        return <a href={row.image}>{row.image && row.image.slice(0, 30)}...</a>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 190,
      renderCell: ({ row }) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {" "}
            <CustomButton
              name={"Edit"}
              varient={"contained"}
              onclick={() => {
                setEditData(() => row);
                setOpen(() => true);
              }}
            />
            <CustomButton
              name={"Delete"}
              varient={"contained"}
              styled={{ background: "red" }}
              onclick={() => deleteTeamMem(row._id)}
            />
          </div>
        );
      },
    },
  ];

  const onChange = (name, value) => {
    setTerms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTerms = async (name, type, label) => {
    if (terms?.[name]) {
      setLoading(true);
      const data = {
        [name]: terms?.[name],
        type: type,
      };
      await actions.updateTermsNdCondition(data);
      setTerms({ userTerms: "", providerTerms: "" });
      getData();
      setLoading(false);
    } else {
      toast.error(`please add ${label}`);
    }
  };

  return (
    <div className={classes.aboutContainer}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12} mb={2}>
            <Card>
              <div
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: 1.334,
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedA((o) => !o)}
              >
                <div>CMS</div>
                <ExpandMore
                  expand={expandedA}
                  onClick={() => setExpandedA((o) => !o)}
                  aria-expanded={expandedA}
                  aria-label="show more"
                >
                  <ExpandMoreIcon
                    onClick={() => setExpandedA((o) => !o)}
                    fontSize="large"
                  />
                </ExpandMore>
              </div>
              <Collapse in={expandedA} timeout="auto" unmountOnExit>
                <Divider />
                <div style={{ padding: "10px", margin: "10px" }}>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div style={{ textAlign: "left" }}>
                        <div className={classes.labelName}>Home Image</div>
                        <input
                          type="file"
                          onChange={(e) =>
                            setData("homeImage", e.target.files[0])
                          }
                        />
                      </div>
                    </Grid>
                    {cmsData.homeImage &&
                    typeof cmsData.homeImage === "string" &&
                    cmsData.homeImage.includes("https://") ? (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {cmsData.homeImage}
                      </Grid>
                    ) : null}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeHeader}
                        onChange={(d) => setData("homeHeader", d)}
                        label="Home Header"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeText}
                        onChange={(d) => setData("homeText", d)}
                        label="Home Text"
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div style={{ textAlign: "left" }}>
                        <div className={classes.labelName}>Home Image One</div>
                        <input
                          type="file"
                          onChange={(e) =>
                            setData("homeOneImage", e.target.files[0])
                          }
                        />
                      </div>
                    </Grid>
                    {cmsData.homeOneImage &&
                    typeof cmsData.homeOneImage === "string" &&
                    cmsData.homeOneImage.includes("https://") ? (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {cmsData.homeOneImage}
                      </Grid>
                    ) : null}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeTitleOne}
                        onChange={(d) => setData("homeTitleOne", d)}
                        label="Home Title One"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeDescOne}
                        onChange={(d) => setData("homeDescOne", d)}
                        label="Home Description One"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeButtonOneText}
                        onChange={(d) => setData("homeButtonOneText", d)}
                        label="Home Button One"
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeButtonOneUrl}
                        onChange={(d) => setData("homeButtonOneUrl", d)}
                        label="Home Button One Url"
                      />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div style={{ textAlign: "left" }}>
                        <div className={classes.labelName}>Home Image Two</div>
                        <input
                          type="file"
                          onChange={(e) =>
                            setData("homeTwoImage", e.target.files[0])
                          }
                        />
                      </div>
                    </Grid>
                    {cmsData.homeTwoImage &&
                    typeof cmsData.homeTwoImage === "string" &&
                    cmsData.homeTwoImage.includes("https://") ? (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {cmsData.homeTwoImage}
                      </Grid>
                    ) : null}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeTitleTwo}
                        onChange={(d) => setData("homeTitleTwo", d)}
                        label="Home Title Two"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeTwoSubTitle}
                        onChange={(d) => setData("homeTwoSubTitle", d)}
                        label="Home Sub Title Two"
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeDescTwo}
                        onChange={(d) => setData("homeDescTwo", d)}
                        label="Home Description Two"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeButtonTwoText}
                        onChange={(d) => setData("homeButtonTwoText", d)}
                        label="Home Button Two"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.homeButtonTwoUrl}
                        onChange={(d) => setData("homeButtonTwoUrl", d)}
                        label="Home Button Two Url"
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div style={{ textAlign: "left" }}>
                        <div className={classes.labelName}>About Image</div>
                        <input
                          type="file"
                          onChange={(e) =>
                            setData("aboutImage", e.target.files[0])
                          }
                        />
                      </div>
                    </Grid>
                    {cmsData.aboutImage &&
                    typeof cmsData.aboutImage === "string" &&
                    cmsData.aboutImage.includes("https://") ? (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {cmsData.aboutImage}
                      </Grid>
                    ) : null}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.aboutHeader}
                        onChange={(d) => setData("aboutHeader", d)}
                        label="About Header"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.aboutText}
                        onChange={(d) => setData("aboutText", d)}
                        label="About Text"
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.contactEmail}
                        onChange={(d) => setData("contactEmail", d)}
                        label="Contact Us Email"
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <FormGroup
                        value={cmsData.contactInfo}
                        onChange={(d) => setData("contactInfo", d)}
                        label="Contact Us Information"
                      />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <CustomButton
                        varient="contained"
                        name="Update"
                        size="large"
                        styled={{ width: "80%" }}
                        onclick={() => uploadCms()}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Collapse>
            </Card>
          </Grid>
          <Grid lg={12} md={12} sm={12} xs={12} mb={2}>
            <Card>
              <div
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: 1.334,
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedB((o) => !o)}
              >
                <div>State</div>
                <ExpandMore
                  expand={expandedB}
                  onClick={() => setExpandedB((o) => !o)}
                  aria-expanded={expandedB}
                  aria-label="show more"
                >
                  <ExpandMoreIcon
                    onClick={() => setExpandedB((o) => !o)}
                    fontSize="large"
                  />
                </ExpandMore>
              </div>
              <Collapse in={expandedB} timeout="auto" unmountOnExit>
                <Divider />
                <Grid container spacing={2} padding="10px">
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CustomReactSelect
                      label="State"
                      options={UsStates}
                      value={selSatetData}
                      onChange={(e) => setSelSateData(e)}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div style={{ textAlign: "left" }}>
                      <div className={classes.labelName}>State Image</div>
                      <input
                        type="file"
                        onChange={(e) =>
                          setSelSateImgData(() => e.target.files[0])
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {stateData &&
                    stateData.length &&
                    selSatetData &&
                    selSatetData.value &&
                    stateData.find((a) => a.name === selSatetData.value) ? (
                      <a
                        href={`${
                          stateData.find((a) => a.name === selSatetData.value)
                            .image
                        }`}
                        target="_blank"
                      >
                        {
                          stateData.find((a) => a.name === selSatetData.value)
                            .image
                        }
                      </a>
                    ) : null}
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CustomButton
                      varient="contained"
                      name="Update"
                      size="large"
                      styled={{ width: "80%" }}
                      onclick={() => uploadState()}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </Card>
          </Grid>

          <Grid lg={12} md={12} sm={12} xs={12} mb={2}>
            <Card>
              <div
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: 1.334,
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedD((o) => !o)}
              >
                <div>Manage Team</div>
                <ExpandMore
                  expand={expandedB}
                  onClick={() => setExpandedD((o) => !o)}
                  aria-expanded={expandedD}
                  aria-label="show more"
                >
                  <ExpandMoreIcon
                    onClick={() => setExpandedD((o) => !o)}
                    fontSize="large"
                  />
                </ExpandMore>
              </div>
              <Collapse in={expandedD} timeout="auto" unmountOnExit>
                <Divider />
                <div>
                  <div style={{ margin: "20px", textAlign: "right" }}>
                    {" "}
                    <CustomButton
                      name="Add"
                      varient="contained"
                      onclick={() => {
                        setEditData(() => "");
                        setOpen(() => true);
                      }}
                    />
                  </div>

                  <div style={{ height: 550, overflow: "auto", width: "100%" }}>
                    <DataGrid
                      getRowId={(row) => row._id}
                      rows={teamData || []}
                      disableExtendRowFullWidth={false}
                      columns={columns}
                      disableSelectionOnClick
                      loading={loading}
                      rowsPerPageOptions={[...config.pageSlot]}
                    />
                  </div>
                </div>
              </Collapse>
            </Card>
          </Grid>
          <Grid lg={12} md={12} sm={12} xs={12} mb={2}>
            <Card>
              <div
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: 1.334,
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedC((o) => !o)}
              >
                <div>Category & Subcategory</div>
                <ExpandMore
                  expand={expandedC}
                  onClick={() => setExpandedC((o) => !o)}
                  aria-expanded={expandedC}
                  aria-label="show more"
                >
                  <ExpandMoreIcon
                    onClick={() => setExpandedC((o) => !o)}
                    fontSize="large"
                  />
                </ExpandMore>
              </div>
              <Collapse in={expandedC} timeout="auto" unmountOnExit>
                <Divider />
                <Grid container spacing={2} padding="10px">
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className={classes.formGroupContainer}>
                      <div className={classes.labelName}>
                        Services(Category & Subcategories)
                      </div>
                      <Select
                        fullWidth
                        MenuProps={selectProps}
                        value={selCatCms}
                        onChange={(e) => handleSelectCat(e.target.value)}
                      >
                        {cat.map((c) => {
                          if (c.cat) {
                            return (
                              <MenuItem value={c} key={c._id}>
                                <ListSubheader key={c._id}>
                                  {c.name}
                                </ListSubheader>
                              </MenuItem>
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
                    </div>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormGroup
                      value={catCms.name}
                      onChange={(d) =>
                        setCatCms((old) => {
                          return { ...old, name: d };
                        })
                      }
                      label="Name"
                    />
                  </Grid>
                  {selCatCms.cat ? (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <FormGroup
                        value={catCms.desc}
                        onChange={(d) =>
                          setCatCms((old) => {
                            return { ...old, desc: d };
                          })
                        }
                        label="Description"
                      />
                    </Grid>
                  ) : null}
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CustomButton
                      varient="contained"
                      name="Update"
                      size="large"
                      styled={{ width: "80%" }}
                      onclick={() => updateCatRecord()}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </Card>
          </Grid>
          <Grid lg={12} md={12} sm={12} xs={12} mb={2}>
            <Card>
              <div
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: 1.334,
                  padding: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedE((o) => !o)}
              >
                <div>Terms and Conditions</div>
                <ExpandMore
                  expand={expandedE}
                  onClick={() => setExpandedE((o) => !o)}
                  aria-expanded={expandedE}
                  aria-label="show more"
                >
                  <ExpandMoreIcon
                    onClick={() => setExpandedE((o) => !o)}
                    fontSize="large"
                  />
                </ExpandMore>
              </div>
              <Collapse in={expandedE} timeout="auto" unmountOnExit>
                <Divider />
                <Grid container spacing={2} padding="10px">
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <RichTextField
                      name="providerTerms"
                      title="Reply"
                      value={terms?.providerTerms}
                      isReq={true}
                      label="Provider User's Terms & Condition"
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "insertTable",
                          "undo",
                          "redo",
                        ],
                      }}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CustomButton
                      varient="contained"
                      name="Update"
                      size="large"
                      styled={{ width: "15%" }}
                      onclick={() =>
                        updateTerms(
                          "providerTerms",
                          "provider",
                          "Providers Terms"
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <RichTextField
                      name="userTerms"
                      title="Reply"
                      value={terms?.userTerms}
                      isReq={true}
                      label="General User's Terms & Condition"
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "insertTable",
                          "undo",
                          "redo",
                        ],
                      }}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CustomButton
                      varient="contained"
                      name="Update"
                      size="large"
                      styled={{ width: "15%" }}
                      onclick={() =>
                        updateTerms("userTerms", "user", "Users Terms")
                      }
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      )}
      <AddEditTeamModal
        open={open}
        handleClose={() => {
          setOpen(() => false);
          setEditData(() => "");
        }}
        classes={classes}
        editData={editData}
        handleAdd={(data) => handleAddTeam(data)}
        handleEdit={(id, data) => handleEditTeam(id, data)}
      />
    </div>
  );
};

export default CmsAndState;
