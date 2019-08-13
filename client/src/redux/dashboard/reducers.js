import {
  LOADING_BEGIN,
  LOADING_END,
  GET_SERVICE_DATA_SUCCESS,
  GET_SERVICE_DATA_FAILED
} from "./constants";

const INIT_STATE = {
  stat: {},
  loading: true
};

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADING_BEGIN:
      return { ...state, loading: true };
    case LOADING_END:
      return { ...state, loading: false };
    case GET_SERVICE_DATA_SUCCESS:
      return { ...state, stat: action.payload, loading: false, error: null };
    case GET_SERVICE_DATA_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default Dashboard;
