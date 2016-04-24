
module.exports.registerUser = function (res, data_user) {
  
  console.log("Register: " + data_user);
    
  var success = true;  
    
  if(success){
    res.status(200).json(data_user);
    }
   else{
        res.status(200).json(
      { 
      });
    }
};