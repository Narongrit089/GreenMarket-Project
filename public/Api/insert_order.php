<?php
include 'conn.php';

header('Content-Type: application/json');

// Allow requests from the specified origin
header("Access-Control-Allow-Origin: http://localhost:5173");

// Allow the following methods for preflight requests
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow the following headers for preflight requests
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // This is a preflight request, respond with 200 OK
    http_response_code(200);
    exit;
}

// Check if it's a valid POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the incoming data
    $data = json_decode(file_get_contents("php://input"));

    if ($data) {
        $username = $data->username;
        $orderTotal = $data->orderTotal;

        // Set odStatusID to 102
        $odStatusID = 102;

        if ($orderTotal === 0) {
            http_response_code(500);
            echo json_encode(array("message" => "Order total is 0, no order placed"));
        } else {
            $insertOrderQuery = "INSERT INTO `order` (odStatusID, Netprice, Email) VALUES ('$odStatusID', '$orderTotal', '$username')";
            // ... (ต่อไปตามที่คุณได้เตรียมไว้)
        }

        // Insert the order details into the database

        if ($conn->query($insertOrderQuery)) {
            // If insert successful, send success response
            http_response_code(200);
            echo json_encode(array("message" => "Order placed successfully"));
        } else {
            // If insert fails, send error response
            http_response_code(500);
            echo json_encode(array("error" => "Error placing the order"));
        }
    } else {
        // If invalid data, send error response
        http_response_code(400);
        echo json_encode(array("error" => "Invalid data"));
    }
} else {
    // If not a POST request, send error response
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method"));
}

$conn->close();
