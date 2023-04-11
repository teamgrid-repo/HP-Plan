import { Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import ProfileAppointmentCard from "../ProfileAppointmentCard";
import HorizontalScrollContainer from "../../UI/HorizontalScrollContainer";
import ProviderProfileCard from "./ProviderProfileCard";
import NotificationCard from "../NotificationCard";
import OrgnationListingCard from "./OrgnationListingCard";
import { useEffect, useState } from "react";
import {
  getProfile,
  getIdRole,
  getSubUser,
  clearProfile,
  getPOCData,
  getOrg,
} from "../../../redux/actions/profile/profileActions";
import { getCat } from "../../../redux/actions/category/categoryAction";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../UI/LoadingComponent";
import CancelToken from "../../../utils/cancelClass";
const ctc = new CancelToken();

const useStyle = makeStyles((theme) => ({
  profileContainer: {
    padding: "6em 0px 0em 0px",
    width: "90%",
    textAlign: "center",
    margin: "auto",
    [theme.breakpoints.down("lg")]: {
      width: "97%",
    },
    fontFamily: "Montserrat",
  },
  profileCardContainer: {
    padding: "60px",
    background: "#fafafa",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      padding: "0px",
    },
    marginBottom: "67px",
  },
}));

const ProviderProfile = () => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [clear, setClear] = useState(false);
  const [roloP, setRoleP] = useState("");

  const action = bindActionCreators(
    {
      getProfile,
      getIdRole,
      getCat,
      getSubUser,
      getPOCData,
      clearProfile,
      getOrg,
    },
    dispatch
  );
  const pdata = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);
  const orgId = useSelector((state) => state.profile.org._id);
  const catRes = useSelector((state) => state.cat.cats);

  async function get() {
    setLoading(true);
    const { id, role, email } = await action.getIdRole();
    setRoleP(() => {
      return { id, role };
    });
    if (id && email && role) {
      ctc.createToken();
      const apisArr = [action.getProfile(id, role, email, ctc.getToken())];
      if (!catRes) {
        apisArr.push(action.getCat(ctc.getToken()));
      }
      await Promise.all([...apisArr]);
    }
    setLoading(false);
  }
  useEffect(() => {
    get();
    return () => ctc.cancelTheApi();
  }, []);

  const getSubUU = async (id) => {
    setLoading(true);
    if (pdata?.makeAccountPrimary && clear) {
      await action.getSubUser(id);
      await action.getOrg(id);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (orgId) {
      action.getPOCData(orgId);
    }
  }, [orgId]);

  useEffect(() => {
    action.clearProfile();
    setClear(true);
  }, []);
  useEffect(() => {
    const { id } = action.getIdRole();
    if (pdata?.makeAccountPrimary) getSubUU(id);
  }, [pdata]);

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      <div className={classes.profileContainer}>
        <Card className={classes.profileCardContainer}>
          <Grid container spacing={1}>
            <ProviderProfileCard />
            <NotificationCard display={true} />
          </Grid>
        </Card>

        {user?.profileId?.claimStatus === undefined ? (
          <Card className={classes.profileCardContainer}>
            <OrgnationListingCard />
          </Card>
        ) : (
          user?.profileId?.claimStatus === "approved" && (
            <Card className={classes.profileCardContainer}>
              <OrgnationListingCard />
            </Card>
          )
        )}
      </div>

      <HorizontalScrollContainer
        name="My Appointments"
        subtitle="Appointments must be confirmed by the provider."
      >
        <ProfileAppointmentCard role={roloP.role || ""} id={roloP.id || ""} />
      </HorizontalScrollContainer>
    </>
  );
};

export default ProviderProfile;
