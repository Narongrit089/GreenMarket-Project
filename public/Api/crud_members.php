
<?php

header('Content-Type: application/json');
include './conn.php';

// ส่งข้อมูลทั้งหมด
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM members");
    $members = array();
    while ($row = $result->fetch_assoc()) {
        $members[] = $row;
    }
    echo json_encode($members);
}

// เพิ่มข้อมูลใหม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $firstName = isset($_REQUEST['FirstName']) ? $_REQUEST['FirstName'] : '';
    $lastName = isset($_REQUEST['LastName']) ? $_REQUEST['LastName'] : '';
    $address = isset($_REQUEST['Address']) ? $_REQUEST['Address'] : '';
    $phoneNumber = isset($_REQUEST['PhoneNumber']) ? $_REQUEST['PhoneNumber'] : '';
    $email = isset($_REQUEST['Email']) ? $_REQUEST['Email'] : '';
    $password = isset($_REQUEST['Password']) ? $_REQUEST['Password'] : '';

    $sql = "INSERT INTO `members` (`FirstName`, `LastName`, `Address`, `PhoneNumber`, `Email`, `Password`)
        VALUES ('$firstName', '$lastName', '$address', '$phoneNumber', '$email', '$password')";

    if (mysqli_query($conn, $sql)) {
        // ส่งรหัสสถานะ 200 (OK)
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Member added successfully.']);
    } else {
        // ส่งรหัสสถานะ 500 (Internal Server Error) หากมีข้อผิดพลาดในการเพิ่มข้อมูล
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Error: ' . $sql . '<br>' . mysqli_error($conn)]);
    }

}

// อัปเดตข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $memberid = $data['MemberID'];
    $firstname = $data['FirstName'];
    $lastname = $data['LastName'];
    $address = $data['Address'];
    $phonenumber = $data['PhoneNumber'];
    $email = $data['Email'];
    $password = $data['Password'];

    $sql = "UPDATE members
            SET FirstName='$firstname', LastName='$lastname', Address='$address',
            PhoneNumber='$phonenumber', Email='$email', Password='$password'
            WHERE MemberID='$memberid'";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Member updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating record: " . $conn->error));
    }
}

// ลบข้อมูล
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $memberid = $data['MemberID'];

    $sql = "DELETE FROM members WHERE MemberID='$memberid'";

    if ($conn->query($sql) === true) {
        echo json_encode(array("message" => "Member deleted successfully"));
    } else {
        echo json_encode(array("error" => "Error deleting record: " . $conn->error));
    }
}

// ปิดการเชื่อมต่อ
$conn->close();

?>
