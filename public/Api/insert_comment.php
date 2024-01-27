<?php
include './conn.php';

// Set headers to allow CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the request method is OPTIONS and respond with a 200 status code
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract data from the request
    $productID = isset($data["productID"]) ? $conn->real_escape_string($data["productID"]) : '';
    $comment = isset($data["comment"]) ? $conn->real_escape_string($data["comment"]) : '';
    $rating = isset($data["rating"]) ? $conn->real_escape_string($data["rating"]) : '';
    $username = isset($data["username"]) ? $conn->real_escape_string($data["username"]) : '';

    // Check if any required field is empty
    if (empty($productID) || empty($comment) || empty($rating) || empty($username)) {
        http_response_code(400);
        echo json_encode(["error" => "Incomplete data provided"]);
        exit();
    }

    // Insert the new comment into the database
    $sql = "INSERT INTO comments (ProductID, comment, vote, Email) VALUES ('$productID', '$comment', $rating, '$username')";

    if ($conn->query($sql) === true) {
        http_response_code(201); // Created
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Failed to add comment: " . $conn->error]);
    }
} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Method not allowed"]);
}

// Close database connection
$conn->close();
