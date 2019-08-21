// @flow
import axios from "axios";
import {
  UPDATE_PASSWORD_SUCCESS,
  HIDE_NOTIFICATION,
  GET_ERROR
} from "./constants";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

//新增活動
export const updatePassword = (formData, history) => dispatch => {
  axios
    .post("/api/platform/modify_password", formData, config)
    .then(res => {
      //res.json({ msg: "新增成功", insertId: result.insertId });

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS
      });

      setTimeout(() => {
        dispatch({ type: HIDE_NOTIFICATION });
      }, 3000);
    })
    .catch(err => {
      console.log("err", err.response);

      const message = err.response.data.errors;
      dispatch({
        type: GET_ERROR,
        payload: message
      });
    });
};
