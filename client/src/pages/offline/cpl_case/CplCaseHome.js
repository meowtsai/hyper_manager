import React, { Fragment } from "react";
import PageTitle from "../../../components/PageTitle";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const CplCaseHome = props => {
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "線下客服", path: "/offline/cpl_case", active: false },
          { label: "消保", path: "/offline/cpl_case", active: true }
        ]}
        title={"消保"}
      />
      <Row className="mb-2">
        <Col lg={4} />
      </Row>
    </Fragment>
  );
};

CplCaseHome.propTypes = {};

export default CplCaseHome;
