import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../redux/slices/expenseSlice";
import { fetchRevenue } from "../../redux/slices/revenueSlice";

const CustomerChart = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchRevenue());
  }, [dispatch]);

  const { expenses } = useSelector((state) => state.expenses);
  const { revenue } = useSelector((state) => state.revenue);

  useEffect(() => {
    // Gelir ve gider verilerini işleyerek müşteri sayısını hesapla
    const totalCustomers = getTotalCustomers(revenue, expenses);
    setCustomerData(totalCustomers);
  }, [revenue, expenses]);

  const getTotalCustomers = (revenueData, expensesData) => {
    // Gelir ve gider verilerini işleyerek müşteri sayısını hesapla
    const totalRevenueCustomers = revenueData.length;
    const totalExpensesCustomers = expensesData.length;
    const totalCustomers = totalRevenueCustomers + totalExpensesCustomers;
    return [totalCustomers];
  };

  // Grafik konfigürasyonunu oluştur
  const customerChartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Müşteri Sayısı",
        data: customerData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#1E90FF"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Ocak",
          "Şubat",
          "Mart",
          "Nisan",
          "Mayıs",
          "Haziran",
          "Temmuz",
          "Ağustos",
          "Eylül",
          "Ekim",
          "Kasım",
          "Aralık",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
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
            Müşteri Sayısı
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Aylık müşteri sayısını takip edin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...customerChartConfig} />
      </CardBody>
    </Card>
  );
};

export default CustomerChart;
