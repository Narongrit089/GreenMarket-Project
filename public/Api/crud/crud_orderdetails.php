
<?php

include('conn.php');

header('Content-Type: application/json');

// ดำเนินการ CRUD ของ orderdetails ต่อไปนี้

// 1. ดึงข้อมูลทั้งหมดจากตาราง orderdetails
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM orderdetails");
    $orderdetails = array();
    while ($row = $result->fetch_assoc()) {
        $orderdetails[] = $row;
    }
    echo json_encode($orderdetails);
}

// 2. เพิ่มข้อมูลใหม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $orderid = $data['OrderID'];
    $productid = $data['ProductID'];
    $quantity = $data['Quantity'];

    $sql = "INSERT INTO orderdetails (OrderID, ProductID, Quantity) 
            VALUES ($orderid, $productid, $quantity)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Order detail added successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

// 3. อัปเดตข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $orderdetailid = $data['OrderDetailID'];
    $orderid = $data['OrderID'];
    $productid = $data['ProductID'];
    $quantity = $data['Quantity'];

    $sql = "UPDATE orderdetails 
            SET OrderID=$orderid, ProductID=$productid, Quantity=$quantity 
            WHERE OrderDetailID=$orderdetailid";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Order detail updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating record: " . $conn->error));
    }
}

// 4. ลบข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $orderdetailid = $data['OrderDetailID'];

    $sql = "DELETE FROM orderdetails WHERE OrderDetailID=$orderdetailid";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Order detail deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error deleting record: " . $conn->error));
    }
}

$conn->close();

?>
