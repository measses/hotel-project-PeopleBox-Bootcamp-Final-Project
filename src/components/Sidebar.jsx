import React from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaMoneyBillWave,
  FaCashRegister,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-5">Admin Panel</h1>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              <FaTachometerAlt className="mr-3" />
              <span>Anasayfa</span>
            </a>
          </li>
          <hr className="border-gray-600" />
          <li>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              <FaTasks className="mr-3" />
              <span>Müşteri Yönetimi</span>
            </a>
          </li>
          <hr className="border-gray-600" />
          <li>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              <FaMoneyBillWave className="mr-3" />
              <span>Gelir - Gider</span>
            </a>
          </li>
          <hr className="border-gray-600" />
          <li>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              <FaCashRegister className="mr-3" />
              <span>Rapor</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-auto p-6">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
