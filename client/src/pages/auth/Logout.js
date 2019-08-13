import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../redux/actions";

const Logout = ({ logoutUser, history }) => {
  useEffect(() => {
    logoutUser(history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Fragment />;
};

export default withRouter(
  connect(
    null,
    { logoutUser }
  )(Logout)
);
