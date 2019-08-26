// @flow

import { combineReducers } from "redux";
import Layout from "./layout/reducers";
import Auth from "./auth/reducers";
import AppMenu from "./appMenu/reducers";
import Dashboard from "./dashboard/reducers";
import Events from "./events/reducers";
import Games from "./games/reducers";
import Servers from "./servers/reducers";
import Platform from "./platform/reducers";
import AdminUsers from "./admin_users/reducers";
import OfflineCS from "./offlinecs/reducers";

export default combineReducers({
  Auth,
  AppMenu,
  Layout,
  Dashboard,
  Events,
  Games,
  Servers,
  Platform,
  AdminUsers,
  OfflineCS
});
