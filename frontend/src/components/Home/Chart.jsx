import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useSelector } from "react-redux";

export default function PieChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const places2 = useSelector((state) => state.places2?.places2?.allPlaces2);
  const anUong = places2.filter((place) => place.type === "Ăn uống").length;
  const tramXangDau = places2.filter(
    (place) => place.type === "Trạm xăng dầu"
  ).length;
  const coSoYTe = places2.filter((place) => place.type === "Cơ sở y tế").length;
  const atm = places2.filter((place) => place.type === "ATM").length;
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Ăn uống", "Trạm xăng dầu", "Cơ sở y tế", "Điểm giao dịch ATM"],
      datasets: [
        {
          data: [anUong, tramXangDau, coSoYTe, atm],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
          ],
          dataLabels: {
            display: true,
            color: "#fff",
          },
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
        title: {
          display: true,
          text: "Địa điểm tiện ích",
          font: {
            size: 20,
          },
        },
        datalabels: {
          color: "#fff",
          formatter: (value) => {
            return value;
          },
        },
        datalabels: {
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          borderColor: "white",
          borderRadius: 25,
          borderWidth: 3,
          color: "white",
          font: {
            weight: "bold",
          },
          padding: 6,
        },
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
