<?php
// Establish a connection to the MySQL database
$servername = "localhost";
$username = "root";  // Use your database username
$password = "root";  // Use your database password
$dbname = "pentesterlabs";  // Name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize and validate the form inputs
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$comment = filter_input(INPUT_POST, 'comment', FILTER_SANITIZE_STRING);

if ($name && $email && $comment) {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, comment) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $comment);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
        // Optionally redirect to a thank-you page or display a success message
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
} else {
    echo "Please fill in all required fields correctly.";
}

$conn->close();
?>
