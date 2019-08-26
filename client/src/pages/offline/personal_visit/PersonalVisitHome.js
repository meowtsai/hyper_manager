import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Badge
} from "reactstrap";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";
import PageTitle from "../../../components/PageTitle";
import { getPVList } from "../../../redux/actions";
import moment from "moment";

const PersonalVisitHome = ({
  ocsdata,
  getPVList,
  loading,
  error,
  history,
  location
}) => {
  const [filter, setFilter] = useState("all");

  const filterStatus = status => {
    setFilter(status);

    if (status !== "keyword") {
      setKeyword("");
    }

    switch (status) {
      case "1":
        setArrangedOcsdata(ocsdata.filter(log => log.status === "1"));

        break;
      case "4":
        setArrangedOcsdata(ocsdata.filter(log => log.status === "4"));
        break;
      case "keyword":
        setArrangedOcsdata(
          ocsdata.filter(item => {
            if (
              item.client_name.indexOf(keyword) > -1 ||
              item.role_name.indexOf(keyword) > -1 ||
              item.game_name.indexOf(keyword) > -1 ||
              item.server_name.indexOf(keyword) > -1
            ) {
              return true;
            }
            return false;
          })
        );
        break;
      default:
        setArrangedOcsdata(ocsdata);
        break;
    }
  };

  const [arrangedOcsdata, setArrangedOcsdata] = useState([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    getPVList(history);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setArrangedOcsdata(ocsdata);
  }, [ocsdata]);

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      顯示{size} 筆紀錄中的 {from} ~ {to} 筆
    </span>
  );

  const paginationOptions = {
    paginationSize: 25,
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
        text: "25",
        value: 25
      },
      {
        text: "All",
        value: ocsdata.length
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
      dataField: "client_name",
      text: "訪客姓名",
      sort: true
    },
    {
      dataField: "formated_visit_time",
      text: "拜訪時間",
      sort: true
    },
    {
      dataField: "cause",
      text: "親訪原因",
      sort: false
    },
    {
      dataField: "role_info",
      isDummyField: true,
      text: "角色資訊",
      formatter: (cellContent, row) => {
        return (
          <Fragment>
            【{row.game_name}】{row.role_name} ({row.server_name})
          </Fragment>
        );
      }
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
              to={`/offline/personal_visit/edit/${row.id}`}
            >
              <i className="mdi mdi-pencil-outline ml-1 mr-1" />
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
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "線下客服",
            path: "/offline/personal_visit/home",
            active: false
          },
          { label: "親訪", path: "/offline/personal_visit/home", active: true }
        ]}
        title={"親訪"}
      />
      <Row className="mb-2">
        <Col sm={8}>
          <Link
            to="/offline/personal_visit/create"
            className="btn btn-rounded btn-danger mb-3"
          >
            <i className="mdi mdi-plus" /> 新增親訪記錄
          </Link>
        </Col>
        <Col sm={4}>
          <div className="app-search text-sm-right">
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
                  onClick={() => filterStatus("keyword")}
                >
                  搜尋
                </Button>
              </div>
            </div>
          </div>
        </Col>
        {/* <Col sm={4}>
          <div className="text-sm-right">
            <div className="btn-group mb-3">
              <Button
                color={filter === "all" ? "primary" : "light"}
                onClick={() => filterStatus("all")}
              >
                全部
              </Button>
            </div>
            <ButtonGroup className="btn-group mb-3 ml-1">
              <Button
                color={filter === "1" ? "primary" : "light"}
                onClick={() => filterStatus("1")}
              >
                1-已處理
              </Button>
              <Button
                color={filter === "4" ? "primary" : "light"}
                onClick={() => filterStatus("4")}
              >
                4-已結案
              </Button>
            </ButtonGroup>
          </div>
        </Col> */}
      </Row>
      <Row className="mb-2">
        {ocsdata && (
          <Card>
            <CardBody>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={arrangedOcsdata}
                columns={columns}
                defaultSorted={defaultSorted}
                pagination={paginationFactory(paginationOptions)}
              />
            </CardBody>
          </Card>
        )}
      </Row>
    </Fragment>
  );
};

PersonalVisitHome.propTypes = {
  ocsdata: PropTypes.array.isRequired,
  getPVList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ocsdata: state.OfflineCS.ocsdata,
  loading: state.OfflineCS.loading,
  error: state.OfflineCS.error
});

export default connect(
  mapStateToProps,
  { getPVList }
)(PersonalVisitHome);
