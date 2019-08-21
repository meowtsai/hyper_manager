// @flow
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

import notFoundImg from "../../assets/images/file-searching.svg";
import PageTitle from "../../components/PageTitle";

const ErrorUnauthorized = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Pages", path: "/pages/error-401" },
          { label: "401", path: "/pages/error-401", active: true }
        ]}
        title={"401 Error"}
      />

      <Row className="justify-content-center">
        <Col lg={4}>
          <div className="text-center">
            <img src={notFoundImg} height="90" alt="" />
            <h1 className="text-error mt-4">401</h1>
            <h4 className="text-uppercase text-danger mt-3">Unauthorized</h4>
            <p className="text-muted mt-3">您沒有檢視或執行本頁面的權限。</p>

            <Link className="btn btn-info mt-3" to="/">
              <i className="mdi mdi-reply" /> Home
            </Link>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ErrorUnauthorized;
