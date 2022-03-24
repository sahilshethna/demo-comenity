<?php
$file = $_GET['file'];

if($data = file_get_contents($file.'.json')){
	echo $data;
}

?>