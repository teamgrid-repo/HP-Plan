import { toast } from "react-toastify";
import { api } from "../../api/api";
import {
  ERRORMSG,
  GET_PROVIDER,
  GET_SAVE_PROVIDER,
  GET_LIST_NAME,
  GET_SAVE_SHARE_PROVIDER,
} from "../../constants";
import { store } from "../../store";
const geocoder = new window.google.maps.Geocoder();
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const getStateFromAdd = (arr) => {
  let f = "";
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].types &&
      arr[i].types.find((a) => a === "political") &&
      !arr[i].types.find((a) => a === "country")
    ) {
      f = arr[i].short_name;
    }
  }
  return f;
};
const callApi = async (data) => {
  const res = await api(`savedListing/create&update`, data, "post");
  if (res && res.code && res.code === 200 && res.success) {
    toast.success(res.message);
    store.dispatch(getListName(""));
  } else {
    toast.error((res && res.message) || ERRORMSG);
  }
};
function locFromAdd(data) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      const add = await geocoder.geocode({ location: { lng, lat } });
      if (add && add.results[0] && add.results[0].address_components) {
        const state = getStateFromAdd(add.results[0].address_components);
        if (state) {
          data.stateLoc = state;
        }
      }
      callApi(data);
    },
    (e) => {
      callApi(data);
    },
    options
  );
}

export const getProvider = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`get-organisation/${id}`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_PROVIDER, payload: { data: res.data } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const saveProvider = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-users`, { savedUserId: id }, "post");
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

export const removeSaveProvider = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-users`, { savedUserId: id }, "delete");
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

export const getSaveProvider = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-users/?provider=true`, {}, "get", token);
      if (res && res.code && res.code === 200 && res.success) {
        dispatch({
          type: GET_SAVE_PROVIDER,
          payload: { data: res.data && res.data.length ? res.data : "" },
        });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getListName = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`savedListing?name=true`, {}, "get", token);
      if (res && res.code && res.code === 200 && res.success) {
        dispatch({
          type: GET_LIST_NAME,
          payload: { data: res.data },
        });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const createProviderList = (data) => {
  return async (dispatch) => {
    try {
      locFromAdd(data);
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
export const saveItemToList = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`savedListingItems/create`, data, "post");
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
export const getAllList = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`savedListing`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_SAVE_PROVIDER, payload: { data: res.data } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
export const deleteList = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`savedListing-delete/${id}`, {}, "delete");

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
export const deleteListItem = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`savedListingItems-delete/${id}`, {}, "delete");

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

export const saveShareProvider = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`save-searches`, data, "post");

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

export const saveQuiz = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`quiz`, data, "post");

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

export const getSaveQuiz = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`quiz`, {}, "get", token);

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

export const deleteSaveQuiz = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`quiz?id=${id}`, {}, "delete");

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

export const getSaveShareProvider = () => {
  return async (dispatch) => {
    try {
      const res = await api(`get-save-searches`, { all: true }, "post");

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({
          type: GET_SAVE_SHARE_PROVIDER,
          payload: { data: res.data },
        });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const deleteShareItem = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`delete-save-searches/${id}`, {}, "delete");

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

export const editSaveShareProvider = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`get-save-searches`, data, "post");

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
