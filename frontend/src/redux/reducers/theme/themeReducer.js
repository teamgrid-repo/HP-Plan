import { SET_HEADER_TITLE } from "../../constants";

const initState = {
  title: "",
};

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return { ...state, title: action.payload.data };

    default:
      return state;
  }
};

export default themeReducer;
