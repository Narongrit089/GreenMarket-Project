<?php

// delete_cart_item.php

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

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get the data sent with the request
    $data = json_decode(file_get_contents("php://input"));

    // Check if the required data is present
    if (isset($data->odDID)) {
        $cartID = $data->odDID;

        // Perform the delete operation
        $deleteResult = $conn->query("DELETE FROM carts WHERE odDID = '$cartID'");

        if ($deleteResult) {
            // Send success response
            http_response_code(200); // OK
            echo json_encode(array("message" => "Cart item deleted successfully"));
        } else {
            // Send error response
            http_response_code(500);
            echo json_encode(array("error" => "Error deleting cart item"));
        }
    } else {
        // Send error response
        http_response_code(400); // Bad request
        echo json_encode(array("error" => "Missing required data"));
    }

    $conn->close();
} else {
    // Send error response for unsupported method
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
}
