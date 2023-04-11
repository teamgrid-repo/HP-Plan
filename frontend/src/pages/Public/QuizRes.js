import QuizComponent from "../../components/Quiz/QuizRes";
import { useDispatch } from "react-redux";

import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
const QuizRes = (props) => {
  const dispatch = useDispatch();

  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return <QuizComponent />;
};

export default QuizRes;
