// E-Mail Form stuff...
	// Cancel e-mail link action to open form instead
	$('.email').click(function(e){
		e.preventDefault();
		$('.email-modal').addClass('modal-show');

		// Close form
		$('.modal-close').click(function(e){
			e.preventDefault();
			$('.email-modal').removeClass('modal-show');
		});

		// Disable submit button function
		$('.form-button').bind('submit',function(){
			return false;
		});

		// Variables to hold check statuses
		var nameField = false,
			emailField = false,
			messageField = false
		;

		// Handle events when user is entering name
		$('#name').bind({
			change: function(){
				if($(this).val().length >= 3 && !nameField){
					$(this).removeClass('element-middle').removeClass('element-bad').addClass('element-good');
					nameField = true;
				}else if($(this).val().length < 3){
					$(this).removeClass('element-middle').addClass('element-bad');
					nameField = false;
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			},
			focusin: function(){
				// Change CSS visual state as needed
				if(!nameField){
					$(this).addClass('element-middle');
				}
			},
			keyup: function(){
				if($(this).val().length >= 3){
					if($(this).hasClass('element-middle')){
						$(this).removeClass('element-middle').addClass('element-good');
					}else if($(this).hasClass('element-bad')){
						$(this).removeClass('element-bad').addClass('element-good');
					}
					nameField = true;
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			},
			focusout: function(){
				if($(this).val().length >= 3 && !nameField){
					$(this).removeClass('element-middle').removeClass('element-bad').addClass('element-good');
					nameField = true;
				}else if($(this).val().length < 3){
					$(this).removeClass('element-middle').addClass('element-bad');
					nameField = false;
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			}
		});

		// Handle events when user enters e-mail address
		$('#email').bind({
			change: function(){
				if($(this).val().length >= 3 && validate($(this).val()) && !emailField){
					$(this).removeClass('element-middle').removeClass('element-bad').addClass('element-good');
					emailField = true;
				}else if($(this).val().length < 3 || !validate($(this).val())){
					$(this).removeClass('element-middle').addClass('element-bad');
					emailField = false;
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			},
			focusin: function(){
				// Change CSS visual state as needed
				if(!emailField){
					$(this).addClass('element-middle');
				}
			},
			keyup: function(){
				if($(this).val().length >= 3){
					if(validate($(this).val())){
						if($(this).hasClass('element-middle')){
							$(this).removeClass('element-middle').addClass('element-good');
						}else if($(this).hasClass('element-bad')){
							$(this).removeClass('element-bad').addClass('element-good');
						}
						emailField = true;
					}else{
						if($(this).hasClass('element-middle')){
							$(this).removeClass('element-middle').addClass('element-bad');
						}else if($(this).hasClass('element-good')){
							$(this).removeClass('element-good').addClass('element-bad');
						}
						emailField = false;
					}
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			},
			focusout: function(){
				if($(this).val().length >= 3 && validate($(this).val()) && !emailField){
					$(this).removeClass('element-middle').removeClass('element-bad').addClass('element-good');
					emailField = true;
				}else if($(this).val().length < 3 || !validate($(this).val())){
					$(this).removeClass('element-middle').addClass('element-bad');
					emailField = false;
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			}
		});

		// Handle events when user is entering the message
		$('#message').bind({
			focusin: function(){
				// Change CSS visual state as needed
				if(!emailField){
					$(this).addClass('element-middle');
				}
			},
			keyup: function(){
				if($(this).val().length >= 3){
					if($(this).hasClass('element-middle')){
						$(this).removeClass('element-middle').addClass('element-good');
					}else if($(this).hasClass('element-bad')){
						$(this).removeClass('element-bad').addClass('element-good');
					}
					messageField = true;
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			},
			focusout: function(){
				if($(this).val().length >= 3 && !messageField){
					messageField = true;
				}else if($(this).val().length < 3){
					$(this).removeClass('element-middle').addClass('element-bad');
					messageField = false;
				}
				if(nameField && emailField && messageField){
					$('.form-button').addClass('button-good');
				}
			}
		});

		$('.form-button').click(function(){
			if(nameField && emailField && messageField){
				var modal = $('.modal-form fieldset');
				modal.hide();
				modal.siblings('h3').text('Sending E-Mail Now');
				modal.siblings('p').text('I\'m sending the email right now!');
				modal.siblings('.sending').show();

				var dataString = 'name='+$('#name').val()+'&email='+$('#email').val()+'&message='+$('#message').val();

				$.ajax({
					type: 'POST',
					url: 'script/email.php',
					data: dataString,
					cache: false,
					success: function(){
						modal.siblings('.sending').hide();
						modal.siblings('h3').text('Success!');
						modal.siblings('p').text('The email was sent successfully!');
						modal.siblings('.success').show();
					},
					error: function(){
						modal.siblings('.sending').hide();
						modal.siblings('h3').text('Error!');
						modal.siblings('p').text('There was a problem, try again later.');
						modal.siblings('.error').show();
					}
				});
			}
		});
	});

	function validate($test){
		if(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.exec($test)){
			return true;
		} else {
			return false;
		}
	}