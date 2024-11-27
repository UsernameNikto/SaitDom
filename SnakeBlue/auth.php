<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "provider";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: ". $conn->connect_error);
}

$login = $_POST["login"];
$password = $_POST["password"];

// Query to retrieve the user's hashed password from the database
$sql = "SELECT `password` FROM `users` WHERE `login` = '$login'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $hashed_password = $row["password"];

  // Verify the password using password_verify()
  if (password_verify($password, $hashed_password)) {
    // Password is correct, authenticate the user
    session_start();
    $_SESSION["login"] = $login;
    header('Location: PageUser0.html');
    exit();
  } else {
    echo "Invalid password";
  }
} else {
  echo "User not found";
}

$conn->close();
?>