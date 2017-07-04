var Campground = require('../models/campgrounds');
var Comment = require('../models/comment');

// MIDDLEWARE
var middleware = {
    
    isLoggedIn: function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'You need to be logged in to do that.');
        res.redirect('/login');
    },
    
    // checks whether campground owner is current user
    checkCampgroundOwner: function checkCampgroundOwner(req, res, next) {
        // is user logged in?
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function(error, campground) {
                if (error) {
                    console.log('Error:');
                    console.log(error);
                    req.flash('error', 'You don\'t have permission to do that.');
                    res.redirect('back');
                }
                else {
                    // is user's id === campground.author.id
                    if (campground.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        req.flash('error', 'You don\'t have permission to do that.');
                        res.redirect('back');
                    }
                }
            });
        }
        else {
            req.flash('error', 'You need to be logged in to do that.');
            res.redirect('back');
        }
    },
    
    // checks whether comment owner is current user
    checkCommentOwner: function checkCommentOwner(req, res, next) {
        // is user logged in?
        if (req.isAuthenticated()) {
            Comment.findById(req.params.commentId, function(error, comment) {
                if (error) {
                    console.log('Error:');
                    console.log(error);
                    req.flash('error', 'You don\'t have permission to do that.');
                    res.redirect('back');
                }
                else {
                    // is user's id === campground.author.id
                    if (comment.author.id.equals(req.user._id)) {
                        next();
                    }
                    else {
                        req.flash('error', 'You don\'t have permission to do that.');
                        res.redirect('back');
                    }
                }
            });
        }
        else {
            req.flash('error', 'You need to be logged in to do that.');
            res.redirect('back');
        }
    }
    
}

module.exports = middleware;