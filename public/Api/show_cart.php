<?php
include 'conn.php';

// Inside get_orderdetails.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

// Validate and sanitize user input
$username = isset($_GET['username']) ? $conn->real_escape_string($_GET['username']) : '';

// Check if username is provided
if (empty($username)) {
    http_response_code(400);
    echo json_encode(array("error" => "Username is required"));
    exit();
}

// Fetch orderdetails data
$query = "SELECT c.odDID,o.odStatusName,p.ProductID, p.ProductName, c.qty, p.ImageURL, p.Price
FROM carts c
JOIN orderstatus o USING (odStatusID)
JOIN products p USING (ProductID)
WHERE c.Email = '$username';";

$result = $conn->query($query);

// Inside get_orderdetails.php
if ($result) {
    $orderDetails = array();

    // Fetch results
    while ($row = $result->fetch_assoc()) {
        $orderDetails[] = $row;
    }

    // Log the fetched data
    error_log(json_encode($orderDetails));

    // Send JSON response
    echo json_encode($orderDetails);
} else {
    // Send error response
    http_response_code(500);
    echo json_encode(array("error" => "Error fetching orderdetails"));
}

$conn->close();
