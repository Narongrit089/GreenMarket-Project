<?php

include 'conn.php';

header('Content-Type: application/json');

// ดำเนินการ CRUD ของ orders ต่อไปนี้

// 1. ดึงข้อมูลทั้งหมดจากตาราง orders
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM orders");
    $orders = array();
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    echo json_encode($orders);
}

// 2. เพิ่มข้อมูลใหม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $memberid = $data['MemberID'];
    $orderdate = $data['OrderDate'];
    $orderstatus = $data['OrderStatus'];

    $sql = "INSERT INTO orders (MemberID, OrderDate, OrderStatus)
            VALUES ($memberid, '$orderdate', '$orderstatus')";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Order added successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

// 3. อัปเดตข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $orderid = $data['OrderID'];
    $memberid = $data['MemberID'];
    $orderdate = $data['OrderDate'];
    $orderstatus = $data['OrderStatus'];

    $sql = "UPDATE orders
            SET MemberID=$memberid, OrderDate='$orderdate', OrderStatus='$orderstatus'
            WHERE OrderID=$orderid";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Order updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating record: " . $conn->error));
    }
}

// 4. ลบข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $orderid = $data['OrderID'];

    $sql = "DELETE FROM orders WHERE OrderID=$orderid";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Order deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error deleting record: " . $conn->error));
    }
}

$conn->close();
