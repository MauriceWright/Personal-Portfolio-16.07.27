<?
	function getLastFm()
	{
		// Search and return caching file, okay if not found
		$filename = dirname(__FILE__).'/data/lastfm.json';

		// Check and cache data if needed, create file if needed too
		cache_lastfm_api($filename);

		// return and decode JSON data from cached file
		$data = file_get_contents($filename);
		return json_decode($data);
	}

	function cache_lastfm_api($filename)
	{
		// Check if file already exists
		if (file_exists($filename))
		{
			// Compare last caching time, if more than 5 minutes, pull new data from LastFM API
			if (filemtime($filename) < (time() - 5*60))
			{
				$file = fopen($filename, 'w');

				// Clean up API and get only what we need
				$json = organizeLastfm(lastfm_api_request());

				fwrite($file, json_encode($json));
				fclose($file);
			}
		}
		else
		{
			$file = fopen($filename, 'c');

			// Clean up API and get only what we need
			$json = organizeLastfm(lastfm_api_request());

			fwrite($file, json_encode($json));
			fclose($file);
		}
	}

	function lastfm_api_request()
	{
		// Like I'm going to share my key with you?
		require_once('/data/key.php');
		$key = FM_KEY;

		// Get API request
		$json = file_get_contents('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=ki4pzs&api_key='.$key.'&format=json&limit=12');

    // Return results
    return json_decode($json);
	}

	function organizeLastfm($json)
	{
		// Check API status, if error, return error data
		if ($json->{'error'})
		{
			$newJson = array('status'=>FALSE,array('code'=>$json->{'error'},'desc'=>$json->{'message'}));
			return $newJson;
		}
		else
		{
			// If status is good, add in pull time for extra check against excessive pulls
			$newJson = array('status'=>TRUE,'pulled'=>date('M-d-Y|H:i:sT'));

			// The fun part, breaking down the returned JSON data from API
			$sets = $json->{"recenttracks"}->{"track"};

			// Array to store all songs
			$songs = array();

			// Array to store data for each song
			$song = array();

			foreach ($sets as $set)
			{
				$song['title'] = $set->{'name'};
				$song['url'] = $set->{'url'};
				$song['artist'] = $set->{'artist'}->{'#text'};
				$song['image-sm'] = $set->{'image'}[1]->{'#text'};
				$song['image-md'] = $set->{'image'}[2]->{'#text'};
				$song['image-lg'] = $set->{'image'}[3]->{'#text'};

				array_push($songs,$song);
			}

			array_push($newJson,$songs);

			// Done! now return the golden data
			return $newJson;
		}
	}

	// echo '<pre>'; var_dump($feed->{'recenttracks'}->{'track'}[0]->{'image'}[3]->{'#text'}); echo '</pre>';

	echo '<pre>'; var_dump(organizeLastfm($feed)); echo '</pre>';
?>