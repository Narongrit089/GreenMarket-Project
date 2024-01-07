-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2024 at 03:54 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gm_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `memberorders`
--

CREATE TABLE `memberorders` (
  `MemberOrderID` int(11) NOT NULL,
  `MemberID` int(11) DEFAULT NULL,
  `OrderID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `memberorders`
--

INSERT INTO `memberorders` (`MemberOrderID`, `MemberID`, `OrderID`) VALUES
(301, 1, 101),
(302, 1, 102);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `MemberID` int(11) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(10) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`MemberID`, `FirstName`, `LastName`, `Address`, `PhoneNumber`, `Email`, `Password`) VALUES
(1, 'อลิซ', 'จอห์นสัน', '789 ถนนมาร์เก็ต', '555-9876', 'alice@email.com', 'securepass123'),
(2, 'บ็อบ', 'สมิธ', '123 ถนนการ์เด้น', '555-4321', 'bob@email.com', 'pass123');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetailID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`OrderDetailID`, `OrderID`, `ProductID`, `Quantity`) VALUES
(201, 101, 1, 3),
(202, 101, 3, 2),
(203, 102, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `MemberID` int(11) DEFAULT NULL,
  `OrderDate` date DEFAULT NULL,
  `OrderStatus` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `MemberID`, `OrderDate`, `OrderStatus`) VALUES
(101, 1, '2024-01-03', 'กำลังดำเนินการ'),
(102, 2, '2024-01-04', 'จัดส่งแล้ว');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(100) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `ImageURL` text DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL,
  `AdditionalInfo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `Price`, `ImageURL`, `Category`, `AdditionalInfo`) VALUES
(1, 'มะเขือเทศ', 65.00, 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w728h431/q80/webp', 'ผัก', 'สดและแดง'),
(2, 'แอปเปิ้ล', 90.00, 'https://ihealzy.com/wp-content/uploads/2021/07/Apple-1.jpg', 'ผลไม้', 'หวานและกรอบ'),
(3, 'แครอท', 47.00, 'https://veggiesgreen.com/wp-content/uploads/2023/09/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%99%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87-70-1024x614.png', 'ผัก', 'เสริมวิตามิน'),
(4, 'กล้วย', 30.00, 'https://s.isanook.com/he/0/ud/1/9753/banana.jpg?ip/crop/w728h431/q80/webp', 'ผลไม้', 'แหล่งแร่ธาตุพลังงาน');

-- --------------------------------------------------------

--
-- Table structure for table `productstatus`
--

CREATE TABLE `productstatus` (
  `StatusID` int(11) NOT NULL,
  `StatusName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productstatus`
--

INSERT INTO `productstatus` (`StatusID`, `StatusName`) VALUES
(1, 'มีสินค้า'),
(2, 'หมดสต็อก'),
(3, 'ลดราคา');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `memberorders`
--
ALTER TABLE `memberorders`
  ADD PRIMARY KEY (`MemberOrderID`),
  ADD KEY `MemberID` (`MemberID`),
  ADD KEY `OrderID` (`OrderID`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`MemberID`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetailID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `MemberID` (`MemberID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `productstatus`
--
ALTER TABLE `productstatus`
  ADD PRIMARY KEY (`StatusID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `memberorders`
--
ALTER TABLE `memberorders`
  ADD CONSTRAINT `memberorders_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `members` (`MemberID`),
  ADD CONSTRAINT `memberorders_ibfk_2` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `members` (`MemberID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
