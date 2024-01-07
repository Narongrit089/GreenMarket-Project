// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, onLogout, username }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-green-500 p-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to={loggedIn ? "/sale" : "/"}
          className="flex items-center text-white text-lg font-bold font-serif hover:text-yellow-300"
        >
          <img
            src="/images/vegetables2.png"
            alt="GreenMarket Logo"
            className="h-8 w-8 mr-3"
          />
          GreenMarket
        </Link>

        <div className="flex space-x-4">
          <Link
            to={loggedIn ? "/sale" : "/"}
            className="text-white font-serif hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>

          {loggedIn ? (
            <div className="flex items-center">
              <p className="text-white font-serif mr-2">{username}</p>
              <button
                onClick={onLogout}
                className="text-white font-serif hover:text-yellow-300 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white font-serif hover:text-yellow-300 transition duration-300"
            >
              Login
            </Link>
          )}
          {/* Add other menu items as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
