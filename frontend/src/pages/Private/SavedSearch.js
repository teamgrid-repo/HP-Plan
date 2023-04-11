import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SavedSearchComponent from "../../components/SavedSearch/SavedSearchComponent";

const SavedSearch = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);
  return <SavedSearchComponent />;
};

export default SavedSearch;
