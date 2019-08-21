import axios from "axios";
import {
  GET_GAMES_DATA_SUCCESS,
  GET_GAMES_DATA_FAILED,
  LOADING_BEGIN,
  LOADING_END
} from "./constants";

export const getGames = history => dispatch => {
  //console.log("getServiceData callled");
  dispatch({
    type: LOADING_BEGIN
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .get(`/api/games/list`, config)
    .then(res => {
      dispatch({
        type: GET_GAMES_DATA_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err.response);
      let message;
      switch (err.response.status) {
        case 500:
          history.push("/pages/error-500");
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
        type: GET_GAMES_DATA_FAILED,
        payload: message
      });
    });
};
