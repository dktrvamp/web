<?php
print 'sending the email';
$array = json_decode(file_get_contents('php://input'));
$name = $array['name'];
$email = $array['email'];
$message = $array['message'];

echo "Name:" .$name. "Email:" .$email. "Message:" .$message. "End";
?>
