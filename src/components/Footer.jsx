import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/adminC";
  const shouldShowFooter = !isAdminPage;

  if (!shouldShowFooter) {
    return null; // ไม่แสดง Footer เมื่ออยู่ในหน้า AdminCenter
  }

  return (
    <footer className="bg-gradient-to-r p-4">
      <div className="container mx-auto flex items-center justify-center h-full">
        <p className="text-sm font-serif text-gray-500">
          <span className="text-gray-500">&copy; 2024</span> GreenMarket. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
