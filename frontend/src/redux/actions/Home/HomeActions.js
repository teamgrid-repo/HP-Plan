import { orderBy } from "lodash";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { ERRORMSG } from "../../constants";

export const emailQuiz = (data) => {
  ///email-quiz
  return async (dispatch) => {
    try {
      const res = await api("email-quiz", data, "post");
      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const getAllStateLoc = (token) => {
  return async (dispatch) => {
    try {
      const res = await api("get-all_stateLoc", {}, "get", token);
      if (res && res.code && res.code === 200 && res.success) {
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};
export const getUnique = (token) => {
  return async (dispatch) => {
    try {
      const res = await api("unique-states", {}, "get", token);
      if (res && res.code && res.code === 200 && res.success) {
        const state = orderBy(res.data, "state", "asc");
        return state;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};
