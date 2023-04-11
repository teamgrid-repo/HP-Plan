import About from "../../components/About/About";
import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AboutUs = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ shrink: props.title.shrink });
  }, []);

  return <About />;
};

export default AboutUs;
