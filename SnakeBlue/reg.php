<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "provider";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$login = $_POST["login"];
$email = $_POST["e-mail"];
$password = $_POST["password"];
$confirm_password = $_POST["confirm_password"];

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

if ($password !== $confirm_password) {
    echo "Passwords do not match";
    exit();
  }

// Check if login already exists
$sql = "SELECT * FROM users WHERE login = '$login'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    echo "Login already exists";
    exit();
}

// Check if email already exists
$sql = "SELECT * FROM users WHERE `e-mail` = '$email'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    echo "Email already exists";
    exit();
}

$sql = "INSERT INTO users (`login`, `password`, `e-mail`, `user_type`)
VALUES ('$login', '$hashed_password', '$email', 'client')";

if ($conn->query($sql) === TRUE) {
  header('Location: Page1.html');
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>