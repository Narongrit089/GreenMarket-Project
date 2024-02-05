<?php
// Include database connection file
include 'conn.php';

// Set headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:5173");

// Check if request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if username is provided in the query string
    if (isset($_GET['username'])) {
        // Sanitize the input
        $username = mysqli_real_escape_string($conn, $_GET['username']);

        // Query to fetch orders for the provided username
        $sql = "SELECT `order`.`orderNo`,os.odStatusName,`order`.`Netprice`,mb.FirstName,mb.LastName,mb.Address,mb.PhoneNumber
            FROM `order`
            JOIN orderstatus os USING (odStatusID)
            JOIN members mb USING (Email)
            WHERE `order`.`Email` = '$username' AND `order`.`odStatusID` = 103";

        // Perform the query
        $result = mysqli_query($conn, $sql);

        // Check if there are any orders
        if ($result) {
            // Initialize an empty array to store orders
            $orders = [];

            // Fetch and add each order to the array
            while ($row = mysqli_fetch_assoc($result)) {
                $orders[] = $row;
            }

            // Return the orders as JSON
            echo json_encode($orders);
        } else {
            // Error in query execution
            echo json_encode(['message' => 'Error fetching orders']);
        }
    } else {
        // Username not provided in the query string
        echo json_encode(['message' => 'Username is required']);
    }
} else {
    // Invalid request method
    echo json_encode(['message' => 'Invalid request method']);
}

// Close database connection
mysqli_close($conn);
