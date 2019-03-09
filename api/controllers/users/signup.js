const bcrypt = require("bcrypt");

module.exports = {


  friendlyName: 'Signup',


  description: 'Signup users.',


  inputs: {
    name: {
      type : "string",
      description : "email id of the user to fetch the user data",
      required : true
    },
    email : {
      type : "string",
      description : "password of the user attempting to login",
      required : true
    },
    password: {
      type : "string",
      description : "email id of the user to fetch the user data",
      required : true
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    try{
      let userData = "INSERT INTO users (name,email,password,createdAt,updatedAt,lastLoad) VALUES ($1,$2,$3,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
      let password = bcrypt.hashSync(inputs.password, 10);
      let users = await sails.sendNativeQuery(userData,[inputs.name,inputs.email,password]);
      return exits.success({
        code : 200,
        message : "Sign up result",
        response : {
          userData : users
        }
      }); 
    } catch(err){
      console.log(err);
      return exits.success({
        code : 502,
        message : err
      });
    }

  }
};
