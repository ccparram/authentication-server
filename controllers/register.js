var request = require('request');

var res_client;

module.exports.registerUser = function (res, jsonPictures) {

  //Set response to client
  res_client = res;

  requestRegisterFacilitator(jsonPictures);

};


function requestRegisterFacilitator(jsonPictures){
  
  var options = {
    uri: 'http://ix.cs.uoregon.edu:{facilitatorPort}/register',
    method: 'POST',
    headers: {
          'Content-Type': 'application/json'
      },
    json: jsonPictures
  };

  request(options, function (error, response, body) {
    
  if (!error && response.statusCode == 200) {
    jsonFacilitator = JSON.parse(body);
    var success = jsonFacilitator.success;
    var facilitatorIds = jsonFacilitator.jsonFacilitator;
    
    var jsonToDataBase = {
    "facilitatorIds": facilitatorIds,
    "jsonPictures": jsonPictures
    };
    
    
    
    requestRegisterDatabase(jsonToDataBase);
    
  }else{
    jsonFacilitator = JSON.parse(body);
    requestClient(jsonFacilitator);
    }
  });
  
}

function requestRegisterDatabase(jsonToDataBase){
  
  var options = {
    uri: 'http://ix.cs.uoregon.edu:{dataBasePort}/register',
    method: 'POST',
    headers: {
          'Content-Type': 'application/json'
      },
    json: jsonToDataBase
  };

  request(options, function (error, response, body) {
    
  if (!error && response.statusCode == 200) {
    jsonDataBase = JSON.parse(body);
    var success = jsonDataBase.success;
    
    if(success){
      requestClient(jsonDataBase); 
    }else{
      requestClient(jsonDataBase);
    }
    
    
  }else{ 
    }
  });

}

function requestClient(){

}
