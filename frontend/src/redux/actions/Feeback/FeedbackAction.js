import { toast } from "react-toastify";
import { api } from "../../api/api";
import { ERRORMSG } from "../../constants";
export const getFeedbacks = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`get-feedBack`, {}, "get", token);

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

export const addFeedbacks = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`create-feedBack`, data, "post");

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
export const daleteFeedbacks = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`delete-feedBack?id=${id}`, {}, "delete");

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
