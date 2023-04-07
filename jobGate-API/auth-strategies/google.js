const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '148237496069-dfv70h6vhb71jbgaaoto0muo93rv3ac1.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='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'


passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
)) 

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
  done(null, user)
})