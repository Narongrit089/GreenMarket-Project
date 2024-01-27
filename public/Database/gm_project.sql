-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2024 at 08:20 PM
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
(244, 103, 0, 0, ''),
(271, 103, 17, 1, 'david@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `ProductID` int(11) NOT NULL,
  `vote` decimal(11,2) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment`, `ProductID`, `vote`, `Email`) VALUES
(1, 'ดีเยี่ยม', 1, 5.00, 'alice@email.com'),
(2, 'ดีเยี่ยม', 1, 5.00, 'bob@email.com'),
(3, 'ดีเยี่ยม', 2, 5.00, 'ff@email.com'),
(4, 'ก็ว่าไปแล้วก็พอน่ากิน', 3, 2.00, 'david@email.com'),
(5, 'ดีเยี่ยม', 4, 5.00, 'Meaa@email.com'),
(6, 'ดีเยี่ยม', 5, 2.00, 'Hala@email.com'),
(7, 'ดีเยี่ยม', 5, 3.00, 'alice@email.com'),
(8, 'ไม่สนับสนุนที่จะซื้อเลยจ๊ะ', 6, 1.00, 'bob@email.com'),
(9, 'ดีเยี่ยม', 5, 4.00, 'ff@email.com'),
(10, 'อร่อยมาก', 1, 4.00, 'david@email.com'),
(11, 'อร่อยมาก\r\n', 2, 5.00, 'Meaa@email.com'),
(12, 'ไม่ค่อยหวาน', 2, 3.00, 'Hala@email.com'),
(13, 'น่ากิน', 3, 2.00, 'alice@email.com'),
(14, 'เต็ม 10 ไม่หัก', 1, 5.00, 'bob@email.com'),
(15, 'แซ่บ', 3, 3.00, 'ff@email.com'),
(16, 'สงสัยจะต้องซื้ออีก', 2, 3.00, 'david@email.com'),
(17, 'แน่ใจว่าจะซื้อ', 8, 3.00, 'Meaa@email.com'),
(18, 'แซ่บจัด', 5, 5.00, 'Hala@email.com'),
(19, 'จิ้มน้ำพริกคือแซ่บเลย', 6, 5.00, 'alice@email.com'),
(20, 'ไว้ซื้ออีกนะ', 1, 4.00, 'bob@email.com'),
(21, 'ลำขนาด', 9, 5.00, 'ff@email.com'),
(22, 'แซ่บคัก', 1, 5.00, 'david@email.com'),
(23, 'สมคำร่ำลือ', 1, 4.00, 'Meaa@email.com'),
(71, 'หวานม๊ากก', 6, 5.00, 'ff@email.com'),
(73, 'อร่อยดี', 17, 4.00, 'ff@email.com'),
(74, 'คือแซ่บ', 17, 4.00, 'david@email.com'),
(75, 'สดมาก', 6, 4.00, 'david@email.com'),
(77, 'ไม่หวานเลย', 9, 1.00, 'david@email.com'),
(82, 'หม่าอะหยัง', 12, 1.00, 'david@email.com'),
(83, 'ก็อร่อยดีนะ', 12, 5.00, 'bob@email.com'),
(84, 'หอมๆ', 9, 5.00, 'bob@email.com'),
(85, 'ทำผักบุ้งงไฟแดงอร่อยดี', 7, 1.00, 'bob@email.com'),
(86, 'พอใช้ได้', 7, 3.00, 'david@email.com'),
(87, 'ลื่นๆ', 10, 2.00, 'david@email.com'),
(88, 'ทำหมาล่าอร่อยเลย', 10, 4.00, 'ff@email.com'),
(89, 'เปรี้ยวมากกก', 15, 5.00, 'ff@email.com'),
(90, 'น้ำเยอะจิงงง', 15, 3.00, 'bob@email.com'),
(92, 'ไม่ดีเลย', 15, 1.00, 'Hala@email.com'),
(93, 'อร่อยดี', 43, 5.00, 'Hala@email.com'),
(94, 'ซื้อกินเล่นๆ', 43, 1.00, 'Hala@email.com'),
(102, 'ไม่กรอบ', 47, 1.00, 'bob@email.com'),
(103, 'เจอหนอน', 5, 1.00, 'bob@email.com'),
(104, '555', 5, 1.00, 'bob@email.com'),
(105, 'ลูกค้าประจำเลยฮะ', 4, 5.00, 'bob@email.com'),
(106, 'กินแล้วฟันเหลืองเหมือนข้าวโพดเลย', 25, 1.00, 'bob@email.com'),
(107, 'หวานดีนะ', 25, 3.00, 'Hala@email.com');

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
(30, 102, 282, 'bob@email.com'),
(31, 102, 270, 'bob@email.com'),
(32, 102, 94, 'bob@email.com');

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
(101, 'Already shipped'),
(102, 'In progress'),
(103, 'Waiting for order');

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
  `Quantity` int(5) DEFAULT NULL,
  `score` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `Price`, `ImageURL`, `Category`, `AdditionalInfo`, `Quantity`, `score`) VALUES
(1, ' Tomato', 66.00, 'https://s.isanook.com/he/0/ud/6/32153/tomatoes.jpg?ip/crop/w728h431/q80/webp', 'Vegetable', 'fresh and red', 60, 5),
(2, 'Apple', 90.00, 'https://ihealzy.com/wp-content/uploads/2021/07/Apple-1.jpg', 'Fruit', 'Sweet and crisp', 32, 4),
(3, 'Carrot', 47.00, 'https://veggiesgreen.com/wp-content/uploads/2023/09/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%99%E0%B8%97%E0%B9%89%E0%B8%AD%E0%B8%87-70-1024x614.png', 'Vegetable', 'Vitamin supplement', 4, 2),
(4, 'Banana', 30.00, 'https://s.isanook.com/he/0/ud/1/9753/banana.jpg?ip/crop/w728h431/q80/webp', 'Fruit', 'source of energy minerals', 14, 5),
(5, 'Cabbage', 43.00, 'https://www.smeleader.com/wp-content/uploads/2019/11/%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%81%E0%B8%B0%E0%B8%AB%E0%B8%A5%E0%B9%88%E0%B8%B3%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A2-660x330.jpg', 'Vegetable', 'Cabbage is an annual plant that lasts only one season. The trunk is spherical, approximately 25-45 centimeters tall. The trunk bark is white.', 34, 3),
(6, 'Strawberry', 80.00, 'https://cdn.chiangmainews.co.th/wp-content/uploads/2017/01/07141754/b6.jpg', 'Fruit', 'Mildly sweet and sweet', 67, 4),
(7, 'Water spinach', 55.00, 'https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.6435-9/60812878_415273695978474_6829724941034717184_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeEfwamyoNepVWsVDFyLtek5WU9ipkPLFthZT2KmQ8sW2JBp-134QFgAhbDWMinQjWNwXn3Gur36yY5vyuMHnM1k&_nc_ohc=tvAZGQB0TUUAX9HLtAu&_nc_ht=scontent.fbkk5-6.fna&oh=00_AfCTHoN9uWRFI6SWXekrWdk6llqkIp-E8GNLdwIh3EAd0g&oe=65C1D19B', 'Vegetable', 'Suitable for stir frying or boiling.', 44, 2),
(8, 'Mangosteen', 120.00, 'https://jirayu.files.wordpress.com/2017/05/mangosteen.jpg', 'Fruit', 'little sweet', 84, 3),
(9, 'Mango', 45.00, 'https://thai-herbs.thdata.co/mydear_cover/thdata_%E0%B8%A1%E0%B8%B0%E0%B8%A1%E0%B9%88%E0%B8%A7%E0%B8%8704.jpg', 'Fruit', 'Sweet and crisp', 12, 4),
(10, 'Roselle', 25.00, 'https://hkm.hrdi.or.th//upload/images/Thumbimg/20150811132057.jpg', 'Vegetable', 'Fresh and crisp', 10, 3),
(11, 'Coconut', 50.00, 'https://static.thairath.co.th/media/dFQROr7oWzulq5FZYRjfmWYB7dSzKh9A6kw3HgOdRzUjVCuiIlYC8W10Hgd2oEkWnLh.jpg', 'Fruit', 'Perfume and sweet', 12, 0),
(12, 'Apricots', 150.00, 'https://akesisoncology.com/wp-content/uploads/2021/10/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%B2-_-%E0%B9%84%E0%B8%9F%E0%B9%82%E0%B8%95%E0%B8%99%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9A%E0%B8%B3%E0%B8%9A%E0%B8%B1%E0%B8%94-_-%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%81%E0%B8%B1%E0%B8%94%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B9%81%E0%B8%AD%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%84%E0%B8%AD%E0%B8%97.jpg', 'Fruit', 'sweet and sour', 9, 3),
(13, 'Pomegranate', 110.00, 'https://f.ptcdn.info/303/038/000/nzcghfirfp3gVCW9XbS-o.jpg', 'Fruit', 'mellow sweet', 17, 0),
(14, 'Bean sprout', 20.00, 'https://s.isanook.com/wo/0/ud/47/237537/f.jpg?ip/crop/w670h402/q80/jpg', 'Vegetable', 'Light green and crisp', 10, 0),
(15, 'Lemon', 150.00, 'https://s.isanook.com/he/0/ud/0/2381/istock-91829587.jpg?ip/crop/w670h402/q80/jpg', 'Fruit', 'sour and refreshing', 19, 4),
(16, 'Chinese Cabbage', 30.00, 'https://morkeaw.net/wp-content/uploads/2021/10/%E0%B8%9C%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%94%E0%B8%82%E0%B8%B2%E0%B8%A7.jpg', 'Vegetable', 'Fresh and crisp', 3, 0),
(17, 'White Strawberry', 95.00, 'https://demofc018.trustthemes.net/wp-content/uploads/2017/03/seed-4.jpg', 'Fruit', 'Mildly sweet and sweet', 40, 4),
(18, 'Watermelon', 120.00, 'https://s359.kapook.com/r/600/auto/pagebuilder/79032e42-71c6-47dd-9bd8-67157ed69cfa.jpg', 'Fruit', 'Fragrant and refreshing', 52, 0),
(19, 'Green Oak lettuce', 38.00, 'http://www.vigotech.in.th/images/column_1424760045/12.jpg', 'Vegetable', 'Crispy green, delicious to eat', 65, 0),
(20, ' Eggplant', 48.00, 'https://s.isanook.com/he/0/ud/0/3869/thaigreenpeaeggplants.jpg', 'Vegetable', 'bright green color', 95, 0),
(21, ' Grape', 65.00, 'https://s.isanook.com/he/0/ud/7/35753/grapes.jpg', 'Fruit', 'sweet and sour', 72, 0),
(22, 'Broccoli', 42.00, 'https://mthai.com/app/uploads/2019/02/bloccoli.jpg', 'Vegetable', 'Vitamin supplement', 87, 0),
(23, 'Bitter gourd', 55.00, 'https://f.btwcdn.com/store-9082/product/a3a52af3-4fc0-fea4-da45-5c0a23705bdc.jpg', 'Vegetable', 'sweet taste', 105, 0),
(24, 'Green Apple', 85.00, 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1695710721/attached_image_th/greenapplerawfruitandvegetablebackgroundsoverheadperspectivepart.jpg', 'Fruit', 'Sweet and crispy', 70, 0),
(25, 'Sweetcorn', 25.00, 'https://pharmacy.mahidol.ac.th/knowledge/picture/0365-1.gif', 'Vegetable', 'Little sweet and crispy', 47, 2),
(26, 'Green Tomatoes', 75.00, 'https://medias.thansettakij.com/uploads/images/contents/w1024/2023/04/k2xpDunr9usVrPnWRB91.webp', 'Vegetable', 'fresh and green', 61, 0),
(27, 'His son', 30.00, 'https://us-fbcloud.net/wb/data/1502/1502209-img.w9us5d.16ois.jpg', 'Fruit', 'Sweet', 40, 0),
(28, 'Onion', 50.00, 'https://www.technologychaoban.com/wp-content/uploads/2019/01/4-9.jpg', 'Vegetable', 'Rich flavor', 30, 0),
(29, 'Red Oak Lettuce', 95.00, 'https://mthai.com/app/uploads/2019/08/red-oak-leaf.jpg', 'Vegetable', 'similar to green oak Easy to eat, easy to excrete', 17, 0),
(30, 'Radish', 32.00, 'https://img.kapook.com/u/2018/sireeporn/1_39.jpg', 'Vegetable', 'Rich flavor', 49, 0),
(31, 'Longan', 90.00, 'https://image.makewebeasy.net/makeweb/m_1920x0/oFvGx8Urz/ThaiFruit/222.jpg', 'Fruit', 'Sweet and crispy', 35, 0),
(32, 'Mimosa', 28.00, 'https://s359.kapook.com/pagebuilder/3f590d6d-b62f-4444-a454-b0482a1ad8fd.jpg', 'Vegetable', 'Fresh and crisp', 60, 0),
(33, 'Orange', 45.00, 'https://assets.brandinside.asia/uploads/2023/05/Orange-scaled.jpeg', 'Fruit', 'sweet and sour', 80, 0),
(34, 'Zucchini', 38.00, 'https://www.calforlife.com/image/food/Angled-gourd.gif', 'Vegetable', 'Soft and fragrant', 70, 0),
(35, 'Asparagus', 120.00, 'https://mthai.com/app/uploads/2019/07/asparagus.jpg', 'Vegetable', 'A little sweet and intense.', 40, 0),
(36, 'Coriander', 20.00, 'https://www.disthai.com/images/content/original-1634632690275.jpg', 'Vegetable', 'Fragrant and refreshing', 90, 0),
(37, 'Sweet Lemon', 55.00, 'https://moisaner.com/wp-content/uploads/2020/01/naranja-verde.jpg', 'Fruit', 'Mild sweet and sour', 60, 0),
(38, 'Broccoli Hybrid', 60.00, 'https://puechkaset.com/wp-content/uploads/2016/12/%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%9A%E0%B8%A3%E0%B9%87%E0%B8%AD%E0%B8%84%E0%B9%82%E0%B8%84%E0%B8%A5%E0%B8%B5%E0%B9%88.jpg', 'Vegetable', 'Vitamin supplement', 55, 0),
(39, 'Pomegranate Green', 110.00, 'https://www.technologychaoban.com/wp-content/uploads/2016/08/1466649225.jpg', 'Fruit', 'sour and refreshing', 75, 0),
(40, 'Nam Dok Mai Mango', 85.00, 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4vQxbYdm3um57XuIqfaa9TTqjj4ZWq3DKySh1KgbDGtTspJdKYX.jpg', 'Fruit', 'Sweet and crispy', 35, 0),
(41, 'Cucumber', 28.00, 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1503981767/attached_image_th/%25e0%25b9%2581%25e0%25b8%2595%25e0%25b8%2587%25e0%25b8%2581%25e0%25b8%25a7%25e0%25b8%25b2.jpg', 'Vegetable', 'Little sweet and crispy', 60, 0),
(42, 'Yellow Eggplant', 40.00, 'https://cdn-cakfh.nitrocdn.com/uCvbbthIGuqozYBVHNiffOSAfPDdhkkl/assets/images/optimized/rev-aaacaf7/kaset.today/wp-content/uploads/2021/01/unnamed-1-2.jpg', 'Vegetable', 'bright colors', 85, 0),
(43, 'Foreigner', 65.00, 'https://img.kapook.com/u/2020/Tanapol/health/farang/f2.jpg', 'Fruit', 'Sweet and crisp', 45, 3),
(44, 'Yellow Cherry Tomato Seeds', 32.00, 'https://www.farmorganicseed.com/wp-content/uploads/2018/04/%E0%B9%80%E0%B8%A1%E0%B8%A5%E0%B9%87%E0%B8%94%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B9%8C%E0%B8%A1%E0%B8%B0%E0%B9%80%E0%B8%82%E0%B8%B7%E0%B8%AD%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%80%E0%B8%AB%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%871.jpg', 'Vegetable', 'fresh and delicious', 60, 0),
(45, 'Ripe Papaya', 50.00, 'https://img.kapook.com/u/2018/wanchalerm/Health_01_61/py2.jpg', 'Fruit', 'Perfume and frame', 70, 0),
(46, 'Shallots', 35.00, 'https://www.aurareefood.com/arwp/wp-content/uploads/2016/10/article4.jpg', 'Vegetable', 'Rich flavor', 80, 0),
(47, 'Papaya', 90.00, 'https://www.dailynews.co.th/wp-content/uploads/2022/08/%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3-1-768x433.jpg', 'Fruit', 'Mildly sweet and very crispy.', 54, 1),
(48, 'Tamarind', 30.00, 'https://s359.kapook.com/r/600/auto/pagebuilder/7723d671-880d-465d-86bb-146950ac3a41.jpg', '', 'Very sweet and sour.', 30, 0);

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
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

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
  MODIFY `odDID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderNo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
