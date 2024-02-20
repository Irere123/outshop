<?php
session_start();
require __DIR__ . "/database.php";


header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];


switch ($method) {
    case "POST":
        parse_str(file_get_contents("php://input"), $_POST);
        $username = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $user = $mysqli->query("SELECT * FROM users WHERE username='$username'");


        if ($user->num_rows > 0) {
            echo json_encode(array("error" => "user with that name already exists"));
        } else {
            $result = $mysqli->query("INSERT INTO users(username, password, email) values ('$username', '$hash', '$email')");
            echo json_encode(array("status" => "success"));
        }
        break;
    default:
        echo json_encode("Bad request");
        break;
}


$mysqli->close();