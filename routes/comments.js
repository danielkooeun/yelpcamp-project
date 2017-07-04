var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// NEW COMMENT ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(error, campground) {
        if (error) {
            console.log('Error:');
            console.log(error);
        }
        else
            res.render('comments/new', {campground: campground});
    });
});

// CREATE COMMENT ROUTE
router.post('/', middleware.isLoggedIn, function(req, res) {
    // find campground using id
    // create comment
    // connect campground to comment
    Campground.findById(req.params.id, function(error, campground) {
        if (error) {
            console.log('Error:');
            console.log(error);
        }
        else {
            Comment.create(req.body.comment, function(error, comment) {
                if (error) {
                    console.log('Error:');
                    console.log(error);
                }
                else {
                    // add username and id to comment
                    // obtain current user's data:
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log('New comment');
                    req.flash('success', 'Successfully added comment.');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT COMMENT
router.get('/:commentId/edit', middleware.checkCommentOwner, function(req, res) {
    Comment.findById(req.params.commentId, function(error, comment) {
        res.render('comments/edit', {campground_id: req.params.id, comment: comment});
    });
});

// UPDATE COMMENT
router.put('/:commentId', middleware.checkCommentOwner, function(req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(error) {
        req.flash('success', 'Successfully updated comment.');
        res.redirect('/campgrounds/' + req.params.id);
    });
});

// DESTROY COMMENT
router.delete('/:commentId', middleware.checkCommentOwner, function(req, res) {
    Comment.findByIdAndRemove(req.params.commentId, function(error) {
        req.flash('success', 'Successfully deleted comment.');
        res.redirect('/campgrounds/' + req.params.id);
    });
});



// EXPORTS
module.exports = router;