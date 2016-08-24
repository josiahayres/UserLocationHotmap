<?php
include('loginDB.php');

// Connect
$con = mysql_connect( $db_host, $db_username, $db_password );
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

// Create table
mysql_select_db("$db_database", $con);
$sql = "CREATE TABLE $db_table('ID' int(11) NOT NULL AUTO_INCREMENT,location varchar(128),timeAdded varchar(64))";

// Execute query
mysql_query($sql,$con);

mysql_close($con);

echo "    Database setup program complete";
?> 
