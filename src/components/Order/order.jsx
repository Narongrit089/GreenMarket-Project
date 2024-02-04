import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTruck } from "react-icons/fa";

const Order = ({ username }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/GreenMarket/show_order.php?username=${username}`
        );

        console.log(username);

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
    <div className="container mx-auto p-8" style={{ paddingBottom: "4rem" }}>
      <h2 className="text-3xl font-semibold mb-4">Order Confirmation</h2>
      <p className="text-xl mb-8">
        Thank you for your order! Your order has been successfully placed.
      </p>

      <div className="flex justify-center mb-8">
        <Link
          to="/sale"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:shadow-outline"
        >
          Continue Shopping
        </Link>
      </div>

      <h3 className="text-2xl font-semibold mt-8 mb-4">Order Details:</h3>
      <ul>
        {orders.map((order) => (
          <li
            key={order.orderNo}
            className="flex justify-between items-center mb-4 p-4 border rounded-md shadow-md bg-white transform hover:scale-105 transition-transform duration-300"
          >
            <div>
              <p className="text-lg font-semibold">Order No: {order.orderNo}</p>
              <p className="text-gray-700">
                Name: {order.FirstName} {order.LastName}
              </p>
              <p className="text-gray-700">Address: {order.Address}</p>
              <p className="text-gray-700">Phone Number: {order.PhoneNumber}</p>
            </div>
            <div className="flex justify-end items-center space-x-4">
              <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
                <p className="text-gray-800 font-medium">Status:</p>
                <div className="flex items-center space-x-2">
                  <FaTruck className="text-green-600" />
                  <p className="text-green-600 font-semibold text-lg">
                    {order.odStatusName}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
                <p className="text-gray-800 font-medium">Total Price:</p>
                <p className="text-blue-600 font-semibold text-lg">
                  {order.Netprice} Baht
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to="/order-history"
        className="fixed bottom-10 right-10 bg-green-500 text-white py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center justify-center hover:bg-green-600 hover:shadow-xl transform hover:scale-105"
        style={{ marginTop: "1rem" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
        Order History
      </Link>
    </div>
  );
};

export default Order;
