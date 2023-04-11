import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProviderSearchComponent from "../../components/ProviderSearch/ProviderSearchComponent";
const ProviderSearch = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return <ProviderSearchComponent />;
};

export default ProviderSearch;
