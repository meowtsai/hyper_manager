import {
  UPDATE_PASSWORD_SUCCESS,
  HIDE_NOTIFICATION,
  GET_ERROR
} from "./constants";

const INIT_STATE = {
  updated: null,
  loading: true,
  error: ""
};

const Platform = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updated: true,
        error: null,
        loading: false
      };

    case HIDE_NOTIFICATION:
      return {
        ...state,
        updated: null
      };
    default:
      return { ...state };
  }
};

export default Platform;
