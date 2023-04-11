import { GET_MSG, GET_ROOMS } from "../../constants";

const initState = {
  rooms: "",
  selRoom: "",
  // newMsg: "",
  clients: "",
  clear: false,
  searchString: "",
};

const MessagesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_MSG:
      return { ...state, selRoom: action.payload.data };
    case GET_ROOMS:
      return { ...state, rooms: action.payload.data };
    // case "GET_NEW_MSG":
    //   return { ...state, newMsg: action.payload.data };
    case "GET_NEW_Clients":
      return { ...state, clients: action.payload.data };
    case "GET_NEW_SEARCH_STRING":
      return { ...state, searchString: action.payload.data };
    case "CLEAR_MSG_SEARCH":
      return { ...state, clear: action.payload.data };

    default:
      return state;
  }
};

export default MessagesReducer;
