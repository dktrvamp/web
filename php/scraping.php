<?php
$response = array( 'success' => false );
$sentdata = file_get_contents( 'php://input' );
$data = json_decode( $sentdata );
$url = $sentdata->url;
$html = file_get_contents( $url );

$dom = new domDocument;
$dom->loadHTML($html);
$dom->preserveWhiteSpace = false;
$images = $dom->getElementsByClassName('img');
foreach ($images as $image) {
  echo $image->getAttribute('src');
}

?>
