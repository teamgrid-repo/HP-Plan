import ProviderProfile from "../../components/Profile/Provider/ProviderProfile";
import ClientProfile from "../../components/Profile/Client/ClientProfileComponent";

import { bindActionCreators } from "redux";
import { setTitle } from "../../redux/actions/theme/themeActions";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth";
import { useDispatch } from "react-redux";
import Home from "../Public/Home";

const MyProfile = (props) => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  const actions = bindActionCreators({ setTitle }, dispatch);

  useEffect(() => {
    actions.setTitle({ title: props.title });
  }, []);

  const cu = auth.currentUser;
  const role = cu && cu.role;

  return role && role === "provider" ? (
    <ProviderProfile />
  ) : role && role === "user" ? (
    <ClientProfile />
  ) : (
    <Home />
  );
};

export default MyProfile;
