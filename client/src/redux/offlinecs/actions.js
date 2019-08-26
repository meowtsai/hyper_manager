import axios from "axios";
import {
  GET_OCSDATA_SUCCESS,
  GET_OCSDATA_FAILED,
  ADD_OCSDATA_SUCCESS,
  ADD_OCSDATA_FAILED,
  HIDE_NOTIFICATION,
  LOADING_BEGIN,
  GET_CURRENT_RECORD,
  CLEAR_CURRENT_RECORD
} from "./constants";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const getPVList = () => dispatch => {
  dispatch({
    type: LOADING_BEGIN
  });

  axios
    .get(`/api/offline_cs/pv_list`, config)
    .then(res => {
      dispatch({
        type: GET_OCSDATA_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err.response);
      let message = err.response.data.msg;

      dispatch({
        type: GET_OCSDATA_FAILED,
        payload: message
      });
    });
};

export const clearCurrentRecord = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_RECORD
  });
};

export const getCurrentRecord = (record_id, history) => dispatch => {
  dispatch({
    type: LOADING_BEGIN
  });
  axios
    .get(`/api/offline_cs/pv_list/detail/${record_id}`, config)
    .then(res => {
      dispatch({
        type: GET_CURRENT_RECORD,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("GET_CURRENT_EVENT Failed", err);
      history.push("/pages/error-500");
    });
};

//新增或編輯親訪紀錄
export const editRecord = (record, history) => dispatch => {
  axios
    .post("/api/offline_cs/pv_list", record, config)
    .then(res => {
      //res.json({ msg: "新增成功", insertId: result.insertId });

      dispatch({
        type: ADD_OCSDATA_SUCCESS,
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
        type: ADD_OCSDATA_FAILED,
        payload: message
      });
    });
};
