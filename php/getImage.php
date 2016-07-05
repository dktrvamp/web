<?php
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
$url = $request->url;
$url = is_string($url) ? $url : '';

// Get the Website contents.
$html = file_get_contents($url);
$dom = new domDocument;
$dom->loadHTML($html);
$dom->preserveWhiteSpace = false;
$images = $dom->getElementsByTagName('img');

foreach ($images as $image) {
$image_class = $image->getAttribute('class');
echo '{' .'class:' .$image->getAttribute('class') .', src:' .$image->getAttribute('src') .'}';

}
echo $images;
?>
