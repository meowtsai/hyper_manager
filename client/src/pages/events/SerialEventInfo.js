import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Badge
} from "reactstrap";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import PropTypes from "prop-types";
import PageTitle from "../../components/PageTitle";

import { getSerialLogs } from "../../redux/actions";
import moment from "moment";

const SerialEventInfo = ({
  serialLogs,
  error,
  loading,
  getSerialLogs,
  location,
  match
}) => {
  // console.log("location", location);
  // console.log("match", match.params.event_id);

  const event_id = match.params.event_id;
  const [arrangedLogs, setArrangedLogs] = useState(serialLogs);
  const [filter, setFilter] = useState("all");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getSerialLogs(event_id);
  }, []);

  useEffect(() => {
    setArrangedLogs(serialLogs);
  }, [serialLogs]);

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示{size} 筆紀錄中的 {from} ~ {to} 筆
    </span>
  );

  const paginationOptions = {
    paginationSize: 10,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: "10",
        value: 10
      },
      {
        text: "25",
        value: 25
      },
      {
        text: "All",
        value: serialLogs.length
      }
    ] // A numeric array is also available. the purpose of above example is custom the text
  };
  //帳號	角色名稱	角色id	序號	兌換時間	獎項
  // "partner_uid": "295964772",
  // "char_id": "113762",
  // "char_name": "長河落日",
  // "ip": "61.220.44.200",
  // "serial": "6CPd2uXzDvyj",
  // "create_time": "2019-08-14T01:35:54.000Z",
  // "event_sub_id": 23,
  // "title": "Nonolive 開播 600 分鐘獎勵"
  const columns = [
    {
      dataField: "partner_uid",
      text: "帳號",
      sort: true
    },
    {
      dataField: "char_name",
      text: "角色名稱",
      sort: true
    },
    {
      dataField: "char_id",
      text: "角色id",
      sort: true
    },
    {
      dataField: "serial",
      text: "序號",
      sort: true
    },
    {
      dataField: "title",
      text: "獎項",
      sort: true
    },
    {
      dataField: "create_time",
      text: "時間",
      sort: true
    },
    {
      dataField: "status",
      text: "狀態",
      hidden: true
    },
    {
      dataField: "formated_status",
      text: "狀態",
      sort: false,
      formatter: (cellContent, row) => (
        <Badge color={row.status === 1 ? "success" : "danger"} className="mr-1">
          {row.status === 1 ? "成功" : "失敗"}
        </Badge>
      )
    }
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const filterLogs = status => {
    setFilter(status);
    if (status !== "keyword") {
      setKeyword("");
    }
    switch (status) {
      case "on":
        setArrangedLogs(serialLogs.filter(log => log.status === 1));

        break;
      case "off":
        setArrangedLogs(serialLogs.filter(log => log.status === 0));
        break;
      case "keyword":
        setArrangedLogs(
          serialLogs.filter(log => {
            if (
              log.partner_uid.indexOf(keyword) > -1 ||
              log.char_name.indexOf(keyword) > -1 ||
              log.char_id.indexOf(keyword) > -1 ||
              log.serial.indexOf(keyword) > -1
            ) {
              return true;
            }
            return false;
          })
        );
        break;
      default:
        setArrangedLogs(serialLogs);
        break;
    }
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "活動", path: "/events/home", active: true },
          { label: "虛寶活動明細", path: "/events/info/id", active: true }
        ]}
        title={"虛寶活動明細"}
      />
      <Row className="mb-2">
        <Col sm={4}>
          <div className="app-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="輸入關鍵字查找..."
                value={keyword}
                onChange={e => setKeyword(e.target.value.trim())}
              />
              <span className="mdi mdi-magnify" />
              <div className="input-group-append">
                <Button
                  color={filter === "keyword" ? "primary" : "light"}
                  onClick={() => filterLogs("keyword")}
                >
                  搜尋
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={8}>
          <div className="text-sm-right">
            <div className="btn-group mb-3">
              <Button
                color={filter === "all" ? "primary" : "light"}
                onClick={() => filterLogs("all")}
              >
                全部
              </Button>
            </div>
            <ButtonGroup className="btn-group mb-3 ml-1">
              <Button
                color={filter === "on" ? "primary" : "light"}
                onClick={() => filterLogs("on")}
              >
                兌換成功
              </Button>
              <Button
                color={filter === "off" ? "primary" : "light"}
                onClick={() => filterLogs("off")}
              >
                兌換失敗
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <Row className="mb-2">
        {serialLogs && (
          <Card>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={arrangedLogs}
                columns={columns}
                defaultSorted={defaultSorted}
                pagination={paginationFactory(paginationOptions)}
                hover={true}
              />
            </CardBody>
          </Card>
        )}
      </Row>
    </Fragment>
  );
};

SerialEventInfo.propTypes = {
  serialLogs: PropTypes.array.isRequired,
  getSerialLogs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  serialLogs: state.Events.logs,
  loading: state.Events.loading,
  error: state.Events.error
});

export default connect(
  mapStateToProps,
  { getSerialLogs }
)(SerialEventInfo);
