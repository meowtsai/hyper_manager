import React, { useState } from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

import {
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const GameDistBarchart = ({ stat, cs_members = [], selectStaff }) => {
  const [subTitle, setSubTitle] = useState("");
  const games = stat.map(item => item.game_name);
  const processData = stat.map(item => item.status_process);
  const doneData = stat.map(item => item.status_done);
  const robotData = stat.map(item => item.status_robot);
  const apexBarChartStackedOpts = {
    chart: {
      height: 260,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      show: false
    },
    xaxis: {
      categories: games,
      labels: {
        formatter: function(val) {
          return val + "件";
        }
      }
    },
    yaxis: {
      title: {
        text: "後送件數"
      }
    },
    colors: ["#fa5c7c", "#ffbc00", "#0acf97"],
    tooltip: {
      y: {
        formatter: function(val) {
          return val + "件";
        }
      }
    },
    fill: {
      opacity: 1
    },
    states: {
      hover: {
        filter: "none"
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "center"
    },
    grid: {
      borderColor: "#f1f3fa"
    }
  };

  const apexBarChartStackedData = [
    {
      name: "未處理",
      data: robotData
    },
    {
      name: "處理中",
      data: processData
    },
    {
      name: "已完成",
      data: doneData
    }
  ];
  return (
    <Card>
      <CardBody>
        {cs_members.length > 0 && (
          <UncontrolledButtonDropdown className="float-right">
            <DropdownToggle
              tag="button"
              className="btn btn-link arrow-none card-drop p-0"
            >
              <i className="mdi mdi-dots-vertical" />
            </DropdownToggle>

            <DropdownMenu right>
              <DropdownItem
                onClick={() => {
                  selectStaff("");
                  setSubTitle("總覽");
                }}
              >
                總覽
              </DropdownItem>
              {cs_members.map(member => (
                <DropdownItem
                  key={member.uid}
                  onClick={() => {
                    selectStaff(member.uid);
                    setSubTitle(member.name);
                  }}
                >
                  {member.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        )}

        <h4 className="header-title mb-1">後送案件數量 by 遊戲 </h4>
        <p className="text-muted font-14 mb-1">
          <code>{subTitle}</code>
        </p>
        <Chart
          options={apexBarChartStackedOpts}
          series={apexBarChartStackedData}
          height={260}
          type="bar"
          className="apex-charts"
        />
      </CardBody>
    </Card>
  );
};

GameDistBarchart.propTypes = {
  stat: PropTypes.array.isRequired
};

export default GameDistBarchart;
