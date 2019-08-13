import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import Statistics from "./Statistics";
import GameDistBarchart from "./GameDistBarchart";
const ServiceReport = ({ stat }) => {
  return (
    <Row>
      <Col xl={5}>
        <Statistics stat={stat} />
      </Col>

      <Col xl={7}>
        <GameDistBarchart stat={stat.allocateCount.result} />
      </Col>
    </Row>
  );
};

ServiceReport.propTypes = { stat: PropTypes.object.isRequired };

export default ServiceReport;
