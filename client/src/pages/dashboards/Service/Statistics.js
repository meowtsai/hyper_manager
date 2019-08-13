// @flow
import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import StatisticsWidget from "../../../components/StatisticsWidget";

const Statistics = ({ stat }) => {
  const sum_d = stat.allocateCount.result.reduce(
    (acc, curr) => acc + parseInt(curr.status_done),
    0
  );

  var sum_p = stat.allocateCount.result.reduce(
    (acc, curr) => acc + parseInt(curr.status_process),
    0
  );

  return (
    <Fragment>
      {/* preloader */}

      <Row>
        <Col lg={6}>
          <StatisticsWidget
            icon="mdi mdi-basket-fill"
            description="後送總數"
            title="後送已處理"
            stats={sum_d}
          />
        </Col>

        <Col lg={6}>
          <StatisticsWidget
            icon="mdi mdi-chat-alert"
            description="處理中"
            title="後送處理中"
            stats={sum_p}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <StatisticsWidget
            icon="mdi mdi-email-open"
            description="公函處理"
            title="公函"
            stats={stat.govCount}
          />
        </Col>

        <Col lg={6}>
          <StatisticsWidget
            icon="mdi mdi-account-alert"
            description="消保案處理"
            title="消保案"
            stats={stat.cplCount.replies_cnt + stat.cplCount.cnt}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Statistics;
