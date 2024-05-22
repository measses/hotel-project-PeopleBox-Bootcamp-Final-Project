import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-2xl font-bold">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
