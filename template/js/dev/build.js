$(document).ready(function(){
	// Top navigation menu toggle
	var button = $('.menu-icon'),
		navigation = button.siblings('nav');

	button.click(function(){
		if(navigation.is(":visible")){
			navigation.hide(400,function(){
				button.children('svg:last-child').hide();
				button.children('svg:first-child').show();
			});
		}else{
			navigation.show(400,function(){
				button.children('svg:first-child').hide();
				button.children('svg:last-child').show();
			});
		}
	});
});