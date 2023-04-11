import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppointmentComponent from "../../components/Appoinment/AppointmentComponent";

const Appointment = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ shrink: props.title.shrink });
  }, []);

  return <AppointmentComponent />;
};

export default Appointment;
