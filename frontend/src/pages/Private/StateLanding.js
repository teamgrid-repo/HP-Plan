import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StateLandingComponent from "../../components/StateLanding/StateLandingComponent";

const StateLanding = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ filter: props.title.filter });
  }, []);

  return <StateLandingComponent />;
};

export default StateLanding;
