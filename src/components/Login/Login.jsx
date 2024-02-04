import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import vegetablesImage from "/public/images/vegetables3.png";

const Login = ({ onLogin, loginError }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/GreenMarket/check_login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(formData).toString(),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const { FirstName, LastName, Email, Password, access_rights } = data;

        // Assuming successful login, set the user
        onLogin(formData.email);

        // Save user data in localStorage for later reference
        // localStorage.setItem("email", Email);
        // localStorage.setItem("password", Password);
        localStorage.setItem("right", access_rights);

        // Display a welcome notification with FirstName and LastName
        toast.success(`Welcome, ${FirstName} ${LastName}!`);

        // Check if the user is admin before navigating to the dashboard
        if (access_rights === 1) {
          navigate("/adminC");
        } else {
          // Redirect to the dashboard
          navigate("/sale");
        }
      } else {
        // Handle login error
        toast.error("Please check your password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = () => {
    // Add your registration logic here
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <img
          src={vegetablesImage}
          alt="Vegetables"
          className="mx-auto mb-4"
          style={{ width: "100px", height: "100px" }} // Circular image
        />
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md  hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="text-sm text-gray-600 hover:underline focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
            >
              Register
            </button>
          </div>
        </form>
        {loginError && <p className="mt-4 text-red-500">{loginError}</p>}
      </div>
    </div>
  );
};

export default Login;
