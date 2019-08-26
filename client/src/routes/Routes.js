import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

// layout HOC
import withLayout from "../components/Layout";
import { allFlattenRoutes as routes } from "./index";

const Routes = () => (
  // rendering the router with layout
  <BrowserRouter>
    <Switch>
      {routes.map((route, index) => {
        //console.log("route", route);
        return (
          !route.children && (
            <route.route
              key={index}
              path={route.path}
              roles={route.roles}
              exact={route.exact}
              component={withLayout(props => {
                //console.log("route.path ", route.path, props);
                return <route.component {...props} />;
              })}
            />
          )
        );
      })}
    </Switch>
  </BrowserRouter>
);

export default Routes;
