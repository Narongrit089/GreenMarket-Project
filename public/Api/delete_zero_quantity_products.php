<?php
// Include database connection file
include 'conn.php';
header('Content-Type: application/json');

// Allow requests from the specified origin
header("Access-Control-Allow-Origin: http://localhost:5173");

// Allow the following methods for preflight requests
header("Access-Control-Allow-Methods: DELETE, OPTIONS");

// Allow the following headers for preflight requests
header("Access-Control-Allow-Headers: Content-Type");

// Check if request method is POST
$sql = "SELECT * FROM products WHERE Quantity = 0";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // Delete each product with quantity equal to 0
    while ($row = mysqli_fetch_assoc($result)) {
        $productId = $row['ProductID'];

        // Delete from carts table
        $deleteCartSql = "DELETE FROM carts WHERE ProductID = $productId";
        if (mysqli_query($conn, $deleteCartSql)) {
            echo "Product with ProductID $productId deleted from carts successfully.\n";
        } else {
            echo "Error deleting product with ProductID $productId from carts: " . mysqli_error($conn) . "\n";
        }
    }
} else {
    echo "No products with quantity equal to 0 found.\n";
}

mysqli_close($conn);
