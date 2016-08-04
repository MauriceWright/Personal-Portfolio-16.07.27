$(document).ready(function(){
	var $win=$(window);

	// Top navigation menu toggle
	$('.menu-icon').click(function(){
		if($('.header-cont').hasClass('show-nav')){

			// if navigation is visible...
			$('.intro').animate({'padding-top': '70px' }, 'fast');
			$('.header-nav').animate({
				'border-top': 'none',
				'margin-top': '-5px',
				height: 0
			}, 'fast', function(){
				$('.nav-icon svg').css({
					fill: 'rgb(34, 34, 34)',
				});
				$('.menu-icon svg:nth-child(1)').show();
				$('.menu-icon svg:nth-child(2)').hide();
			});
		}else{

			// if navigation is hidden...
			$('.intro').animate({'padding-top': 0 }, 'fast');
			$('.header-nav').animate({
				'border-top': '1px dotted #6d6f79',
				'margin-top': 0,
				height: '70px'
			}, 'fast', function(){
				$('.nav-icon svg').css({
					fill: 'rgb(35, 196, 83)',
					transition: '1.0s'
				});
				$('.menu-icon svg:nth-child(2)').show();
				$('.menu-icon svg:nth-child(1)').hide();
			});
		}
		$('.header-cont').toggleClass('show-nav');
	});

	if($('.page-wrap').hasClass('projects-wrap')){
		check_articles($('.projects-wrap'));

		$win.resize(function(){
			check_articles($('.projects-wrap'));
		});
	}

	if($('.page-wrap').hasClass('thoughts-wrap')){
		check_articles($('.thoughts-wrap'));

		$win.resize(function(){
			check_articles($('.thoughts-wrap'));
		});
	}

	if(!$('footer').hasClass('footer-home')){
		var $w=$win.height(),
			$c=$('body').height();

		if($w >= $c){
			$('footer').css('position','absolute');
		}
	}

	function get_viewport() {
		return $win.width();
	}

	function check_articles($elm) {
		// Remove any invisible elements
		$('.invisible').remove();

		// Get number of articles and viewport width
		var $c=$('article').length,
			$n=get_viewport(),
			$s=$elm.children('article').last()
		;

		if (639 < $n && $n < 800){
			if(($c % 2) !== 0){
				for (var b = (2 - ($c % 2)) - 1; b >= 0; b--) {
					$s.after('<article class="project invisible"></article>');
				}
			}
		}else if(799 < $n){
			if(($c % 3) !== 0){
				for (var d = (3 - ($c % 3)) - 1; d >= 0; d--) {
					$s.after('<article class="project invisible"></article>');
				}
			}
		}
	}
});