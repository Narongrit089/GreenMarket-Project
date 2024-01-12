<?php

include('conn.php');

header('Content-Type: application/json');

// ดำเนินการ CRUD ของ memberorders ต่อไปนี้

// 1. ดึงข้อมูลทั้งหมดจากตาราง memberorders
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM memberorders");
    $memberorders = array();
    while ($row = $result->fetch_assoc()) {
        $memberorders[] = $row;
    }
    echo json_encode($memberorders);
}

// 2. เพิ่มข้อมูลใหม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $memberid = $data['MemberID'];
    $orderid = $data['OrderID'];

    $sql = "INSERT INTO memberorders (MemberID, OrderID) 
            VALUES ($memberid, $orderid)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Member order added successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

// 3. อัปเดตข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $memberorderid = $data['MemberOrderID'];
    $memberid = $data['MemberID'];
    $orderid = $data['OrderID'];

    $sql = "UPDATE memberorders 
            SET MemberID=$memberid, OrderID=$orderid 
            WHERE MemberOrderID=$memberorderid";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Member order updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating record: " . $conn->error));
    }
}

// 4. ลบข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $memberorderid = $data['MemberOrderID'];

    $sql = "DELETE FROM memberorders WHERE MemberOrderID=$memberorderid";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Member order deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error deleting record: " . $conn->error));
    }
}

$conn->close();

?>
