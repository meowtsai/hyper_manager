// @flow

import { combineReducers } from "redux";
import Layout from "./layout/reducers";
import Auth from "./auth/reducers";
import AppMenu from "./appMenu/reducers";
import Dashboard from "./dashboard/reducers";
import Events from "./events/reducers";
import Games from "./games/reducers";
import Platform from "./platform/reducers";

export default combineReducers({
  Auth,
  AppMenu,
  Layout,
  Dashboard,
  Events,
  Games,
  Platform
});
