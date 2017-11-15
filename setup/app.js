const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('../routes');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const messages = require('express-messages');
const passport = require('passport');
const expressValidator = require('express-validator');
const helpers = require('../helpers');
const errorHandlers = require('../handlers/errorHandlers');
require('../handlers/passport');

// init app
const app = express();

// Load template engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Set public folder
app.use(express.static(path.join(__dirname, '../public')));

// Express Validator Middleware
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser('keyboard cat'));

// Express Session Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = messages(req, res);
    next();
});

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// Use flash for flash messaging
app.use(flash());

// global variables
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.h = helpers;
    res.locals.user = req.user || null;
    next();
});

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle routes
app.use('/', routes);

// If that above routes didnt work, 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of the error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
