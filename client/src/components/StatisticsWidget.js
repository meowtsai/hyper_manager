// @flow
import React from "react";
import { Card, CardBody } from "reactstrap";

import classNames from "classnames";

/**
 * Statistics widget
 */
const StatisticsWidget = props => {
  const textClass = props.textClass || "text-muted";
  return (
    <Card className={classNames("widget-flat", props.bgclassName)}>
      <CardBody>
        {props.icon && (
          <div className="float-right">
            <i className={classNames(props.icon, "widget-icon")} />
          </div>
        )}
        <h5
          className={classNames("font-weight-normal", "mt-0", textClass)}
          title={props.description}
        >
          {props.title}
        </h5>
        <h3 className={classNames("mt-3", "mb-3", textClass)}>{props.stats}</h3>

        {props.trend && (
          <p className={classNames("mb-0", textClass)}>
            <span className={classNames(props.trend.textClass, "mr-2")}>
              <i className={classNames(props.trend.icon)} /> {props.trend.value}
            </span>
            <span className="text-nowrap">{props.trend.time}</span>
          </p>
        )}
      </CardBody>
    </Card>
  );
};

export default StatisticsWidget;
