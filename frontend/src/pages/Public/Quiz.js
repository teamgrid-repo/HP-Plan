import QuizComponent from "../../components/Quiz/Quiz";
import { useDispatch } from "react-redux";

import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
const Quiz = (props) => {
  const dispatch = useDispatch();

  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return <QuizComponent />;
};

export default Quiz;
