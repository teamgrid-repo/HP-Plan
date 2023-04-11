import { useTheme } from "@emotion/react";
import { Card, Grid, Tab, Tabs, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrgDetailsTab from "./OrgDetailsTab";
// import OrgServiceTab from "./OrgServiceTab";
import ProviderSiteTab from "./ProviderSiteTab";
import { bindActionCreators } from "redux";
import {
  getAdminOrg,
  getAdminOrgSite,
  getAdminOrgSubUser,
  getPOC,
} from "../../../redux/actions/Admin/AdminActions";
import {
  getSpec,
  getCat,
} from "../../../redux/actions/category/categoryAction";
import SubUser from "./SubUser";
import { useParams } from "react-router-dom";
import { getIdRole } from "../../../redux/actions/profile/profileActions";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  tab: {
    textTransform: "none !important",
    fontSize: "16px",
    fontWeight: 700,
    color: "black",
  },
  scrollTab: {
    maxWidth: "100%",
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

const EditOrgination = () => {
  const theme = useTheme();
  const classes = useStyle();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);
  const [selCat, setSelCat] = useState([]);

  const catRes = useSelector((state) => state.cat.cats);
  const spaceRes = useSelector((state) => state.cat.space);
  const p = useParams();
  const orgD = useSelector((state) => state.admin.orgD);

  const dispatch = useDispatch();
  const action = bindActionCreators(
    {
      getCat,
      getSpec,
      getAdminOrg,
      getAdminOrgSite,
      getAdminOrgSubUser,
      getPOC,
      getIdRole,
    },
    dispatch
  );

  const getData = async () => {
    setLoading(true);
    ctc.createToken();
    const { id } = action.getIdRole();
    if (p.id) {
      const apisArr = [
        action.getAdminOrg(p.id, ctc.getToken()),
        action.getAdminOrgSite(p.id, ctc.getToken()),
        action.getAdminOrgSubUser(id, p.id, ctc.getToken()),
        action.getPOC(p.id, ctc.getToken()),
      ];
      if (!catRes) {
        apisArr.push(action.getCat(ctc.getToken()));
      }
      if (!spaceRes) {
        apisArr.push(action.getSpec(ctc.getToken()));
      }
      await Promise.all([...apisArr]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
    return () => ctc.cancelTheApi();
  }, []);

  useEffect(() => {
    makeCat();
  }, [orgD, p.id, catRes]);

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
    if (orgD && orgD.catInfo) {
      const selCatData = [];
      for (let i = 0; i < orgD.catInfo.length; i++) {
        //category //subCategory
        selCatData.push(
          {
            ...orgD.catInfo[i].category,
            cat: true,
          },
          ...Object.values(orgD.catInfo[i].subcategory).map((e) => {
            return { ...e, cat: false };
          })
        );
      }
      setSelCat(() => selCatData);
    }
  };

  const switchActiveTab = () => {
    switch (activeTab) {
      case 0: {
        return <OrgDetailsTab classes={classes} cat={cat} id={p.id} />;
      }
      // case 1: {
      //   return <OrgServiceTab classes={classes} cat={cat} />;
      // }
      case 1: {
        return (
          <ProviderSiteTab
            classes={classes}
            cat={cat}
            selCat={selCat}
            orgId={p.id}
          />
        );
      }
      case 2: {
        return (
          <SubUser cat={cat} selCat={selCat} orgId={p.id} isAdmin={true} />
        );
      }
      default: {
        return <OrgDetailsTab classes={classes} cat={cat} id={p.id} />;
      }
    }
  };

  const component = switchActiveTab();

  return loading ? (
    <LoadingComponent />
  ) : (
    <div>
      <Card className={classes.profileHeaderCard}>
        <Grid container>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
            md={12}
            padding={4}
            paddingLeft={match ? 2 : 4}
            paddingRight={match ? 2 : 4}
          >
            <div className={classes.scrollTab}>
              <Tabs
                value={activeTab}
                onChange={(e, n) => setActiveTab(n)}
                variant={match ? "scrollable" : "fullWidth"}
                scrollButtons="auto"
                style={{ textAlign: "left", color: "black" }}
              >
                <Tab label="Organization Name" className={classes.tab} />
                {/* <Tab label="Services" className={classes.tab} /> */}
                <Tab label="Sites" className={classes.tab} />
                <Tab label="Contact" className={classes.tab} />
              </Tabs>
            </div>
          </Grid>
          <Grid
            container
            item
            lg={12}
            sm={12}
            xs={12}
            md={12}
            padding={4}
            paddingTop={0}
            paddingLeft={match ? 2 : 4}
            paddingRight={match ? 2 : 4}
            spacing={match ? 2 : 2}
          >
            {component}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default EditOrgination;
