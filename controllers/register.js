var request = require('request');

var name;
var email;
var password;
var res_client;
var gender;
var res_client;

module.exports.registerUser = function (res, data_user) {

  //Set response to client
  res_client = res;

  name = data_user.name;
  email = data_user.email;
  password = data_user.password;
  gender = data_user.gender;

  requestTrainingFacilitator();

};


function requestTrainingFacilitator(){

  //TODO request to Facilitator

  //TODO Set res.success & externalID
  var success = true;

  externalID = "externaID_" + email;

  //TODO Control valid images to send to Database

  picture = {"picture" : [
      {
      "ID" : "12345",
      "base64" : "eRHR0cDovL3NhZHNhZnNhZnNmc2ZzYWY="
      },
      {
      "ID" : "32bbvs",
      "base64" : "aHR0cDovL3NhZHNhZnNhZnNmc2ZzYWY="
      }
      ]}

  if(success){
    //Request to register user in Database
    requestRegisterDatabase(externalID, picture);
  }
  else{
    responseToClient(success);
  }

}

function requestRegisterDatabase(externalID, picture){

  //TODO request to Facilitator

  var options = {
  uri: 'http://ix.cs.uoregon.edu:3000/users',
  method: 'POST',
  headers: {
        'Content-Type': 'application/json'
    },
  json: {
      "name" : name,
      "email" : email,
      "password" : password,
      "gender" : gender,
      picture,
      "externalID" : externalID
    }
};

  request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var success = JSON.parse(body).success;
    responseToClient(success);
  }
});
}

function responseToClient(success){

  if(success){

    json_response = {
      "email": email,
      "success": success,
      "message" : "User registered successfully"
    }

    res_client.status(200).json(json_response);
  }
  else{

    json_response = {
      "email": email,
      "success": success,
      "message" : "User was not registered"
    }

    res_client.status(200).json(json_response);
  }

}
