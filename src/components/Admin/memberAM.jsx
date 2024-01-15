import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./MemberAM.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { Link } from "react-router-dom";

const MemberAM = ({ username }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMemberId, setDeleteMemberId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showInsertMemberModal, setShowInsertMemberModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showInsertProductModal, setShowInsertProductModal] = useState(false);

  const [currentTable, setCurrentTable] = useState(""); // เพิ่ม state เพื่อเก็บข้อมูลตารางที่กำลังแสดง

  const [newMember, setNewMember] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: 0,
    imageURL: "", // Add the imageURL property
    category: "", // Add the category property
    additionalInfo: "", // Add other properties as needed
    quantity: 0, // Add the quantity property
  });

  useEffect(() => {
    fetchMembers();
  }, [selectedOption]);

  const fetchMembers = async () => {
    try {
      let apiUrl;

      switch (selectedOption?.value) {
        case "product-management":
          apiUrl = "http://localhost:8080/GreenMarket/crud/crud_products.php";
          break;
        case "order-management":
          // Add the API URL for order management when needed
          break;
        default:
          apiUrl = "http://localhost:8080/GreenMarket/crud/crud_members.php";
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      setMembers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setLoading(false);
    }
  };

  const handleDeleteMember = async (memberId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          "http://localhost:8080/GreenMarket/crud/crud_members.php",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: memberId }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Member was successfully deleted.");
          setDeleteMemberId(memberId);
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          "http://localhost:8080/GreenMarket/crud/crud_products.php",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ProductID: productId }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Product was successfully deleted.");
          // Uncomment the line below to refresh the data after deletion
          // fetchMembers();
          // Or update the state to remove the deleted product
          setMembers((prevMembers) =>
            prevMembers.filter((product) => product.ProductID !== productId)
          );
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const options = [
    { value: "member-management", label: "Member Management" },
    { value: "product-management", label: "Product Management" },
    // { value: "order-management", label: "Order Management" },
  ];

  const handleCloseModal = () => {
    setShowInsertModal(false);
    setShowInsertProductModal(false);
    setShowInsertMemberModal(false);
  };

  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    handleCloseModal(); // เรียกฟังก์ชันเพื่อปิด Modal เมื่อมีการเปลี่ยนแปลงตาราง
  };

  const handleEditProduct = (productId) => {
    const productToEdit = members.find(
      (member) =>
        selectedOption?.value === "product-management" &&
        member.ProductID === productId
    );
    console.log(productToEdit); // ตรวจสอบว่า productToEdit มีค่าหรือไม่

    setEditingProduct(productToEdit);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/GreenMarket/crud/crud_products.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Changes saved successfully.");
        setEditingProduct(null);
        fetchMembers();
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  // ตัวอย่าง Function สำหรับ Insert Member
  const handleInsertMember = async () => {
    try {
      // Email Validation
      const emailValidationResponse = await fetch(
        `http://localhost:8080/GreenMarket/check_email.php?email=${newMember.email}`
      );
      const emailValidationData = await emailValidationResponse.json();

      if (emailValidationResponse.ok && emailValidationData.isEmailTaken) {
        // Display an error notification for duplicate email
        toast.error(
          "Email is already registered. Please use a different email."
        );
      } else {
        // Insert Member
        const response = await fetch(
          "http://localhost:8080/GreenMarket/crud/crud_members.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMember),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Display success notification
          toast.success("Member added successfully.");
          // Reset state
          setNewMember({
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            email: "",
            password: "",
          });
          // Refresh data
          fetchMembers();
          // Close modal
          setShowInsertMemberModal(false);
        } else {
          // Log error
          console.log(data.error);
          toast.error(data.error);
        }
      }
    } catch (error) {
      // Log error
      console.error("Error inserting member:", error);
    }
  };

  // ตัวอย่าง Function สำหรับ Insert Product
  const handleInsertProduct = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/GreenMarket/crud/crud_products.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Product added successfully.");
        setNewProduct({
          productName: "",
          price: 0,
          imageURL: "", // Reset other properties for product details here
          category: "",
          additionalInfo: "",
          quantity: 0,
          // Add more properties and reset their values as needed
        });
        fetchMembers();
        setShowInsertProductModal(false);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error inserting product:", error);
    }
  };

  useEffect(() => {
    if (deleteMemberId !== null) {
      fetchMembers();
      setDeleteMemberId(null);
    }
  }, [deleteMemberId]);

  return (
    <div className="bg-blue-100 py-8">
      <div className="max-w-4xl mx-auto bg-white pl-8 pr-8 rounded-md overflow-hidden shadow-md table-container">
        <div className="flex justify-between items-center mb-6 mt-6">
          <h2 className="text-3xl font-bold text-blue-600 ">
            {selectedOption?.value === "product-management"
              ? "Product Management"
              : "Member Management"}
          </h2>
          <Select
            className="w-48 mr-4"
            value={selectedOption}
            onChange={handleDropdownChange}
            options={options}
            placeholder="Member Manage..."
          />
        </div>

        <button
          onClick={() => {
            setShowInsertModal(true);
            setShowInsertMemberModal(true);
            setCurrentTable("member-management");
          }}
          className={`bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-md ${
            selectedOption?.value !== "product-management" ? "" : "hidden"
          }`}
        >
          Insert Members
        </button>

        <button
          onClick={() => {
            setShowInsertModal(true);
            setShowInsertProductModal(true);
            setCurrentTable("product-management");
          }}
          className={`bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-md ${
            selectedOption?.value === "product-management" ? "" : "hidden"
          }`}
        >
          Insert Products
        </button>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="member-table">
            <thead>
              <tr>
                <th>ID</th>
                {selectedOption?.value === "product-management" ? (
                  <>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image URL</th>
                    <th>Category</th>
                    <th>Additional Info</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                ) : (
                  <>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.ID}>
                  <td>
                    {selectedOption?.value === "product-management"
                      ? member.ProductID
                      : member.MemberID}
                  </td>
                  {selectedOption?.value === "product-management" ? (
                    <>
                      <td>{member.ProductName}</td>
                      <td>{member.Price}</td>
                      <td>
                        <img
                          src={member.ImageURL}
                          alt={member.ProductName}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>{member.Category}</td>
                      <td>{member.AdditionalInfo}</td>
                      <td>{member.Quantity}</td>
                      <td>
                        <button
                          className="bg-gradient-to-r from-green-600 to-green-500 text-white px-2 py-1 rounded flex items-center hover:from-yellow-300 hover:to-yellow-500"
                          onClick={() => handleEditProduct(member.ProductID)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="mr-2" />
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded flex items-center hover:from-yellow-300 hover:to-yellow-400"
                          onClick={() => handleDeleteProduct(member.ProductID)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Delete
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{member.FirstName}</td>
                      <td>{member.LastName}</td>
                      <td>{member.Address}</td>
                      <td>{member.PhoneNumber}</td>
                      <td>{member.Email}</td>
                    </>
                  )}
                  <td>
                    <button
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded flex items-center hover:from-yellow-300 hover:to-yellow-400"
                      onClick={() => handleDeleteMember(member.MemberID)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {editingProduct && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h3 className="text-2xl font-bold mb-4">Edit Product</h3>
            <p>ID: {editingProduct.ProductID}</p>
            <div className="mt-2">
              <label htmlFor="productName">Name:</label>
              <input
                type="text"
                id="productName"
                value={editingProduct.ProductName}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    ProductName: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={editingProduct.Price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    Price: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
                step="1" // ตั้งค่า step ตามที่ต้องการ
                min="0" // ตั้งค่า min ตามที่ต้องการ
              />
            </div>

            <div className="mt-2">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={editingProduct.Category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    Category: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">{editingProduct.Category}</option>
                {editingProduct.Category === "ผลไม้" ? (
                  <option value="ผัก">ผัก</option>
                ) : (
                  <option value="ผลไม้">ผลไม้</option>
                )}
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mt-2">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={editingProduct.Quantity}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    Quantity: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
                step="1" // ตั้งค่า step เป็น 1 เพื่อให้รับเฉพาะจำนวนเต็ม
                min="0"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="additionalInfo">Additional Info:</label>
              <input
                type="text"
                id="additionalInfo"
                value={editingProduct.AdditionalInfo}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    AdditionalInfo: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            {/* Add more input fields for other properties as needed */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showInsertMemberModal && (
        // Modal สำหรับ Insert Member
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h3 className="text-2xl font-bold mb-4">Insert Member</h3>
            {/* เพิ่มฟอร์มหรืออย่างอื่น ๆ ตามต้องการ */}
            <div className="mt-2">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={newMember.firstName} // Corrected from newMember.firstName to newMember.firstName
                onChange={(e) =>
                  setNewMember({ ...newMember, firstName: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={newMember.lastName}
                onChange={(e) =>
                  setNewMember({ ...newMember, lastName: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={newMember.address}
                onChange={(e) =>
                  setNewMember({ ...newMember, address: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                value={newMember.phoneNumber}
                onChange={(e) =>
                  setNewMember({ ...newMember, phoneNumber: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={newMember.password}
                onChange={(e) =>
                  setNewMember({ ...newMember, password: e.target.value })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            {/* Add more input fields for other properties as needed */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowInsertMemberModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleInsertMember}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {showInsertProductModal && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h3 className="text-2xl font-bold mb-4">Insert Product</h3>

            <div className="mt-2">
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    productName: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
                step="1"
                min="0"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="imageURL">Image URL:</label>
              <input
                type="text"
                id="imageURL"
                value={newProduct.imageURL}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    imageURL: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
              >
                <option value="ผลไม้">ผลไม้</option>
                <option value="ผัก">ผัก</option>
              </select>
            </div>

            <div className="mt-2">
              <label htmlFor="additionalInfo">Additional Info:</label>
              <input
                type="text"
                id="additionalInfo"
                value={newProduct.additionalInfo}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    additionalInfo: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 w-full"
                min="0"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowInsertProductModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleInsertProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Insert Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberAM;
