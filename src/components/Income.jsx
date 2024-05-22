import React from "react";
import { Bar } from "react-chartjs-2";

const barData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Income",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
      hoverBorderColor: "rgba(75, 192, 192, 1)",
      data: [65, 59, 80, 81, 56, 55],
    },
    {
      label: "Expenses",
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
      hoverBorderColor: "rgba(255, 99, 132, 1)",
      data: [45, 49, 60, 70, 46, 33],
    },
  ],
};

function Income() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Income & Expenses</h3>
      <Bar data={barData} />
    </div>
  );
}

export default Income;
