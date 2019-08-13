// @flow
import {
  INIT_MENU,
  INIT_MENU_SUCCESS,
  CHANGE_ACTIVE_MENU_FROM_LOCATION,
  CHANGE_ACTIVE_MENU_FROM_LOCATION_SUCCESS
} from "./constants";

import assignIds from "./utils";
import { authProtectedRoutes as routes } from "../../routes";
const initMenu = () => ({
  type: INIT_MENU,
  payload: {}
});

/**
 * Initilizes the menu
 */
export const initMenuAndItems = () => dispatch => {
  dispatch(initMenu);
  try {
    const menuItems = assignIds(routes);
    const activatedMenuItemIds = getActivatedMenuItemIds(menuItems);
    dispatch(initMenuSuccess(menuItems));
    dispatch(changeActiveMenuFromLocationSuccess(activatedMenuItemIds));
  } catch (error) {}
};

/**
 * Activate menu items from location
 * @param {*} menuItems
 */
const getActivatedMenuItemIds = menuItems => {
  var matchingItems = [];
  for (var menuItem of menuItems) {
    if (window.location.pathname.indexOf(menuItem.path) === 0)
      matchingItems.push(menuItem.id);

    if (typeof menuItem.children !== "undefined") {
      matchingItems = [
        ...matchingItems,
        ...getActivatedMenuItemIds(menuItem.children)
      ];
    }
  }
  return matchingItems;
};

const initMenuSuccess = menuItems => ({
  type: INIT_MENU_SUCCESS,
  payload: { menuItems }
});

export const changeActiveMenuFromLocation = () => ({
  type: CHANGE_ACTIVE_MENU_FROM_LOCATION,
  payload: {}
});

const changeActiveMenuFromLocationSuccess = activatedMenuItemIds => ({
  type: CHANGE_ACTIVE_MENU_FROM_LOCATION_SUCCESS,
  payload: { activatedMenuItemIds }
});
