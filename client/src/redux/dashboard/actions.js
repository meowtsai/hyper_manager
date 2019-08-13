// @flow
import axios from "axios";
import {
  GET_SERVICE_DATA_SUCCESS,
  GET_SERVICE_DATA_FAILED,
  LOADING_BEGIN
} from "./constants";

// const beginLoading = () => ({
//   type: LOADING_BEGIN
// });
// const endLoading = () => ({
//   type: LOADING_END
// });
/**
 * Initilizes the menu
 */
export const getServiceData = (startDate, endDate) => dispatch => {
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
    .get(
      `/api/service_rpt/stat?begin_date=${startDate}&end_date=${endDate}`,
      config
    )
    .then(res => {
      dispatch({
        type: GET_SERVICE_DATA_SUCCESS,
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
          message = err.response.data.msg;
          break;
        default:
          message = err.response.data.msg;
      }
      dispatch({
        type: GET_SERVICE_DATA_FAILED,
        payload: message
      });
    });
};
