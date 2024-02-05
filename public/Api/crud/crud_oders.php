<?php
header("Content-Type: application/json");

include '../conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle CRUD operations based on HTTP method
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        // Fetch all orders
        $sql = "SELECT `order`.`orderNo`, ost.`odStatusName`, `order`.`Netprice`, mb.`FirstName`, mb.`LastName`
        FROM `order`
        JOIN orderstatus ost USING (odStatusID)
        JOIN members mb USING (Email)";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $orders = [];
            while ($row = $result->fetch_assoc()) {
                $orders[] = $row;
            }
            echo json_encode($orders);
        } else {
            echo json_encode([]);
        }
        break;

    case "POST":
        // Create a new order
        $data = json_decode(file_get_contents("php://input"), true);

        // Extract order data
        $customerName = $data["CustomerName"];
        $productName = $data["ProductName"];
        $quantity = $data["Quantity"];
        // Add more fields as needed

        // Insert the new order into the database
        $sql = "INSERT INTO `order` (CustomerName, ProductName, Quantity) VALUES ('$customerName', '$productName', $quantity)";

        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Order added successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "PUT":
        // Update an existing order
        $data = json_decode(file_get_contents("php://input"), true);

        // Extract order data
        $orderNo = $data["OrderID"];
        $odStatusID = $data["OrderStatus"]; // เปลี่ยนเป็น "OrderStatus"
        // $Netprice = $data["Netprice"]; ไม่ต้องใช้งาน Netprice
        // $Email = $data["Email"]; ไม่ต้องใช้งาน Email
        // Add more fields as needed

        $sql = "UPDATE `order` SET odStatusID=$odStatusID WHERE orderNo=$orderNo"; // ปรับให้ไม่ใช้งาน Netprice และ Email
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Order updated successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "DELETE":
        // Delete an existing order
        $data = json_decode(file_get_contents("php://input"), true);

        $orderID = $data["OrderID"];

        $sql = "DELETE FROM `order` WHERE OrderID=$orderID";
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Order deleted successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid HTTP method"]);
}

$conn->close();
