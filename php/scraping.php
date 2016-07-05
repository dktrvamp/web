<?php
$response = array( 'success' => false );
$html = file_get_contents( 'php://input' );
$dom = new domDocument;
$dom->loadHTML($html);
$dom->preserveWhiteSpace = false;
$images = $dom->getElementsByClassName('img');
foreach ($images as $image) {
  echo $image->getAttribute('src');
}
?>
