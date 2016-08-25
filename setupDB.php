<?php
if(isset($_GET['runFunction']) && function_exists($_GET['runFunction']))
call_user_func($_GET['runFunction']);
include('loginDB.php');
function setupDB(){
	// Connect
	$con = mysql_connect( $db_host, $db_username, $db_password );
	if (!$con)
	  {
	  die('Could not connect: ' . mysql_error());
	  }
	
	// Create table
	mysql_select_db("$db_database", $con);
	$sql = "CREATE TABLE $db_table('ID' int(11) NOT NULL AUTO_INCREMENT, lat varchar(64) NOT NULL, lng varchar(64) NOT NULL,timeAdded varchar(64))";
	
	// Execute query
	mysql_query($sql,$con);
	
	mysql_close($con);
	
	echo "    Database setup program complete";
}
?> 
