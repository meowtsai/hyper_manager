// @flow
import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_TYPE,
  TOGGLE_RIGHT_SIDEBAR,
  SHOW_RIGHT_SIDEBAR,
  HIDE_RIGHT_SIDEBAR
} from "./constants";

import * as layoutConstants from "../../constants/layout";

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
}

export const changeLayout = layout => dispatch => {
  changeBodyAttribute("data-layout", layout);
  dispatch({
    type: CHANGE_LAYOUT,
    payload: layout
  });

  dispatch({
    type: CHANGE_SIDEBAR_THEME,
    payload: layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT
  });

  dispatch({
    type: CHANGE_SIDEBAR_TYPE,
    payload: layoutConstants.LEFT_SIDEBAR_TYPE_FIXED
  });
};

export const changeLayoutWidth = width => dispatch => {
  changeBodyAttribute("data-layout-mode", width);
  dispatch({
    type: CHANGE_LAYOUT_WIDTH,
    payload: width
  });
};

export const changeSidebarTheme = theme => dispatch => {
  changeBodyAttribute("data-leftbar-theme", theme);
  dispatch({
    type: CHANGE_SIDEBAR_THEME,
    payload: theme
  });
};

export const changeSidebarType = sidebarType => dispatch => {
  changeBodyAttribute("data-leftbar-compact-mode", sidebarType);
  dispatch({
    type: CHANGE_SIDEBAR_TYPE,
    payload: sidebarType
  });
};

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
const manageBodyClass = (cssClass, action = "toggle") => {
  switch (action) {
    case "add":
      if (document.body) document.body.classList.add(cssClass);
      break;
    case "remove":
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }

  return true;
};

export const toggleRightSidebar = () => dispatch => {
  manageBodyClass("right-bar-enabled");
  dispatch({
    type: TOGGLE_RIGHT_SIDEBAR,
    payload: null
  });
};

export const showRightSidebar = () => dispatch => {
  manageBodyClass("right-bar-enabled", "add");
  dispatch({
    type: SHOW_RIGHT_SIDEBAR,
    payload: null
  });
};
export const hideRightSidebar = () => dispatch => {
  manageBodyClass("right-bar-enabled", "remove");
  dispatch({
    type: HIDE_RIGHT_SIDEBAR,
    payload: null
  });
};
