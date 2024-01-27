<?php
include 'conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

// Check if it's a valid PUT request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // It's a preflight request, respond with OK
    http_response_code(200);
    exit();
}

// Check if it's a valid PUT request
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Read the incoming data
    $data = json_decode(file_get_contents("php://input"));

    // Check if it's a valid PUT request
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Read the incoming data
        $data = json_decode(file_get_contents("php://input"));

        if ($data && isset($data->ProductID)) { // Check if data is valid and ProductID is set
            $productID = $data->ProductID;

            // Update the product score in the database
            $updateQuery = "UPDATE products
        SET score = (
            SELECT AVG(vote) AS Average_Score
            FROM comments
            WHERE comments.ProductID = products.ProductID
            GROUP BY ProductID
        )
        WHERE ProductID = ?;
        ";

            $stmt = $conn->prepare($updateQuery);
            $stmt->bind_param("i", $productID); // Use $productID instead of $data->productID

            if ($stmt->execute()) {
                // If update successful, send success response
                http_response_code(200);
                echo json_encode(array("message" => "Product score updated successfully"));
            } else {
                // If update fails, send error response
                http_response_code(500);
                echo json_encode(array("error" => "Error updating product score"));
            }
            $stmt->close();
        } else {
            // If invalid data or missing ProductID, send error response
            http_response_code(400);
            echo json_encode(array("error" => "Invalid data or missing ProductID"));
        }

    } else {
        // If not a PUT request, send error response
        http_response_code(405);
        echo json_encode(array("error" => "Invalid request method"));
    }

} else {
    // If not a PUT request, send error response
    http_response_code(405);
    echo json_encode(array("error" => "Invalid request method"));
}

$conn->close();
