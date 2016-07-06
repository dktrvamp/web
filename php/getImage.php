<?php

// $postdata = file_get_contents('php://input');
$array = json_decode(file_get_contents('php://input'), true);
$url = $array['url'];

// // Get the Website contents.
$html = file_get_contents($url);
echo $html;
// $dom = new DOMDocument();
// $dom->loadHTML($html);
// $dom->preserveWhiteSpace = false;
// $images = $dom->getElementsByTagName('img');


// foreach ($images as $image) {
// $image_class = $image->getAttribute('class');
// if (strpos($image_class, 'attachment-cb-full-full') !== false) {
//     echo  $image->getAttribute('src');
// }
// }
// echo $images;
?>
