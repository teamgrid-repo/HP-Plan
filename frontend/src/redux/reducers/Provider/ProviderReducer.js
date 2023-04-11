import {
  GET_PROVIDER,
  GET_SAVE_PROVIDER,
  GET_LIST_NAME,
  GET_SAVE_SHARE_PROVIDER,
} from "../../constants";

const initState = {
  provider: "",
  providers: "",
  saveProviders: "",
  sListName: "",
  shareProviderList: "",
};

const provicerReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROVIDER:
      return { ...state, provider: action.payload.data };
    case GET_SAVE_PROVIDER:
      return { ...state, saveProviders: action.payload.data };
    case GET_LIST_NAME:
      return { ...state, sListName: action.payload.data };
    case GET_SAVE_SHARE_PROVIDER:
      return { ...state, shareProviderList: action.payload.data };

    default:
      return state;
  }
};

export default provicerReducer;
