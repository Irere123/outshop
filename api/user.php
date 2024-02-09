<?php
require __DIR__ . "/database.php";
session_start();

header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
    if (isset($_SESSION["user_id"])) {
        $user_id = $_SESSION["user_id"];
        $res = $mysqli->query("SELECT * FROM users WHERE id=$user_id");
        $row = $res->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(array("error" => "Not found"));
    }
} else {
    echo json_encode(array("error" => "BAD REQUEST"));
}
