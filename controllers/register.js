var request = require('request');
var urls = require('./urls');

var res_client;

module.exports.registerUser = function (res, jsonPicturesFromClient) {

  res_client = res;
  
  console.log("json with pictures");
  
  requestRegisterFacilitator(jsonPicturesFromClient);  
};

function requestRegisterFacilitator(jsonPicturesFromClient){
  
  var options = {
    uri: urls.facilitator + '/register',
    method: 'POST',
    headers: {
          'Content-Type': 'application/json'
      },
    json: jsonPicturesFromClient
  };  
  
  request(options, function (error, response, body) {

  if (!error && response.statusCode == 200) {
    jsonResponseFromFacilitator = body;
    
    var success = jsonResponseFromFacilitator.success;
  
    if(success){
    
      var facilitatorIds = jsonResponseFromFacilitator.facilitatorIds;
      
      var jsonToDataBase = {
      "facilitatorIds" : facilitatorIds,
      "pictures" : jsonPicturesFromClient.pictures
      };
      
      requestRegisterDatabase(jsonToDataBase);

     }
     else{
        requestClient(jsonResponseFromFacilitator);
        }
   }
   else{
     console.log("error in Facilitator" + response);
   }
    
  });
}

function requestRegisterDatabase(jsonToDataBase){
  
  var options = {
    uri: urls.database + '/register',
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
      requestClient(body); 
    }else{
      requestClient(body);
    }
    
    
  }else{ 
    console.log("error in Database" + response);
    }
  });

}

function requestClient(responseToClient){
  
  console.log("response to client");
  res_client.json(responseToClient);

}