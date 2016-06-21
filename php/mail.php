<?php
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

/*
===================== perform check if any field in form is empty
 */
if(empty($name) || empty($email) || empty($message) || empty($subject)){
    echo "Kindly fill all the fileds";
    die();
}
// change the following statement according to your need.
$to = "drvaudio@gmail.com";

if(mail($to, $subject, $message)){
    echo "Message Sent!";
}
else {
    echo "Failed!";
}
?>
