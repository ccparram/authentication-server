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

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
    res.json({ message: 'Yupi! Welcome to our Authentication Server API!' });
});


router.route('/verify')

// recourse for verify the existence of an email (accessed at GET http://localhost:8080/verify/?email=user_email)
.get(function(req, res) {

    var verify = require('./controllers/verify');
    var checkEmail = verify.checkEmail;
    checkEmail(res, req.query.email);

});

router.route('/register')

// recourse for register an user (accessed at POST http://localhost:8080/register/)
.post(function(req, res) {

    var register = require('./controllers/register');
    var registerUser = register.registerUser;
    registerUser(res, req.body);
});


router.route('/authenticate')

// recourse for register an user (accessed at POST http://localhost:8080/authenticate/)
.post(function(req, res) {

    var authenticate = require('./controllers/authenticate');
    var authenticateUser = authenticate.authenticateUser;
    authenticateUser(res, req.body);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
