// @flow
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";

const ProfileDropdown = ({ username, userTitle, menuItems }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={e => setDropdownOpen(!dropdownOpen)}
    >
      <DropdownToggle
        data-toggle="dropdown"
        tag="button"
        className="btn btn-link nav-link dropdown-toggle nav-user arrow-none mr-0"
        onClick={e => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="account-user-avatar">
          <i className="dripicons-user" />
        </span>
        <span>
          <span className="account-user-name">{username}</span>
          <span className="account-position">{userTitle}</span>
        </span>
      </DropdownToggle>
      <DropdownMenu
        right
        className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
      >
        <div onClick={e => setDropdownOpen(!dropdownOpen)}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
          {menuItems.map((item, i) => {
            return (
              <Link
                to={item.redirectTo}
                className="dropdown-item notify-item"
                key={i + "-profile-menu"}
              >
                <i className={`${item.icon} mr-1`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
