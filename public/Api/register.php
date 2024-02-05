<?php
header('Access-Control-Allow-Origin: *');
include "./conn.php";

// ค้นหาค่าสูงสุดของ MemberID จากตาราง members
$maxMemberIDQuery = "SELECT MAX(MemberID) AS maxMemberID FROM members";
$maxMemberIDResult = mysqli_query($conn, $maxMemberIDQuery);
$maxMemberIDData = mysqli_fetch_assoc($maxMemberIDResult);
$newMemberID = $maxMemberIDData['maxMemberID'] + 1;

// รับค่าจากแบบฟอร์มที่ส่งมา
$FirstName = isset($_REQUEST['FirstName']) ? $_REQUEST['FirstName'] : '';
$LastName = isset($_REQUEST['LastName']) ? $_REQUEST['LastName'] : '';
$Address = isset($_REQUEST['Address']) ? $_REQUEST['Address'] : '';
$PhoneNumber = isset($_REQUEST['PhoneNumber']) ? $_REQUEST['PhoneNumber'] : '';
$Email = isset($_REQUEST['Email']) ? $_REQUEST['Email'] : '';
$Password = isset($_REQUEST['Password']) ? $_REQUEST['Password'] : '';

// เขียนคำสั่ง SQL เพื่อเพิ่มข้อมูลลงในตาราง
$sql = "INSERT INTO `members` (`MemberID`, `FirstName`, `LastName`, `Address`, `PhoneNumber`, `Email`, `Password`, `access_rights`)
        VALUES ('$newMemberID', '$FirstName', '$LastName', '$Address', '$PhoneNumber', '$Email', '$Password', 0)";

if (mysqli_query($conn, $sql)) {
    // ส่งรหัสสถานะ 200 (OK)
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Member added successfully.']);
} else {
    // ส่งรหัสสถานะ 500 (Internal Server Error) หากมีข้อผิดพลาดในการเพิ่มข้อมูล
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $sql . '<br>' . mysqli_error($conn)]);
}

// ปิดการเชื่อมต่อกับฐานข้อมูล
mysqli_close($conn);
