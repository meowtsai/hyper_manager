// @flow
import React, { Component, Suspense } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import * as layoutConstants from "../constants/layout.js";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const LeftSidebar = React.lazy(() => import("../components/LeftSidebar"));
const Topbar = React.lazy(() => import("../components/Topbar"));

// loading
const emptyLoading = () => <div />;
const loading = () => <div className="text-center" />;

class VerticalLayout extends Component {
  constructor(props) {
    super(props);
    this.openLeftMenu = this.openLeftMenu.bind(this);
  }

  /**
   * Opens the left menu - mobile
   */
  openLeftMenu = () => {
    if (document.body) document.body.classList.add("sidebar-enable");
  };

  render() {
    // get the child view which we would like to render
    const children = this.props.children || null;

    const isCondensed =
      this.props.layout.leftSideBarType ===
      layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED;
    const isLight =
      this.props.layout.leftSideBarTheme ===
      layoutConstants.LEFT_SIDEBAR_THEME_LIGHT;

    return (
      <div className="app">
        <div className="wrapper">
          <Suspense fallback={emptyLoading()}>
            <LeftSidebar
              isCondensed={isCondensed}
              isLight={isLight}
              hideUserProfile={true}
              {...this.props}
            />
          </Suspense>

          <div className="content-page">
            <div className="content">
              <Suspense fallback={emptyLoading()}>
                <Topbar
                  openLeftMenuCallBack={this.openLeftMenu}
                  hideLogo={true}
                  {...this.props}
                />
              </Suspense>

              <Container fluid>
                <Suspense fallback={loading()}>{children}</Suspense>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout
  };
};
export default connect(
  mapStateToProps,
  null
)(VerticalLayout);
