// call the packages we need
var express    = require('express');        // call express
const app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser({limit: '100mb'}));
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

// test route to make sure everything is working (accessed at GET http://localhost:{port}/)
router.get('/', function(req, res) {
    res.json({ message: 'Yupi! Welcome to our Authentication Server API!' });
});

router.route('/register')

// recourse for register an user (accessed at POST http://localhost:{port}/register/)
.post(function(req, res) {

    var register = require('./controllers/register');
    var registerUser = register.registerUser;
    registerUser(res, req.body);
});


router.route('/login')

// recourse for login an user (accessed at POST http://localhost:{8080}/authenticate/)
.post(function(req, res) {

    var login = require('./controllers/login');
    var loginUser = login.login;
    loginUser(res, req.body);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
