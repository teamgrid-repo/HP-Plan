import { toast } from "react-toastify";
import { api } from "../../api/api";
import {
  ERRORMSG,
  GET_ADMIN_ORG,
  GET_ADMIN_ORG_LIST,
  GET_ADMIN_ORG_LIST_IDS_NAME,
  GET_ADMIN_ORG_SITE,
  GET_POC,
  GET_SUB_USER,
  SET_LOGIN_USER,
} from "../../constants";

export const getTeamData = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`herPlan-team`, {}, "get", token);
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
export const getStateData = () => {
  return async (dispatch) => {
    try {
      const res = await api(`searchLink-statistics`, {}, "get");
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

export const getFilterStateData = () => {
  return async (dispatch) => {
    try {
      const res = await api(`user-stateLoc-statistics`, {}, "get");
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
export const updateTeamData = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await api(`herPlan-team/${id}`, data, "putMultipart");
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
export const deleteTeamData = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`herPlan-team/${id}`, {}, "delete");
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
export const postTeamData = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`herPlan-team`, data, "postMultipart");
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

export const getDataApproval = (type, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`data-approval/${type}`, {}, "get", token);
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

export const getCms = () => {
  return async (dispatch) => {
    try {
      const res = await api(`cms`, {}, "get");
      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: "GET_CMS_DET", payload: { data: res.data } });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const postCms = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`cms`, data, "post");
      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res && res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getState = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`siteImage`, {}, "post", token);
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

export const postState = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`siteImage`, data, "postMultipart");
      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res && res.message);
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
export const updateCatRecordRe = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`update-cat_subCat`, data, "put");
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

export const updateTermsNdCondition = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`terms`, data, "put");
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
export const updateDataApproval = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`data-approval`, data, "put");
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

export const getAdminProfile = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`profile`, {}, "get", token);
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
export const switchProfile = () => {
  return async (dispatch) => {
    try {
      const res = await api(`switch-tab`, {}, "get");
      if (res && res.code && res.code === 200 && res.success) {
        const { _id, jwt_auth_token, role, email, subRole } = res.data.user;
        dispatch({
          type: SET_LOGIN_USER,
          payload: {
            data: {
              id: _id,
              token: jwt_auth_token,
              role,
              email,
              profileId: res.data.user.profileId ?? null,
              shareD: res.data.user.profileId
                ? res.data.user.profileId.optShareData || false
                : false,
              subRole: subRole || "",
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
            message: res.data.user.profileId
              ? res.data.user.profileId.message || false
              : false,
            appointments: res.data.user.profileId
              ? res.data.user.profileId.appointments || false
              : false,
            assigningId: res.data.user.assigningId || "",
          })
        );
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getDwdRescourse = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`hippa-status`, {}, "get", token);
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

export const getAdminDashboard = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`overall-statistics`, {}, "get", token);
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

export const getActiveProvider = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`activeProvider`, {}, "get", token);
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

export const getActiveGeneral = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`activeUser`, {}, "get", token);
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

export const getFrezeList = (type, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`allAccount/${type}`, {}, "get", token);
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

export const getGhostProvider = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`getAllGhostProvider`, {}, "get", token);
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

export const getGhostPOC = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`getAll-poc`, {}, "get", token);
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

export const deleteGhostAccount = (id, userId) => {
  return async (dispatch) => {
    try {
      const res = await api(
        `delGhostProvider?userId=${userId}&providerId=${id}`,
        {},
        "delete"
      );
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

export const updateFrezeList = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`freeze`, data, "put");
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

export const deleteFrezeList = (type, id) => {
  return async (dispatch) => {
    try {
      const res = await api(`deleteAccount/${type}?id=${id}`, {}, "delete");
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

export const resendInvite = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`resend-invite`, data, "post");
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

export const getSubAdmin = (keyword, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-users?keyword=${keyword}`, {}, "get", token);
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

export const addSubAdmin = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-users`, data, "post");
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

export const updateSubAdmin = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-users`, data, "put");
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
export const deleteSubAdmin = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-users?id=${id}`, {}, "delete");
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

export const addContact = (data, admin) => {
  return async (dispatch) => {
    try {
      const res = await api(`additional-member`, data, "post");
      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res.message);
        return false;
      } else {
        if (
          res.message &&
          res.message === "Email of this account is already Exist" &&
          admin
        ) {
          return true;
        } else {
          toast.error((res && res.message) || ERRORMSG);
          return false;
        }
      }
    } catch (error) {
      toast.error(ERRORMSG);
      return false;
    }
  };
};
export const addSiteClaim = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`claimSite`, data, "post");
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
export const getSiteClaim = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`claimSite`, {}, "get", token);
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

export const updateSiteClaim = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await api(`claimSite/${id}`, data, "put");
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

export const getAccClaim = () => {
  return async (dispatch) => {
    try {
      const res = await api(`account-approval`, {}, "get");
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

export const updateAccClaim = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`account-approval`, data, "put");
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

export const updateContact = (providerId, adminId, data) => {
  return async (dispatch) => {
    try {
      const res = await api(
        `additional-member/${providerId}/${adminId}`,
        data,
        "put"
      );
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

export const getPOC = (oid) => {
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

export const addPOC = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`add-poc`, data, "put");
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

export const updatePOC = (orgID, id, data) => {
  return async (dispatch) => {
    try {
      const res = await api(
        `update-poc?organisationId=${orgID}&pocId=${id}`,
        data,
        "put"
      );
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

export const deletePOC = (id, orgID) => {
  return async (dispatch) => {
    const data = {};
    try {
      const res = await api(
        `del-poc?organisationId=${orgID}&pocId=${id}`,
        data,
        "put"
      );
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

export const deletePOCOne = (id, orgID) => {
  return async (dispatch) => {
    const data = {};
    try {
      const res = await api(
        `del-poc-one?organisationId=${orgID}&pocId=${id}`,
        data,
        "put"
      );
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

export const deleteContact = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-users`, data, "post");
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

export const addOrg = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-create-organisation`, data, "post");
      if (res && res.code && res.code === 200 && res.success) {
        toast.success(res.message);
        return true;
      } else {
        toast.error((res && res.message) || ERRORMSG);
        return false;
      }
    } catch (error) {
      toast.error(ERRORMSG);
      return false;
    }
  };
};

export const updateOrg = (id, data) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-update-organisation/${id}`, data, "put");
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

export const addSite = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-users`, data, "post");
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

export const updateSite = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-users`, data, "post");
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

export const deleteSite = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`saved-users`, data, "post");
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

export const createSearchLink = (data) => {
  return async (dispatch) => {
    try {
      const res = await api(`searchLink`, data, "post");
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
export const getSearchLink = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`searchLink`, {}, "get", token);
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
export const getSearchLinkById = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`searchLink/${id}`, {}, "get", token);
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

export const deleteSearchLinkById = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`searchLink/${id}`, {}, "delete");
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
export const deleteOrg = (id) => {
  return async (dispatch) => {
    try {
      const res = await api(`deleteOrg/${id}`, {}, "delete");
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
export const dataMigration = (data) => {
  return async (dispatch) => {
    try {
      api(`admin-upload`, data, "postMultipart");
      toast.success(
        "This Will Take Several Minutes, Please Check Your Email For More Details."
      );
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
export const udpdateSearchLink = (data, id) => {
  return async (dispatch) => {
    try {
      const res = await api(`searchLink/${id}`, data, "put");
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

export const getAdminOrgList = (
  token,
  page,
  limit,
  keyword,
  keyName,
  sortingType,
  publish
) => {
  return async (dispatch) => {
    try {
      const data = {
        keyName: keyName,
        sortingType: sortingType,
        published: publish === "de" ? null : publish === 0 ? true : false,
      };
      const res = await api(
        `get_organisation?page=${page + 1}&limit=${limit}&keyword=${
          keyword ?? ""
        }`,
        data,
        "post"
      );

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({
          type: GET_ADMIN_ORG_LIST,
          payload: { data: res.data },
        });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getAdminOrgListIdsAndName = (token) => {
  return async (dispatch) => {
    try {
      const res = await api(`get_organisation_ids`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({
          type: GET_ADMIN_ORG_LIST_IDS_NAME,
          payload: { data: res.data },
        });
        return res.data;
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getAdminOrgByKeyWord = (keyword, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`search-org?keyword=${keyword}`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_ADMIN_ORG_LIST, payload: { data: res.data } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getAdminOrgSubUser = (id, oid, token) => {
  return async (dispatch) => {
    try {
      //additional-member?userId=61caed964dba1a49cdbf7c1d&
      const res = await api(
        `additional-member?userId=${id}&organizationId=${oid}`,
        {},
        "get",
        token
      );

      if (res && res.code && res.code === 200 && res.success) {
        const data = [];
        if (res.data && res.data.providerInfo && res.data.providerInfo.length) {
          data.push(...res.data.providerInfo);
        }
        dispatch({
          type: GET_SUB_USER,
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

export const getAdminOrgSite = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-site/${id}`, {}, "get", token);

      if (res && res.code && res.code === 200 && res.success) {
        dispatch({ type: GET_ADMIN_ORG_SITE, payload: { data: res.data } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};

export const getAdminOrg = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await api(`admin-get-organisation/${id}`, {}, "get", token);

      if (
        res &&
        res.code &&
        res.code === 200 &&
        res.success &&
        res.data &&
        res.data.length
      ) {
        const dd = {
          ...res.data[0].organisation,
          catInfo: res.data[0].cat,
        };
        dispatch({ type: GET_ADMIN_ORG, payload: { data: dd } });
      } else {
        toast.error((res && res.message) || ERRORMSG);
      }
    } catch (error) {
      toast.error(ERRORMSG);
    }
  };
};
