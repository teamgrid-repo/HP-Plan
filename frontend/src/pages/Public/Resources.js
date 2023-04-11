import { useDispatch } from "react-redux";

import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import ResourcesComponent from "../../components/Resources/ResourcesComponent";

const Resources = (props) => {
  const dispatch = useDispatch();

  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return <ResourcesComponent />;
};

export default Resources;
