
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