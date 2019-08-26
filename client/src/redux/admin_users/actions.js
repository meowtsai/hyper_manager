import axios from "axios";
import {
  GET_CSMASTER_SUCCESS,
  GET_CSMASTER_FAILED,
  LOADING_BEGIN
} from "./constants";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const getCSMaster = () => dispatch => {
  dispatch({
    type: LOADING_BEGIN
  });

  axios
    .get(`/api/admin_users/getCSMaster`, config)
    .then(res => {
      dispatch({
        type: GET_CSMASTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err.response);
      let message = err.response.data.msg;

      dispatch({
        type: GET_CSMASTER_FAILED,
        payload: message
      });
    });
};
