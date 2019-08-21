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

//error ErrorUnauthorized ErrorPageNotFound ServerError
const ErrorUnauthorized = React.lazy(() =>
  import("../pages/error/Unauthorized")
);
const ErrorPageNotFound = React.lazy(() =>
  import("../pages/error/PageNotFound")
);
const ServerError = React.lazy(() => import("../pages/error/ServerError"));

const EventHome = React.lazy(() => import("../pages/events/EventHome"));
const EventForm = React.lazy(() => import("../pages/events/EventForm"));
const SerialEventInfo = React.lazy(() =>
  import("../pages/events/SerialEventInfo")
);

//platform
const ModifyPassword = React.lazy(() =>
  import("../pages/platform/ModifyPassword")
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

// pages
const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: "dripicons-copy",
  children: [
    {
      path: "/pages/error-401",
      name: "Error - 401",
      component: ErrorUnauthorized,
      route: PrivateRoute
    },

    {
      path: "/pages/error-404",
      name: "Error - 404",
      component: ErrorPageNotFound,
      route: PrivateRoute
    },
    {
      path: "/pages/error-500",
      name: "Error - 500",
      component: ServerError,
      route: PrivateRoute
    }
  ]
};

// events
const eventRoutes = {
  path: "/events",
  name: "活動",
  icon: "dripicons-view-apps",
  children: [
    {
      path: "/events/home",
      name: "活動列表",
      component: EventHome,
      route: PrivateRoute
    },
    {
      path: "/events/create",
      name: "建立活動",
      component: EventForm,
      route: PrivateRoute
    }
  ]
};

const eventRoutesSub = {
  children: [
    {
      path: "/events/edit/:event_id",
      name: "編輯活動",
      component: EventForm,
      route: PrivateRoute
    },
    {
      path: "/events/info/:event_id",
      name: "虛寶活動明細",
      component: SerialEventInfo,
      route: PrivateRoute
    }
  ]
};

const platformRoutesSub = {
  children: [
    {
      path: "/platform/modify_password",
      name: "修改密碼",
      component: ModifyPassword,
      route: PrivateRoute
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
const allRoutes = [
  authRoutes,
  rootRoute,
  dashboardRoutes,
  eventRoutes,
  eventRoutesSub,
  platformRoutesSub,
  pageRoutes
];

//所有要在leftSideBar顯示的路徑
const authProtectedRoutes = [dashboardRoutes, eventRoutes];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { authProtectedRoutes, allFlattenRoutes };
