import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DirectionComponent from "../../components/Direction/DirectionComponent";

const Direction = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ shrink: props.title.shrink });
  }, []);
  return <DirectionComponent />;
};

export default Direction;
