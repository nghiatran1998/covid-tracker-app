import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, ButtonGroup } from "@material-ui/core";

const genarateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));
  return {
    chart: {
      height: 500,
    },

    title: {
      text: "Biểu đồ về tình hình Covid-19",
    },

    xAxis: {
      categories: categories,
      crosshair: true,
    },

    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: "<span style='font-size:10px'>{point.key}</span><table>",
      pointFormat:
        "<tr><td style='color:{series.color};padding:0'>{series.name}: </td>" +
        "<td style='padding:0'>{point.y} ca</td></tr>",
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOption: {
      column: {
        pointPadding: 0.2,
        borderWirth: 0,
      },
    },
    series: [
      {
        name: "Số ca nhiễm",
        data: data.map((item) => item.Confirmed),
        color: "#c9302c",
      },
      {
        name: "Khỏi",
        data: data.map((item) => item.Recovered),
        color: "#28a745",
      },
      {
        name: "Tử vong",
        data: data.map((item) => item.Deaths),
        color: "gray",
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
};

function Summary({ report }) {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState("all");

  useEffect(() => {
    if (report && report.length > 0) {
      let customReport = [];
      // Xử lý thay đổi reportType
      switch (reportType) {
        case "all":
          customReport = report;
          break;
        case "180days":
          customReport = report.slice(report.length - 180);
          break;
        case "90days":
          customReport = report.slice(report.length - 90);
          break;

        case "60days":
          customReport = report.slice(report.length - 60);
          break;
        case "30days":
          customReport = report.slice(report.length - 30);
          break;
        case "7days":
          customReport = report.slice(report.length - 7);
          break;

        default:
          customReport = report;
      }
      setOptions(genarateOptions(customReport));
    }
  }, [report, reportType]);

  return (
    <div style={{ marginTop: 20 }}>
      <ButtonGroup
        style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
      >
        <Button
          color={reportType === "all" ? "secondary" : ""}
          onClick={() => setReportType("all")}
        >
          Tất cả
        </Button>
        <Button
          color={reportType === "180days" ? "secondary" : ""}
          onClick={() => setReportType("180days")}
        >
          180 ngày
        </Button>
        <Button
          color={reportType === "90days" ? "secondary" : ""}
          onClick={() => setReportType("90days")}
        >
          90 ngày
        </Button>
        <Button
          color={reportType === "30days" ? "secondary" : ""}
          onClick={() => setReportType("30days")}
        >
          30 ngày
        </Button>
        <Button
          color={reportType === "7days" ? "secondary" : ""}
          onClick={() => setReportType("7days")}
        >
          7 ngày
        </Button>
      </ButtonGroup>

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        style={{ marginTop: 20 }}
      />
    </div>
  );
}

export default React.memo(Summary);
