import React from "react";
import RevenueExpensesChart from "../components/Home/RevenueExpensesChart";
import CustomerChart from "../components/Home/CustomerChart";
import RoomOccupancyChart from "../components/Home/RoomOccupancyChart";
import CheckinCheckoutChart from "../components/Home/CheckinCheckoutChart";
import Users from "../components/Home/Users";
import TodoList from "../components/Home/TodoList";
import Footer from "../components/common/Footer";

const Dashboard = () => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RevenueExpensesChart />
      <CustomerChart />
      <RoomOccupancyChart />
      <CheckinCheckoutChart />
      <Users />
      <TodoList />
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
