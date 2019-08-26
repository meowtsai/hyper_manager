import {
  GET_OCSDATA_SUCCESS,
  GET_OCSDATA_FAILED,
  ADD_OCSDATA_SUCCESS,
  ADD_OCSDATA_FAILED,
  HIDE_NOTIFICATION,
  GET_CURRENT_RECORD,
  LOADING_END,
  LOADING_BEGIN,
  CLEAR_CURRENT_RECORD
} from "./constants";

const INIT_STATE = {
  ocsdata: [],
  loading: true,
  error: "",
  affectedId: "",
  currentRecord: null
};

const OfflineCS = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADING_BEGIN:
      return { ...state, loading: true };
    case LOADING_END:
      return { ...state, loading: false };
    case GET_OCSDATA_SUCCESS:
      return {
        ...state,
        ocsdata: action.payload,
        loading: false,
        error: null
      };
    case GET_OCSDATA_FAILED:
    case ADD_OCSDATA_FAILED:
      return { ...state, error: action.payload, loading: false };
    case ADD_OCSDATA_SUCCESS:
      return { ...state, affectedId: action.payload, loading: false };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        affectedId: ""
      };
    case GET_CURRENT_RECORD:
      return {
        ...state,
        currentRecord: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_RECORD:
      return {
        ...state,
        currentRecord: null,
        loading: false
      };
    default:
      return { ...state };
  }
};

export default OfflineCS;
