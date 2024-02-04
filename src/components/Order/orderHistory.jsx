import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const OrderHistory = ({ username }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080//GreenMarket/show_orderHistory.php?username=${username}`
        );

        if (!response.ok) {
          throw new Error("Error fetching orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders(); // Pass the username here
  }, [username]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-8">Order History</h2>

      <div className="flex justify-center mb-8">
        <Link
          to="/sale"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:shadow-outline"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order.orderNo}
            className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Order No: {order.orderNo}
              </h3>
              <p className="text-gray-600 mb-2">
                Name: {order.FirstName} {order.LastName}
              </p>
              <p className="text-gray-600 mb-2">Address: {order.Address}</p>
              <p className="text-gray-600 mb-2">
                Phone Number: {order.PhoneNumber}
              </p>
            </div>
            <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
              <div className="flex items-center space-x-2">
                <p className="text-gray-800 font-medium">Status:</p>
                <p className="text-green-600 font-semibold text-lg">
                  {order.odStatusName}
                </p>
                <FaCheck className="text-green-600" />
              </div>

              <div className="flex items-center space-x-2">
                <p className="text-gray-800 font-medium">Total Price:</p>
                <p className="text-blue-600 font-semibold text-lg">
                  {order.Netprice} Baht
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
