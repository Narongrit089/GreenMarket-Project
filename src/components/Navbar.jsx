import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaLeaf,
  FaHome,
  FaEnvelope,
  FaShoppingCart,
  FaSignOutAlt,
  FaListAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Navbar = ({ loggedIn, onLogout, username }) => {
  const location = useLocation();

  const isCartPage = location.pathname === "/cart";
  const isOrderPage = location.pathname === "/order";
  const isAdminPage = location.pathname === "/adminC";
  const isLocationPage = location.pathname === "/location";
  const isOderHistoryPage = location.pathname === "/order-history";
  const isNotAdminPage = !isAdminPage;

  const isProductsPage = location.pathname === "/products";
  const isOrderListPage = location.pathname === "/orderList";

  const handleLogout = () => {
    if (
      !isNotAdminPage ||
      isCartPage ||
      isOrderPage ||
      isAdminPage ||
      isLocationPage ||
      isOderHistoryPage
    ) {
      window.location.href = "/login";
    } else {
      onLogout();
    }
  };

  return (
    <>
      {isNotAdminPage && !isProductsPage && !isOrderListPage && (
        <nav className="bg-gradient-to-r from-blue-600 to-green-500 p-5">
          <div className="container mx-auto flex items-center justify-between">
            <Link
              to={loggedIn ? "/sale" : "/"}
              className={`flex items-center text-white text-lg font-bold font-serif hover:text-yellow-300 ${
                isAdminPage ? "hidden" : ""
              }`}
            >
              <FaLeaf className="h-6 w-6 mr-3" />
              GreenMarket
            </Link>

            <div className="flex space-x-4">
              <Link
                to={loggedIn ? "/sale" : "/"}
                className="flex items-center text-white font-serif hover:text-yellow-300 transition duration-300"
              >
                <FaHome className="mr-2" />
                Home
              </Link>

              <Link
                to="/location"
                className="flex items-center text-white font-serif hover:text-yellow-300 transition duration-300"
              >
                <FaLocationDot className="mr-2" />
                Location
              </Link>

              {loggedIn ? (
                <div className="flex items-center">
                  <>
                    <Link
                      to="/cart"
                      className="flex items-center text-white font-serif hover:text-yellow-300 transition duration-300"
                    >
                      <FaShoppingCart className="mr-2" />
                      Cart &nbsp;&nbsp;
                    </Link>

                    <Link
                      to="/order"
                      className="flex items-center text-white font-serif hover:text-yellow-300 transition duration-300"
                    >
                      <FaListAlt className="mr-2" />
                      Order &nbsp;&nbsp;
                    </Link>
                  </>

                  <FaEnvelope className="text-white mr-2" />
                  <p className="text-white font-serif mr-2">{username}</p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-white font-serif hover:text-yellow-300 transition duration-300"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-white font-serif hover:text-yellow-300 transition duration-300"
                >
                  <FaEnvelope className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
