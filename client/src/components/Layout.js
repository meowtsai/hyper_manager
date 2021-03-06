// @flow
import React, { Component, Suspense } from "react";
import { connect } from "react-redux";

import Loadable from "react-loadable";

import { isUserAuthenticated } from "../helpers/authUtils";

// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div>...</div>;

// All layouts/containers
const AuthLayout = Loadable({
  loader: () => import("../layouts/Auth"),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

const VerticalLayout = Loadable({
  loader: () => import("../layouts/Vertical"),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent
 */
const withLayout = WrappedComponent => {
  const HOC = class extends Component {
    /**
     * Returns the layout component based on different properties
     */
    getLayout = () => {
      if (!isUserAuthenticated()) return AuthLayout;

      let layoutCls = VerticalLayout;

      // switch (this.props.layout.layoutType) {
      //   default:
      //     layoutCls = VerticalLayout;
      //     break;
      // }
      return layoutCls;
    };

    render() {
      const Layout = this.getLayout();
      //console.log("withLayout", this.props);
      return (
        <Suspense fallback={loading()}>
          <Layout {...this.props}>
            <WrappedComponent {...this.props} />
          </Layout>
        </Suspense>
      );
    }
  };

  const mapStateToProps = state => {
    return {
      layout: state.Layout
    };
  };

  return connect(
    mapStateToProps,
    null
  )(HOC);
};

export default withLayout;
