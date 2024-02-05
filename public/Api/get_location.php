<?php

include './conn.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the "location" table
$sql = "SELECT * FROM location";
$result = $conn->query($sql);

// Check if there are any results
if ($result->num_rows > 0) {
    // Initialize an array to store locations
    $locations = array();

    // Loop through each row of data
    while ($row = $result->fetch_assoc()) {
        // Add each location to the array
        $location = array(
            'codeLo' => $row['codeLo'],
            'nameLo' => $row['nameLo'],
            'details' => $row['details'],
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
        );
        $locations[] = $location;
    }

    // Convert the array to JSON format
    $json = json_encode($locations);

    // Set the content type header to JSON
    header('Content-Type: application/json');

    // Output the JSON data
    echo $json;
} else {
    echo "0 results";
}

// Close the connection
$conn->close();
