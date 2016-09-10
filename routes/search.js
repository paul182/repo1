var express = require('express');
var router = express.Router();

// middleware to use for all requests (eg: xss check)
router.use(function(req, res, next) {
    // do logging
    console.log('in middleware search router');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/testjson', function(req, res) {
	var host = req.get('host');
	console.log('host = ' + host);

        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ status: 'SUCCESS', message: 'JSON Hello World' })); 
	res.end();
});

router.get('/', function(req, res) {
	var host = req.get('host');
	console.log('host = ' + host);

        res.setHeader('Content-Type', 'application/liquid');
        res.write('<p>Hello World! </p>'); 
	res.end();
});

module.exports = router;

