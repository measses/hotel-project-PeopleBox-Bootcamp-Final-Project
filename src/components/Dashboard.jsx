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
import Income from "./Income";
import CashFlow from "./CashFlow";
import TodoList from "./TodoList";
import Calender from "./Calender";
import Tasks from "./Tasks";
import CustomerList from "./CustomerList";

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
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Income />
        <CashFlow />
      </div>
      <div className="flex gap-6 mb-6">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <TodoList />
        </div>
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <Tasks />
        </div>
        <CustomerList />
      </div>
      <Calender />
    </div>
  );
};

export default Dashboard;
