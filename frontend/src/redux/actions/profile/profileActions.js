import { toast } from "react-toastify";
import { api } from "../../api/api";
import {
  ERRORMSG,
  GET_PROFILE,
  GET_ORG,
  GET_SITELOC,
  GET_SUB_USER,
  SET_LOGIN_USER,
  GET_POC,
} from "../../constants";

export const editSiteUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`allocate-sites`, data, "put");

      if (res && res.code && res.code === 200 && res.success) {
        // toast.success(res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const getFilter = () => {
  return async () => {
    try {
      await api(`get-allocated-subCategory`, {}, "get");
    } catch (error) {}
  };
};

export const addFilter = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`allocated-subCategory`, data, "post");

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

export const deleteSiteLocUser = (siteId, userId) => {
  return async (dispatch) => {
    try {
      const res = await api(`allocate-sites/${siteId}/${userId}`, {}, "delete");

      if (res && res.code && res.code === 200 && res.success) {
        // toast.success(res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const editSubUser = (providerId, userId, data) => {
  // additional-member/:providerId/:userId
  return async (dispatch) => {
    try {
      const res = await api(
        `additional-member-provider/${providerId}/${userId}`,
        data,
        "put"
      );
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

export const deleteSubUser = (id, userId) => {
  return async (dispatch) => {
    try {
      const res = await api(`additional-member/${id}`, {}, "delete");

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
export const reAssignUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`shift-Organisation`, data, "post");

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
export const deleteSiteLoc = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`site/${id}`, {}, "delete");

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

export const getSiteLoc = (id, orgId, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`site/${orgId}/${id}`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        if (res.data)
          dispatch({ type: GET_SITELOC, payload: { data: [...res.data] } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const updateSiteLoc = (data, id) => {
  return async (dispatch) => {
    try {
      const res = await api(`site/${id}`, data, "put");
      //siteId:""
      if (res && res.code && res.code === 200 && res.success) {
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

export const addSiteLoc = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`site`, data, "post");
      //userId,orgin..Id
      if (res && res.code && res.code === 200 && res.success) {
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

export const getProfile = (id, role, email, token) => {
  return async (dispatch) => {
    try {
      const apia =
        role === "provider"
          ? `get_provider/${id}/${email}`
          : `getProfile/${id}`;

      const res = await api(apia, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_PROFILE, payload: { data: res.data } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};
export const clearProfile = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PROFILE, payload: { data: "" } });
  };
};

export const getOrg = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`organisation_details/${id}`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        if (res.data && res.data.length) {
          const dd = {
            ...res.data[0].organisation,
            catInfo: res.data[0].cat,
            approvalPending: res.data[0].approvalPending || false,
          };
          dispatch({ type: GET_ORG, payload: { data: dd } });
        }
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};
export const uploadImage = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`upload-image`, data, "post");

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
export const updateOrg = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`create_organisation`, data, "post");

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

export const getSubUser = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`additional-member?userId=${id}`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        const data = [];
        if (res.data && res.data.providerInfo && res.data.providerInfo.length) {
          data.push(...res.data.providerInfo);
        }
        if (res.data && res.data.approvalPending && res.data.approvalPending) {
          const pu = res.data.approvalPending.map((s) => {
            return {
              ...s,
              approvalPending: true,
              rec: true,
              recText: `${s.method} request send for this user`,
            };
          });
          data.push(...pu);
        }
        dispatch({ type: GET_SUB_USER, payload: { data: data } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error("Something went wrong.!");
    }
  };
};

export const getPOCData = (oid) => {
  return async (dispatch) => {
    try {
      const res = await api(`get-poc?organisationId=${oid}`, {}, "get");

      if (res && res.code && res.code === 200 && res.success) {
        const data = [];
        if (res.data && res.data.poc && res.data.poc.length) {
          data.push(...res.data.poc);
        }
        dispatch({
          type: GET_POC,
          payload: { data: data },
        });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const createSubUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`provider-additional-member`, data, "post");

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

export const updateProfile = (id, role, data) => {
  return async (dispatch) => {
    try {
      const apia = role === "provider" ? `update_provider/${id}` : `profile`;

      const res = await api(
        apia,
        role === "provider" ? data : { ...data, userId: id },
        "post"
      );

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

export const getIdRole = () => {
  return (dispatch) => {
    return (
      JSON.parse(localStorage.getItem("user")) || {
        id: "",
        role: "",
        email: "",
      }
    );
  };
};

export const updateExternalData = (field, data) => {
  return (dispatch) => {
    const ud = JSON.parse(localStorage.getItem("user"));
    ud[field] = data;
    localStorage.setItem("user", JSON.stringify(ud));
    dispatch({
      type: SET_LOGIN_USER,
      payload: {
        data: ud,
      },
    });
  };
};
