// @flow
import React from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

const PerformanceChart = ({ chrart_data }) => {
  //console.log(chrart_data);

  const apexBarChartOpts = {
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    chart: {
      height: 260,
      type: "bar",
      stacked: false,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    zoom: {
      enabled: false
    },
    legend: {
      position: "top",
      horizontalAlign: "center"
    },

    colors: ["#727cf5", "#6c757d", "#0acf97", "#fa5c7c", "#39afd1"],

    xaxis: {
      categories: chrart_data.map(item => item.month),
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return val + "件";
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + "件";
        }
      }
    }
  };

  const apexBarChartData = [
    {
      name: "Total",
      data: chrart_data.map(item => item.total)
    },
    {
      name: "小漾",
      data: chrart_data.map(item => item.admin_86)
    },
    {
      name: "Matcha",
      data: chrart_data.map(item => item.admin_87)
    },
    {
      name: "Shaoti",
      data: chrart_data.map(item => item.admin_116)
    },
    {
      name: "Cielo",
      data: chrart_data.map(item => item.admin_151)
    }
  ];

  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">月份後送處理量</h4>

        <Chart
          options={apexBarChartOpts}
          series={apexBarChartData}
          type="bar"
          className="apex-charts"
          height={260}
        />
      </CardBody>
    </Card>
  );
};

export default PerformanceChart;
