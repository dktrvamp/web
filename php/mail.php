<?php
print 'sending the email';
$array = json_decode(file_get_contents('php://input'), true);
$name = $array['name'];
$email = $array['email'];
$message = $array['message'];
$to = "drvaudio@gmail.com";

if (($name=="")||($email=="")||($message=="")) {
    printf("0");
}
else{
    $from="From: $name<$email>\r\nReturn-path: $email";
    $subject="Message sent using your contact form";
    mail($to, $subject, $message, $from);
    print '$array';
    header('Content-Type: application/json');
    var_dump($input);
}
?>
