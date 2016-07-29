<?
	function getLastFm() // Get and write cache JSON data
	{
		// File path
		$file = dirname(__FILE__).'/data/lastfm.json';

		// Time management
		$currentTime = time();
		$expireTime = 0.25 * 60 * 60; // H * 60 * 60

		// If the file exists, get time of last write
		if(file_exists($file)) { $fileTime = filemtime($file); }

		// If file exists and is recent, return data
		if(file_exists($file) && ($currentTime - $expireTime < $fileTime)) {
			return file_get_contents($file);
		}

		// If file does not exist or is not recent
		else {
			// Get new data from API
			$json = organizeLastfm(lastfm_api_request());

			// If there are any errors, send message and exit
			if(isset($json->{'error'}) && ($_SERVER['HTTP_HOST'] !== 'localhost:8888')) {
				// Send me error message via email
				$message = 'The following error was returned:\r\n\r\nCode\r\n'.$json->{'code'}.'\r\n\r\nDescription\r\n'.$json->{'desc'};
				mail('me@mauricewright.info', 'LastFM API Failure', $message);
			}
			elseif(isset($json->{'error'}) && ($_SERVER['HTTP_HOST'] === 'localhost:8888')){
				// Send error to PHP log file
				error_log('Error! Could not get Last FM API to function properly! CODE:'.$json->{'code'}.' MESSAGE:'.addslashes($json->{'desc'}),0);
			}
			else {
				// Write JSON data to file
				file_put_contents($file, json_encode($json));

				// Return JSON data for use
				return json_encode($json);
			}
		}
	}

	function lastfm_api_request() // Get recent JSON data from Last FM
	{
		// Like I'm going to share my key with you?
		require_once(dirname(__FILE__).'/data/key.php');
		$key = FM_KEY;

		// Request API data
		$json = file_get_contents('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=ki4pzs&api_key='.$key.'&format=json&limit=11');

	    // Return results
	    if(!$json) { // If data is not in JSON format, send custom error
	    	return json_decode(file_get_contents(dirname(__FILE__).'/data/lastfmerror.json'));
	    }
	    else { // If data is in JSON format, send data
	    	return json_decode($json);
	    }
	}

	function organizeLastfm($json) // Make it look pretty
	{
		if(isset($json->{'error'})){ // If there were any errors, return data
			return $json;
		}
		else { // If no errors, organize data I want
			// Start with date and time pulled
			date_default_timezone_set('America/New_York'); // Set to EST
			$newJson = array('status'=>TRUE,'time'=>date('M-d-Y|H:i:sT'));

			// Grab the data I want to organize
			$data = $json->{'recenttracks'}->{'track'};

			$track = array(); // Array for individual track data
			$tracks = array(); // Array to hold all tracks

			// Breakdown the data for organization
			foreach ($data as $set){
				// Grab url to Last FM page
				$track['url'] = $set->{'url'};

				// Grab track information
				$track['title'] = $set->{'name'};
				$track['artist'] = $set->{'artist'}->{'#text'};

				// Grab image url's
				$track['image-sm'] = $set->{'image'}[1]->{'#text'};
				$track['image-md'] = $set->{'image'}[2]->{'#text'};
				$track['image-lg'] = $set->{'image'}[3]->{'#text'};

				// Push track data into tracks array
				array_push($tracks, $track);
			}

			// Wrap it all together
			$newJson['tracks'] = $tracks;


			// Return organized data
			return $newJson;
		}
	}
?>