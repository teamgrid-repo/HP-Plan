import { Card, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import {
  getAdminDashboard,
  getDwdRescourse,
  getActiveProvider,
  getActiveGeneral,
} from "../../../redux/actions/Admin/AdminActions";
import CustomButton from "../../../components/UI/CustomButton";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingComponent from "../../../components/UI/LoadingComponent";
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
  cardStyle: {
    height: "250px",
    overflow: "auto",
  },
  stateCard: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  cardTitle: {
    color: "#17589F",
    fontSize: "28px",
    fontWeight: 600,
    paddingTop: "15px",
    paddingBottom: "10px",
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

const Home = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setTitle,
      getAdminDashboard,
      getDwdRescourse,
      getActiveProvider,
      getActiveGeneral,
    },
    dispatch
  );
  const loc = useNavigate();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeProvider, setActiveProvider] = useState([]);
  const [activeGeneral, setActiveGeneral] = useState([]);

  const loadData = async () => {
    setLoading(true);
    const res = await Promise.all([
      actions.getDwdRescourse(ctc.getToken()),
      actions.getAdminDashboard(ctc.getToken()),
      actions.getActiveProvider(ctc.getToken()),
      actions.getActiveGeneral(ctc.getToken()),
    ]);
    if (res && res[1]) {
      setData(() => res[1]);
    } else {
      setData(() => "");
    }
    if (res && res[2]) {
      setActiveProvider(() => res[2]);
    }
    if (res && res[3]) {
      setActiveGeneral(() => res[3]);
    }
    setLoading(false);
  };
  const ud = useSelector((state) => state.auth.user.subRole);
  useEffect(() => {}, [ud]);
  useEffect(() => {
    ctc.createToken();
    actions.setTitle({ shrink: true });
    loadData();
    return () => ctc.cancelTheApi();
  }, []);

  const downloadUser = (user) => {
    let dData = "";
    if (user === "provider") {
      if (activeProvider) {
        dData = activeProvider.map((a) => {
          return {
            ["First Name "]: a.firstName ?? "-",
            ["Last Name"]: a.lastName ?? "-",
            ["Email address (used for sign up)"]: a.email ?? "-",
            ["Most recent date provider user terms signed"]: a?.acceptHippaDate
              ? moment(a?.acceptHippaDate).format("MMM, DD yyyy")
              : a?.acceptProviderTermsDate
              ? moment(a?.acceptProviderTermsDate).format("MMM, DD yyyy")
              : "-",
            ["Organization level street address"]:
              a?.organization?.address ?? "-",
            ["Organization level city"]: a.organization?.city ?? "-",
            ["Organization level state"]: a.organization?.state ?? "-",
            ["Organization level zip code"]: a.organization?.zipcode ?? "-",
          };
        });
      }
    } else {
      if (activeGeneral) {
        dData = activeGeneral.map((a) => {
          return {
            ["Name"]: a.name ?? "-",
            ["Email address (used for sign up)"]: a.email ?? "-",
            ["Most recent date general user terms signed"]: a?.profileId
              ?.acceptTermsDate
              ? moment(a?.profileId?.acceptTermsDate).format("MMM, DD yyyy")
              : "-",
          };
        });
      }
    }

    if (dData) {
      var wb = window.XLSX.utils.book_new();
      const name =
        user === "provider"
          ? "all active provider user.xlsx"
          : "all active general user.xlsx";

      wb.Props = {
        Title: name,
        Subject: name,
        Author: "HerPlan",
        CreatedDate: new Date(),
      };
      wb.SheetNames.push("Test Sheet");
      var ws = window.XLSX.utils.json_to_sheet(dData);
      wb.Sheets["Test Sheet"] = ws;
      var wbout = window.XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      function s2ab(s) {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf); //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
        return buf;
      }
      const bb = s2ab(wbout);
      const blobb = new Blob(
        [bb],
        { type: "application/octet-stream" },
        "test.xlsx"
      );
      const url = window.URL.createObjectURL(blobb);
      var a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
    } else {
      toast.warn("No User Data Found");
    }
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <div className={classes.aboutContainer}>
      <Grid container spacing={3}>
        {ud === "master" || ud === "officer" ? (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack gap="10px" flexDirection="row">
              <CustomButton
                name="All Active Providers on Platform"
                varient="contained"
                onclick={() => downloadUser("provider")}
              />
              <CustomButton
                name="All Active General Users"
                varient="contained"
                onclick={() => downloadUser("user")}
              />
            </Stack>
          </Grid>
        ) : null}
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Organizations</div>
            <div className={classes.stateCard}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data && data.organisation && data.organisation.total) || 0}
                </div>
                <div className={classes.titleDiv}>Total</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data && data.organisation && data.organisation.publish) ||
                    0}
                </div>
                <div className={classes.titleDiv}>Publish</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {data && data.organisation
                    ? data.organisation.total - data.organisation.publish
                    : 0}
                </div>
                <div className={classes.titleDiv}>Pending</div>
              </div>
            </div>
            <div className={classes.linkDiv}>
              Go To{" "}
              <span
                style={{ color: "#17589F", cursor: "pointer" }}
                onClick={() => loc("/organizations-list")}
              >
                Manage Organization Page &gt;
              </span>{" "}
            </div>
          </Card>
        </Grid>
        {/* <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Search Link</div>
            <div className={classes.stateCard}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data && data.searchLink.total) || 0}
                </div>
                <div className={classes.titleDiv}>Total</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data && data.searchLink.claim) || 0}
                </div>
                <div className={classes.titleDiv}>Claim</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {data ? data.searchLink.total - data.searchLink.claim : 0}
                </div>
                <div className={classes.titleDiv}>Pending</div>
              </div>
            </div>
            <div className={classes.linkDiv}>
              Go To{" "}
              <span
                style={{ color: "#17589F", cursor: "pointer" }}
                onClick={() => loc("/management-search")}
              >
                Manage Search Page &gt;
              </span>{" "}
            </div>
          </Card>
        </Grid> */}
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Provider Users</div>
            <div className={classes.stateCard}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data &&
                    data.accountApproval &&
                    data.accountApproval.total) ||
                    0}
                </div>
                <div className={classes.titleDiv}>Total</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data &&
                    data.accountApproval &&
                    data.accountApproval.approved) ||
                    0}
                </div>
                <div className={classes.titleDiv}>Approved</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data &&
                    data.accountApproval &&
                    data.accountApproval.pending) ||
                    0}
                </div>
                <div className={classes.titleDiv}>Pending</div>
              </div>
            </div>
            <div className={classes.linkDiv}>
              Go To{" "}
              <span
                style={{ color: "#17589F", cursor: "pointer" }}
                onClick={() => loc("/provider-user-manage")}
              >
                Provider Users &gt;
              </span>{" "}
            </div>
          </Card>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card className={classes.cardStyle}>
            <div className={classes.cardTitle}>Organization Approval</div>
            <div className={classes.stateCard}>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data && data.dataApproval && data.dataApproval.total) || 0}
                </div>
                <div className={classes.titleDiv}>Total</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data && data.dataApproval && data.dataApproval.approved) ||
                    0}
                </div>
                <div className={classes.titleDiv}>Approved</div>
              </div>
              <div className={classes.innerCard}>
                <div className={classes.numDiv}>
                  {(data && data.dataApproval && data.dataApproval.pending) ||
                    0}
                </div>
                <div className={classes.titleDiv}>Pending</div>
              </div>
            </div>
            <div className={classes.linkDiv}>
              Go To{" "}
              <span
                style={{ color: "#17589F", cursor: "pointer" }}
                onClick={() => loc("/approval-manage")}
              >
                Organization Approval Page &gt;
              </span>{" "}
            </div>
          </Card>
        </Grid>
        {ud !== "analyst" && (
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Card className={classes.cardStyle}>
              <div className={classes.cardTitle}>Organization Claims </div>
              <div className={classes.stateCard}>
                <div className={classes.innerCard}>
                  <div className={classes.numDiv}>
                    {(data && data.siteClaim && data.siteClaim.total) || 0}
                  </div>
                  <div className={classes.titleDiv}>Total</div>
                </div>
                <div className={classes.innerCard}>
                  <div className={classes.numDiv}>
                    {(data && data.siteClaim && data.siteClaim.approved) || 0}
                  </div>
                  <div className={classes.titleDiv}>Approved</div>
                </div>
                <div className={classes.innerCard}>
                  <div className={classes.numDiv}>
                    {(data && data.siteClaim && data.siteClaim.pending) || 0}
                  </div>
                  <div className={classes.titleDiv}>Pending</div>
                </div>
              </div>
              <div className={classes.linkDiv}>
                Go To{" "}
                <span
                  style={{ color: "#17589F", cursor: "pointer" }}
                  onClick={() => loc("/claim-manage")}
                >
                  Organization Claims Page &gt;
                </span>{" "}
              </div>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Home;
