import { bindActionCreators } from "redux";
import { setTitle } from "../../../redux/actions/theme/themeActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddOrgination from "../../../components/Admin/Orgination/AddOrgination";
const AddOrg = (props) => {
  const dispatch = useDispatch();
  const actions = bindActionCreators({ setTitle }, dispatch);
  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  return <AddOrgination />;
};

export default AddOrg;
