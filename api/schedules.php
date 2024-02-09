<?php
session_start();
require __DIR__ . "/database.php";

header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $user_id = $_SESSION["user_id"];
        $results = $mysqli->query("SELECT * FROM schedules WHERE user_id=$user_id");
        $records = array();
        while ($row = $results->fetch_assoc()) {
            $records[] = $row;
        }

        echo json_encode($records);
        break;
    case "POST":
        parse_str(file_get_contents("php://input"), $_POST);
        $event_name = $_POST["event_name"];
        $created_at = $_POST["created_at"];

        $user_id = $_SESSION["user_id"];

        $mysqli->query("INSERT INTO schedules(event_name, created_at, user_id) values ('$event_name', '$created_at', $user_id)");

        echo json_encode(array("status" => "success"));
        break;
    case "PUT":
        parse_str(file_get_contents(""), $_PUT);
        $id = $_PUT["id"];
        $event_name = $_POST["event_name"];
        $created_at = $_POST["created_at"];

        $mysqli->query("UPDATE records SET event_name='$title', created_at='$created_at' WHERE id=$id;");

        echo json_encode(array("status" => "success"));

        break;
    default:
        echo json_encode(array("status" => "error"));
        break;
}

$mysqli->close();