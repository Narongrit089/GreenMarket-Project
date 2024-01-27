import React, { useState, useEffect } from "react"; // Import useEffect
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirection
import { FaUser } from "react-icons/fa";

const CommentModal = ({ product, closeModal, username }) => {
  // Check if product exists before accessing its properties
  if (!product) {
    return null;
    // Return null or handle the case where product is missing
  }

  const [comment, setComment] = useState(""); // State for storing the comment text
  const [rating, setRating] = useState(1); // State for storing the rating
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (event) => {
    // Add event parameter
    event.preventDefault();
    try {
      if (!username) {
        // If username is not available, redirect to login page
        toast.error("Please Login!!");
        navigate("/login");
        return;
      }
      //   console.log(username);

      const response = await fetch(
        "http://localhost:8080//GreenMarket/insert_comment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productID: product.ProductID,
            comment: comment,
            rating: rating,
            username: username, // Include username in the request
          }),
        }
      );

      console.log(username);
      console.log(comment);
      console.log(rating);
      console.log(product.ProductID);

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();
      if (data.success) {
        toast.success("Comment added successfully!");
        setComment("");
        setRating(0); // Reset rating after successful submission
        closeModal(); // Close the comment modal
        updateProductScore(); // Close the comment modal
      } else {
        toast.error("Failed to add comment. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again later.");
    }
  };

  useEffect(() => {
    // Use useEffect to execute handleSubmit whenever the product changes
    if (product) {
      handleSubmit();
    }
  }, [product]);

  const updateProductScore = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080//GreenMarket/update_productScore.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductID: product.ProductID,
          }),
        }
      );
      if (!response.ok) {
        toast.error("nonono");
        throw new Error("Failed to update product score");
      }
      const data = await response.json();
      console.log(data); // Log the response from the server
    } catch (error) {
      toast.error("nonono");
      console.error("Error updating product score:", error); // Log any errors
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md w-full rounded-lg">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700 text-3xl"
            onClick={closeModal}
          >
            &#215;
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">{product.ProductName}</h2>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Rating: </p>
          <ReactStars
            count={5}
            size={24}
            value={product.score}
            activeColor="#ffd700"
            edit={false}
          />
        </div>

        <div className="comments overflow-auto max-h-32 mb-4">
          {product.comments.map((comment, index) => (
            <div key={index} className="comment flex items-center">
              <FaUser className="mr-2 text-gray-500" /> {/* User icon */}
              <p className="text-gray-700">
                <strong>{comment.author}: </strong>
                {comment.comment}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <h4 className="text-lg font-semibold mb-2">Add Your Comment</h4>

          <div className="flex items-center mb-4">
            <span className="mr-2">Rate:</span>
            <ReactStars
              count={5}
              size={24}
              value={rating}
              activeColor="#ffd700"
              onChange={(newRating) => setRating(newRating)}
            />
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full resize-none"
            rows="4"
            placeholder="Write your comment here..."
          />

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
