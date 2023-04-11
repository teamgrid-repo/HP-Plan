import { toast } from "react-toastify";
import config from "../../../config";
import { api } from "../../api/api";

import {
  ERRORMSG,
  LOGINMSG,
  LOGOUT,
  REGISTERMSG,
  SET_LOGIN_USER,
} from "../../constants";
var CryptoJS = require("crypto-js");
export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: { data: "" },
    });
    localStorage.removeItem("user");
  };
};

export const contanctUs = (data) => {
  return async (dispatch) => {
    try {
      const res = await api("contact", data, "post");
      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res.message);
        return true;
      } else {
        toast.error((res && res.message) || ERRORMSG);
        return false;
      }
    } catch (error) {
      toast.error("Something went wrong.!");
      return false;
    }
  };
};

export const changePassword = (data) => {
  return async (dispatch) => {
    try {
      const res = await api("change-password", data, "post");
      if (res && res.code && res.code === 200 && res.success) {
        if (
          localStorage.getItem("reme") &&
          localStorage.getItem("reme") == "true"
        ) {
          var ciphertext = CryptoJS.AES.encrypt(
            data.password,
            config.passKeyForSave
          ).toString();
          localStorage.setItem("pwd", ciphertext);
        }
        toast.success(res.message);
        return false;
      } else {
        toast.error((res && res.message) || ERRORMSG);
        return true;
      }
    } catch (error) {
      toast.error("Something went wrong.!");
      return true;
    }
  };
};

export const updateFcm = (data) => {
  return async (dispatch) => {
    try {
      const res = await api("profile", data, "put");
      if (res && res.code && res.code === 200 && res.success) {
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const login = (data, navigation, page, close, re) => {
  return async (dispatch) => {
    try {
      const res = await api("login", data, "postWithoutToken");
      if (res && res.data && res.success) {
        //config.passKeyForSave
        // Encrypt
        if (data.type === "web") {
          if (re) {
            var ciphertext = CryptoJS.AES.encrypt(
              data.password,
              config.passKeyForSave
            ).toString();
            localStorage.setItem("reme", re);
            localStorage.setItem("pwd", ciphertext);
            localStorage.setItem("email", data.email);
          } else {
            localStorage.removeItem("reme");
            localStorage.removeItem("pwd");
            localStorage.removeItem("email");
          }
        }
        const { isTermSigned } = res.data;
        const { _id, jwt_auth_token, role, email, subRole } = res.data.user;

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: _id,
            token: jwt_auth_token,
            role,
            email,
            shareD: res.data.user.profileId
              ? res.data.user.profileId.optShareData || false
              : false,
            subRole: subRole || "",
            profileId: res.data.user.profileId ?? null,
            message: res.data.user.profileId
              ? res.data.user.profileId.message || false
              : false,
            appointments: res.data.user.profileId
              ? res.data.user.profileId.appointments || false
              : false,
            subRole: subRole || "",
            assigningId: res.data.user.assigningId || "",
          })
        );

        if (page) {
          if (!isTermSigned && role !== "admin") {
            return res.data;
          } else {
            dispatch({
              type: SET_LOGIN_USER,
              payload: {
                data: {
                  id: _id,
                  token: jwt_auth_token,
                  role,
                  email,
                  shareD: res.data.user.profileId
                    ? res.data.user.profileId.optShareData || false
                    : false,
                  subRole: subRole || "",
                  profileId: res.data.user.profileId ?? null,
                  message: res.data.user.profileId
                    ? res.data.user.profileId.message || false
                    : false,
                  appointments: res.data.user.profileId
                    ? res.data.user.profileId.appointments || false
                    : false,
                  assigningId: res.data.user.assigningId || "",
                },
              },
            });
            navigation("/");
          }
        } else {
          if (!isTermSigned && role !== "admin") {
            return res.data;
          } else {
            dispatch({
              type: SET_LOGIN_USER,
              payload: {
                data: {
                  id: _id,
                  token: jwt_auth_token,
                  role,
                  email,
                  shareD: res.data.user.profileId
                    ? res.data.user.profileId.optShareData || false
                    : false,
                  subRole: subRole || "",
                  profileId: res.data.user.profileId ?? null,
                  message: res.data.user.profileId
                    ? res.data.user.profileId.message || false
                    : false,
                  appointments: res.data.user.profileId
                    ? res.data.user.profileId.appointments || false
                    : false,
                  assigningId: res.data.user.assigningId || "",
                },
              },
            });
            close();
          }
        }
        toast.success((res && res.message) || LOGINMSG);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const register = (data, navigate) => {
  return async (dispatch) => {
    try {
      const res = await api("register", data, "postWithoutToken");
      if (res && res.data && res.success) {
        toast.success((res && res.message) || REGISTERMSG);
        navigate("/login");
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const approveTerms = (data, navigator, res1) => {
  return async (dispatch) => {
    try {
      const res = await api("acceptTerms", data, "put");
      if (res && res.code && res.code === 200 && res.success) {
        if (res1 && !res1?.isTermSigned && res1?.user?.role !== "admin") {
          const { _id, jwt_auth_token, role, email, subRole } = res1.user;
          dispatch({
            type: SET_LOGIN_USER,
            payload: {
              data: {
                id: _id,
                token: jwt_auth_token,
                role,
                email,
                profileId: res1.user?.profileId ?? null,
                shareD: res1.user?.profileId
                  ? res1.user?.profileId.optShareData || false
                  : false,
                subRole: subRole || "",
                message: res1.user?.profileId
                  ? res1.user?.profileId.message || false
                  : false,
                appointments: res1.user?.profileId
                  ? res1.user?.profileId.appointments || false
                  : false,
                assigningId: res1.user?.assigningId || "",
              },
            },
          });
          navigator("/");
        }
        toast.success((res && res.message) || LOGINMSG);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.!");
    }
  };
};

export const setInfo = () => {
  return async (dispatch) => {
    const data =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: SET_LOGIN_USER,
      payload: { data: data },
    });
  };
};

export const sendMail = (data) => {
  return async (dispatch) => {
    try {
      const res = await api("forget-password", data, "postWithoutToken");
      if (res && res.data && res.success) {
        toast.success(res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const verifyForgot = (data, history) => {
  return async (dispatch) => {
    try {
      const res = await api("verify-forgot-password", data, "postWithoutToken");
      if (res && res.data && res.success) {
        toast.success(res.message);
        history("/login");
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};
