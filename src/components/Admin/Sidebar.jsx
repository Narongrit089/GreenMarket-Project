import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import vegetablesImage from "/public/images/vegetables3.png";

const Sidebar = ({ onLogout }) => {
  // รับ props onLogout มาจาก parent component
  const handleLogout = () => {
    // เรียกใช้งาน props onLogout เพื่อทำการออกจากระบบ
    onLogout();
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white w-64 py-8 flex-shrink-0 p-5">
      {/* Sidebar header */}
      <div className="text-center mb-8">
        <div className="relative">
          <img
            src={vegetablesImage}
            alt="Vegetables"
            className="mx-auto mb-4 w-16 h-16 rounded-full border-4 border-green-400 shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 00-1-1H7a1 1 0 100 2h3a1 1 0 001-1zM9 10a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-md font-semibold text-xl">
          GreenMarket Admin
        </span>
      </div>

      {/* Sidebar navigation */}
      <nav>
        <ul>
          <li className="py-2 px-4 hover:bg-blue-800 cursor-pointer transition duration-300 transform hover:scale-105 rounded-md">
            <Link to="/adminC" className="flex items-center">
              <FaHome className="mr-2 text-xl" />
              <span className="text-lg">Dashboard</span>
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-800 cursor-pointer transition duration-300 transform hover:scale-105 rounded-md">
            <Link to="/products" className="flex items-center">
              <FaBox className="mr-2 text-xl" />
              <span className="text-lg">Products</span>
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-800 cursor-pointer transition duration-300 transform hover:scale-105 rounded-md">
            <Link to="/orderList" className="flex items-center">
              <FaClipboardList className="mr-2 text-xl" />
              <span className="text-lg">Orders</span>
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-800 cursor-pointer transition duration-300 transform hover:scale-105 rounded-md">
            <Link className="flex items-center">
              <FaUsers className="mr-2 text-xl" />
              <span className="text-lg">Customers</span>
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-800 cursor-pointer transition duration-300 transform hover:scale-105 rounded-md">
            <Link className="flex items-center">
              <FaCog className="mr-2 text-xl" />
              <span className="text-lg">Settings</span>
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-800 cursor-pointer transition duration-300 transform hover:scale-105 rounded-md">
            <Link
              to="/login"
              className="flex items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2 text-xl" />
              <span className="text-lg">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
