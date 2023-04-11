import { toast } from "react-toastify";
import { api } from "../../api/api";
import { ERRORMSG, GET_CAT, GET_SPEC, GET_TERMS } from "../../constants";

export const getCat = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`cure_subcategories`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_CAT, payload: { data: res.data } });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getSpec = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`special-qualification`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        if (res.data && res.data[0]) {
          dispatch({
            type: GET_SPEC,
            payload: { data: res.data },
          });
        }
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getTerms = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`terms`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_TERMS, payload: { data: res.data } });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
