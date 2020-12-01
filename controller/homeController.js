var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var check = require('../middleware/checksSgin');
var connection = require('./db');
module.exports = function(app) {
    app.use(session({
        secret: 'secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());

    app.use(cookieParser());

    app.get('/index', check.checkcookie);

    app.get('/search', function(req, res, next) {
        var regex = req.query["term"];
        var searchName = "select * from user where name like '%" + regex + "%'";
        connection.query(searchName, function(err, result) {
            if (err) {
                throw err;
            }
            var data = [];
            for (var i = 0; i < result.length; i++) {
                var obj = {
                    name: result[i].name,
                    image: result[i].image
                };
                data.push(obj);
            }
            res.send(data, {
                'Content-Type': 'application/json'
            }, 200);

        });
    });

}