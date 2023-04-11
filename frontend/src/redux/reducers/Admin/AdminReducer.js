import {
  GET_ADMIN_ORG,
  GET_ADMIN_ORG_LIST,
  GET_ADMIN_ORG_SITE,
  GET_ADMIN_ORG_SITE_USER,
  SET_DISTACE,
  SET_ADDITIONAL,
  SHARE_F,
  GET_ADMIN_ORG_LIST_IDS_NAME,
} from "../../constants";

const initState = {
  subUser: "",
  orgList: "",
  orgD: "",
  orgSite: "",
  orgListID: "",
  distace: 999999,
  addtionalRes: false,
  share: {
    category: [],
    price: [],
    leaf: false,
    specialQualification: [],
    additionalResource: false,
    keywords: "",
    states: [],
    locFilter: false,
  },
  shareF: "all",
  totalCount: 0,
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ADMIN_ORG:
      return { ...state, orgD: action.payload.data };
    case GET_ADMIN_ORG_LIST:
      return { ...state, orgList: action.payload.data };
    case GET_ADMIN_ORG_LIST_IDS_NAME:
      return { ...state, orgListID: action.payload.data };
    case GET_ADMIN_ORG_SITE:
      return { ...state, orgSite: action.payload.data };
    case GET_ADMIN_ORG_SITE_USER: {
      return { ...state, subUser: action.payload.data };
    }
    case SET_DISTACE: {
      return { ...state, distace: action.payload.data };
    }
    case SET_ADDITIONAL: {
      return { ...state, addtionalRes: action.payload.data };
    }
    case SHARE_F: {
      return { ...state, share: action.payload.data };
    }
    case "SHARE_FI": {
      return { ...state, shareF: action.payload.data };
    }
    case "TOTAL_COUNT": {
      return { ...state, totalCount: action.payload.data };
    }
    default:
      return state;
  }
};

export default adminReducer;
