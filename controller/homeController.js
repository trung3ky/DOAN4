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

    function isANumber(str) {
        return !/\D/.test(str);
    }

    app.get('/search', function(req, res, next) {
        var regex = req.query["term"];
        if (isANumber(regex)) {
            var searchName = "select * from user where phone like '%" + regex + "%'";
            connection.query(searchName, function(err, result) {
                if (err) {
                    throw err;
                }
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    var obj = {
                        name: result[i].name,
                        image: result[i].image,
                        id: result[i].id,
                        friend: result[i].friend
                    };
                    data.push(obj);
                }
                res.send(data, {
                    'Content-Type': 'application/json'
                }, 200);
            });
        } else {
            var searchName = "select * from user where name like '%" + regex + "%'";
            connection.query(searchName, function(err, result) {
                if (err) {
                    throw err;
                }
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    var obj = {
                        name: result[i].name,
                        image: result[i].image,
                        id: result[i].id
                    };
                    data.push(obj);
                }
                res.send(data, {
                    'Content-Type': 'application/json'
                }, 200);

            });
        }
    });

}