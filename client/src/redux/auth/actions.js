import axios from "axios";

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER,
  LOGOUT_USER
} from "./constants";

/**
 * Login the user
 * @param {*} payload - username and password
 */
export const loginUser = (account, password) => async dispatch => {
  //console.log("call loginuser");
  dispatch({ type: LOGIN_USER });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .post("/api/auth", { account, password }, config)
    .then(res => {
      //console.log("res", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      //console.log("err", err.response);
      let message;
      switch (err.response.status) {
        case 500:
          message = "Internal Server Error";
          break;
        case 401:
          //message = "Invalid credentials";
          message = err.response.data.msg;
          break;
        default:
          message = err.response.data.msg;
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({
        type: LOGIN_USER_FAILED,
        payload: message
      });
    });
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  history.push("/account/login");
  dispatch({
    type: LOGOUT_USER,
    payload: { history }
  });
};
