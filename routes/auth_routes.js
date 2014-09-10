var express = require('express');
var router = express.Router();
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    // The users can be validated using a DB here
    //By default, we support user1
    if (username=="user1" && password=="Welcome") {
      return done(null, username);
    }
    else {
      return done(null, false);
    }
  })
);

//This serializes the users into sessions
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('./auth/login',{error: req.flash('error')[0]});
});

router.post('/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }
  )
);

router.get('/logout', function (req, res) {
   req.logout();
   res.redirect('/login');  
});
module.exports = router;