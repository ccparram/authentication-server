// call the packages we need
var express    = require('express');        // call express
const app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3555;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/signup')

// recourse for verify the existence of an email (accessed at GET http://localhost:8080/api/signup/?email=user_email)
.get(function(req, res) {
    
    var verify = require('./controllers/verify');
    var checkEmail = verify.checkEmail;
    checkEmail(res, req.query.email);
    
});

router.route('/signup')

// recourse for register an user (accessed at POST http://localhost:8080/api/signup/)
.post(function(req, res) {
    
    var register = require('./controllers/register'); 
    var registerUser = register.registerUser;
    registerUser(res, req.body);
    
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);