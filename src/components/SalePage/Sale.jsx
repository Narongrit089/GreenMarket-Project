// src/components/ProductPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function สำหรับดึงข้อมูลจากฐานข้อมูล
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080//GreenMarket/crud_products.php"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // เรียกใช้ Function เมื่อ Component ถูกโหลด
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>รายการสินค้า</h1>
      <ul>
        {products.map((product) => (
          <li key={product.ProductID}>
            <img src={product.ImageURL} alt={product.ProductName} />
            <p>{product.ProductName}</p>
            <p>ราคา: {product.Price} บาท</p>
            {/* เพิ่มข้อมูลอื่น ๆ ตามต้องการ */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
