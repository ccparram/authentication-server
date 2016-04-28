
var res_client;
var email;
var password;

module.exports.authenticateUser = function (res, data_user) {

  res_client = res;
  email = data_user.email;
  password = data_user.password;

  var success = true;

  //Request to Database for verify email & password
  requestDatabase(email, password);

  //Request to Facilitator for authenticate user
};

function requestDatabase(email, password){

  var request = require('request');

  request('http://ix.cs.uoregon.edu:3000/user?=' + email + '&password='+password,
          function (error, response, body) {
      if (!error && response.statusCode == 200) {

        var success = JSON.parse(body).success;

        if(success){
          requestTrainingFacilitator();
        }
        else{ //Email or password was incorrect
          res_client.status(401).json(
            {
              "email": email,
              "success": false,
              "message" : "The email or password was incorrect"
            });
        }
      }
    })
}

function requestTrainingFacilitator(){

  //TODO Request to Facilitator
  var success = true;

  //Response to client
  responseClient(success);
  }

function responseClient(success){

    if(success){
    res_client.status(200).json(
      {
        "email": "user_email",
        "success": true,
        "message" : "User authenticated successfully"
      });
    }
    else{
      res_client.status(200).json(
      {
        "email": "user_email",
        "success": false,
        "message" : "User was not authenticated successfully"
      });
    }
  }
