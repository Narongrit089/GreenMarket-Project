-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2024 at 06:19 AM
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
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `odDID` int(5) NOT NULL,
  `odStatusID` int(5) NOT NULL,
  `ProductID` int(4) NOT NULL,
  `qty` int(5) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`odDID`, `odStatusID`, `ProductID`, `qty`, `Email`) VALUES
(215, 103, 19, 3, 'alice@email.com'),
(216, 103, 18, 2, 'alice@email.com'),
(217, 103, 15, 3, 'alice@email.com'),
(244, 103, 0, 0, '');

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
(0, 'Admin', 'L1', NULL, NULL, '1@admin.com', '123'),
(1, 'อลิซ', 'จอห์นสัน', '789 ถนนมาร์เก็ต', '555-9876', 'alice@email.com', 'securepass123'),
(2, 'บ็อบ', 'สมิธ', '123 ถนนการ์เด้น', '555-4321', 'bob@email.com', 'pass123'),
(3, 'Apinya', 'Noochuay', '987 LA JDL', '999999', 'ff@email.com', '123'),
(4, 'David', 'Smith', '456 Main St', '555-1234', 'david@email.com', 'password456'),
(5, 'Meaa', 'Sala', 'FOS-OF', '4343434', 'Meaa@email.com', '123'),
(6, 'Hala', 'jaja', 'LA-342', '234355', 'Hala@email.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderNo` int(5) NOT NULL,
  `odStatusID` int(3) NOT NULL,
  `Netprice` int(6) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`orderNo`, `odStatusID`, `Netprice`, `Email`) VALUES
(1, 102, 1080, 'ff@email.com'),
(2, 102, 900, 'bob@email.com'),
(3, 102, 300, 'bob@email.com'),
(4, 102, 500, 'ff@email.com'),
(5, 102, 94, 'ff@email.com'),
(6, 102, 590, 'ff@email.com'),
(13, 102, 1300, 'bob@email.com'),
(14, 102, 995, 'bob@email.com'),
(15, 102, 1400, 'alice@email.com'),
(16, 102, 607, 'alice@email.com'),
(17, 102, 550, 'david@email.com'),
(18, 102, 600, 'david@email.com'),
(19, 102, 956, 'david@email.com'),
(20, 102, 270, 'david@email.com'),
(21, 102, 515, 'david@email.com'),
(22, 102, 543, 'david@email.com'),
(23, 102, 247, 'david@email.com'),
(24, 102, 330, 'david@email.com'),
(25, 102, 30, 'david@email.com'),
(26, 102, 180, 'david@email.com'),
(27, 102, 47, 'bob@email.com'),
(28, 102, 137, 'bob@email.com'),
(29, 102, 752, 'ff@email.com'),
(30, 102, 282, 'bob@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `orderstatus`
--

CREATE TABLE `orderstatus` (
  `odStatusID` int(3) UNSIGNED ZEROFILL NOT NULL,
  `odStatusName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orderstatus`
--

INSERT INTO `orderstatus` (`odStatusID`, `odStatusName`) VALUES
(101, 'จัดส่งแล้ว'),
(102, 'กำลังดำเนินการ'),
(103, 'รอการสั่งซื้อ');

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
  `AdditionalInfo` text DEFAULT NULL,
  `Quantity` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `Price`, `ImageURL`, `Category`, `AdditionalInfo`, `Quantity`) VALUES
(1, 'มะเขือเทศ', 66.00, 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w728h431/q80/webp', 'ผัก', 'สดและแดง', 60),
(2, 'แอปเปิ้ล', 90.00, 'https://ihealzy.com/wp-content/uploads/2021/07/Apple-1.jpg', 'ผลไม้', 'หวานและกรอบ', 35),
(3, 'แครอท', 47.00, 'https://veggiesgreen.com/wp-content/uploads/2023/09/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%99%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87-70-1024x614.png', 'ผัก', 'เสริมวิตามิน', -6),
(4, 'กล้วย', 30.00, 'https://s.isanook.com/he/0/ud/1/9753/banana.jpg?ip/crop/w728h431/q80/webp', 'ผลไม้', 'แหล่งแร่ธาตุพลังงาน', 14),
(5, ' กะหล่ำปลี', 43.00, 'https://www.smeleader.com/wp-content/uploads/2019/11/%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%81%E0%B8%B0%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%B3%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A2-660x330.jpg', 'ผัก', 'กะหล่ำปลี เป็นพืชล้มลุกอายุฤดูเดียว ลำต้นมีลักษณะทรงกลม สูงประมาณ สูงประมาณ 25-45 เซนติเมตร เปลือกลำต้นมีสีขาว', 34),
(6, 'สตรอเบอรี่', 80.00, 'https://cdn.chiangmainews.co.th/wp-content/uploads/2017/01/07141754/b6.jpg', 'ผลไม้', 'หวานอ่อนและหอมหวาน', 67),
(7, 'ผักบุ้ง', 55.00, 'https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.6435-9/60812878_415273695978474_6829724941034717184_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeEfwamyoNepVWsVDFyLtek5WU9ipkPLFthZT2KmQ8sW2JBp-134QFgAhbDWMinQjWNwXn3Gur36yY5vyuMHnM1k&_nc_ohc=tvAZGQB0TUUAX9HLtAu&_nc_ht=scontent.fbkk5-6.fna&oh=00_AfCTHoN9uWRFI6SWXekrWdk6llqkIp-E8GNLdwIh3EAd0g&oe=65C1D19B', 'ผัก', 'เหมาะสำหรับทำผัดหรือนำไปต้ม', 44),
(8, 'มังคุด', 120.00, 'https://jirayu.files.wordpress.com/2017/05/mangosteen.jpg', 'ผลไม้', 'หวานน้อยและน้ำมันในรสชาติ', 84),
(9, 'มะม่วง', 45.00, 'https://thai-herbs.thdata.co/mydear_cover/thdata_%E0%B8%A1%E0%B8%B0%E0%B8%A1%E0%B9%88%E0%B8%A7%E0%B8%8704.jpg', 'ผลไม้', 'หอมหวานและกรอบ', 12),
(10, 'กระเจี๊ยบ', 25.00, 'https://hkm.hrdi.or.th//upload/images/Thumbimg/20150811132057.jpg', 'ผัก', 'สดและกรอบ', 10),
(11, 'มะพร้าว', 50.00, 'https://static.thairath.co.th/media/dFQROr7oWzulq5FZYRjfmWYB7dSzKh9A6kw3HgOdRzUjVCuiIlYC8W10Hgd2oEkWnLh.jpg', 'ผลไม้', 'น้ำหอมและหวาน', 12),
(12, 'แอปริคอต', 150.00, 'https://akesisoncology.com/wp-content/uploads/2021/10/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2-_-%E0%B9%84%E0%B8%9F%E0%B9%82%E0%B8%95%E0%B8%99%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B8%B3%E0%B8%9A%E0%B8%B1%E0%B8%94-_-%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%B1%E0%B8%94%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B9%81%E0%B8%AD%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%84%E0%B8%AD%E0%B8%97.jpg', 'ผลไม้', 'เปรี้ยวหวาน', 9),
(13, 'ทับทิม', 110.00, 'https://f.ptcdn.info/303/038/000/nzcghfirfp3gVCW9XbS-o.jpg', 'ผลไม้', 'หวานกลมกล่อม', 17),
(14, 'ถั่วงอก', 20.00, 'https://s.isanook.com/wo/0/ud/47/237537/f.jpg?ip/crop/w670h402/q80/jpg', 'ผัก', 'เขียวอ่อนและกรอบ', 10),
(15, 'มะนาว', 150.00, 'https://s.isanook.com/he/0/ud/0/2381/istock-91829587.jpg?ip/crop/w670h402/q80/jpg', 'ผลไม้', 'เปรี้ยวและสดชื่น', 19),
(16, 'ผักกาดขาว', 30.00, 'https://morkeaw.net/wp-content/uploads/2021/10/%E0%B8%9C%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%94%E0%B8%82%E0%B8%B2%E0%B8%A7.jpg', 'ผัก', 'สดและกรอบ', 3),
(17, 'สตรอเบอรี่สีขาว', 95.00, 'https://demofc018.trustthemes.net/wp-content/uploads/2017/03/seed-4.jpg', 'ผลไม้', 'หวานอ่อนและหอมหวาน', 40),
(18, 'แตงโม', 120.00, 'https://s359.kapook.com/r/600/auto/pagebuilder/79032e42-71c6-47dd-9bd8-67157ed69cfa.jpg', 'ผลไม้', 'น้ำหอมและสดชื่น', 52),
(19, 'สลัด(กรีนโอ๊ค)', 38.00, 'http://www.vigotech.in.th/images/column_1424760045/12.jpg', 'ผัก', 'รสเข้มข้น', 65),
(20, 'มะเขือพวง', 48.00, 'https://s.isanook.com/he/0/ud/0/3869/thaigreenpeaeggplants.jpg', 'ผัก', 'สีสันสดใส', 95),
(21, 'องุ่น', 65.00, 'https://s.isanook.com/he/0/ud/7/35753/grapes.jpg', 'ผลไม้', 'หวานอมเปรี้ยว', 72),
(22, 'บร็อคโคลี่', 42.00, 'https://mthai.com/app/uploads/2019/02/bloccoli.jpg', 'ผัก', 'เสริมวิตามิน', 87),
(23, 'มะระขี้นก', 55.00, 'https://f.btwcdn.com/store-9082/product/a3a52af3-4fc0-fea4-da45-5c0a23705bdc.jpg', 'ผัก', 'รสชาติหวาน', 105),
(24, 'แอ๊ปเปิ้ลกรีน', 85.00, 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1695710721/attached_image_th/greenapplerawfruitandvegetablebackgroundsoverheadperspectivepart.jpg', 'ผลไม้', 'หวานกรอบ', 70),
(25, 'ข้าวโพด', 25.00, 'https://pharmacy.mahidol.ac.th/knowledge/picture/0365-1.gif', 'ผัก', 'หวานน้อยและกรอบ', 47),
(26, 'มะเขือเทศเขียว', 75.00, 'https://medias.thansettakij.com/uploads/images/contents/w1024/2023/04/k2xpDunr9usVrPnWRB91.webp', 'ผัก', 'สดและเขียว', 61),
(27, 'ลูกเขา', 30.00, 'https://us-fbcloud.net/wb/data/1502/1502209-img.w9us5d.16ois.jpg', 'ผลไม้', 'หอมหวาน', 40),
(28, 'หอมใหญ่', 50.00, 'https://www.technologychaoban.com/wp-content/uploads/2019/01/4-9.jpg', 'ผัก', 'รสเข้มข้น', 30),
(29, 'สลัด(เรดโอ็ค)', 95.00, 'https://mthai.com/app/uploads/2019/08/red-oak-leaf.jpg', 'ผัก', 'คล้ายกรีนโอ๊ค กินง่ายขับถ่ายสบาย', 17),
(30, 'หัวไชเท้า', 32.00, 'https://img.kapook.com/u/2018/sireeporn/1_39.jpg', 'ผัก', 'รสเข้มข้น', 49),
(31, 'ลำไย', 90.00, 'https://image.makewebeasy.net/makeweb/m_1920x0/oFvGx8Urz/ThaiFruit/222.jpg', 'ผลไม้', 'หวานกรอบ', 35),
(32, 'ผักกระเฉด', 28.00, 'https://s359.kapook.com/pagebuilder/3f590d6d-b62f-4444-a454-b0482a1ad8fd.jpg', 'ผัก', 'สดและกรอบ', 60),
(33, 'ส้ม', 45.00, 'https://assets.brandinside.asia/uploads/2023/05/Orange-scaled.jpeg', 'ผลไม้', 'เปรี้ยวหวาน', 80),
(34, 'บวบ', 38.00, 'https://www.calforlife.com/image/food/Angled-gourd.gif', 'ผัก', 'นุ่มและหอม', 70),
(35, 'หน่อไม้ฝรั่ง', 120.00, 'https://mthai.com/app/uploads/2019/07/asparagus.jpg', 'ผัก', 'หวานนิดและเข้มข้น', 40),
(36, 'ผักชี', 20.00, 'https://www.disthai.com/images/content/original-1634632690275.jpg', 'ผัก', 'หอมและสดชื่น', 90),
(37, 'มะนาวหวาน', 55.00, 'https://moisaner.com/wp-content/uploads/2020/01/naranja-verde.jpg', 'ผลไม้', 'หวานอ่อนและเปรี้ยว', 60),
(38, 'บร็อคโคลี่ไฮบริด', 60.00, 'https://puechkaset.com/wp-content/uploads/2016/12/%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%9A%E0%B8%A3%E0%B9%87%E0%B8%AD%E0%B8%84%E0%B9%82%E0%B8%84%E0%B8%A5%E0%B8%B5%E0%B9%88.jpg', 'ผัก', 'เสริมวิตามิน', 55),
(39, 'ทับทิมกรีน', 110.00, 'https://www.technologychaoban.com/wp-content/uploads/2016/08/1466649225.jpg', 'ผลไม้', 'เปรี้ยวและสดชื่น', 75),
(40, 'มะม่วงน้ำดอกไม้', 85.00, 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4vQxbYdm3um57XuIqfaa9TTqjj4ZWq3DKySh1KgbDGtTspJdKYX.jpg', 'ผลไม้', 'หวานกรอบ', 35),
(41, 'แตงกวา', 28.00, 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1503981767/attached_image_th/%25e0%25b9%2581%25e0%25b8%2595%25e0%25b8%2587%25e0%25b8%2581%25e0%25b8%25a7%25e0%25b8%25b2.jpg', 'ผัก', 'หวานน้อยและกรอบ', 60),
(42, 'มะเขือสีเหลือง', 40.00, 'https://cdn-cakfh.nitrocdn.com/uCvbbthIGuqozYBVHNiffOSAfPDdhkkl/assets/images/optimized/rev-aaacaf7/kaset.today/wp-content/uploads/2021/01/unnamed-1-2.jpg', 'ผัก', 'สีสันสดใส', 85),
(43, 'ฝรั่ง', 65.00, 'https://img.kapook.com/u/2020/Tanapol/health/farang/f2.jpg', 'ผลไม้', 'หวานและกรอบ', 45),
(44, 'มะเขือเทศเหลือง', 32.00, 'https://www.farmorganicseed.com/wp-content/uploads/2018/04/%E0%B9%80%E0%B8%A1%E0%B8%A5%E0%B9%87%E0%B8%94%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B9%8C%E0%B8%A1%E0%B8%B0%E0%B9%80%E0%B8%82%E0%B8%B7%E0%B8%AD%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%871.jpg', 'ผัก', 'สดและอร่อย', 60),
(45, 'มะละกอสุก', 50.00, 'https://img.kapook.com/u/2018/wanchalerm/Health_01_61/py2.jpg', 'ผลไม้', 'น้ำหอมและกรอบ', 70),
(46, 'หอมแดง', 35.00, 'https://www.aurareefood.com/arwp/wp-content/uploads/2016/10/article4.jpg', 'ผัก', 'รสเข้มข้น', 80),
(47, 'มะละกอดิบ', 90.00, 'https://www.dailynews.co.th/wp-content/uploads/2022/08/%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3-1-768x433.jpg', 'ผลไม้', 'หวานอ่อนและหอมหวานกรอบมาก', 54),
(48, 'มะขาม', 30.00, 'https://s359.kapook.com/r/600/auto/pagebuilder/7723d671-880d-465d-86bb-146950ac3a41.jpg', '', 'หวานอมเปรี้ยวมากกกกก', 30);

-- --------------------------------------------------------

--
-- Table structure for table `producttype`
--

CREATE TABLE `producttype` (
  `typeCode` varchar(5) NOT NULL,
  `Category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `producttype`
--

INSERT INTO `producttype` (`typeCode`, `Category`) VALUES
('501', 'Vegetable'),
('502', 'Fruit');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`odDID`,`ProductID`,`Email`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`MemberID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderNo`);

--
-- Indexes for table `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD PRIMARY KEY (`odStatusID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `producttype`
--
ALTER TABLE `producttype`
  ADD PRIMARY KEY (`typeCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `odDID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=267;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderNo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
