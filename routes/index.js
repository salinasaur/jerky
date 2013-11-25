// Stripe - Secret api_key
var api_key = 'sk_test_Cf3hgrroeBFArZ61tjcLxkoj'; //Sumo Jerky


var stripe = require('stripe')(api_key);

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Sumo Jerky - Monthly Jerky Delivery Service' });
};

exports.subscriptions = function(req, res){
  res.render('subscriptions', { title: 'Sumo Jerky - Monthly Jerky Delivery Service' });
};

exports.checkout = function(req, res){
  res.render('checkout', { title: 'Sumo Jerky - Monthly Jerky Delivery Service' });
};

exports.payment = function(req, res) {
	var fullAddress = req.body.address + " " + req.body.city + " " + req.body.state + " " + req.body.zip;
	var description = req.body.name + ": " + fullAddress;

	var accountBalance = 0;		// Set account balance chosen customer package	

	//Create a Customer   
	stripe.customers.create(
		{
			card : req.body.stripeToken,	 
			email : req.body.email,
			description : description,
			account_balance: accountBalance
		}, function(err, customer) {
			if (err) {
				console.log(err.message);
				return;
			}
				stripe.customers.update(customer.id, {
					plan: 'Monthly Jerky Subscription'
				}, function(err) {
					if (err) {
						console.log(err.message);
						return;		
					};
				}
				);
			}
	);

	// Send confirmation that everything is done
	res.send(200); // 200
}






