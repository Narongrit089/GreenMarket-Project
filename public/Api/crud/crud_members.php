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
        // Fetch all members
        $sql = "SELECT * FROM members";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $members = [];
            while ($row = $result->fetch_assoc()) {
                $members[] = $row;
            }
            echo json_encode($members);
        } else {
            echo json_encode([]);
        }
        break;

    case "POST":

        $maxMemberIDQuery = "SELECT MAX(MemberID) AS maxMemberID FROM members";
        $maxMemberIDResult = mysqli_query($conn, $maxMemberIDQuery);
        $maxMemberIDData = mysqli_fetch_assoc($maxMemberIDResult);
        $newMemberID = $maxMemberIDData['maxMemberID'] + 1;
        // Create a new member
        $data = json_decode(file_get_contents("php://input"), true);

        $firstName = $data["firstName"];
        $lastName = $data["lastName"];
        $address = $data["address"];
        $phoneNumber = $data["phoneNumber"];
        $email = $data["email"];
        $password = $data["password"];

        $sql = "INSERT INTO members (MemberID, FirstName, LastName, Address, PhoneNumber, Email, Password) VALUES ('$newMemberID','$firstName', '$lastName', '$address', '$phoneNumber', '$email', '$password')";

        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Member added successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "PUT":
        // Update an existing member
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data["id"];
        $name = $data["name"];
        $email = $data["email"];

        $sql = "UPDATE members SET name='$name', email='$email' WHERE id=$id";
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Member updated successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case "DELETE":
        // Delete an existing member
        $data = json_decode(file_get_contents("php://input"), true);

        $id = $data["id"];

        $sql = "DELETE FROM members WHERE MemberID=$id";
        if ($conn->query($sql) === true) {
            echo json_encode(["message" => "Member deleted successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid HTTP method"]);
}

$conn->close();
