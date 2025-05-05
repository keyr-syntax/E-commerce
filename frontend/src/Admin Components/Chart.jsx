import "./Chart.css";
import { Bar, Line } from "react-chartjs-2";
import { ProductContext } from "../Public Components/ContextProvider.jsx";
import { useContext, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

function Chart() {
  const { salesByWeek, salesByMonth, fetchAllOrdersForAdmin } =
    useContext(ProductContext);
  useEffect(() => {
    fetchAllOrdersForAdmin();
  }, []);

  return (
    <>
      <div className="chart-main">
        {" "}
        <div className="chart-container-bar">
          <Line
            data={{
              labels: salesByWeek.map((sales) => sales._id),
              datasets: [
                {
                  label: "weekly sales",
                  data: salesByWeek.map((sales) => sales.totalSales),
                  backgroundColor: "yellow",
                  borderColor: "yellow",
                  borderWidth: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "white",
                    usePointStyle: true,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "white",
                  },
                },
                y: {
                  ticks: {
                    color: "white",
                  },
                },
              },
              layout: {
                padding: {
                  left: 20,
                  right: 20,
                  top: 10,
                  bottom: 10,
                },
              },
            }}
          />
          <p className="graph-description">
            Line Graph showing Weekly Sales Report
          </p>
        </div>
        <div className="chart-container-line">
          <Bar
            data={{
              labels: salesByMonth
                ? salesByMonth.map((sales) => sales && sales._id)
                : "",
              datasets: [
                {
                  label: "Monthly Sales",
                  data:
                    salesByMonth &&
                    salesByMonth.map((sales) => sales.totalSales),
                  backgroundColor: "green",
                  borderColor: "green",
                  borderWidth: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "white",
                    usePointStyle: true,
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "white",
                  },
                },
                y: {
                  ticks: {
                    color: "white",
                  },
                },
              },
              layout: {
                padding: {
                  left: 30,
                  right: 30,
                  top: 10,
                  bottom: 10,
                },
              },
            }}
          />
          <p className="graph-description">
            Bar Graph showing Monthly Sales Report
          </p>
        </div>
      </div>
    </>
  );
}

export default Chart;
