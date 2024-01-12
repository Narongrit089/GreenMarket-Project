<?php
include 'conn.php';

include 'conn.php';
header('Content-Type: application/json');

// Allow requests from the specified origin
header("Access-Control-Allow-Origin: http://localhost:5173");

// Allow the following methods for preflight requests
header("Access-Control-Allow-Methods: DELETE, OPTIONS");

// Allow the following headers for preflight requests
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // This is a preflight request, respond with 200 OK
    http_response_code(200);
    exit;
}

// Check if it's a valid DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Read the incoming data
    $data = json_decode(file_get_contents("php://input"));

    if ($data) {
        $username = $data->username;

        // Delete all cart items for the specified username
        $deleteQuery = "DELETE FROM carts WHERE Email = '$username'";

        if ($conn->query($deleteQuery)) {
            // If delete successful, send success response
            http_response_code(200);
            echo json_encode(array("message" => "Cart cleared successfully"));
        } else {
            // If delete fails, send error response
            http_response_code(500);
            echo json_encode(array("error" => "Error clearing the cart"));
        }
    } else {
        // If invalid data, send error response
        http_response_code(400);
        echo json_encode(array("error" => "Invalid data"));
    }
} else {
    // If not a DELETE request, send error response
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method"));
}

$conn->close();
