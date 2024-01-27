<?php
// Include database connection
include 'conn.php';

// Set header for JSON response
header("Content-Type: application/json");

// Check if productID is provided in the request
if (!isset($_GET['productID'])) {
    http_response_code(400);
    echo json_encode(array("error" => "ProductID is required"));
    exit();
}

// Sanitize and validate productID
$productID = $conn->real_escape_string($_GET['productID']);

// Query to fetch comments for the specified productID
$query = "SELECT comment FROM comments WHERE productID = '$productID'";

// Perform the query
$result = $conn->query($query);

// Check if the query was successful
if ($result) {
    $comments = array();

    // Fetch comments
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row['comment'];
    }

    // Send JSON response with comments
    echo json_encode($comments);
} else {
    // Send error response if the query fails
    http_response_code(500);
    echo json_encode(array("error" => "Error fetching comments"));
}

// Close database connection
$conn->close();
