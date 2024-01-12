// src/components/Cart.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Cart = ({ username }) => {
  const [carts, setCarts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

  const fetchData = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/GreenMarket/show_cart.php?username=${username}`
      );

      if (!response.ok) {
        throw new Error("Error fetching carts");
      }

      const data = await response.json();
      setCarts(data);
      calculateOrderTotal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    calculateOrderTotal();
  }, [carts]);

  useEffect(() => {
    fetchData(username);
  }, [username]);

  const calculateOrderTotal = () => {
    const total = carts.reduce((acc, cartItem) => {
      return acc + cartItem.Price * cartItem.qty;
    }, 0);
    setOrderTotal(total);
  };

  const handleDeleteItem = async (odDID) => {
    try {
      const response = await fetch(
        "http://localhost:8080/GreenMarket/delete_cart.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ odDID: odDID }),
        }
      );

      if (!response.ok) {
        toast.error("Failed");
        throw new Error("Error deleting cart item");
      }

      toast.success("The product has been removed from the cart.");
      calculateOrderTotal();
      fetchData(username);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Loop through each cart item and update the products.Quantity
      for (const cartItem of carts) {
        const response = await fetch(
          "http://localhost:8080/GreenMarket/update_productsCart.php",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ProductID: cartItem.ProductID,
              Quantity: cartItem.qty,
            }),
          }
        );

        console.log(cartItem.ProductID);
        console.log(cartItem.qty);

        if (!response.ok) {
          toast.error("Failed to update product quantity");
          throw new Error("Error updating product quantity");
        }
      }

      // Clear the cart after placing the order
      const clearCartResponse = await fetch(
        "http://localhost:8080/GreenMarket/clear_cart.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );

      const result = await clearCartResponse.json();
      console.log(result);

      console.log({ username });

      if (!clearCartResponse.ok) {
        toast.error("Failed to clear the cart");
        throw new Error("Error clearing the cart");
      }

      const insertOrderResponse = await fetch(
        "http://localhost:8080/GreenMarket/insert_order.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            orderTotal,
          }),
        }
      );

      if (insertOrderResponse.status === 500) {
        navigate("/sale");
        toast.error(
          "There are no products in the cart. Please go back and select your products first."
        );
        throw new Error("Error placing the order");
      }

      // Reset the cart or perform any other necessary actions
      setCarts([]);
      calculateOrderTotal();

      // Redirect to the order confirmation page
      navigate("/order");
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
      <ul>
        {carts.map((cart) => (
          <li
            key={cart.odDID}
            className="mb-4 p-4 border rounded-md shadow-md flex items-center justify-between transition-transform transform hover:scale-105"
          >
            <div className="flex items-center">
              <img
                src={cart.ImageURL}
                alt={cart.ProductName}
                className="w-20 h-20 object-cover mr-4 rounded-md"
              />
              <div>
                <h3 className="text-xl font-semibold">{cart.ProductName}</h3>
                <p className="text-gray-600">
                  {cart.Price} Baht, Quantity: {cart.qty}/Kg. <br />{" "}
                  {cart.odStatusName}
                </p>
                <p className="text-red-600 font-semibold">
                  Total: {cart.Price * cart.qty} Baht
                </p>
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded flex items-center hover:from-red-600 hover:to-orange-600"
              onClick={() => handleDeleteItem(cart.odDID)}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-8">
        <p className="text-xl font-semibold">Order Total: {orderTotal} Baht</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handlePlaceOrder}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
