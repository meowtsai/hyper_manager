import {
  GET_CSMASTER_SUCCESS,
  GET_CSMASTER_FAILED,
  LOADING_BEGIN,
  LOADING_END
} from "./constants";

const INIT_STATE = {
  cs_master: [],
  loading: true,
  error: ""
};

const AdminUsers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADING_BEGIN:
      return { ...state, loading: true };
    case LOADING_END:
      return { ...state, loading: false };
    case GET_CSMASTER_SUCCESS:
      return {
        ...state,
        cs_master: action.payload,
        loading: false,
        error: null
      };
    case GET_CSMASTER_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default AdminUsers;
