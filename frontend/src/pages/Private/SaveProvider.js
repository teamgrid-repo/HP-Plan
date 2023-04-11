import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SavedProvidersComponent from "../../components/SavedProviders/SavedProviderListComponent";

const SaveProvider = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return <SavedProvidersComponent />;
};

export default SaveProvider;
