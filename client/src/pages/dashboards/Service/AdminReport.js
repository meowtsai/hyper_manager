import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { Row, Col, Card, CardBody, Table } from "reactstrap";
import PerformanceChart from "./PerformanceChart";
import GameDistBarchart from "./GameDistBarchart";
const AdminReport = ({ summary }) => {
  //console.log("AdminReport summary", summary);

  const [gameDistData, setGameDistData] = useState(
    summary.allocateCount.result
  );

  const selectStaff = uid => {
    //console.log("selectStaff", uid);
    if (uid === "") {
    } else {
    }
    const found_data =
      uid === ""
        ? summary.allocateCount
        : summary.allocateCountByMember.find(data => data.admin_uid === uid);

    setGameDistData(found_data.result);
  };
  return (
    <Fragment>
      <Row>
        <Col xl={5}>
          <Card>
            <CardBody>
              <h4 className="header-title">案件處理</h4>

              <Table className="mb-0">
                <thead>
                  <tr>
                    <th>專員</th>
                    <th>後送處理中</th>
                    <th>後送已完成</th>
                    <th>公函</th>
                    <th>消保案</th>
                    <th>加總</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.csSummary
                    .filter(cs => cs.role === "cs_master")
                    .map((record, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{record.admin_name}</th>
                          <td>{record.status_process}</td>
                          <td>{record.status_done}</td>
                          <td>{record.gov_cnt}</td>
                          <td>{record.cpl_cnt2}</td>
                          <td>
                            {Number.parseInt(record.status_process) +
                              Number.parseInt(record.status_done) +
                              Number.parseInt(record.gov_cnt) +
                              Number.parseInt(record.cpl_cnt2)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col xl={7}>
          <GameDistBarchart
            stat={gameDistData}
            cs_members={summary.cs_members}
            selectStaff={selectStaff}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <PerformanceChart chrart_data={summary.csSummaryByYear} />
        </Col>
      </Row>
    </Fragment>
  );
};

AdminReport.propTypes = {
  summary: PropTypes.object.isRequired
};

export default AdminReport;
