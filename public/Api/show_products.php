<?php
include 'conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

// Fetch products data with category
$result = $conn->query("call showProducts();");

// call = "SELECT * FROM products"

if ($result) {
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Log the fetched data
    error_log(json_encode($products));

    // Send JSON response
    echo json_encode($products);
} else {
    http_response_code(500);
    echo json_encode(array("error" => "Error fetching products"));
}

$conn->close();
