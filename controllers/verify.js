
module.exports.checkEmail = function (res, email) {
  
  console.log("Check: " + email);
  
  if(email == "zapata@unal.edu.co"){
    res.status(200).json(
      {
        "success": false,
        "id": email,
        "message": "Email already exists"
      });
    }
   else{
        res.status(200).json(
      { 
        "success": true,
        "id": email,
        "message": "Email doesn't exists"
      });
    }
};