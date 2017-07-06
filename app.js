// BOILERPLATE CODE //
var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    flash       = require('connect-flash');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL);      // mongodb://localhost/yelpcamp

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs'),
app.use(flash());


var Campground = require('./models/campgrounds'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');



// ROUTES //
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');



// PASSPORT CONFIGURATION //
app.use(require('express-session')({
    secret: '911wasaninsidejob',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ADDED MIDDLEWARE //
app.use(function(req, res, next) {  // this will run on EVERY ROUTE
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



// ROUTE CONFIGURATION //
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);



// LISTENER //
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('YelpCamp server has started.');
});

//editing