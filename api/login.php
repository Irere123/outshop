<?php
require __DIR__ . "/database.php";


header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "POST":
        parse_str(file_get_contents("php://input"), $_POST);
        $username = $_POST["username"];
        $password = $_POST["password"];
        $user_fetch = $mysqli->query("SELECT * FROM users WHERE username='$username'");
        $user = $user_fetch->fetch_assoc();

        if ($user_fetch->num_rows > 0) {
            if (password_verify($password, $user["password"])) {
                session_start();
                session_regenerate_id();
                $_SESSION["user_id"] = $user["id"];
                echo json_encode(array("status" => "success"));
            } else {
                echo json_encode(array("error" => "invalid credentials"));
            }
        } else {
            echo json_encode(array("error" => "Invalid credentials"));
        }

        break;
    default:
        echo json_encode("Bad request");
        break;
}


$mysqli->close();