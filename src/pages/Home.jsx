import React, { useEffect } from "react";
import RevenueExpensesChart from "../components/Home/RevenueExpensesChart";
import CustomerChart from "../components/Home/CustomerChart";
import RoomOccupancyChart from "../components/Home/RoomOccupancyChart";
import CheckinCheckoutChart from "../components/Home/CheckinCheckoutChart";
import Users from "./Users";
import TodoList from "../components/Home/TodoList";
import Footer from "../components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/slices/roomsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.rooms);
  const { expenses } = useSelector((state) => state.expenses);
  const { revenue } = useSelector((state) => state.revenue);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(
    (room) => room.status === "Occupied"
  ).length;
  const availableRooms = totalRooms - occupiedRooms;

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RevenueExpensesChart revenueData={revenue} expensesData={expenses} />
      <CustomerChart />
      <RoomOccupancyChart
        occupiedRooms={occupiedRooms}
        availableRooms={availableRooms}
      />
      <CheckinCheckoutChart />
      <Users />
      <TodoList />
      <div className="col-span-1 md:col-span-2 lg:col-span-3"></div>
    </div>
  );
};

export default Home;
