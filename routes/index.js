
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Sumo Jerky' });
};

exports.checkout = function(req, res){
  res.render('checkout', { title: 'Sumo Jerky' });
};