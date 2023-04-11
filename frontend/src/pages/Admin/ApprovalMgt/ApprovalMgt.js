import {
  Card,
  Collapse,
  Divider,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import CustomButton from "../../../components/UI/CustomButton";
import config from "../../../config";
import {
  getDataApproval,
  updateDataApproval,
} from "../../../redux/actions/Admin/AdminActions";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getSpec,
  getCat,
} from "../../../redux/actions/category/categoryAction";
import OrgEditModal from "./OrgEditModal";
import SiteEditModal from "./SiteEditModal";
import SiteDetailsEditModal from "./SiteDetailsEditModal";
import { DataGrid } from "@mui/x-data-grid";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();
const ctc2 = new CancelToken();
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

  sortContainer: {
    display: "flex",
    gap: "10px",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
  },
  sortLabel: {
    fontSize: "14px",
    color: "#696974",
    paddingTop: "10px",
    paddingRight: "10px",
  },
  profileHeaderCard: {
    background: "white",
    margin: "10px",
    marginLeft: "0px",
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
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.71,
    letterSpacing: "normal",
    color: "#000",
  },
}));
const site = "site";
const subUser = "subUser";
const organisation = "organisation";
const siteService = "siteService";

const ApprovalMgt = (props) => {
  const classes = useStyle();

  const [expandedB, setExpandedB] = useState(true);
  const [expandedC, setExpandedC] = useState(true);
  const [expandedSD, setExpandedSD] = useState(true);

  const [loadingA, setLoadingA] = useState(true);
  const [loadingC, setLoadingC] = useState(true);
  const [loadingSD, setLoadingSD] = useState(true);

  const [dataSi, setDataSi] = useState([]);
  const [dataO, setDataO] = useState([]);
  const [dataSD, setDataSD] = useState([]);

  const [orgEditModal, setOrgEditModal] = useState(false);
  const [orgEditData, setOrgEditData] = useState(false);

  const [siteEditModal, setsiteEditModal] = useState(false);
  const [siteEditData, setsiteEditData] = useState(false);

  const [siteDetEditModal, setsiteDetEditModal] = useState(false);
  const [siteDetEditData, setsiteDetEditData] = useState(false);

  const [cat, setCat] = useState([]);
  const catRes = useSelector((state) => state.cat.cats);

  const loadDataForEdit = async () => {
    ctc2.createToken();
    await Promise.all([
      actions.getSpec(ctc2.getToken()),
      actions.getCat(ctc2.getToken()),
    ]);
  };

  useEffect(() => {
    makeCat();
  }, [catRes]);
  // console.log(
  //   cat.map((a) => {
  //     return { id: a._id, name: a.name };
  //   })
  // );
  // console.log(cat.map((a) => a._id));

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

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    { setTitle, getDataApproval, updateDataApproval, getSpec, getCat },
    dispatch
  );

  const getData = async (state) => {
    switch (state) {
      case site: {
        setLoadingA(() => true);
        const res = await callApi(state);
        setDataSi(() => res || []);
        setLoadingA(() => false);
        break;
      }
      // case subUser: {
      //   setLoadingB(() => true);
      //   const res = await callApi(state);
      //   setDataS(() => res || []);
      //   setLoadingB(() => false);
      //   break;
      // }
      case organisation: {
        setLoadingC(() => true);
        const res = await callApi(state);
        setDataO(() => res || []);
        setLoadingC(() => false);
        break;
      }
      case siteService: {
        setLoadingSD(() => true);
        const res = await callApi(state);
        setDataSD(() => res || []);
        setLoadingSD(() => false);
        break;
      }
    }
  };

  const approvalS = async (state, status, id) => {
    const data = {
      type: state,
      status: status,
      id: id,
    };
    switch (state) {
      case site: {
        setLoadingA(() => true);
        await actions.updateDataApproval(data);
        await getData(state);
        setLoadingA(() => false);
        break;
      }
      // case subUser: {
      //   setLoadingB(() => true);
      //   await actions.updateDataApproval(data);
      //   await getData(state);
      //   setLoadingB(() => false);
      //   break;
      // }
      case organisation: {
        setLoadingC(() => true);
        await actions.updateDataApproval(data);
        await getData(state);
        setLoadingC(() => false);
        break;
      }
      case siteService: {
        setLoadingSD(() => true);
        await actions.updateDataApproval(data);
        await getData(state);
        setLoadingSD(() => false);
        break;
      }
    }
  };
  const callApi = async (state) => {
    ctc.createToken();
    return await actions.getDataApproval(state, ctc.getToken());
  };

  useEffect(() => {
    actions.setTitle({ title: props.title });
    loadDataForEdit();
    getData(site);
    // getData(subUser);
    getData(organisation);
    getData(siteService);
    return () => {
      ctc.cancelTheApi();
      ctc2.cancelTheApi();
    };
  }, []);
  const Ocolumns = [
    {
      field: "new.organisationId.name",
      headerName: "Organization",
      minWidth: 100,
      flex: 1,
      renderCell: (e) => {
        return (
          (e.row?.new?.organisationId && e.row?.new?.organisationId.name) || "-"
        );
      },
      valueGetter: (params) => params.row?.new?.organisationId?.name || "-",
    },
    {
      field: "Alternative URL",
      headerName: "Alternative URL",
      minWidth: 160,
      renderCell: (e) => {
        return <div>{e.row.new.altWebsite || "-"}</div>;
      },
      valueGetter: (params) => params.row.new?.altWebsite || "-",
    },
    {
      field: "Services(Category & Subcategories)",
      headerName: "Services(Category & Subcategories)",
      flex: 1,
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (e) => {
        return (
          <div>
            {e.row.new?.subcategory
              ? e.row.new.subcategory.reduce(
                  (acc, a) => (acc += `${a.name}, `),
                  ""
                )
              : "-"}
          </div>
        );
      },
    },
    {
      field: "About",
      headerName: "About",
      flex: 1,
      width: 120,
      renderCell: (e) => {
        return <div>{e.row.new.about || "-"}</div>;
      },
      valueGetter: (params) => params.row.new?.about || "-",
    },
    {
      field: "Requested By",
      headerName: "Requested By",
      width: 120,
      renderCell: (e) => {
        return (
          <div>
            {(e.row.new.requestBy && e.row.new?.requestBy?.name) || "-"}
          </div>
        );
      },
      valueGetter: (params) => params.row.new?.requestBy?.name || "-",
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 190,
      flex: 1,
      renderCell: (e) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            {e.row.new.status === "pending" ? (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <CustomButton
                  name={"Approve"}
                  varient={"contained"}
                  onclick={() =>
                    approvalS(organisation, "approved", e.row.new._id)
                  }
                />
                <CustomButton
                  name="Edit"
                  varient="contained"
                  onclick={() => {
                    setOrgEditData(() => e.row);
                    setOrgEditModal(() => true);
                  }}
                />
                <CustomButton
                  name={"Reject"}
                  varient={"contained"}
                  onclick={() =>
                    approvalS(organisation, "cancelled", e.row.new._id)
                  }
                />
              </div>
            ) : (
              e.row.new.status
            )}
          </div>
        );
      },
    },
  ];
  const SiteColumns = [
    {
      field: "Organization",
      headerName: "Organization",
      minWidth: 100,
      flex: 1,
      renderCell: (e) => {
        return (
          <div>
            {(e.row.new?.organisationId && e.row.new?.organisationId?.name) ||
              "-"}
          </div>
        );
      },
      valueGetter: (params) => params.row?.new?.organisationId?.name || "-",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 120,
      renderCell: (e) => {
        return <div>{e.row.new?.name || "-"}</div>;
      },
      valueGetter: (params) => params.row?.new?.name || "-",
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 120,
      renderCell: (e) => {
        return <div>{e.row.new?.address || "-"}</div>;
      },
      valueGetter: (params) => params.row.new?.address || "-",
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 110,
      renderCell: (e) => {
        return <div>{e.row.new?.city || "-"}</div>;
      },
      valueGetter: (params) => params.row.new?.city | "-",
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 90,
      renderCell: (e) => {
        return e.row.new?.state ? e.row.new?.state?.map((a) => a) : "-";
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "zipcode",
      headerName: "Zipcode",
      minWidth: 90,
      renderCell: (e) => {
        return e.row.new?.zipcode || "-";
      },
      valueGetter: (params) => params.row.new?.zipcode || "-",
    },
    {
      field: "website",
      headerName: "Website",
      minWidth: 110,
      renderCell: (e) => {
        return e.row.new?.website || "-";
      },
      valueGetter: (params) => params.row.new?.website || "-",
    },
    {
      field: "Services(Category & Subcategories)",
      headerName: "Services(Category & Subcategories)",
      flex: 1,
      width: 120,
      renderCell: (e) => {
        return e.row.new?.subcategory
          ? e.row.new?.subcategory?.reduce(
              (acc, a) => (acc += `${a.name}, `),
              ""
            )
          : "-";
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "method",
      headerName: "Method",
      width: 90,
      renderCell: (e) => {
        return e.row.new?.method || "-";
      },
      valueGetter: (params) => params.row.new?.method || "-",
    },
    {
      field: "Requested By",
      headerName: "Requested By",
      width: 90,
      renderCell: (e) => {
        return (
          <div>
            {(e.row.new?.requestBy && e.row.new?.requestBy?.name) || "-"}
          </div>
        );
      },
      valueGetter: (params) => params.row.new?.requestBy?.name || "-",
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 190,
      flex: 1,
      renderCell: (e) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            {e.row.new.status === "pending" ? (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <CustomButton
                  name={"Approve"}
                  varient={"contained"}
                  onclick={() => approvalS(site, "approved", e.row.new._id)}
                />
                {e.row.new?.method && e.row.new?.method === "update" ? (
                  <CustomButton
                    name="Edit"
                    varient="contained"
                    onclick={() => {
                      setsiteEditData(() => e.row);
                      setsiteEditModal(() => true);
                    }}
                  />
                ) : null}
                <CustomButton
                  name={"Reject"}
                  varient={"contained"}
                  onclick={() => approvalS(site, "cancelled", e.row.new._id)}
                />
              </div>
            ) : (
              e.row.new.status
            )}
          </div>
        );
      },
    },
  ];
  const SiteDetColumns = [
    {
      field: "Organization",
      headerName: "Organization",
      minWidth: 100,
      flex: 0.6,
      renderCell: (e) => {
        return (
          <div>
            {(e.row.new?.siteId?.organisationId &&
              e.row.new?.siteId?.organisationId?.name) ||
              "-"}
          </div>
        );
      },
      valueGetter: (params) =>
        params.row.new?.siteId?.organisationId?.name || "-",
    },
    {
      field: "Site Name",
      headerName: "Site Name",
      minWidth: 120,
      renderCell: (e) => {
        return <div>{e.row.new?.siteId?.name || "-"}</div>;
      },
      valueGetter: (params) => params.row.new?.siteId?.name || "-",
    },
    {
      field: "Category Name",
      headerName: "Category Name",
      minWidth: 120,
      renderCell: (e) => {
        return (
          <div>
            {(e.row.new?.subCategoryId &&
              e.row.new?.subCategoryId?.category_id &&
              e.row.new?.subCategoryId?.category_id?.name) ||
              "-"}
          </div>
        );
      },
      valueGetter: (e) => e.row.new?.subCategoryId?.category_id?.name || "-",
    },
    {
      field: "Subcategory Name",
      headerName: "Subcategory Name",
      minWidth: 120,
      renderCell: (e) => {
        return (
          <div>
            {(e.row.new?.subCategoryId && e.row.new?.subCategoryId?.name) ||
              "-"}
          </div>
        );
      },
      valueGetter: (e) => e.row.new?.subCategoryId?.name || "-",
    },
    {
      field: "Service Name",
      headerName: "Service Name",
      minWidth: 120,
      renderCell: (e) => {
        return e.row.new?.serviceName || "-";
      },
      valueGetter: (params) => params.row.new?.serviceName || "-",
    },
    {
      field: "Service Description",
      headerName: "Service Description",
      minWidth: 120,
      renderCell: (e) => {
        return e.row.new?.serviceDescription || "-";
      },
      valueGetter: (params) => params.row.new?.serviceDescription || "-",
    },
    {
      field: "Service Webpage",
      headerName: "Service Webpage",
      minWidth: 120,
      flex: 0.8,
      renderCell: (e) => {
        return e.row.new?.serviceWebpage || "-";
      },
      valueGetter: (params) => params.row.new?.serviceWebpage || "-",
    },
    {
      field: "Price",
      headerName: "Price",
      sortable: false,
      filterable: false,
      minWidth: 120,
      flex: 0.6,
      renderCell: (e) => {
        return e.row.new?.price && e.row.new.price.length
          ? e.row.new.price.reduce((acc, a) => (acc += `${a}, `), "")
          : "-";
      },
    },
    {
      field: "poc's",
      headerName: "Poc's",
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: (e) => {
        return e.row.new?.poc && e.row.new?.poc?.length
          ? e.row.new?.poc?.reduce((acc, a) => (acc += `${a.name}, `), "")
          : "-";
      },
    },
    {
      field: "Requested By",
      headerName: "Requested By",
      width: 90,
      renderCell: (e) => {
        return (
          <div>
            {(e.row.new?.requestBy && e.row.new?.requestBy?.name) || "-"}
          </div>
        );
      },
      valueGetter: (params) => params.row.new?.requestBy?.name || "-",
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      minWidth: 200,
      flex: 1,
      renderCell: (e) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            {e.row.new?.status === "pending" ? (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <CustomButton
                  name={"Approve"}
                  varient={"contained"}
                  onclick={() =>
                    approvalS(siteService, "approved", e.row.new?._id)
                  }
                />
                {e.row.new?.method && e.row.new?.method === "update" ? (
                  <CustomButton
                    name="Edit"
                    varient="contained"
                    onclick={() => {
                      setsiteDetEditData(() => e.row);
                      setsiteDetEditModal(() => true);
                    }}
                  />
                ) : null}
                <CustomButton
                  name={"Reject"}
                  varient={"contained"}
                  onclick={() =>
                    approvalS(siteService, "cancelled", e.row.new?._id)
                  }
                />
              </div>
            ) : (
              e.row.new?.status || "-"
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className={classes.aboutContainer}>
      <Grid container spacing={2}>
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
              <div>Organization Approval</div>
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
              <div style={{ height: 550, overflow: "auto", width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.new._id}
                  rows={dataO || []}
                  disableExtendRowFullWidth={false}
                  columns={Ocolumns}
                  disableSelectionOnClick
                  rowHeight={100}
                  loading={loadingC}
                  rowsPerPageOptions={[...config.pageSlot]}
                />
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
              <div>Site Approval</div>
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
              <div style={{ height: 550, overflow: "auto", width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.new._id}
                  rows={dataSi || []}
                  disableExtendRowFullWidth={false}
                  columns={SiteColumns}
                  disableSelectionOnClick
                  loading={loadingA}
                  rowHeight={100}
                  rowsPerPageOptions={[...config.pageSlot]}
                />
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
              onClick={() => setExpandedSD((o) => !o)}
            >
              <div>Site Details Approval</div>
              <ExpandMore
                expand={expandedSD}
                onClick={() => setExpandedSD((o) => !o)}
                aria-expanded={expandedSD}
                aria-label="show more"
              >
                <ExpandMoreIcon
                  onClick={() => setExpandedSD((o) => !o)}
                  fontSize="large"
                />
              </ExpandMore>
            </div>
            <Collapse in={expandedSD} timeout="auto" unmountOnExit>
              <Divider />
              <div style={{ height: 550, overflow: "auto", width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.new._id}
                  rows={dataSD || []}
                  disableExtendRowFullWidth={false}
                  columns={SiteDetColumns}
                  disableSelectionOnClick
                  loading={loadingSD}
                  rowHeight={100}
                  rowsPerPageOptions={[...config.pageSlot]}
                />
              </div>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
      <OrgEditModal
        cat={cat}
        classes={classes}
        handleClose={() => {
          setOrgEditData(() => false);
          setOrgEditModal(() => false);
        }}
        id={
          (orgEditData &&
            orgEditData.new &&
            orgEditData.new.organisationId &&
            orgEditData.new.organisationId._id) ||
          ""
        }
        open={orgEditModal}
        orgSData={orgEditData.old || ""}
        orgSDataNew={orgEditData.new || ""}
        getData={() => getData(organisation)}
      />
      <SiteEditModal
        cat={cat}
        classes={classes}
        handleClose={() => {
          setsiteEditData(() => false);
          setsiteEditModal(() => false);
        }}
        editData={siteEditData.old || ""}
        editDataNew={siteEditData.new || ""}
        open={siteEditModal}
        getData={() => getData(site)}
      />
      <SiteDetailsEditModal
        handleClose={() => {
          setsiteDetEditData(() => false);
          setsiteDetEditModal(() => false);
        }}
        editData={siteDetEditData.old || ""}
        editDataNew={siteDetEditData.new || ""}
        allPoc={siteDetEditData.allPoc || []}
        open={siteDetEditModal}
        getData={() => getData(siteService)}
      />
    </div>
  );
};

export default ApprovalMgt;
