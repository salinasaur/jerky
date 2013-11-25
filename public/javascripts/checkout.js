$(document).ready(function() {

	
	Stripe.setPublishableKey('pk_test_LdOeswvV3tK7cez7w7ZSv46F');	// Test Sumo Jerky    

	// Billing Validation 
	$('input#number').payment('formatCardNumber');
	$('input#expiration').payment('formatCardExpiry');
	$('input#cvc').payment('formatCardCVC');


	// Stripe Code
	var stripeResponseHandler = function(status, response) {
      var $form = $('#payment-form');
 
      if (response.error) {
        // Show the errors on the form
        console.log(response.error.message);
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
      } else {
        // token contains id, last4, and card type
        var token = response.id;        
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // and re-submit
        	// $form.get(0).submit();  

        // Sending data via ajax instead of resubmit so we don't have to reload page
        $.ajax({
        	url: '/checkout', 
        	type: 'POST', 
        	data: $form.serialize(),
			// Receive response from server and do stuff
			success: function(response) {				
				$('.checkout-container').addClass("thankyou");
				$('#payment-form').html("<h1>Thanks for ordering!</h1><p>Your order is being prepared and will be sent out shortly. Feel free to email us at <a href='mailto:threeleaftea.com@gmail.com'>threeleaftea.com@gmail.com</a> with any changes to your order."); 

			}        	
        });


      }
    };

	$('#payment-form').submit(function(event) {
		// alert('clicked!');
	    var form = $(this);

	    var exp_month = $('input#expiration').payment('cardExpiryVal').month;
	    var exp_year = $('input#expiration').payment('cardExpiryVal').year;

	    console.log(exp_month + ' ' + exp_year);

	    form.append($('<input type="hidden" data-stripe="exp_month" />').val(exp_month));
	    form.append($('<input type="hidden" data-stripe="exp_year" />').val(exp_year));

	    // console.log('form ' + form);

	    // // Disable the submit button to prevent repeated clicks
	    form.find('button').prop('disabled', true);



	    Stripe.card.createToken(form, stripeResponseHandler);

	    // Prevent the form from submitting with the default action
	    return false;
  	});	

  	// Prevent form submission

})
