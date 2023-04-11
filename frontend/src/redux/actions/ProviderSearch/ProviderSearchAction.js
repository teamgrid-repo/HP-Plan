import { uniqBy } from "lodash";
import { toast } from "react-toastify";
import { getDistanceFromLatLonInKm } from "../../../utils/getDistace";
import { api } from "../../api/api";
import {
  ERRORMSG,
  GET_FILTER_SEARCH,
  SET_DISTACE,
  SET_ADDITIONAL,
  SHARE_F,
} from "../../constants";
import { store } from "../../store";

export const setProviderLoading = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "LOADING_SEARCH",
        payload: { data: data },
      });
    } catch (e) {}
  };
};

export const changeDistace = (dis) => {
  return async (dispatch) => {
    const d = store.getState().cat.ps;
    let lat = dis && dis.lat;
    let long = dis && dis.lang;
    if (lat && long) {
      const data = [];
      await dispatch({
        type: "SET_CHANGE_DIS",
        payload: { data: { lat: lat, lang: long } },
      });

      for (let i = 0; i < d.length; i++) {
        if (d[i] && d[i].location && d[i].location.lat && d[i].location.lang) {
          data.push({
            ...d[i],
            distance: getDistanceFromLatLonInKm(
              lat,
              long,
              d[i].location.lat,
              d[i].location.lang
            ),
          });
        } else if (d[i].virtual) {
          data.push({
            ...d[i],
            distance: 0,
          });
        }
      }
      dispatch({ type: GET_FILTER_SEARCH, payload: { data: data } });
      dispatch({ type: "GET_FILTER_SEARCH2", payload: { data: data } });
    } else {
      await dispatch({
        type: "SET_CHANGE_DIS",
        payload: { data: "" },
      });
      const data = [];
      for (let i = 0; i < d.length; i++) {
        if (d[i] && d[i].location && d[i].location.lat && d[i].location.lang) {
          data.push({
            ...d[i],
            distance: 0,
          });
        } else if (d[i].virtual) {
          data.push({
            ...d[i],
            distance: 0,
          });
        }
      }
      dispatch({ type: GET_FILTER_SEARCH, payload: { data: data } });
      dispatch({ type: "GET_FILTER_SEARCH2", payload: { data: data } });
    }
  };
};

export const getProviderSarch = (data, ct) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: "LOADING_SEARCH",
        payload: { data: true },
      });
      const res = await api(`filter-provider`, data, "post", ct);

      await dispatch({
        type: "LOADING_SEARCH",
        payload: { data: false },
      });
      if (res && res.code && res.code === 200 && res.success) {
        const data = [];
        const d = res.data && res.data.provider;
        dispatch({
          type: "CLEAR_LOADING",
          payload: { data: 0 },
        });
        if (d) {
          await dispatch({
            type: "LOADING_LEN",
            payload: { data: res.data.provider.length || 0 },
          });
          const dis = store.getState().cat.dis;
          let lat = dis && dis.lat;
          let long = dis && dis.lang;
          if (dis && lat && long) {
            for (let i = 0; i < d.length; i++) {
              if (
                d[i] &&
                d[i].location &&
                d[i].location.lat &&
                d[i].location.lang
              ) {
                data.push({
                  ...d[i],
                  distance: getDistanceFromLatLonInKm(
                    lat,
                    long,
                    d[i].location.lat,
                    d[i].location.lang
                  ),
                });
              } else if (d[i].virtual) {
                data.push({
                  ...d[i],
                  distance: 0,
                });
              }
            }
            dispatch({ type: GET_FILTER_SEARCH, payload: { data: data } });
            dispatch({ type: "GET_FILTER_SEARCH2", payload: { data: data } });
          } else {
            for (let i = 0; i < d.length; i++) {
              if (
                d[i] &&
                d[i].location &&
                d[i].location.lat &&
                d[i].location.lang
              ) {
                data.push({
                  ...d[i],
                  distance: 0,
                });
              } else if (d[i].virtual) {
                data.push({
                  ...d[i],
                  distance: 0,
                });
              }
            }
            dispatch({ type: GET_FILTER_SEARCH, payload: { data: data } });
            dispatch({ type: "GET_FILTER_SEARCH2", payload: { data: data } });
          }
          dispatch({
            type: "TOTAL_COUNT",
            payload: { data: res.data.count },
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
export const loadMoreProviderSarch = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`filter-provider`, data, "post");
      const dis = store.getState().cat.dis;
      if (res && res.code && res.code === 200 && res.success) {
        if (res.data && res.data.provider) {
          await dispatch({
            type: "LOADING_LEN",
            payload: { data: res.data.provider.length || 0 },
          });
          let lat = dis && dis.lat;
          let long = dis && dis.lang;
          if (lat && long) {
            const data = [];
            const d = res.data.provider;
            for (let i = 0; i < d.length; i++) {
              if (
                d[i] &&
                d[i].location &&
                d[i].location.lat &&
                d[i].location.lang
              ) {
                data.push({
                  ...d[i],
                  distance: getDistanceFromLatLonInKm(
                    lat,
                    long,
                    d[i].location.lat,
                    d[i].location.lang
                  ),
                });
              } else if (d[i].virtual) {
                data.push({
                  ...d[i],
                  distance: 0,
                });
              }
            }
            dispatch({
              type: "LOAD_MORE_SEARCH_PROVIDER",
              payload: { data: data },
            });
            dispatch({
              type: "LOAD_MORE_SEARCH_PROVIDER2",
              payload: { data: data },
            });
          } else {
            const data = [];
            const d = res.data.provider;
            for (let i = 0; i < d.length; i++) {
              if (
                d[i] &&
                d[i].location &&
                d[i].location.lat &&
                d[i].location.lang
              ) {
                data.push({
                  ...d[i],
                  distance: 0,
                });
              } else if (d[i].virtual) {
                data.push({
                  ...d[i],
                  distance: 0,
                });
              }
            }
            dispatch({
              type: "LOAD_MORE_SEARCH_PROVIDER",
              payload: { data: data },
            });
            dispatch({
              type: "LOAD_MORE_SEARCH_PROVIDER2",
              payload: { data: data },
            });
          }
        }
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
export const setDistace = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_DISTACE, payload: { data: data } });
  };
};
export const setAdditional = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_ADDITIONAL, payload: { data: data } });
  };
};
export const shareF = (f) => {
  return (dispatch) => {
    dispatch({ type: SHARE_F, payload: { data: f } });
  };
};
export const shareFi = (f) => {
  return (dispatch) => {
    dispatch({ type: "SHARE_FI", payload: { data: f } });
  };
};

export const setListingViaMap = (list) => {
  return (dispatch) => {
    const s = store.getState().cat.ps;
    const data = [];

    if (list && list.length) {
      data.push(...list.filter((a) => a && !a.virtual && a._id));
    }
    if (s && s.length) {
      data.push(...s.filter((a) => a && a.virtual));
    }
    let listQ = [];
    if (data && data.length) {
      listQ = uniqBy(data, "_id");
    }
    dispatch({ type: "GET_FILTER_SEARCH2", payload: { data: listQ } });
  };
};
export const setLocCountViaFilter = (C) => {
  return (dispatch) =>
    dispatch({ type: "setLocCountViaFilter", payload: { data: C } });
};
