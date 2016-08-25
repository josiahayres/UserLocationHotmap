<?php
include('db_login.php');
include('db.php');

$lat = isset($_POST['lat']) ? $_POST['lat'] : null;
$lng = isset($_POST['lng']) ? $_POST['lng'] : null;

echo '<script>myfunction()</script>';
?>