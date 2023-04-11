import { LOGOUT, SET_LOGIN_USER } from "../../constants";

const initState = {
  user: null,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, user: null };
    case SET_LOGIN_USER:
      return { ...state, user: action.payload.data };
    default:
      return state;
  }
};

export default loginReducer;
