// @flow
import axios from "axios";
import {
  GET_EVENTS_DATA_SUCCESS,
  GET_EVENTS_DATA_FAILED,
  GET_CURRENT_EVENT,
  LOADING_BEGIN,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILED,
  HIDE_NOTIFICATION,
  GET_SERIAL_SUCCESS,
  GET_SERIAL_LOGS_SUCCESS,
  GET_ERROR
} from "./constants";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
// const beginLoading = () => ({
//   type: LOADING_BEGIN
// });
// const endLoading = () => ({
//   type: LOADING_END
// });
/**
 * Initilizes the menu
 */
export const getEvents = history => dispatch => {
  //console.log("getServiceData callled");
  dispatch({
    type: LOADING_BEGIN
  });
  axios
    .get(`/api/events/list`, config)
    .then(res => {
      dispatch({
        type: GET_EVENTS_DATA_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err.response);
      let message;
      switch (err.response.status) {
        case 500:
          message = "Internal Server Error";
          break;
        case 401:
          //message = "Invalid credentials";
          history.push("/pages/error-401");
          message = err.response.data.msg;
          break;
        default:
          message = err.response.data.msg;
      }
      dispatch({
        type: GET_EVENTS_DATA_FAILED,
        payload: message
      });
    });
};
export const getCurrentEvent = (event_id, history) => dispatch => {
  dispatch({
    type: LOADING_BEGIN
  });
  axios
    .get(`/api/events/detail/${event_id}`, config)
    .then(res => {
      dispatch({
        type: GET_CURRENT_EVENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("GET_CURRENT_EVENT Failed", err);
      history.push("/pages/error-500");
    });
};
//新增活動
export const editEvent = (event, history) => dispatch => {
  axios
    .post("/api/events", event, config)
    .then(res => {
      //res.json({ msg: "新增成功", insertId: result.insertId });

      dispatch({
        type: ADD_EVENT_SUCCESS,
        payload: res.data.affectedId
      });

      setTimeout(() => {
        dispatch({ type: HIDE_NOTIFICATION });
      }, 5000);
    })
    .catch(err => {
      console.log("err", err.response);
      let message;
      switch (err.response.status) {
        case 500:
          message = "Internal Server Error";
          history.push("/pages/error-500");
          break;
        case 401:
          //message = "Invalid credentials";
          history.push("/pages/error-401");
          message = err.response.data.msg;
          break;
        case 400:
          //bad request
          message = err.response.data.errors;
          break;
        case 403:
          //message = "Invalid credentials";
          history.push("/pages/error-403");
          message = err.response.data.msg;
          break;
        default:
          message = err.response.data.msg;
      }
      dispatch({
        type: ADD_EVENT_FAILED,
        payload: message
      });
    });
};
export const getSerialEvents = event_id => dispatch => {
  //console.log("getServiceData callled");
  dispatch({
    type: LOADING_BEGIN
  });
  axios
    .get(`/api/serial/m/${event_id}`, config)
    .then(res => {
      dispatch({
        type: GET_SERIAL_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      //console.log("err", err.response);
      let message = err.response.data.msg;

      dispatch({
        type: GET_ERROR,
        payload: message
      });
    });
};

export const getSerialLogs = event_id => dispatch => {
  //console.log("getServiceData callled");
  dispatch({
    type: LOADING_BEGIN
  });
  axios
    .get(`/api/serial/h/${event_id}`, config)
    .then(res => {
      dispatch({
        type: GET_SERIAL_LOGS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      //console.log("err", err.response);
      let message = err.response.data.msg;

      dispatch({
        type: GET_ERROR,
        payload: message
      });
    });
};
