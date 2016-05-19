var request = require('request');
var urls = require('./urls');

var res_client;

module.exports.registerUser = function (res, jsonPictures) {

  //Set response to client
  res_client = res;
  
  requestRegisterFacilitator(jsonPictures);

};


function requestRegisterFacilitator(jsonPictures){
  
  var options = {
    uri: urls.facilitator + '/register',
    method: 'POST',
    headers: {
          'Content-Type': 'application/json'
      },
    json: jsonPictures
  };
 /* 
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
  */
  
  jsonToDataBase = {
	"facilitatorIds": [
    {
      "facId": "696c3ecd355c03bf86ad029a68b931cd", 	
      "facType": "fpp"					 
    },
    {
   	  "facId": "768dad68asf7sd87f6s8adds87f6", 		
      "facType": "microsoft"						
    }
  	],
	"pictures": [
	    {   "pictureId" : 1,
	        "base64": "asdnasljdbjasbsdkajbflksbfkasbfhfa"
	    }, 	
	    {"pictureId" : 2,
	    "base64" : "Baseojdasfjbsjodsjabfkjbsadkñfjh"
	    }
    ]    
};

requestRegisterDatabase(jsonToDataBase);
  
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
