var urls = require('./urls');

var res_client;
var picture;

module.exports.login = function (res, jsonFromClient) {
  
  //jsonFromClient   {
	//                  userId : "96cb7a81a34dd088",
	//                  picture : "==asdnasljdbjasbj"
  //                 }
  
  //Set response to client
  res_client = res;
  
  var userId = jsonFromClient.userId;
  picture = jsonFromClient.picture;

  var jsonToDataBase = {"userId" : userId};
  
  console.log("");

  //Request to Database for verify email & password
  requestDatabase(jsonToDataBase);

  //Request to Facilitator for authenticate user
};

function requestDatabase(jsonToDataBase){

  var request = require('request');

  var options = {
    uri: urls.database + '/login',
    method: 'POST',
    headers: {
          'Content-Type': 'application/json'
      },
    json: jsonToDataBase
  };
  

  request(options, function (error, response, body) {
    
  if (!error && response.statusCode == 200) {
    
    var success = body.success;
    
    if(success){
      requestLoginFacilitator(body); 
    }else{
      responseClient(body);
    }
    
    
  }else{ 
    console.log("error in Database" + response);
    }
  });
}

function requestLoginFacilitator(jsonWithFacilitatorsIds){

  var request = require('request');
  
  jsonToFacilitator = {
                      "facilitatorIds" : jsonWithFacilitatorsIds.facilitatorIds,
                      "picture" : picture
                    };      


  var options = {
    uri: urls.facilitator + '/login',
    method: 'POST',
    headers: {
          'Content-Type': 'application/json'
      },
    json: jsonToFacilitator
  };

  request(options, function (error, response, body) {
    
    console.log("error " + error + "response: " + response + "body" + body);
    
  if (!error && response.statusCode == 200) {
        
      responseClient(body);    
    
  }else{ 
    console.log("error in Facilitator" + response);
    }
  });
  
}
  
  

function responseClient(jsonToClient){

    res_client.status(200).json(jsonToClient);
    
  }
