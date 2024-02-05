import React from "react";
import { FaSave } from "react-icons/fa";

const InsertModal = ({
  closeModal,
  handleSubmitInsert,
  editedProductName,
  setEditedProductName,
  editedPrice,
  setEditedPrice,
  editedImageURL,
  setEditedImageURL,
  editedCategory,
  setEditedCategory,
  editedAdditionalInfo,
  setEditedAdditionalInfo,
  editedQuantity,
  setEditedQuantity,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Insert Product</h2>
        <form onSubmit={handleSubmitInsert}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-semibold text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={editedProductName}
              onChange={(e) => setEditedProductName(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              step="0.01"
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageURL"
              className="block text-sm font-semibold text-gray-600"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={editedImageURL}
              onChange={(e) => setEditedImageURL(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-600"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-semibold text-gray-600"
            >
              Additional Info
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={editedAdditionalInfo}
              onChange={(e) => setEditedAdditionalInfo(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-semibold text-gray-600"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
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
  );
};

export default InsertModal;
