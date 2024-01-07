import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is already registered
      const emailValidationResponse = await fetch(
        `http://localhost:8080//GreenMarket/check_email.php?email=${formData.Email}`
      );
      const emailValidationData = await emailValidationResponse.json();

      if (emailValidationResponse.ok && emailValidationData.isEmailTaken) {
        // Display an error notification for duplicate email
        toast.error(
          "Email is already registered. Please use a different email."
        );
      } else {
        // Proceed with registration if the email is not taken
        const registrationResponse = await fetch(
          "http://localhost:8080/GreenMarket/register.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(formData),
          }
        );

        const registrationData = await registrationResponse.json();

        if (registrationResponse.status === 200) {
          // Display a success notification
          toast.success("Registration successful!");
          navigate("/login");
        } else {
          // Display an error notification for other registration issues
          toast.error(registrationData.error);
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          {[
            "FirstName",
            "LastName",
            "Address",
            "PhoneNumber",
            "Email",
            "Password",
          ].map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                {field === "PhoneNumber" ? "Phone Number" : field}
              </label>
              <input
                type={field === "Password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
