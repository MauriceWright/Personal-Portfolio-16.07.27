$(document).ready(function(){

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

	// E-Mail Form stuff...
	// Cancel e-mail link action to open form instead
	$('.email').click(function(e){
		e.preventDefault();
		$('.email-modal').addClass('modal-show');
	});

	// Function only if form is open
	if($('.email-modal').hasClass('modal-show')){

		// Close form
		$('.modal-close').click(function(e){
			e.preventDefault();
			$('.email-modal').removeClass('modal-show');
		});
	}
});