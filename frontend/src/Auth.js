import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-spinners/HashLoader";
import { bindActionCreators } from "redux";
import { setInfo } from "./redux/actions/auth/authActions";
import { store } from "./redux/store";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  const actions = bindActionCreators({ setInfo }, dispatch);

  const state = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (state) {
      setCurrentUser(state);
      setPending(false);
    } else {
      setCurrentUser(false);
      setPending(false);
    }
  }, [state]);

  useEffect(() => {
    actions.setInfo();
    const user = store.getState().auth.user;
    if (user) {
      setCurrentUser(user);
      setPending(false);
    } else {
      setCurrentUser(false);
      setPending(false);
    }
  }, []);

  return pending ? (
    <Loader size={50} color="#4A90E2" css={{ margin: "auto" }} />
  ) : (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
