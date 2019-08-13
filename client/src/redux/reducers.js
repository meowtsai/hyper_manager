// @flow

import { combineReducers } from "redux";
import Layout from "./layout/reducers";
import Auth from "./auth/reducers";
import AppMenu from "./appMenu/reducers";
import Dashboard from "./dashboard/reducers";

export default combineReducers({
  Auth,
  AppMenu,
  Layout,
  Dashboard
});
