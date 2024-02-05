import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
  FaUserCircle,
  FaChartLine,
  FaShoppingCart,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const AdminCenter = ({ username }) => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/GreenMarket/show_dashboard.php"
        );

        if (!response.ok) {
          throw new Error("Error fetching dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Content header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome to the Admin Dashboard!</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-2xl text-gray-800" />
            <span className="text-gray-700">{username}</span>
          </div>
        </div>
        {/* Main content */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Products */}
            <div className="bg-blue-100 rounded-md p-4 shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Total Products
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {dashboardData && dashboardData.total_products}
                </p>
              </div>
              <FaChartLine className="text-4xl text-blue-600" />
            </div>
            {/* Total Orders */}
            <div className="bg-green-100 rounded-md p-4 shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  Total Orders
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {dashboardData && dashboardData.total_orders}
                </p>
              </div>
              <FaShoppingCart className="text-4xl text-green-600" />
            </div>
            {/* Total Customers */}
            <div className="bg-yellow-100 rounded-md p-4 shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">
                  Total Customers
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {dashboardData && dashboardData.total_members}
                </p>
              </div>
              <FaUsers className="text-4xl text-yellow-600" />
            </div>
            {/* Total Revenue */}
            <div className="bg-red-100 rounded-md p-4 shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-800">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  ฿{dashboardData && dashboardData.order_103_netprice}
                </p>
              </div>
              <FaCog className="text-4xl text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCenter;
