// @flow
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import PropTypes from "prop-types";

/**
 * PageTitle
 */
const PageTitle = ({ breadCrumbItems, title }) => {
  return (
    <Row>
      <Col>
        <div className="page-title-box">
          <div className="page-title-right">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              {breadCrumbItems.map((item, index) => {
                return item.active ? (
                  <BreadcrumbItem active key={index}>
                    {item.label}
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem key={index}>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumb>
          </div>
          <h4 className="page-title">{title}</h4>
        </div>
      </Col>
    </Row>
  );
};

PageTitle.propTypes = {
  breadCrumbItems: PropTypes.array,
  title: PropTypes.string
};
export default PageTitle;
