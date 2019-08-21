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
import SerialEventList from "./SerialEventList";
import { getEvents } from "../../redux/actions";
import moment from "moment";

const EventHome = ({
  events,
  getEvents,
  loading,
  error,
  history,
  location
}) => {
  //console.log(location.search);
  useEffect(() => {
    getEvents(history);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setArrangedEvents(events);
  }, [events]);

  const [arrangedEvents, setArrangedEvents] = useState(events);
  const [filter, setFilter] = useState("all");
  //console.log("arrangedEvents", arrangedEvents);
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示{size} 筆紀錄中的 {from} ~ {to} 筆
    </span>
  );

  const paginationOptions = {
    paginationSize: 5,
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
        text: "5",
        value: 5
      },
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
        value: events.length
      }
    ] // A numeric array is also available. the purpose of above example is custom the text
  };
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true
    },
    {
      dataField: "event_name",
      text: "活動名稱",
      sort: true
    },
    {
      dataField: "formated_begin_time",
      text: "開始日期",
      sort: true
    },
    {
      dataField: "formated_end_time",
      text: "結束日期",
      sort: true
    },
    {
      dataField: "formated_status",
      text: "狀態",
      sort: false,
      formatter: (cellContent, row) => {
        if (
          row.formated_begin_time <
            moment()
              .local()
              .format("YYYY-MM-DD HH:mm:ss") &&
          row.formated_end_time >
            moment()
              .local()
              .format("YYYY-MM-DD HH:mm:ss") &&
          row.status === 1
        ) {
          return (
            <Badge color="success" className="mr-1">
              進行中
            </Badge>
          );
        } else {
          return (
            <Badge color="danger" className="mr-1">
              關閉
            </Badge>
          );
        }
      }
    },
    {
      dataField: "formated_type",
      text: "類型",
      sort: false
    },
    {
      dataField: "begin_time",
      text: "開始日期",
      hidden: true
    },
    {
      dataField: "end_time",
      text: "end_time",
      hidden: true
    },
    {
      dataField: "status",
      text: "status",
      hidden: true
    },
    {
      dataField: "type",
      text: "類型",
      hidden: true
    },

    {
      dataField: "df1",
      isDummyField: true,
      text: "操作",
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            <Link
              className="btn btn-icon btn-primary"
              to={`/events/edit/${row.id}`}
            >
              <i className="mdi mdi-pencil-outline ml-1 mr-1" />
            </Link>
            <Link
              className="btn btn-icon btn-info"
              to={`/events/info/${row.id}`}
            >
              <i className=" mdi mdi-library-books ml-1 mr-1" />
            </Link>
          </Fragment>
        );
      }
    }
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ];

  const filterEvents = status => {
    setFilter(status);
    switch (status) {
      case "on":
        setArrangedEvents(
          events.filter(
            event =>
              event.formated_begin_time <
                moment()
                  .local()
                  .format("YYYY-MM-DD HH:mm:ss") &&
              event.formated_end_time >
                moment()
                  .local()
                  .format("YYYY-MM-DD HH:mm:ss") &&
              event.status === 1
          )
        );
        break;
      case "off":
        setArrangedEvents(events.filter(event => event.status === 0));
        break;
      default:
        setArrangedEvents(events);
        break;
    }
  };

  const expandRow = {
    onlyOneExpanding: true,
    renderer: row => {
      if (row.type === 2) {
        return <SerialEventList event_id={row.id} />;
      }
    }
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "活動", path: "/events/home", active: true }
        ]}
        title={"活動列表"}
      />
      <Row className="mb-2">
        <Col sm={4}>
          <Link to="/events/create" className="btn btn-rounded btn-danger mb-3">
            <i className="mdi mdi-plus" /> 建立活動
          </Link>
        </Col>
        <Col sm={8}>
          <div className="text-sm-right">
            <div className="btn-group mb-3">
              <Button
                color={filter === "all" ? "primary" : "light"}
                onClick={() => filterEvents("all")}
              >
                全部
              </Button>
            </div>
            <ButtonGroup className="btn-group mb-3 ml-1">
              <Button
                color={filter === "on" ? "primary" : "light"}
                onClick={() => filterEvents("on")}
              >
                進行中
              </Button>
              <Button
                color={filter === "off" ? "primary" : "light"}
                onClick={() => filterEvents("off")}
              >
                關閉
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <Row className="mb-2">
        {events && (
          <Card>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={arrangedEvents}
                columns={columns}
                defaultSorted={defaultSorted}
                pagination={paginationFactory(paginationOptions)}
                hover={true}
                expandRow={expandRow}
              />
            </CardBody>
          </Card>
        )}
      </Row>
    </Fragment>
  );
};

EventHome.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  events: state.Events.list,
  loading: state.Events.loading,
  error: state.Events.error
});

export default connect(
  mapStateToProps,
  { getEvents }
)(EventHome);
