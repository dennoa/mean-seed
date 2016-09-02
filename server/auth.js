module.exports = require('stateless-auth')({
  jwt: { 
    secret: 'm3ans33d' 
  },
  providers: {
    github: { 
      clientSecret: 'CLIENT_SECRET' 
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
