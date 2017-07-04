var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// INDEX ROUTE
router.get('/', function(req, res) {
    // Retrieve campgrounds from database
    Campground.find({}, function(error, allCampgrounds) {
        if (error) {
            console.log('Error:');
            console.log(error);
        }
        else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    })
});

// CREATE ROUTE
router.post('/', middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        author: author
    };
    // create a new campground and save to db
    Campground.create(data, function(error, campground) {
        if (error)
            console.log(error);
        else {
            console.log('New Campground:');
            console.log(campground);
            // redirect to GET route for '/campgrounds'
            req.flash('success', 'Successfully created campground.');
            res.redirect('/campgrounds');
        }
    });
});

// NEW ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// SHOW ROUTE
router.get('/:id', function(req, res) {
    // find campground with id and display showpage
    Campground.findById(req.params.id).populate('comments').exec(function(error, campground) {
        if (error)
            console.log(error);
        else {
            // campground will contain full comments instead of just objectIds
            res.render('campgrounds/show', {campground: campground});
        }
    });
});

// EDIT ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(error, campground) {
        res.render('campgrounds/edit', {campground: campground});
    });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkCampgroundOwner, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, campground) {
        req.flash('success', 'Successfully updated campground.');
        res.redirect('/campgrounds/' + req.params.id);
    });
});

// DESTROY ROUTE
router.delete('/:id', middleware.checkCampgroundOwner, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(error) {
        req.flash('success', 'Successfully deleted campground.');
        res.redirect('/campgrounds');
    });
});



// EXPORTS
module.exports = router;