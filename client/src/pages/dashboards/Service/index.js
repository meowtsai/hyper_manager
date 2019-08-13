// @flow
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col } from "reactstrap";

import DatePicker from "react-datepicker";

import { getServiceData } from "../../../redux/actions";
import LoaderWidget from "../../../components/Loader";
import AdminReport from "./AdminReport";
import ServiceReport from "./ServiceReport";
// import ja from "date-fns/locale/ja";
// registerLocale("ja", ja);
// import zh-TW from 'date-fns/locale/zh-TW';
// registerLocale('zh-TW', zh-TW) zh-TW

const ServiceDashboardPage = ({ getServiceData, stat, loading }) => {
  const [startDate, setStartDate] = useState(
    new Date(moment().subtract(7, "days"))
  );
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    //console.log("loading", loading);
    getServiceData(startDate, endDate);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    getServiceData(startDate, endDate);
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <div className="page-title-box">
            <div className="page-title-right">
              <form className="form-inline" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <DatePicker
                      className="form-control form-control-dark"
                      dateFormat="yyyy/MM/dd"
                      selected={startDate}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      onChange={date => setStartDate(date)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text bg-primary border-primary text-white">
                        <i className="mdi mdi-calendar-range font-13" />
                      </span>
                    </div>
                  </div>
                  ~
                  <div className="input-group">
                    <DatePicker
                      className="form-control form-control-dark"
                      dateFormat="yyyy/MM/dd"
                      selected={endDate}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      onChange={date => setEndDate(date)}
                      minDate={startDate}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text bg-primary border-primary text-white">
                        <i className="mdi mdi-calendar-range font-13" />
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary ml-2">
                  <i className="mdi mdi-autorenew" />
                </button>
              </form>
            </div>
            <h4 className="page-title">Dashboard</h4>
          </div>
        </Col>
      </Row>
      {loading ? (
        <LoaderWidget />
      ) : stat.forAdmin ? (
        <AdminReport summary={stat.summary} />
      ) : (
        <ServiceReport stat={stat} />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  stat: state.Dashboard.stat,
  loading: state.Dashboard.loading
});

export default connect(
  mapStateToProps,
  { getServiceData }
)(ServiceDashboardPage);
