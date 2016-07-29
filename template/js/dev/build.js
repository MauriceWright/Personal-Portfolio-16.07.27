$(document).ready(function(){

	// Top navigation menu toggle
	$('.menu-icon').click(function(){
		if($('.header-cont').hasClass('show-nav')){

			// if navigation is visible...
			$('.header-cont').animate({
				top: '-63px'
			}, 'fast', function(){
				$('.nav-icon svg').css({
					fill: 'rgb(34, 34, 34)',
				});
				$('.menu-icon svg:nth-child(1)').show();
				$('.menu-icon svg:nth-child(2)').hide();
			});
		}else{

			// if navigation is hidden...
			$('.header-cont').animate({
				top: 0
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
});