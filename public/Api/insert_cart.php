<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
include "./conn.php";

// Validate and sanitize user input
$productID = isset($_REQUEST['productID']) ? intval($_REQUEST['productID']) : 0;
$quantity = isset($_REQUEST['quantity']) ? intval($_REQUEST['quantity']) : 0;
$memberEmail = isset($_REQUEST['Email']) ? $_REQUEST['Email'] : '';

// Use prepared statements to prevent SQL injection
$sql = "INSERT INTO `carts` (`odStatusID`, `ProductID`, `qty`, `Email`) VALUES (103, ?, ?, ?)";

// Initialize the response array
$response = ['status' => 'error', 'message' => ''];

$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    // Bind parameters
    mysqli_stmt_bind_param($stmt, 'iis', $productID, $quantity, $memberEmail);

    // Execute the statement
    if (mysqli_stmt_execute($stmt)) {
        $response['status'] = 'success';
        $response['message'] = 'Cart item added successfully.';
    } else {
        $response['message'] = 'Error: ' . mysqli_error($conn);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    $response['message'] = 'Error: ' . mysqli_error($conn);
}

// Send the response
echo json_encode($response);

// Close the database connection
mysqli_close($conn);
