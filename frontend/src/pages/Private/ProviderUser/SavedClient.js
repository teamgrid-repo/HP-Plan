import { bindActionCreators } from "redux";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Client from "../../../components/SaveClient/SaveClient";

const SavedClient = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return <Client />;
};

export default SavedClient;
