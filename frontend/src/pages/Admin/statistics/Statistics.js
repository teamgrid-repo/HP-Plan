import { Card, Grid } from "@mui/material";
import { bindActionCreators } from "redux";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getStateData,
  getFilterStateData,
} from "../../../redux/actions/Admin/AdminActions";
import { makeStyles } from "@mui/styles";
import config from "../../../config";
import { DataGrid } from "@mui/x-data-grid";
import CancelToken from "../../../utils/cancelClass";
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
  cardTitle: {
    color: "#17589F",
    fontSize: "28px",
    fontWeight: 600,
    paddingTop: "15px",
    paddingBottom: "10px",
  },
  cardStyle: {
    height: "310px",
    overflow: "auto",
  },
  stateCard: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "9%",
    flexWrap: "wrap",
  },
  innerCard: {
    padding: "10px",
  },
  numDiv: {
    fontSize: "26px",
    fontWeight: 400,
  },
  titleDiv: {
    fontSize: "28px",
    fontWeight: 500,
    color: "#17589F",
  },
  linkDiv: {
    fontSize: "18px",
    marginTop: "22px",
    fontWeight: 500,
  },
}));
const Statistics = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setTitle,
      getStateData,
      getFilterStateData,
    },
    dispatch
  );
  const [loading, setLoading] = useState(true);
  const [searchLinkData, setSearchLinkData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [providerState, setProviderState] = useState([]);
  const [generalState, setGeneralState] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [psubCatbyState, setPSubCatByState] = useState([]);
  const [usubCatbyState, setUSubCatByState] = useState([]);

  const [countData, setCountData] = useState({
    inProgress: 0,
    todayClaim: 0,
    total: 0,
    analyst: 0,
    generalUser: 0,
    manager: 0,
    providerUser: 0,
    Approved: 0,
    Cancelled: 0,
    Pending: 0,
    totalPublishOrg: 0,
    totalUnPublisOrg: 0,
    totalPublishSite: 0,
    totalUnPublisSite: 0,
    msg: 0,
    rooms: 0,
  });
  const [publishOrg, setPublishOrg] = useState([]);
  const [unPublishOrg, setUnPublishOrg] = useState([]);
  const [publishSite, setPublishSite] = useState([]);
  const [unPublishSite, setUnPublishSite] = useState([]);
  const [filterPages, setFilterPages] = useState([]);
  const [siteClaim, setSiteClaim] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const sumFromObj = (obj) => {
    let sum = Object.values(obj).reduce((p, c) => (p += c ? +c : 0), 0);
    return sum;
  };
  const getData = async () => {
    setLoading(true);
    const [res, res2] = await Promise.all([
      actions.getStateData(ctc.getToken()),
      actions.getFilterStateData(ctc.getToken()),
    ]);
    if (res) {
      if (res.searchLink) {
        const sdata = {};
        if (res.searchLink.totalByState) {
          Object.keys(res.searchLink.totalByState).forEach((a) => {
            if (sdata[a]) {
              sdata[a] = {
                ...sdata[a],
                claim: +sdata[a].claim + +res.searchLink.totalByState[a],
              };
            } else {
              sdata[a] = {
                id: a,
                state: a,
                unclaim: 0,
                claim: +res.searchLink.totalByState[a],
              };
            }
          });
        }
        if (res.searchLink.unclaimByState) {
          Object.keys(res.searchLink.unclaimByState).forEach((a) => {
            if (sdata[a]) {
              sdata[a] = {
                ...sdata[a],
                unclaim: +sdata[a].unclaim + +res.searchLink.unclaimByState[a],
              };
            } else {
              sdata[a] = {
                id: a,
                state: a,
                claim: 0,
                unclaim: +res.searchLink.unclaimByState[a],
              };
            }
          });
        }
        setSearchLinkData(() => Object.values(sdata));
      }
      if (res.totalBySubCats) {
        setSubCatData(() =>
          Object.keys(res.totalBySubCats).map((a) => {
            return { id: a, subCat: a, count: res.totalBySubCats[a] };
          })
        );
      }
      if (res.providerList) {
        setProviderList(() =>
          Object.keys(res.providerList).map((a) => {
            return { id: a, state: a, count: res.providerList[a] };
          })
        );
      }
      if (res.totalProviderByState) {
        const pdata = {};
        Object.keys(res.totalProviderByState).forEach((a) => {
          if (res.totalProviderByState[a]) {
            if (pdata[a]) {
              pdata[a] = {
                ...pdata[a],
                count: +pdata[a].count + +res.totalProviderByState[a],
              };
            } else {
              pdata[a] = {
                id: a,
                state: a,
                count: +res.totalProviderByState[a],
              };
            }
          }
        });
        setProviderState(() => Object.values(pdata));
      }

      if (res.totalGenUserByState) {
        const pdata = {};
        Object.keys(res.totalGenUserByState).forEach((a) => {
          if (res.totalGenUserByState[a]) {
            if (pdata[a]) {
              pdata[a] = {
                ...pdata[a],
                count: +pdata[a].count + +res.totalGenUserByState[a],
              };
            } else {
              pdata[a] = {
                id: a,
                state: a,
                count: +res.totalGenUserByState[a],
              };
            }
          }
        });
        setGeneralState(() => Object.values(pdata));
      }
      if (res.userData) {
        const ud = { ...res.userData };
        if (res.message) {
          ud.msg = res.message.totalMsg;
          ud.rooms = res.message.room;
        }
        if (res.searchLink) {
          ud.inProgress = res.searchLink.inProgress || 0;
          ud.todayClaim = res.searchLink.todayClaim || 0;
          ud.total = res.searchLink.total || 0;
        }
        if (res.appointment && res.appointment.appoint) {
          ud.cancelled = res.appointment.appoint.cancelled || 0;
          ud.approved = res.appointment.appoint.approved || 0;
          ud.pending = res.appointment.appoint.pending || 0;
        }
        if (res.organisationAndSite) {
          if (res.organisationAndSite.totalPublishOrgByState) {
            ud.totalPublishOrg =
              sumFromObj(res.organisationAndSite.totalPublishOrgByState) || 0;
          }
          if (res.organisationAndSite.totalUnPublishOrgByState) {
            ud.totalUnPublisOrg =
              sumFromObj(res.organisationAndSite.totalUnPublishOrgByState) || 0;
          }
          if (res.organisationAndSite.totalPublishSiteByState) {
            ud.totalPublishSite =
              sumFromObj(res.organisationAndSite.totalPublishSiteByState) || 0;
          }
          if (res.organisationAndSite.totalUnPublishSiteByState) {
            ud.totalUnPublisSite =
              sumFromObj(res.organisationAndSite.totalUnPublishSiteByState) ||
              0;
          }
        }
        setCountData(() => ud);
      }
      if (res.appointment && res.appointment.stateObj) {
        const pdata = {};
        Object.keys(res.appointment.stateObj).forEach((a) => {
          if (res.appointment.stateObj[a]) {
            if (!pdata[a]) {
              pdata[a] = {
                id: a,
                state: a,
                ...res.appointment.stateObj[a],
              };
            }
          }
        });
        setAppointment(() => Object.values(pdata));
      }
      if (res.organisationAndSite) {
        if (res.organisationAndSite.totalPublishServiceByState) {
          setPSubCatByState(
            () => res.organisationAndSite.totalPublishServiceByState
          );
        }
        if (res.organisationAndSite.totalUnPublishServiceByState) {
          setUSubCatByState(
            () => res.organisationAndSite.totalUnPublishServiceByState
          );
        }
        if (res.organisationAndSite.totalPublishOrgByState) {
          const pdata = {};
          Object.keys(res.organisationAndSite.totalPublishOrgByState).forEach(
            (a) => {
              if (res.organisationAndSite.totalPublishOrgByState[a])
                if (!pdata[a]) {
                  pdata[a] = {
                    id: a,
                    state: a,
                    count: res.organisationAndSite.totalPublishOrgByState[a],
                  };
                }
            }
          );
          setPublishOrg(() => Object.values(pdata));
        }
        if (res.organisationAndSite.totalUnPublishOrgByState) {
          const pdata = {};
          Object.keys(res.organisationAndSite.totalUnPublishOrgByState).forEach(
            (a) => {
              if (!pdata[a]) {
                pdata[a] = {
                  id: a,
                  state: a,
                  count: res.organisationAndSite.totalUnPublishOrgByState[a],
                };
              }
            }
          );
          setUnPublishOrg(() => Object.values(pdata));
        }
        if (res.organisationAndSite.totalPublishSiteByState) {
          const pdata = {};
          Object.keys(res.organisationAndSite.totalPublishSiteByState).forEach(
            (a) => {
              if (a) {
                if (!pdata[a]) {
                  pdata[a] = {
                    id: a,
                    state: a,
                    count: res.organisationAndSite.totalPublishSiteByState[a],
                  };
                }
              }
            }
          );
          setPublishSite(() => Object.values(pdata));
        }
        if (res.organisationAndSite.totalUnPublishSiteByState) {
          const pdata = {};
          Object.keys(
            res.organisationAndSite.totalUnPublishSiteByState
          ).forEach((a) => {
            if (a) {
              if (!pdata[a]) {
                pdata[a] = {
                  id: a,
                  state: a,
                  count: res.organisationAndSite.totalUnPublishSiteByState[a],
                };
              }
            }
          });
          setUnPublishSite(() => Object.values(pdata));
        }
        if (res.organisationAndSite.totalSiteClaim) {
          setSiteClaim(() =>
            Object.keys(res.organisationAndSite.totalSiteClaim).map((a, id) => {
              return {
                id: a + id,
                state: a,
                ...res.organisationAndSite.totalSiteClaim[a],
              };
            })
          );
        }
      }
    }
    if (res2) {
      setFilterPages(() =>
        Object.keys(res2).map((a, id) => {
          return {
            id: a + id,
            state: a,
            ...res2[a],
          };
        })
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    actions.setTitle({ title: props.title });
    ctc.createToken();
    getData();
    return () => ctc.cancelTheApi();
  }, []);

  const columns = [
    { field: "state", headerName: "State", minWidth: 120, flex: 1 },
    { field: "claim", headerName: "Claim", minWidth: 120, flex: 1 },
    { field: "unclaim", headerName: "Unclaim", minWidth: 120, flex: 1 },
  ];
  const columnsSubCat = [
    { field: "subCat", headerName: "Subcategory", minWidth: 120, flex: 1 },
    { field: "count", headerName: "Total", minWidth: 120 },
  ];
  const columnsStateProvider = [
    { field: "state", headerName: "State", minWidth: 120, flex: 1 },
    { field: "count", headerName: "Total", minWidth: 120 },
  ];
  const columnAppointment = [
    { field: "state", headerName: "State", minWidth: 120, flex: 1 },
    { field: "approved", headerName: "Approved", minWidth: 80 },
    { field: "cancelled", headerName: "Canceled", minWidth: 80 },
    { field: "pending", headerName: "Pending", minWidth: 80 },
  ];
  const columnPublishOrg = [
    {
      field: "state",
      headerName: "State",
      minWidth: 120,
      flex: 1,
      valueGetter: ({ row }) => {
        let result = "not assigned";
        if (row.state) {
          result = row.state;
        }
        return result;
      },
    },
    { field: "count", headerName: "Count", minWidth: 80 },
  ];
  const columnServiceByStateOrg = [
    {
      field: "name",
      headerName: "Subcategory",
      minWidth: 120,
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 80,
      flex: 1,
      valueGetter: ({ row }) => {
        let result = "";
        if (row.state) {
          Object.keys(row.state).forEach((a) => {
            result += `${a}:- ${row.state[a]}, `;
          });
        }
        return result;
      },
    },
  ];
  const columnFilterC = [
    {
      field: "state",
      headerName: "State",
      minWidth: 120,
      flex: 1,
      valueGetter: ({ row }) => {
        let result = "not assigned";
        if (row.state) {
          result = row.state;
        }
        return result;
      },
    },
    {
      field: "filter-general",
      headerName: "Filter",
      minWidth: 100,
      valueGetter: ({ row }) => {
        let result = 0;
        if (row["filter-general"]) {
          result = row["filter-general"];
        }
        return result;
      },
      flex: 1,
    },
    {
      field: "filter-additional",
      headerName: "Additional Filter",
      minWidth: 100,
      valueGetter: ({ row }) => {
        let result = 0;
        if (row["filter-additional"]) {
          result = row["filter-additional"];
        }
        return result;
      },
      flex: 1,
    },
    {
      field: "quiz",
      headerName: "Quiz",
      minWidth: 100,
      valueGetter: ({ row }) => {
        let result = 0;
        if (row["quiz"]) {
          result = row["quiz"];
        }
        return result;
      },
      flex: 1,
    },
  ];
  const columnClaimSie = [
    {
      field: "state",
      headerName: "State",
      minWidth: 120,
      flex: 1,
      valueGetter: ({ row }) => {
        let result = "not assigned";
        if (row.state) {
          result = row.state;
        }
        return result;
      },
    },
    {
      field: "pending",
      headerName: "Pending",
      minWidth: 100,
      valueGetter: ({ row }) => {
        let result = 0;
        if (row.pending) {
          result = row.pending;
        }
        return result;
      },
      flex: 1,
    },
    {
      field: "approved",
      headerName: "Approved",
      minWidth: 100,
      valueGetter: ({ row }) => {
        let result = 0;
        if (row.approved) {
          result = row.approved;
        }
        return result;
      },
      flex: 1,
    },
    {
      field: "cancelled",
      headerName: "Canceled",
      minWidth: 100,
      valueGetter: ({ row }) => {
        let result = 0;
        if (row.cancelled) {
          result = row.cancelled;
        }
        return result;
      },
      flex: 1,
    },
  ];
  return (
    <div className={classes.aboutContainer}>
      {" "}
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <div className={classes.cardTitle}>Search Link By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={searchLinkData || []}
              disableExtendRowFullWidth={false}
              columns={columns}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Search Link</div>
            <div className={classes.stateCard}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>{countData.total || 0}</div>
                <div className={classes.titleDiv}>Total</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.todayClaim || 0}
                </div>
                <div className={classes.titleDiv}>Today</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.inProgress || 0}
                </div>
                <div className={classes.titleDiv}>Inprogress</div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>Publish Subcategory By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.name}
              rows={psubCatbyState || []}
              disableExtendRowFullWidth={false}
              columns={columnServiceByStateOrg}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>
            UnPublish Subcategory By State
          </div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.name}
              rows={usubCatbyState || []}
              disableExtendRowFullWidth={false}
              columns={columnServiceByStateOrg}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <div className={classes.cardTitle}>Provider By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={providerState || []}
              disableExtendRowFullWidth={false}
              columns={columnsStateProvider}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <div className={classes.cardTitle}>General By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={generalState || []}
              disableExtendRowFullWidth={false}
              columns={columnsStateProvider}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>Provider By Subcategory</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={subCatData || []}
              disableExtendRowFullWidth={false}
              columns={columnsSubCat}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>

        <Grid item lg={3} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>Provider List By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={providerList || []}
              disableExtendRowFullWidth={false}
              columns={columnPublishOrg}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Users</div>
            <div className={classes.stateCard} style={{ marginTop: "4%" }}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>{countData.analyst || 0}</div>
                <div className={classes.titleDiv}>Analyst</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>{countData.manager || 0}</div>
                <div className={classes.titleDiv}>Manager</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.generalUser || 0}
                </div>
                <div className={classes.titleDiv}>General</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.providerUser || 0}
                </div>
                <div className={classes.titleDiv}>Provider</div>
              </div>
            </div>
          </Card>
        </Grid>

        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Communication</div>
            <div className={classes.stateCard} style={{ marginTop: "4%" }}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>{countData.rooms || 0}</div>
                <div className={classes.titleDiv}>Total Threads</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>{countData.msg || 0}</div>
                <div className={classes.titleDiv}>Total Message</div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Appointments</div>
            <div className={classes.stateCard} style={{ marginTop: "4%" }}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>{countData.analyst || 0}</div>
                <div className={classes.titleDiv}>Approved</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>{countData.manager || 0}</div>
                <div className={classes.titleDiv}>Canceled</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.generalUser || 0}
                </div>
                <div className={classes.titleDiv}>Pending</div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>Appointment By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={appointment || []}
              disableExtendRowFullWidth={false}
              columns={columnAppointment}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>Publish Org By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={publishOrg || []}
              disableExtendRowFullWidth={false}
              columns={columnPublishOrg}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>UnPublish Org By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={unPublishOrg || []}
              disableExtendRowFullWidth={false}
              columns={columnPublishOrg}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>Publish Site By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={publishSite || []}
              disableExtendRowFullWidth={false}
              columns={columnPublishOrg}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div className={classes.cardTitle}>UnPublish Site By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={unPublishSite || []}
              disableExtendRowFullWidth={false}
              columns={columnPublishOrg}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Publish</div>
            <div className={classes.stateCard} style={{ marginTop: "4%" }}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.totalPublishOrg || 0}
                </div>
                <div className={classes.titleDiv}>Organization</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.totalPublishSite || 0}
                </div>
                <div className={classes.titleDiv}>Site</div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>UnPublish</div>
            <div className={classes.stateCard} style={{ marginTop: "4%" }}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.totalUnPublisOrg || 0}
                </div>
                <div className={classes.titleDiv}>Organization</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {countData.totalUnPublisSite || 0}
                </div>
                <div className={classes.titleDiv}>Site</div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <div className={classes.cardTitle}>Visit Counts By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={filterPages || []}
              disableExtendRowFullWidth={false}
              columns={columnFilterC}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Total Visit Counts</div>
            <div className={classes.stateCard}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {filterPages && filterPages.length
                    ? filterPages.reduce((a, b) => {
                        if (b["filter-general"]) {
                          a += b["filter-general"];
                        }
                        return a;
                      }, 0) || 0
                    : 0}
                </div>
                <div className={classes.titleDiv}>Filter</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {filterPages && filterPages.length
                    ? filterPages.reduce((a, b) => {
                        if (b["filter-additional"]) {
                          a += b["filter-additional"];
                        }
                        return a;
                      }, 0) || 0
                    : 0}
                </div>
                <div className={classes.titleDiv}>Additional Filter</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {filterPages && filterPages.length
                    ? filterPages.reduce((a, b) => {
                        if (b["quiz"]) {
                          a += b["quiz"];
                        }
                        return a;
                      }, 0) || 0
                    : 0}
                </div>
                <div className={classes.titleDiv}>Quiz</div>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <div className={classes.cardTitle}>Site Claims By State</div>
          <div style={{ height: 250, overflow: "auto", width: "100%" }}>
            <DataGrid
              rows={siteClaim || []}
              disableExtendRowFullWidth={false}
              columns={columnClaimSie}
              disableSelectionOnClick
              loading={loading}
              rowsPerPageOptions={[...config.pageSlot]}
            />
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Total Site Claims</div>
            <div className={classes.stateCard}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {siteClaim && siteClaim.length
                    ? siteClaim.reduce((a, b) => {
                        if (b.pending) {
                          a += b.pending;
                        }
                        return a;
                      }, 0) || 0
                    : 0}
                </div>
                <div className={classes.titleDiv}>Pending</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {siteClaim && siteClaim.length
                    ? siteClaim.reduce((a, b) => {
                        if (b.approved) {
                          a += b.approved;
                        }
                        return a;
                      }, 0) || 0
                    : 0}
                </div>
                <div className={classes.titleDiv}>Approved</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {siteClaim && siteClaim.length
                    ? siteClaim.reduce((a, b) => {
                        if (b["cancelled"]) {
                          a += b["cancelled"];
                        }
                        return a;
                      }, 0) || 0
                    : 0}
                </div>
                <div className={classes.titleDiv}>Canceled</div>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
