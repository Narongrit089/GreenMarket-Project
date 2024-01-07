<?php

include 'conn.php';

header('Content-Type: application/json');

// ดำเนินการ CRUD ของ productstatus ต่อไปนี้

// 1. ดึงข้อมูลทั้งหมดจากตาราง productstatus
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM productstatus");
    $productstatus = array();
    while ($row = $result->fetch_assoc()) {
        $productstatus[] = $row;
    }
    echo json_encode($productstatus);
}

// 2. เพิ่มข้อมูลใหม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $statusname = $data['StatusName'];

    $sql = "INSERT INTO productstatus (StatusName)
            VALUES ('$statusname')";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Product status added successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

// 3. อัปเดตข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $statusid = $data['StatusID'];
    $statusname = $data['StatusName'];

    $sql = "UPDATE productstatus
            SET StatusName='$statusname'
            WHERE StatusID=$statusid";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Product status updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating record: " . $conn->error));
    }
}

// 4. ลบข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $statusid = $data['StatusID'];

    $sql = "DELETE FROM productstatus WHERE StatusID=$statusid";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Product status deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error deleting record: " . $conn->error));
    }
}

$conn->close();
