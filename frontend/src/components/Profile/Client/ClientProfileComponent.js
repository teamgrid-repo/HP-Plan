import { Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import ProfileAppointmentCard from "../ProfileAppointmentCard";
import HorizontalScrollContainer from "../../UI/HorizontalScrollContainer";
import ClientProfileCard from "./ClientProfileCard";
import NotificationCard from "../NotificationCard";

import { useEffect, useState } from "react";
import {
  getProfile,
  getIdRole,
} from "../../../redux/actions/profile/profileActions";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
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

const ClientProfile = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [roloP, setRoleP] = useState("");
  const action = bindActionCreators({ getProfile, getIdRole }, dispatch);
  async function get() {
    setLoading(true);
    const { id, role, email } = await action.getIdRole();

    setRoleP(() => {
      return { id, role };
    });
    ctc.createToken();
    await action.getProfile(id, role, email, ctc.getToken());
    setLoading(false);
  }
  useEffect(() => {
    get();
    return () => ctc.cancelTheApi();
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      <div className={classes.profileContainer}>
        <Card className={classes.profileCardContainer}>
          <Grid container spacing={1}>
            <ClientProfileCard />
            <NotificationCard />
          </Grid>
        </Card>
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

export default ClientProfile;
