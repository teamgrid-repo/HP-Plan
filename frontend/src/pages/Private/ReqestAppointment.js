import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import ClientAppointmentComponent from "../../components/ReqestAppointment/Client/SavedAppointmentComponent";
import { AuthContext } from "../../Auth";
import Home from "../Public/Home";
import ReqAppointmentPC from "../../components/ReqestAppointment/Provider/ReqAppointmentPC";
const ReqestAppointment = (props) => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  const cu = auth.currentUser;
  const role = cu && cu.role;
  return role && role === "provider" ? (
    <ReqAppointmentPC />
  ) : role && role === "user" ? (
    <ClientAppointmentComponent />
  ) : (
    <Home />
  );
};

export default ReqestAppointment;
