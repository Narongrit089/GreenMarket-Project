<?php

include 'conn.php';

// Set headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// คำสั่ง SQL สำหรับการดึงข้อมูล
$sql = "SELECT
            (SELECT COUNT(*) FROM products) AS total_products,
            (SELECT COUNT(*) FROM `order`) AS total_orders,
            (SELECT SUM(Netprice) FROM `order` WHERE odStatusID = 103) AS order_103_netprice,
            (SELECT COUNT(*) FROM members) AS total_members";

$result = $conn->query($sql);

// ตรวจสอบว่ามีข้อมูลที่ดึงมาหรือไม่
if ($result->num_rows > 0) {
    // แปลงข้อมูลให้เป็นรูปแบบ JSON
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo "0 results";
}

$conn->close();
