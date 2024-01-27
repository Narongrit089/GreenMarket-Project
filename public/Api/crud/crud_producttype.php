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
        // Fetch all product types
        $sql = "SELECT * FROM producttype";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $productTypes = [];
            while ($row = $result->fetch_assoc()) {
                $productTypes[] = $row;
            }
            echo json_encode($productTypes);
        } else {
            echo json_encode([]);
        }
        break;

    case "POST":
        // Create a new product type
        $data = json_decode(file_get_contents("php://input"), true);

        $newProductType = $data["newProductType"];

        $sql = "INSERT INTO producttype (ProductType) VALUES ('$newProductType')";

        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Product Type added successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "PUT":
        // Update an existing product type
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data["id"];
        $updatedProductType = $data["updatedProductType"];

        $sql = "UPDATE producttype SET ProductType='$updatedProductType' WHERE ID=$id";
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Product Type updated successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "DELETE":
        // Delete an existing product type
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data["id"];

        $sql = "DELETE FROM producttype WHERE ID=$id";
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Product Type deleted successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid HTTP method"]);
}

$conn->close();
