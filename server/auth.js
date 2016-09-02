module.exports = require('stateless-auth')({
  jwt: { 
    secret: 'm3ans33d' 
  },
  providers: {
    github: { 
      clientSecret: '4ac91f6b0448d3c4a7efe4be0e7c7befc54e2c4d' 
    },
    login: {
      findUser: (credentials, callback) => {
        //TODO: Lookup user info and callback
        //e.g. UserModel.findOne({ username: credentials.username }, callback);
        callback(null, null);
      }
    }
  }
});
