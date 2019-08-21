import {
  GET_EVENTS_DATA_SUCCESS,
  GET_EVENTS_DATA_FAILED,
  LOADING_BEGIN,
  LOADING_END,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILED,
  HIDE_NOTIFICATION,
  GET_CURRENT_EVENT,
  GET_SERIAL_SUCCESS,
  GET_SERIAL_LOGS_SUCCESS,
  GET_ERROR
} from "./constants";

const INIT_STATE = {
  list: [],
  loading: true,
  error: "",
  affectedId: "",
  currentEvent: null,
  serial: [],
  logs: []
};

const Events = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADING_BEGIN:
      return { ...state, serial: [], loading: true, error: "", logs: [] };
    case LOADING_END:
      return { ...state, loading: false };
    case GET_EVENTS_DATA_SUCCESS:
      return {
        ...state,
        currentEvent: null,
        affectedId: "",
        list: action.payload,
        loading: false,
        error: null
      };
    case GET_EVENTS_DATA_FAILED:
    case GET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        affectedId: action.payload,
        error: null,
        loading: false
      };
    case ADD_EVENT_FAILED:
      return { ...state, error: action.payload, loading: false };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        affectedId: ""
      };
    case GET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.payload,
        loading: false
      };
    case GET_SERIAL_SUCCESS:
      return {
        ...state,
        serial: action.payload,
        loading: false
      };
    case GET_SERIAL_LOGS_SUCCESS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    default:
      return { ...state };
  }
};

export default Events;
