<?php

include 'conn.php';

header('Content-Type: application/json');

// ดำเนินการ CRUD ของ products ต่อไปนี้

// 1. ดึงข้อมูลทั้งหมดจากตาราง products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM products");
    $products = array();
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
}

// 2. เพิ่มข้อมูลใหม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $productname = $data['ProductName'];
    $price = $data['Price'];
    $imageurl = $data['ImageURL'];
    $category = $data['Category'];
    $additionalinfo = $data['AdditionalInfo'];

    $sql = "INSERT INTO products (ProductName, Price, ImageURL, Category, AdditionalInfo)
            VALUES ('$productname', $price, '$imageurl', '$category', '$additionalinfo')";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Product added successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

// 3. อัปเดตข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $productid = $data['ProductID'];
    $productname = $data['ProductName'];
    $price = $data['Price'];
    $imageurl = $data['ImageURL'];
    $category = $data['Category'];
    $additionalinfo = $data['AdditionalInfo'];

    $sql = "UPDATE products
            SET ProductName='$productname', Price=$price, ImageURL='$imageurl',
            Category='$category', AdditionalInfo='$additionalinfo'
            WHERE ProductID=$productid";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Product updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating record: " . $conn->error));
    }
}

// 4. ลบข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $productid = $data['ProductID'];

    $sql = "DELETE FROM products WHERE ProductID=$productid";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Product deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error deleting record: " . $conn->error));
    }
}

$conn->close();
