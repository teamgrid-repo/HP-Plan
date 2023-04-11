import { toast } from "react-toastify";
import { api } from "../../api/api";
import { ERRORMSG, GET_MSG, GET_ROOMS } from "../../constants";

export const clearMsgs = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_MSG,
      payload: {
        data: {
          msgs: [],
          id: "",
          name: "",
          roomName: "",
          img: "",
          sid: "",
          group: false,
          active: false,
        },
      },
    });
  };
};

export const getMsgs = (
  id,
  rid,
  name,
  img,
  sid,
  group,
  active,
  hippa = false,
  role = ""
) => {
  return async (dispatch) => {
    try {
      const res = await api(`message?roomName=${id}`, {}, "get");

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({
          type: GET_MSG,
          payload: {
            data: {
              msgs: res.data,
              id: rid,
              name: name,
              roomName: id,
              img,
              sid: sid,
              group: group,
              active: active,
              hippa: hippa,
              role: role,
            },
          },
        });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
export const getRooms = () => {
  return async (dispatch) => {
    try {
      const res = await api(`message-allRoom`, {}, "get");

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_ROOMS, payload: { data: res.data } });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const checkRoom = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`message_room`, data, "post");

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

export const readStatus = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`update-readStatus`, data, "put");

      if (res && res.code && res.code === 200 && res.success) {
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const leaveOrdelete = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`leave-delete-chat`, data, "put");

      if (res && res.code && res.code === 200 && res.success) {
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
export const sendFileApi = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`socket-upload`, data, "postMultipart");

      if (res && res.code && res.code === 200 && res.success) {
        // dispatch({ type: "GET_NEW_MSG", payload: { data: res.data } });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const searchMsg = (s) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_NEW_SEARCH_STRING", payload: { data: s } });
    } catch (error) {}
  };
};

export const setResetSearch = (v) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CLEAR_MSG_SEARCH", payload: { data: v } });
    } catch (error) {}
  };
};
