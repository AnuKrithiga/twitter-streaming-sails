const bcrypt = require("bcrypt");

module.exports = {


  friendlyName: 'Auth',


  description: 'Auth users.',


  inputs: {
    email: {
      type : "string",
      description : "email id of the user to fetch the user data",
      required : true
    },
    password : {
      type : "string",
      description : "password of the user attempting to login",
      required : true
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    try {
      let getUserData = "SELECT * FROM users WHERE email = $1";
      let user = await sails.sendNativeQuery(getUserData,[inputs.email]);
      if(!user){
        return exits.success({
          code : 404,
          message : "User not found!"
        });
      }
      else{
       let data = user.rows[0];
       console.log(data);
        if(data.password && bcrypt.compareSync(inputs.password, data.password)){
          return exits.success({
            code : 200,
            message : "Login successful",
            response : {
              userData : data
            }
          });
        }
        else{
          return exits.success({
            code : 403,
            message : "Invalid password!"
          });
        }
      }
    } catch(err){
      console.log(err);
      return exits.success({
        code : 502,
        message : err
      });
    }
  }

};
