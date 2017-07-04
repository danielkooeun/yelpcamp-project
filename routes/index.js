var express = require('express');
var router = express.Router({mergeParams: true});
var passport = require('passport');
var User = require('../models/user');

// CODE //
router.get('/', function(req, res) {
    res.render('landing');
});



// AUTH ROUTES =================================

// registration form
router.get('/register', function(req, res) {
    res.render('register');
});

// registration POST route
router.post('/register' ,function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(error, user) {
        if (error) {
            console.log('Error:');
            console.log(error);
            return res.render('register', {error: error.message});
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Successfully registered user.');
            res.redirect('/campgrounds');
        });
    });
});

// login GET route
router.get('/login', function(req, res) {
    res.render('login');
});

// login POST route - using passport middleware
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res) {
    // nothing
});

// logout route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Successfully logged out.')
    res.redirect('/login');
});



// EXPORTS
module.exports = router;