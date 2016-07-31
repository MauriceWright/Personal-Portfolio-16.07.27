<?
	$name = $_POST['name'];
	$email = $_POST['email'];
	$say = $_POST['message'];

	$message = 'You recieved the following from '.$name.' <'.$email.'>\r\n';
	$message .= $say;

	if($_SERVER['HTTP_HOST'] !== 'localhost:8888'){
		mail('me@mauricewright.info','New Portfolio Message');
	}
	else{
		error_log('E-mail sent effective');
	}

	echo 'All good!';
?>