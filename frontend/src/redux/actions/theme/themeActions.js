import { SET_HEADER_TITLE } from "../../constants";

export const setTitle = (title) => {
  return async (dispatch) => {
    dispatch({
      type: SET_HEADER_TITLE,
      payload: { data: title },
    });
  };
};
