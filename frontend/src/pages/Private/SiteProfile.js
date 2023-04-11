import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import SiteProfileComponent from "../../components/SiteProfile/SiteProfileComponent";

const SiteProfile = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ shrink: props.title.shrink });
  }, []);

  return <SiteProfileComponent />;
};

export default SiteProfile;
