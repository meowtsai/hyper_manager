// @flow
import React, { useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import classNames from "classnames";
import MetisMenu from "metismenujs/dist/metismenujs";

import {
  initMenuAndItems,
  changeActiveMenuFromLocation
} from "../redux/actions";

const MenuItemWithChildren = ({
  item,
  linkClassNames,
  subMenuClassNames,
  activatedMenuItemIds
}) => {
  return (
    <li
      className={classNames("side-nav-item", {
        active: activatedMenuItemIds.indexOf(item.id) >= 0
      })}
    >
      <Link
        to="/"
        className={classNames("has-arrow", "side-sub-nav-link", linkClassNames)}
        aria-expanded="false"
      >
        {item.icon && <i className={item.icon} />}
        {item.badge && (
          <span className={`badge badge-${item.badge.variant} float-right`}>
            {item.badge.text}
          </span>
        )}
        <span> {item.name} </span>
      </Link>

      <ul
        className={classNames(subMenuClassNames, {
          in: activatedMenuItemIds.indexOf(item.id) >= 0
        })}
        aria-expanded="false"
      >
        {item.children.map((child, i) => {
          return (
            <React.Fragment key={i}>
              {child.children ? (
                <MenuItemWithChildren
                  item={child}
                  linkClassNames=""
                  activatedMenuItemIds={activatedMenuItemIds}
                  subMenuClassNames="side-nav-third-level"
                />
              ) : (
                <MenuItem
                  item={child}
                  className={classNames({
                    active: activatedMenuItemIds.indexOf(child.id) >= 0
                  })}
                  linkClassName=""
                />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </li>
  );
};

const MenuItem = ({ item, className, linkClassName }) => {
  return (
    <li className={classNames("side-nav-item", className)}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
};

const MenuItemLink = ({ item, className }) => {
  return (
    <Link
      to={item.path}
      className={classNames(
        "side-nav-link-ref",
        "side-sub-nav-link",
        className
      )}
    >
      {item.icon && <i className={item.icon} />}
      {item.badge && (
        <span className={`badge badge-${item.badge.variant} float-right`}>
          {item.badge.text}
        </span>
      )}
      <span> {item.name} </span>
    </Link>
  );
};

/**
 * Renders the application menu
 */

const AppMenu = ({ initMenuAndItems, menu, history, mode }) => {
  useEffect(() => {
    if (!menu.menuItems) initMenuAndItems();
    else initMenu();
    // eslint-disable-next-line
  }, []);

  //   componentDidMount = () => {
  //     if (!menu.menuItems) initMenuAndItems();
  //      else initMenu();

  //     this.props.history.listen((location, action) => {
  //       this.props.changeActiveMenuFromLocation();
  //     });
  //   };

  //   componentDidUpdate = prevProps => {
  //     if (
  //       !prevProps.menu.menuItems ||
  //       (prevProps.menu.menuItems &&
  //         prevProps.menu.menuItems !== this.props.menu.menuItems)
  //     ) {
  //       this.initMenu();
  //     }
  //   };

  const initMenu = () => {
    if (mode === "horizontal") {
      const menu = new MetisMenu("#menu-bar").on("shown.metisMenu", function(
        event
      ) {
        window.addEventListener("click", function menuClick(e) {
          if (!event.target.contains(e.target)) {
            menu.hide(event.detail.shownElement);
            window.removeEventListener("click", menuClick);
          }
        });
      });
    } else {
      new MetisMenu("#menu-bar");
    }
  };

  const isHorizontal = mode === "horizontal";
  const activatedKeys = isHorizontal
    ? []
    : menu
    ? menu.activatedMenuItemIds
    : [] || [];

  return (
    <Fragment>
      <div className={classNames({ "topbar-nav": isHorizontal })}>
        {menu && menu.menuItems && (
          <ul className="metismenu side-nav" id="menu-bar">
            {menu.menuItems.map((item, i) => {
              return (
                <Fragment key={item.id}>
                  {item.header && !isHorizontal && (
                    <li
                      className="side-nav-title side-nav-item"
                      key={i + "-el"}
                    >
                      {item.header}
                    </li>
                  )}

                  {item.children ? (
                    <MenuItemWithChildren
                      item={item}
                      subMenuClassNames="side-nav-second-level"
                      activatedMenuItemIds={activatedKeys}
                      linkClassNames="side-nav-link"
                    />
                  ) : (
                    <MenuItem
                      item={item}
                      className={classNames({
                        active: activatedKeys.indexOf(item.id) >= 0
                      })}
                      linkClassName="side-nav-link"
                    />
                  )}
                </Fragment>
              );
            })}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

AppMenu.defaultProps = {
  mode: "vertical"
};

const mapStateToProps = state => {
  return {
    menu: state.AppMenu
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { initMenuAndItems, changeActiveMenuFromLocation }
  )(AppMenu)
);
