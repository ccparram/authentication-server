var request = require('request');
var urls = require('./urls');

var res_client;

module.exports.registerUser = function (res, jsonPicturesFromClient) {

  //Set response to client
  res_client = res;
  
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
    jsonResponseFromFacilitator = JSON.parse(body);
    
    var success = jsonResponseFromFacilitator.success;
    
    if(success){
    
      var facilitatorIds = jsonResponseFromFacilitator.jsonFacilitator;
      
      var jsonToDataBase = {
      "facilitatorIds": facilitatorIds,
      "jsonPictures": jsonPicturesFromClient
      };
      
      requestRegisterDatabase(jsonToDataBase);
      
      }
      else{
        requestClient(jsonResponseFromFacilitator);
        }
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
    }
  });

}

function requestClient(responseToClient){
  
  res_client.json(responseToClient);

}
