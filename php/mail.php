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
if (mail($to, $subject, $message, $from)){
    $from="From: $name<$email>\r\nReturn-path: $email";
    $subject="Message sent using your contact form";
    echo '$from';
    echo '$name';
    echo '$email';
}
else {
    print 'email failed';
}
?>
