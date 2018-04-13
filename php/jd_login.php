<?php
	$uname = $_REQUEST['uname'] or die("-1");
	$upwd = $_REQUEST['upwd'] or die("-2");
	require('init.php');
	$sql = "SELECT * FROM jd_user WHERE uname='$uname' AND upwd='$upwd'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	if ($row===NULL){
		echo "-3";
	}else{
		echo "$row[uid]";
	}
?>