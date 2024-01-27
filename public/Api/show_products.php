<?php
include './conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

// Fetch products data with comments
$query = "SELECT p.ProductID, p.ProductName, p.Price, p.ImageURL, p.Category, p.AdditionalInfo, p.Quantity, p.score, c.comment, m.FirstName
          FROM products p
          LEFT JOIN comments c ON p.ProductID = c.ProductID
          LEFT JOIN members m ON c.Email = m.Email
          order by p.score DESC";

$result = $conn->query($query);

if ($result) {
    $products = array();

    while ($row = $result->fetch_assoc()) {
        $productId = $row['ProductID'];
        if (!isset($products[$productId])) {
            $products[$productId] = $row;
            $products[$productId]['comments'] = array();
        }

        if (!empty($row['comment'])) {
            $products[$productId]['comments'][] = array('comment' => $row['comment'], 'author' => $row['FirstName']);
        }
    }

    // Convert associative array to indexed array
    $products = array_values($products);

    // Log the fetched data
    error_log(json_encode($products));

    // Send JSON response
    echo json_encode($products);
} else {
    http_response_code(500);
    echo json_encode(array("error" => "Error fetching products"));
}

$conn->close();
