import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./DoughnutChart.css";
Chart.register(ArcElement);

const options = {
  responsive: true,
  legend: {
    display: false,
  },
};

const DoughnutChart = (props) => {
  const { results } = props;

  // Summarising Data:
  const [summary, setSummary] = useState({});

  let total = results.length;
  const calculateSummary = () => {
    if (results.length === 0) {
      console.log("results is empty");
    }
    let promoters = 0;
    let detractors = 0;
    let passives = 0;
    let errorData = 0;

    results.forEach((result) => {
      if (result.surveyResult === "promoter") {
        promoters++;
      } else if (result.surveyResult === "passive") {
        passives++;
      } else if (result.surveyResult === "detractor") {
        detractors++;
      } else {
        errorData++;
      }
    });
    setSummary({
      promoters: promoters,
      passives: passives,
      detractors: detractors,
      errorData: errorData,
    });
  };

  useEffect(() => {
    calculateSummary();
    //eslint-disable-next-line
  }, []);

  const data = {
    datasets: [
      {
        data: [summary.promoters, summary.passives, summary.detractors],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: ["#19aade", "#1de4bd", "#ef7e32"],
        pointBackgroundColor: "rgba(255,206,86,0.2)",
      },
    ],
  };

  console.log("results from Doughnutchart: ", results);

  return (
    <>
      <Doughnut
        type="doughnut"
        data={data}
        options={options}
        className="doughnut"
      />
      <div className="doughnut-number">75%</div>
    </>
  );
};

export default DoughnutChart;