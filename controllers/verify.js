
module.exports.checkEmail = function (res, email) {
  
  var request = require('request');
  
  if(isEMailAddr(email)){
    
    request('http://ix.cs.uoregon.edu:3000/users?email=' + email, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        
        var success = JSON.parse(body).success;
      
        if(success){
          res.status(200).json(
            {
              "success": true,
              "email": email,
              "message": "You can use this email"
            });
        }
        else{
          res.status(200).json(
            { 
              "success": false,
              "email": email,
              "message": "You can not use this email"
            });
        }
      
      }
    })
       
  }
  else{
    res.status(400).json(
      {
        "success": false,
        "email": email,
        "message": "This is not a email"
      });
  }
  
};

function isEMailAddr(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}