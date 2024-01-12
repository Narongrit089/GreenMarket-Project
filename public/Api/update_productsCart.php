<?php
include 'conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

// Check if it's a valid PUT request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // It's a preflight request, respond with OK
    http_response_code(200);
    exit();
}

// Check if it's a valid PUT request
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Read the incoming data
    $data = json_decode(file_get_contents("php://input"));

    if ($data) {
        $productID = $data->ProductID;
        $quantity = $data->Quantity;

        // Update the product quantity in the database
        $updateQuery = "UPDATE products SET Quantity = Quantity - $quantity WHERE ProductID = $productID";

        if ($conn->query($updateQuery)) {
            // If update successful, send success response
            http_response_code(200);
            echo json_encode(array("message" => "Product quantity updated successfully"));
        } else {
            // If update fails, send error response
            http_response_code(500);
            echo json_encode(array("error" => "Error updating product quantity"));
        }
    } else {
        // If invalid data, send error response
        http_response_code(400);
        echo json_encode(array("error" => "Invalid data"));
    }
} else {
    // If not a PUT request, send error response
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method"));
}

$conn->close();
