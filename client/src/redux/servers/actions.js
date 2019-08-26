import axios from "axios";
import {
  GET_SERVERS_SUCCESS,
  GET_SERVERS_FAILED,
  LOADING_BEGIN
} from "./constants";

export const getServersByGameId = gameId => dispatch => {
  console.log("getServersByGameId callled", gameId);
  dispatch({
    type: LOADING_BEGIN
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  axios
    .get(`/api/servers/list/${gameId}`, config)
    .then(res => {
      dispatch({
        type: GET_SERVERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err.response);
      let message = err.response.data.msg;

      dispatch({
        type: GET_SERVERS_FAILED,
        payload: message
      });
    });
};
