import { toast } from "react-toastify";
import { api } from "../../api/api";
import { ERRORMSG } from "../../constants";

export const bookAppointment = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`appointment`, data, "post");
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

export const updateStatus = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await api(`appointment/${id}`, data, "put");
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

export const getAllAppointment = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`allAppointment`, {}, "get", token);

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
