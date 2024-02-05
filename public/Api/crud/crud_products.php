<?php
header("Content-Type: application/json");

include '../conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle CRUD operations based on HTTP method
$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        // Fetch all products
        $sql = "SELECT * FROM products";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
            echo json_encode($products);
        } else {
            echo json_encode([]);
        }
        break;

    case "POST":
        // Get the maximum ProductID
        $maxProductIDQuery = "SELECT MAX(ProductID) AS maxProductID FROM products";
        $maxProductIDResult = mysqli_query($conn, $maxProductIDQuery);
        $maxProductIDData = mysqli_fetch_assoc($maxProductIDResult);
        $newProductID = $maxProductIDData['maxProductID'] + 1;

        // Create a new product
        $data = json_decode(file_get_contents("php://input"), true);

        $productName = $data["ProductName"];
        $price = $data["Price"];
        $imageURL = $data["ImageURL"];
        $category = $data["Category"];
        $additionalInfo = $data["AdditionalInfo"];
        $quantity = $data["Quantity"];

        // Insert the new product into the database
        $sql = "INSERT INTO products (ProductID, ProductName, Price, ImageURL, Category, AdditionalInfo, Quantity, score) VALUES ('$newProductID', '$productName', $price, '$imageURL', '$category', '$additionalInfo', $quantity, 0)";

        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Product added successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "PUT":
        // Update an existing product
        $data = json_decode(file_get_contents("php://input"), true);

        $productID = $data["ProductID"];
        $productName = $data["ProductName"];
        $price = $data["Price"];
        $imageURL = $data["ImageURL"];
        $category = $data["Category"];
        $additionalInfo = $data["AdditionalInfo"];
        $quantity = $data["Quantity"];

        $sql = "UPDATE products SET ProductName='$productName', Price=$price, ImageURL='$imageURL', Category='$category', AdditionalInfo='$additionalInfo', Quantity=$quantity WHERE ProductID=$productID";
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Product updated successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "DELETE":
        // Delete an existing product
        $data = json_decode(file_get_contents("php://input"), true);

        $productID = $data["ProductID"];

        $sql = "DELETE FROM products WHERE ProductID=$productID";
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Product deleted successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid HTTP method"]);
}

$conn->close();
