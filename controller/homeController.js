var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var check = require('../middleware/checksSgin');
module.exports = function(app) {
    app.use(session({
        secret: 'secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());

    app.use(cookieParser());

    app.get('/index', check.checkcookie, check.search);

}