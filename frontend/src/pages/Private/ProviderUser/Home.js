import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { setTitle } from "../../../redux/actions/theme/themeActions";

const Home = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title.name });
  }, []);
  return <div>Provider Home</div>;
};

export default Home;
