var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');

var data = [
    {
        name: 'Your mom',
        image: 'https://pcacdn.azureedge.net/~/media/802FD4AF791F4C6886E18CBF4A2B81B2.ashx?modified=20174521310&w=595&h=396&as=1&hash=60BF3446AAD68FA74187218136F9C27819AF48F8',
        description: 'Bacon ipsum dolor amet strip steak porchetta shankle ground round chicken bacon. Pork belly porchetta tongue, spare ribs filet mignon strip steak landjaeger ground round short loin beef ribs. Spare ribs salami pancetta short ribs t-bone pork chop jerky ham burgdoggen shoulder short loin kevin fatback. Ball tip sirloin alcatra, rump jerky tri-tip venison ham hock burgdoggen meatloaf chicken strip steak sausage t-bone tail. Ground round ribeye ham hock, pork chop salami pork bacon chicken capicola tail filet mignon corned beef. Pig turkey ham chicken, prosciutto hamburger landjaeger andouille tri-tip short loin. Shank shankle jowl, pig beef ribs ball tip doner tail filet mignon biltong.'
    },
    {
        name: 'You',
        image: 'https://pcacdn.azureedge.net/~/media/802FD4AF791F4C6886E18CBF4A2B81B2.ashx?modified=20174521310&w=595&h=396&as=1&hash=60BF3446AAD68FA74187218136F9C27819AF48F8',
        description: 'Bacon ipsum dolor amet strip steak porchetta shankle ground round chicken bacon. Pork belly porchetta tongue, spare ribs filet mignon strip steak landjaeger ground round short loin beef ribs. Spare ribs salami pancetta short ribs t-bone pork chop jerky ham burgdoggen shoulder short loin kevin fatback. Ball tip sirloin alcatra, rump jerky tri-tip venison ham hock burgdoggen meatloaf chicken strip steak sausage t-bone tail. Ground round ribeye ham hock, pork chop salami pork bacon chicken capicola tail filet mignon corned beef. Pig turkey ham chicken, prosciutto hamburger landjaeger andouille tri-tip short loin. Shank shankle jowl, pig beef ribs ball tip doner tail filet mignon biltong.'
    },
    {
        name: 'Your dad',
        image: 'https://pcacdn.azureedge.net/~/media/802FD4AF791F4C6886E18CBF4A2B81B2.ashx?modified=20174521310&w=595&h=396&as=1&hash=60BF3446AAD68FA74187218136F9C27819AF48F8',
        description: 'Bacon ipsum dolor amet strip steak porchetta shankle ground round chicken bacon. Pork belly porchetta tongue, spare ribs filet mignon strip steak landjaeger ground round short loin beef ribs. Spare ribs salami pancetta short ribs t-bone pork chop jerky ham burgdoggen shoulder short loin kevin fatback. Ball tip sirloin alcatra, rump jerky tri-tip venison ham hock burgdoggen meatloaf chicken strip steak sausage t-bone tail. Ground round ribeye ham hock, pork chop salami pork bacon chicken capicola tail filet mignon corned beef. Pig turkey ham chicken, prosciutto hamburger landjaeger andouille tri-tip short loin. Shank shankle jowl, pig beef ribs ball tip doner tail filet mignon biltong.'
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(error) {
    //     if (error) {
    //         console.log(error);
    //     }
    //     else {
    //         console.log('Removed all Campgrounds');
    //         // Add couple campgrounds
    //         data.forEach(function(seed) {
    //             Campground.create(seed, function(error, campground) {
    //                 if (error) {
    //                     console.log('Error:');
    //                     console.log(error);
    //                 }
    //                 else {
    //                     console.log('New campground');
                        
    //                     // Create comment
    //                     Comment.create({
    //                         text: 'mom too fat',
    //                         author: 'OP'
    //                     }, function(error, comment) {
    //                         if (error) {
    //                             console.log('Error:');
    //                             console.log(error);
    //                         }
    //                         else {
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                         }
                            
    //                     })
    //                 }
    //             });
    //         });
    //     }
    });
    
    
};

module.exports = seedDB;