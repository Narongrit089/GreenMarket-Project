import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave, FaSearch, FaPlus } from "react-icons/fa";
import InsertModal from "./InsertModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [editedImageURL, setEditedImageURL] = useState("");
  const [editedAdditionalInfo, setEditedAdditionalInfo] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080//GreenMarket/crud/crud_products.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.ProductName &&
          product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [products, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditedProductName(product.ProductName);
    setEditedPrice(product.Price);
    setEditedCategory(product.Category);
    setEditedQuantity(product.Quantity);
    setIsModalOpen(true);
  };

  const handleEditButtonClick = (product) => {
    handleEditProduct(product);
  };

  const handleCloseInsertModal = () => {
    setIsInsertModalOpen(false);
  };

  const handleInsertProduct = () => {
    setIsInsertModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/GreenMarket/crud/crud_products.php`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductID: selectedProduct.ProductID,
            ProductName: editedProductName,
            Price: editedPrice,
            Category: editedCategory,
            Quantity: editedQuantity,
          }),
        }
      );
      if (response.ok) {
        toast.success("Successfully edited");
      } else if (!response.ok) {
        throw new Error("Failed to edit product");
      }
      // Refresh product list after editing
      const updatedProducts = products.map((product) =>
        product.ProductID === selectedProduct.ProductID
          ? {
              ...product,
              ProductName: editedProductName,
              Price: editedPrice,
              Category: editedCategory,
              Quantity: editedQuantity,
            }
          : product
      );
      setProducts(updatedProducts);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/GreenMarket/crud/crud_products.php`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductID: productId,
          }),
        }
      );
      if (response.ok) {
        toast.success("Data was successfully deleted");
      } else if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      // Refresh product list after deleting
      const updatedProducts = products.filter(
        (product) => product.ProductID !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSubmitInsert = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/GreenMarket/crud/crud_products.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductName: editedProductName,
            Price: editedPrice,
            ImageURL: editedImageURL,
            Category: editedCategory,
            AdditionalInfo: editedAdditionalInfo,
            Quantity: editedQuantity,
          }),
        }
      );

      if (response.ok) {
        toast.success("Successfully inserted");
        setIsInsertModalOpen(false); // ปิด Modal หลังจากเพิ่มข้อมูลสำเร็จ

        fetchProducts(); // ทำการรีเฟรชข้อมูลหลังจากเพิ่มข้อมูลสำเร็จ
      } else if (!response.ok) {
        throw new Error("Failed to insert product");
      }
      // Refresh product list after inserting
      const data = await response.json();
      setProducts([...products, data]); // เพิ่มข้อมูลใหม่ลงใน state ของ products
    } catch (error) {
      console.error("Error inserting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
            <p className="text-gray-600">Welcome to the Product List!</p>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label
              htmlFor="search"
              className="block text-sm font-semibold text-gray-600 relative"
            >
              <FaSearch className="absolute top-10 left-3 text-gray-400" />
              Search Product
            </label>

            <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full max-w-md pl-10 border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-200 hover:border-blue-500 hover:ring-2 hover:ring-blue-200"
              placeholder="Enter product name..."
            />
          </div>

          <div className="absolute top-9 right-0 mt-10 mr-8 mt-20">
            <button
              onClick={handleInsertProduct}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center"
            >
              <FaPlus className="inline-block mr-1" /> Insert Product
            </button>
          </div>

          <h2>Product List</h2>

          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Product ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.ProductID}>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.ProductID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.ProductName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.Price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.Category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.Quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center">
                    <button
                      onClick={() => handleEditButtonClick(product)}
                      className="mr-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold py-1 px-3 rounded flex items-center hover:from-blue-600 hover:to-sky-600"
                    >
                      <FaEdit className="inline-block mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.ProductID)}
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded flex items-center hover:from-red-600 hover:to-orange-600"
                    >
                      <FaTrash className="inline-block mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <ul className="flex justify-center list-none mt-4">
            {Array.from(
              { length: Math.ceil(products.length / productsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md mr-2 ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
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
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
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
      {isInsertModalOpen && (
        <InsertModal
          closeModal={handleCloseInsertModal}
          handleSubmitInsert={handleSubmitInsert}
          editedProductName={editedProductName}
          setEditedProductName={setEditedProductName}
          editedPrice={editedPrice}
          setEditedPrice={setEditedPrice}
          editedImageURL={editedImageURL}
          setEditedImageURL={setEditedImageURL}
          editedCategory={editedCategory}
          setEditedCategory={setEditedCategory}
          editedAdditionalInfo={editedAdditionalInfo}
          setEditedAdditionalInfo={setEditedAdditionalInfo}
          editedQuantity={editedQuantity}
          setEditedQuantity={setEditedQuantity}
        />
      )}
    </div>
  );
};

export default ProductList;
