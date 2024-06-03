import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const RoomOccupancyChart = ({ occupiedRooms, availableRooms }) => {
  const roomOccupancyChartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [occupiedRooms, availableRooms],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#4CAF50", "#F44336"],
      labels: ["Dolu Odalar", "Boş Odalar"],
      legend: {
        show: true,
        position: "bottom",
      },
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Oda Doluluk Oranı
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Boş ve dolu oda sayısını takip edin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...roomOccupancyChartConfig} />
      </CardBody>
    </Card>
  );
};

export default RoomOccupancyChart;
