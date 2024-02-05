import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaSave } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOrderStatus, setEditedOrderStatus] = useState("");

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080//GreenMarket/crud/crud_oders.php",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Filtered and paginated orders
  const filteredOrders = orders.filter(
    (order) =>
      order.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.LastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle edit button click
  const handleEditButtonClick = (order) => {
    setSelectedOrder(order);
    setEditedOrderStatus(order.odStatusName);
    setIsModalOpen(true);
  };

  // Handle form submission for editing order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080//GreenMarket/crud/crud_oders.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OrderID: selectedOrder.orderNo,
            OrderStatus: editedOrderStatus,
          }),
        }
      );

      console.log(selectedOrder.orderNo);
      console.log(editedOrderStatus);
      if (response.ok) {
        toast.success("Successfully edited");
      }

      const data = await response.json();
      console.log(data.message);
      setIsModalOpen(false);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Order List</h1>
            <p className="text-gray-600">Welcome to the Order List!</p>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label
              htmlFor="search"
              className="block text-sm font-semibold text-gray-600 relative"
            >
              <FaSearch className="absolute top-10 left-3 text-gray-400" />
              Search Order
            </label>

            <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full max-w-md pl-10 border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-200"
              placeholder="Enter members name..."
            />
          </div>

          <h2>Order List</h2>

          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Order NO</th>
                <th className="border border-gray-300 px-4 py-2">
                  Order Status
                </th>
                <th className="border border-gray-300 px-4 py-2">Netprice</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.orderNo}>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.orderNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.odStatusName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.Netprice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.FirstName}, {order.LastName}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    <button
                      onClick={() => handleEditButtonClick(order)}
                      className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded flex items-center"
                    >
                      <FaEdit className="inline-block mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <ul className="flex justify-center list-none mt-4">
            {Array.from(
              { length: Math.ceil(filteredOrders.length / ordersPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md mr-2 ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Order</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="orderNo"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Order No
                </label>
                <input
                  type="text"
                  id="orderNo"
                  name="orderNo"
                  value={selectedOrder.orderNo}
                  disabled
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="orderStatus"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Order Status
                </label>
                <select
                  id="orderStatus"
                  name="orderStatus"
                  value={editedOrderStatus}
                  onChange={(e) => setEditedOrderStatus(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                >
                  <option value="102">In progress</option>
                  <option value="102">In progress</option>
                  <option value="103">Currently shipping</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  <FaSave className="inline-block mr-1" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
