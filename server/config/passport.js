const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const router = require('express').Router()
const users = require('../models/user.model');
const { google } = require('./auth.config');

router.get("/google",passport.authorize('google', { 
    scope: ['profile',"https://www.googleapis.com/auth/drive"],accessType: 'offline',prompt: 'consent' }))
router.get('/google/callback', passport.authorize('google', { failureRedirect: '/login' }),function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});
module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(async function (id, done) {
       var user=await users.findById(id).catch(err=>done(err,null))
       done(null, user);
    });
    passport.use(new GoogleStrategy(google,
      function(accessToken, refreshToken, profile, cb) {
       
          return cb({}, {});
        
      }
    ));
    app.use("/auth",router)
}


