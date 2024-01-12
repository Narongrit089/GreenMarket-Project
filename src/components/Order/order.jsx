// src/components/Order.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto p-8">
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
            className="mb-4 p-4 border rounded-md shadow-md bg-white transform hover:scale-105 transition-transform duration-300"
          >
            <p className="text-lg font-semibold">Order No: {order.orderNo}</p>
            <p className="text-gray-700">
              Status: {order.odStatusName} | Total Price: {order.Netprice} Baht
            </p>
            <p className="text-gray-700">
              Name: {order.FirstName} {order.LastName}
            </p>
            <p className="text-gray-700">Address: {order.Address}</p>
            <p className="text-gray-700">Phone Number: {order.PhoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
