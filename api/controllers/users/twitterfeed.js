const Twitter = require('twitter');

module.exports = {


  friendlyName: 'Twitterfeed',


  description: 'Twitterfeed users.',


  inputs: {
    user : {
      type : "number",
      description : "id of the user to fetch the user data",
      required : true
    },
    keyword : {
      type : "string",
      description : "key word to fetch the twitter feeds",
      required : false
    },
    limit : {
      type : "number",
      description : "number of feeds to push",
      required : true
    }
  },

  exits: {

  },


  fn: async function (inputs,exits) {
    try{
      let client = new Twitter({
        consumer_key: '0XG5299e6oSESyHvLGIMGmwW3',
        consumer_secret: 'kh08Sydpo5hYYr0DCY8i7oJRAbxNkI1NKNpdStVi08ICIwBUOW',
        access_token_key: '3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h',
        access_token_secret: 'TPnK7IgPW0TB0m9NemXiyKAlZC6rBRpqi56w7sDhVxEgl'
      });
      let feed = [];
      let stream = client.stream('statuses/filter', {track: inputs.keyword});

      stream.on('data', function(event) {
        console.log(event);
      });
      
      stream.on('error', function(error) {
        throw error;
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