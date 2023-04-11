import {
  GET_CAT,
  GET_SPEC,
  GET_FILTER_SEARCH,
  GET_OTHER_SPACE_QUE,
} from "../../constants";
import { uniqBy } from "lodash";

const initState = {
  cats: "",
  space: "",
  ps: "",
  ps2: "",
  otherSpace: "",
  loading: false,
  dis: "",
  loadLength: 0,
  fc: 0,
};

const catReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CAT:
      return { ...state, cats: action.payload.data };
    case GET_SPEC:
      return { ...state, space: action.payload.data };
    case "LOADING_LEN":
      return { ...state, loadLength: state.loadLength + action.payload.data };
    case "CLEAR_LOADING":
      return { ...state, loadLength: 0 };
    case GET_FILTER_SEARCH:
      return { ...state, ps: action.payload.data };
    case "GET_FILTER_SEARCH2":
      return { ...state, ps2: action.payload.data };
    case GET_OTHER_SPACE_QUE:
      return { ...state, otherSpace: action.payload.data };
    case "SET_CHANGE_DIS":
      return { ...state, dis: action.payload.data };
    case "setLocCountViaFilter":
      return { ...state, fc: action.payload.data };
    case "LOAD_MORE_SEARCH_PROVIDER": {
      const ud = [];
      if (action.payload.data && action.payload.data.length) {
        if (state.ps && state.ps.length) {
          ud.push(...state.ps);
        }
        ud.push(...action.payload.data);
      }
      let listQ = [];
      if (ud && ud.length) {
        listQ = uniqBy(ud, "_id");
      }
      return {
        ...state,
        ps: listQ,
      };
    }
    case "LOAD_MORE_SEARCH_PROVIDER2": {
      const ud = [];
      if (state.ps2 && state.ps2.length) {
        ud.push(...state.ps2);
      }
      if (action.payload.data && action.payload.data.length) {
        ud.push(...action.payload.data);
      }
      let listQ = [];
      if (ud && ud.length) {
        listQ = uniqBy(ud, "_id");
      }
      return {
        ...state,
        ps2: listQ,
      };
    }
    case "LOADING_SEARCH":
      return { ...state, loading: action.payload.data };
    default:
      return state;
  }
};

export default catReducer;
