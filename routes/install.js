var express = require('express');
var router = express.Router();
var shopifyAPI = require('shopify-node-api');

var shopifyConfig = {
	  shop: 'duffwood-dev.myshopify.com',
	  shopify_api_key: '9fd2db7d3b4efdeb53aede64cc42e7fa', // Your API key
	  shopify_shared_secret: '89674546b386d218ddee866c390a5cb4', // Your Shared Secret
	  shopify_scope: 'read_products, write_products',
	  redirect_uri: 'http://duffshop.herokuapp.com/install/finish_auth',
	  nonce: 'duffwood-dev' // you must provide a randomly selected value unique for each authorization request
};

// middleware to use for all requests (eg: xss check)
router.use(function(req, res, next) {
    // do logging
    logger.info('in middleware router');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/auth').get(function(req, res) {
	var host = req.get('host');
	console.log('host = ' + host);
	var Shopify = new shopifyAPI(config);

	// Building the authentication url
	var auth_url = Shopify.buildAuthURL();

	console.log('auth_url = ' + auth_url);
	// Assuming you are using the express framework
	// you can redirect the user automatically like so
	res.redirect(auth_url);
});

router.route('/finish_auth', function(req, res){

  var Shopify = new shopifyAPI(config), // You need to pass in your config here
  var query_params = req.query;

  Shopify.exchange_temporary_token(query_params, function(err, data){
    // This will return successful if the request was authentic from Shopify
    // Otherwise err will be non-null.
    // The module will automatically update your config with the new access token
    // It is also available here as data['access_token']
	
	res.write(err);
	res.write(data);
	res.end();
  });

});
 
module.exports = router;

