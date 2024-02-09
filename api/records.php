<?php
session_start();
require __DIR__ . "/database.php";

header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $user_id = $_SESSION["user_id"];
        $results = $mysqli->query("SELECT * FROM records WHERE user_id=$user_id");
        $records = array();
        while ($row = $results->fetch_assoc()) {
            $records[] = $row;
        }

        echo json_encode($records);
        break;
    case "POST":
        parse_str(file_get_contents("php://input"), $_POST);
        $title = $_POST["title"];
        $description = $_POST["description"];
        $product_name = $_POST["product_name"];

        $user_id = $_SESSION["user_id"];

        $mysqli->query("INSERT INTO records(title, description, product_name, user_id) values ('$title', '$description', '$product_name', $user_id)");

        echo json_encode(array("status" => "success"));
        break;
    case "PUT":
        parse_str(file_get_contents(""), $_PUT);
        $id = $_PUT["id"];
        $title = $_POST["title"];
        $description = $_POST["description"];
        $product_name = $_POST["product_name"];

        $mysqli->query("UPDATE records SET title='$title', description='$description', product_name='$product_name' WHERE id=$id;");

        echo json_encode(array("status" => "success"));

        break;
    default:
        echo json_encode(array("status" => "error"));
        break;
}

$mysqli->close();