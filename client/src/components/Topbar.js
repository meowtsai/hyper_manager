// @flow
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ProfileDropdown from "./ProfileDropdown";

import logoSm from "../assets/images/logo_sm.png";
import logo from "../assets/images/logo-light.png";

const ProfileMenus = [
  {
    label: "修改密碼",
    icon: "mdi mdi-account-key-outline",
    redirectTo: "/platform/modify_password"
  },

  {
    label: "Logout",
    icon: "mdi mdi-logout",
    redirectTo: "/account/logout"
  }
];

const Topbar = ({ hideLogo = false, navCssClasses = "", user }) => {
  const containerCssClasses = !hideLogo ? "container-fluid" : "";

  return (
    <Fragment>
      <div className={`navbar-custom ${navCssClasses}`}>
        <div className={containerCssClasses}>
          {!hideLogo && (
            <Link to="/" className="topnav-logo">
              <span className="topnav-logo-lg">
                <img src={logo} alt="logo" height="16" />
              </span>
              <span className="topnav-logo-sm">
                <img src={logoSm} alt="logo" height="16" />
              </span>
            </Link>
          )}

          <ul className="list-unstyled topbar-right-menu float-right mb-0">
            <li className="notification-list">
              <ProfileDropdown
                menuItems={ProfileMenus}
                username={user.account}
                userTitle={user.role}
              />
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(
  mapStateToProps,
  null
)(Topbar);
