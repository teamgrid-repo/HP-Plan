import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "react-spinners/HashLoader";
import FilterCard from "./FilterCard";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getCat, getSpec } from "../../redux/actions/category/categoryAction";
import AdditionalLastCard from "./AdditionalLastCard";
import MapMiddelCard from "./MapMiddelCard";
import ProviderFilterListingCard from "./ProviderFilterListingCard";
import { getListName } from "../../redux/actions/Provider/ProviderActions";
import { getIdRole } from "../../redux/actions/profile/profileActions";
import CancelToken from "../../utils/cancelClass";
const ctc = new CancelToken();
const useStyle = makeStyles((theme) => ({
  container: {
    padding: "2em 0px 4em 0px",
    width: "94%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      width: "96%",
    },
    fontFamily: "Montserrat",
  },
  dropHeader: {
    marginBottom: "3px",
    fontSize: "16px",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.83,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#2b4c5b",
  },
  dropDownCard: {
    padding: "10px",
  },
  dropStateContainer: {
    borderRadius: "2px",
    border: "solid 3px #008dc2",
    padding: "9px 14.4px 9px 21.5px",
    color: "#008dc2",
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    display: "flex",
    justifyContent: "space-between",
  },

  dropLocContainer: {
    borderRadius: "2px",
    border: "solid 3px #008dc2",
    padding: "9px 14.4px 9px 21.5px",
    color: "#008dc2",
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    display: "flex",
    gap: "10px",
  },
  checkBoxText: {
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#8692a7",
    display: "flex",
  },
  checkBoxIText: {
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#8692a7",
    display: "flex",
    marginLeft: "10%",
  },
  filterSCard: {
    width: "150px",
    height: "75px",
    border: "1px solid #D0D5DC",
    textAlign: "center",
    margin: "auto",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    color: "#425F6C",
    fontWeight: 600,
    fontSize: "17px",
    [theme.breakpoints.down("lg")]: {
      height: "90px",
    },
  },
  filterSIcon: {
    paddingTop: "10px",
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.75,
    letterSpacing: "normal",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    cursor: "pointer",
  },
  filterSText: {
    cursor: "pointer",
  },
  selected: {
    backgroundColor: "white !important",
    color: "#134079 !important",
  },
  sortContainer: {
    display: "flex",
    background: "white",
    padding: "5px",
    width: "155px",
  },
  sortLabel: {
    fontSize: "14px",
    color: "#696974",
    paddingTop: "10px",
    paddingRight: "10px",
  },
  clearDivOuter: {
    display: "flex",
    gap: "5px",
    marginBottom: "20px",
    color: "#1976D2",
    textDecoration: "underline",
    cursor: "pointer",
  },
  listHeaderDiv: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 800,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.83,
    letterSpacing: "normal",
    color: "#2b4c5b",
    margin: "5px 0 5px 0",
  },
  itemSelectDiv: {
    margin: "auto",
    fontSize: "12px",
    fontWeight: 800,
    lineHeight: 1.83,
    letterSpacing: "normal",
    marginLeft: "10px",
  },
  clearInnerDiv: {
    margin: "auto",
    marginLeft: 0,
    fontSize: "15px",
  },
  okBtnDiv: {
    position: "sticky",
    top: 20,
    bottom: 0,
    zIndex: 5,
    background: "white",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  okBtnStyle: {
    width: "100px",
    margin: "5px",
  },
  selectOptionDiv: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    overflow: "auto",
    maxHeight: "300px",
  },
  selectChipStyle: { margin: "5px 0px 5px 0px" },
  leafOuterDiv: { display: "flex", justifyContent: "center", gap: "10px" },
  fboxActive: {
    background: "#008dc2",
    color: "white",
  },
  fboxActiveBlack: {
    background: "black",
    color: "white",
  },
  bottomDIv: {
    fontSize: "12px",
    fontWeight: 300,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.67,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#5b5b5b",
    margin: "41px 40px 2px 40px",
  },
}));

const ProviderSearchComponent = () => {
  const classes = useStyle();

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const action = bindActionCreators(
    { getCat, getSpec, getListName, getIdRole },
    dispatch
  );
  const addRes = useSelector((state) => state.admin.addtionalRes);

  const catRes = useSelector((state) => state.cat.cats);
  const spaceRes = useSelector((state) => state.cat.space);

  useEffect(() => {
    localStorage.removeItem("lat");
    localStorage.removeItem("lng");
    localStorage.removeItem("zoom");
    get();
    return () => {
      ctc.cancelTheApi();
      localStorage.removeItem("lat");
      localStorage.removeItem("lng");
      localStorage.removeItem("zoom");
    };
  }, []);
  useEffect(() => {}, [addRes]);
  const get = async () => {
    setLoading(true);
    ctc.createToken();
    const { id } = action.getIdRole();
    if (!catRes && !spaceRes) {
      const apis = [
        action.getCat(ctc.getToken()),
        action.getSpec(ctc.getToken()),
      ];
      if (id) {
        apis.push(action.getListName(ctc.getToken()));
      }
      await Promise.all([...apis]);
    } else if (!catRes) {
      const apis = [action.getCat(ctc.getToken())];
      if (id) {
        apis.push(action.getListName(ctc.getToken()));
      }
      await Promise.all([...apis]);
    } else if (!spaceRes) {
      const apis = [action.getSpec(ctc.getToken())];
      if (id) {
        apis.push(action.getListName(ctc.getToken()));
      }
      await Promise.all([...apis]);
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff" }}>
      {loading ? (
        <div className={classes.container}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <h2>Please wait while we load the directory</h2>
            <Loader color="#4A90E2" size={100} css={{ margin: "auto" }} />
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <Grid container spacing={3}>
            <FilterCard classes={classes} />
            <Grid item lg={7} md={12} sm={12} xs={12}>
              <MapMiddelCard />
              <ProviderFilterListingCard classes={classes} />
              {addRes && (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className={classes.bottomDIv}>
                     “Additional Resources” provides links to and information
                    about third parties (including websites), owned and operated
                    by independent parties over which Her PLAN has no control
                    ("Third-Parties)"). HER PLAN DOES NOT ENDORSE OR APPROVE AND
                    MAKES NO WARRANTIES, REPRESENTATIONS, OR UNDERTAKINGS
                    RELATING TO THE PRODUCTS, CONTENT, MATERIALS, OPINIONS, OR
                    OTHER INFORMATION MADE AVAILABLE BY OR ABOUT THIRD-PARTIES,
                    OR RELATING TO ANY SERVICES PROVIDED BY SUCH THIRD PARTIES. 
                    In addition to the terms stated in Her PLAN’S Terms of Use,
                    Her PLAN disclaims liability for any loss, damage, cost and
                    any other consequence resulting directly or indirectly from
                    or relating to your access to the Third-Party Websites or
                    any information made available by or about Third-Parties, or
                    any information that you may provide or any transaction
                    conducted on or via a Third-Party Website or the failure of
                    any information, goods or services posted or offered at the
                    Third-Party Website or any error, omission, or
                    misrepresentation on the Third-Party Website or any computer
                    virus arising from or system failure associated with the
                    Third-Party Website, or resulting directly or indirectly
                    from or relating to any services, products, content,
                    materials, opinions, and/or other information provided by
                    the applicable third party. By clicking "Proceed", you will
                    be confirming that you have read and agreed to the terms
                    herein and in Her PLAN’S Terms of Use.
                  </div>
                </Grid>
              )}
            </Grid>
            <AdditionalLastCard classes={classes} />
          </Grid>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProviderSearchComponent);
