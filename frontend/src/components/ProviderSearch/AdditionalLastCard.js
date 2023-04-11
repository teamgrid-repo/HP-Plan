import { Card, Divider, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../UI/CustomButton";
import { setAdditional } from "../../redux/actions/ProviderSearch/ProviderSearchAction";
import { setTitle } from "../../redux/actions/theme/themeActions";

import { bindActionCreators } from "redux";
import AdditionalResModal from "../UI/AdditionalResModal";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import { toast } from "react-toastify";
import SaveSearchModal from "../UI/SaveSearchModal";
import LoginModal from "../UI/LoginModal";
import _ from "underscore";

const AdditionalLastCard = ({ classes }) => {
  const additional = useSelector((state) => state.admin.addtionalRes);
  const ss = useSelector((state) => state.admin.share);
  const ss2 = useSelector((state) => state.admin.shareF);
  const [islogin, setIsLogin] = useState(false);

  const uu = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (uu) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [uu]);
  const [openAdd, setOpenAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [pcount, setPcount] = useState({
    all: 0,
    homeVist: 0,
    inOffice: 0,
    virtual: 0,
  });

  const loc = useNavigate();
  const providerSearchRes = useSelector((state) => state.cat.ps.length);
  const totalCount = useSelector((state) => state.admin.totalCount);
  const distace = useSelector((state) => state.admin.distace, _.isEqual);
  const providerSearchRes2 = useSelector((state) => state.cat.ps2);

  useEffect(() => {
    alignData();
  }, [providerSearchRes2, distace]);

  useEffect(() => {
    if (additional) {
      action.setTitle({ title: "Additional Resources", color: true });
    } else {
      action.setTitle({ title: "Find Provider", color: false });
    }
  }, [additional, ss, providerSearchRes, ss2, totalCount]);
  const dispatch = useDispatch();
  const action = bindActionCreators({ setAdditional, setTitle }, dispatch);
  const toggleAdditinol = () => {
    if (!additional) {
      setOpen(false);
      action.setTitle({ title: "Additional Resources", color: true });
    } else {
      action.setTitle({ title: "Find Provider", color: false });
    }
    action.setAdditional(!additional);
  };
  const shareFun = () => {
    const url = `${config.url}provider-search?${JSON.stringify({
      ...ss,
      ss2,
    })}`;
    navigator.clipboard.writeText(url);
    toast.success("url copied to clipboard!");
  };
  const print = () => {
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const alignData = () => {
    if (providerSearchRes2) {
      const ac = {};
      ac.all = providerSearchRes2.filter((p) => p.distance < distace).length;
      ac.homeVist = providerSearchRes2.filter(
        (a) => a && a.homeVisit === true && a.distance < distace
      ).length;

      ac.virtual = providerSearchRes2.filter(
        (a) => a && a.virtual === true && a.distance < distace
      ).length;
      ac.inOffice = providerSearchRes2.filter(
        (a) => a && !a.virtual && !a.homeVisit && a.distance < distace
      ).length;
      setPcount(() => ac);
    }
  };

  const fc = useSelector((state) => state.cat.fc);

  return (
    <>
      <Grid item lg={2.5} md={12} sm={12} xs={12}>
        <Card className={classes.dropDownCard}>
          <div className={classes.dropHeader}>SEARCH ACTIONS </div>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-around"
            marginTop={2}
            marginBottom={2}
            flexWrap={"wrap"}
            gap="5px"
          >
            <CustomButton
              name="Save"
              varient="contained"
              size="large"
              onclick={() => setOpenAdd(true)}
              classNameI="greyContained"
            />

            <CustomButton
              name="Print"
              varient="contained"
              size="large"
              onclick={print}
              classNameI="greyContained"
            />
            <CustomButton
              name="Share"
              varient="contained"
              size="large"
              onclick={() => shareFun()}
              classNameI="greyContained"
            />
          </Stack>
          <div className={classes.dropHeader} style={{ marginTop: "25px" }}>
            {additional ? "DISCLAIMER" : "SEARCH TIPS"}
          </div>
          <Divider />
          <div
            style={{
              fontWeight: 400,
              margin: "10px 0 10px 0",
            }}
          >
            {additional ? (
              <>
                Resources listed in this “additional resources” directory are
                not part of the Her PLAN network and are not reviewed to
                determine consistency with Her PLAN standards. Her PLAN does not
                necessarily endorse these websites, or the products,
                content, materials, or information presented or made available
                within them. {" "}
              </>
            ) : (
              <>
                {" "}
                Not sure what you are looking for: <br />
                Answer a couple of questions and receive a custom list of
                results.{" "}
              </>
            )}
          </div>
          <CustomButton
            name="Go to PLAN Quiz"
            varient="outlined"
            size="large"
            fullWidth={true}
            onclick={() => loc("/quiz")}
            classNameI="greyOutLine"
          />
          <div
            className={classes.dropHeader}
            style={{ marginTop: "25px", textTransform: "uppercase" }}
          >
            Additional Tool{" "}
          </div>
          <Divider />
          <CustomButton
            name={
              additional
                ? "Go to Her PLAN Provider Search"
                : "Additional Resource Directory"
            }
            varient="outlined"
            size="large"
            fullWidth={true}
            onclick={() => (additional ? toggleAdditinol() : setOpen(true))}
            classNameI="greyOutLine"
          />
        </Card>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div
            style={{
              fontWeight: 400,
              margin: "21px 0",
            }}
          >
            {ss.locFilter ||
            (totalCount &&
              totalCount.total &&
              providerSearchRes &&
              providerSearchRes >= totalCount.total)
              ? `Showing ${pcount?.all || 0} of ${
                  providerSearchRes || 0
                } results.`
              : `Your search produced ${
                  totalCount.total || 0
                } results. Showing ${pcount?.all || 0} of ${
                  totalCount.total || 0
                } results Click
                “Load more" to display more results.`}
          </div>
        </Grid>
      </Grid>

      <AdditionalResModal
        open={open}
        handleClose={() => setOpen(false)}
        openRes={() => toggleAdditinol()}
      />
      {islogin ? (
        <SaveSearchModal
          open={openAdd}
          handleClose={() => setOpenAdd(false)}
          url={JSON.stringify(ss)}
          count={
            ss.locFilter ||
            (totalCount &&
              totalCount.total &&
              providerSearchRes &&
              providerSearchRes >= totalCount.total)
              ? providerSearchRes || 0
              : totalCount.total || 0
          }
        />
      ) : (
        <LoginModal open={openAdd} handleClose={() => setOpenAdd(false)} />
      )}
    </>
  );
};

export default AdditionalLastCard;
