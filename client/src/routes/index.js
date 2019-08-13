import React from "react";

import { Route, Redirect } from "react-router-dom";

import { isUserAuthenticated, getLoggedInUser } from "../helpers/authUtils";

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!isUserAuthenticated()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/account/login", state: { from: props.location } }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role
      if (roles && roles.indexOf(loggedInUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

// lazy load all the views

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
// dashboard
const ServiceDashboard = React.lazy(() =>
  import("../pages/dashboards/Service")
);

// root routes
const rootRoute = {
  path: "/",
  exact: true,
  component: () => <Redirect to="/dashboard" />,
  route: PrivateRoute
};

// dashboards
const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  icon: "dripicons-meter",
  // badge: {
  //   variant: "success",
  //   text: "3"
  // },
  header: "Navigation",
  component: ServiceDashboard,
  route: PrivateRoute
};

// auth
const authRoutes = {
  path: "/account",
  name: "Auth",
  children: [
    {
      path: "/account/login",
      name: "Login",
      component: Login,
      route: Route
    },
    {
      path: "/account/logout",
      name: "Logout",
      component: Logout,
      route: Route
    }
  ]
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach(item => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const allRoutes = [authRoutes, rootRoute, dashboardRoutes];
const authProtectedRoutes = [dashboardRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { authProtectedRoutes, allFlattenRoutes };
