var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var parserJson = bodyParser.json();




var connection = require('./db');

module.exports = function(app) {

    app.post('/user', urlencodeParser, function(req, res, next) {
        var id = req.body.userId;
        var sql = "select * from user where id = '" + id + "'";
        connection.query(sql, function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        })
    })

    app.post('/addFriend', urlencodeParser, function(req, res, next) {
        var id = req.body.userId;
        var sql = "select * from user where id = '" + id + "'";
        connection.query(sql, function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        })
    })

    //trả vè firend trong bảng user
    app.post('/friend', urlencodeParser, function(req, res, next) {
        var id = req.body.userId;
        var sql = "select friend from user where id = '" + id + "'";
        connection.query(sql, function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        })
    })

    //trả về trạng thái friend trong bảng friend
    app.post('/checkFriend', urlencodeParser, function(req, res, next) {
        var idSender = req.body.idSender;
        var idReceiver = req.body.idReceiver;

        var sql = "select * from friend where (idSender = '" + idSender + "' and idReceiver = '" + idReceiver + "') or (idSender = '" + idReceiver + "' and idReceiver = '" + idSender + "')";
        connection.query(sql, function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
        })
    })
}