import React, { Fragment } from "react";
import PageTitle from "../../../components/PageTitle";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const GovLetterHome = props => {
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "線下客服", path: "/offline/gov_letter", active: false },
          { label: "公函", path: "/offline/gov_letter", active: true }
        ]}
        title={"公函"}
      />
      <Row className="mb-2">
        <Col lg={4} />
      </Row>
    </Fragment>
  );
};

GovLetterHome.propTypes = {};

export default GovLetterHome;
