import {
  GET_PROFILE,
  GET_ORG,
  GET_SITELOC,
  GET_SUB_USER,
  GET_POC,
} from "../../constants";

const initState = {
  profile: "",
  org: "",
  site: "",
  subUser: "",
  poc: "",
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload.data };
    case GET_ORG:
      return { ...state, org: action.payload.data };
    case GET_SITELOC:
      return { ...state, site: action.payload.data };
    case GET_SUB_USER:
      return { ...state, subUser: action.payload.data };
    case GET_POC:
      return { ...state, poc: action.payload.data };
    default:
      return state;
  }
};

export default profileReducer;
