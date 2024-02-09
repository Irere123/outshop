<?php
session_start();
require __DIR__ . "/database.php";

header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $user_id = $_SESSION["user_id"];
        $results = $mysqli->query("SELECT * FROM inventory WHERE user_id=$user_id");
        $items = array();
        while ($row = $results->fetch_assoc()) {
            $items[] = $row;
        }

        echo json_encode($items);
        break;
    case "POST":
        parse_str(file_get_contents("php://input"), $_POST);
        $item = $_POST["item"];
        $category = $_POST["category"];
        $quantity = $_POST["quantity"];
        $price = $_POST["price"];
        $user_id = $_SESSION["user_id"];

        $mysqli->query("INSERT INTO inventory(item, category, quantity, price, user_id) values ('$item', '$category', '$quantity', '$price', $user_id)");

        echo json_encode(array("status" => "success"));
        break;
    case "PUT":
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT["id"];
        $item = $_PUT["item"];
        $category = $_PUT["category"];
        $quantity = $_PUT["quantity"];
        $price = $_PUT["price"];

        $mysqli->query("UPDATE inventory SET item='$item', category='$category', quantity='$quantity', price='$price' WHERE id=$id;");

        echo json_encode(array("status" => "success"));

        break;
    case "DELETE":
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE["id"];

        $mysqli->query("DELETE FROM inventory WHERE id=$id");

        echo json_encode(array("status" => "success"));

        break;
    default:
        echo json_encode(array("status" => "error"));
        break;
}

$mysqli->close();