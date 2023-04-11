import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MessgesComponent from "../../components/Messages/MessgesComponent";
const Messages = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);
  return <MessgesComponent />;
};

export default Messages;
