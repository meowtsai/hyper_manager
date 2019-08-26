import {
  GET_SERVERS_SUCCESS,
  GET_SERVERS_FAILED,
  LOADING_BEGIN,
  LOADING_END
} from "./constants";

const INIT_STATE = {
  list: [],
  loading: true,
  error: ""
};

const Servers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADING_BEGIN:
      return { ...state, loading: true };
    case LOADING_END:
      return { ...state, loading: false };
    case GET_SERVERS_SUCCESS:
      return { ...state, list: action.payload, loading: false, error: null };
    case GET_SERVERS_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Servers;
