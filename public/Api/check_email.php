<?php
include 'conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Access-Control-Allow-Origin: *");

    // Get email parameter from the query string
    $email = mysqli_real_escape_string($conn, $_GET['email']);

    // Use prepared statement to prevent SQL injection
    $stmt = mysqli_prepare($conn, "SELECT COUNT(*) AS emailCount FROM members WHERE Email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        // Fetch the count of emails
        $row = mysqli_fetch_assoc($result);
        $emailCount = (int) $row['emailCount'];

        // Send a JSON response indicating whether the email is taken
        echo json_encode(array("isEmailTaken" => $emailCount > 0));
    } else {
        // Send error response code
        http_response_code(500);
        echo json_encode(array("message" => "Internal Server Error"));
    }

    // Close prepared statement
    mysqli_stmt_close($stmt);

    // Close database connection
    mysqli_close($conn);
} else {
    // Invalid request method
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Invalid Request Method"));
}
