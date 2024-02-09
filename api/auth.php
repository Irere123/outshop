<?php
session_start();

header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

if ($method == "GET") {
    if (isset($_SESSION["user_id"])) {
        $user = $_SESSION["user_id"];
        echo json_encode(array("isAuth" => true));
    } else {
        echo json_encode(array("isAuth" => false));
    }
} else {
    echo json_encode(array("error" => "BAD REQUEST"));
}
