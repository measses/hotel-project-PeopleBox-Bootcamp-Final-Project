import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import Income from "../dashboard/Income";
import CashFlow from "../dashboard/CashFlow";
import CashStatusCard from "../dashboard/CashStatusCard";
import TodoList from "../dashboard/TodoList";
import Tasks from "../dashboard/Tasks";
import CustomerList from "../dashboard/CustomerList";
import Calender from "../dashboard/Calender";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Anasayfa</h2>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md h-[360px] ">
          <Income />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-[360px]">
          <CashFlow />
        </div>
        <div className="bg-white p-4 rounded-lg  h-[360px]">
          <CashStatusCard />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md ">
          <TodoList />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md ">
          <Tasks />
        </div>
        <div className="bg-white p-6 rounded-lg ">
          <CustomerList />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Calender />
      </div>
    </div>
  );
};

export default Dashboard;
