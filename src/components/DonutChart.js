import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
ReactFC.fcRoot(FusionCharts, Chart);

export const DonutChart = ({ data, small }) => {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: "100%",
    dataFormat: "json",

    dataSource: {
      chart: {
        caption: "",
        theme: "fusion",
        decimals: 1,
        pieRadius: small ? "60%" : "75%",
        doughnutRadius: "50%",
        showPercentValues: 1,
        baseFont: "Quicksand",
        baseFontSize: 12,
        baseFontColor: "#fafafa",
        smartLineColor: "#617d98",
        showShadow: 0,
        showPlotBorder: 1,
        paletteColors:
          "#2caeba,#B2EA70, #5D62B5, #FFC533, #F2726F, #1de9b6, #DFD8CA,#99DDCC, #9C19E0 ,#FF5DA2  ,#99DDCC",
        use3DLighting: 0,
        useDataPlotColorForLabels: 0,
        bgColor: "2b2d3e",
        bgratio: "30, 50",
        bgAlpha: "100,100",
        bgAngle: "80",
        showBorder: 0,
        borderThickness: 5,
        borderColor: "#223144",
        borderAlpha: 100,
        showToolTip: 1,
        toolTipColor: "#000",
        toolTipBgColor: "#ced7df",
        toolTipBorderColor: "#ced7df",
        showHoverEffect: 1,
        showLegend: 0,
        tooltipPosition: "bottom",
      },
      // Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};
