import { toast } from "react-toastify";
import { api } from "../../api/api";
import { ERRORMSG } from "../../constants";

export const getClients = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-client`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: "GET_NEW_Clients", payload: { data: res.data } });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getClientsByname = (k, token) => {
  return async (dispatch) => {
    try {
      const res = await api(
        `search-savedClient?keyword=${k}`,
        {},
        "get",
        token
      );

      if (res && res.code && res.code === 200 && res.success) {
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const deleteClient = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-client/${id}`, {}, "delete");

      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const addClient = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-client?clientId=${id}`, {}, "post");

      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
