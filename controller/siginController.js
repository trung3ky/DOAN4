var bodyParser = require('body-parser'); // đọc request của người dùng
var session = require('express-session');
var flash = require('connect-flash');
const { json } = require('body-parser');
var md5 = require('md5');
var connection = require('./db');
const e = require('express');

// đọc requesst của người dùng theo kiểu form
var parserJson = bodyParser.json();
var urlencodeParser = bodyParser.urlencoded({ extended: false }); 

module.exports = function(app) {
    app.use(session({
        secret: 'secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());

    app.get('/dangnhap', function(req, res) {
        if (req.cookies.user != null) {
            res.redirect('/index');
        } else {
            var sql = "select phone from users";
            connection.query(sql, function(err, result) {
                if (err) {
                    throw err;
                }
                res.render("sigIn", { data: JSON.stringify(result), message: req.flash('users') });
            });
        }


    });

    app.post('/xulydangnhap', urlencodeParser, function(req, res) {
        var name = req.body.username;
        var pass = req.body.password;
        var hashPass = md5(pass);
        var sql = "select * from users where phone = '" + name + "' and password = '" + hashPass + "'";
        connection.query(sql, function(err, result) {
            if (err) {
                throw err;
            }
            if (result.length > 0) {
                res.cookie('user', [result[0].name, result[0].id]);
                req.flash('userSigin', "bạn đã đăng nhập thành công");
                res.redirect('/index');
            } else {
                req.flash('user', 'tài khoản đăng nhập không chính xác!');
                res.redirect('/dangnhap');
            }
        });

    });

    app.post('/xulydangky', urlencodeParser, function(req, res) {
        var name = req.body.name;
        var phone = req.body.phone;
        var birthday = req.body.date;
        var password = req.body.password;
        var hashPass = md5(password);
        var gender = req.body.gender;
        var date = new Date();
        
        //ngày user tạo tài khoản
        var createdDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        
        if (name == null || phone == null || birthday == null 
            || password == null || gender == null) {
            res.redirect('/dangnhap');
      
        } else {
            var sqlcheckphone = "select * from users where phone = '" + phone + "'";
            connection.query(sqlcheckphone, function(err, result) {
                if (err) {
                    throw err;
                }
                if (result.length > 0) {
                    // res.send("số điện thoại đã tồn tại");
                    res.redirect("/dangnhap");
                } else {
                    //thêm người dùng  
                   try {
                    var sql =
                    "insert into users(name, phone, birthday,password,gender, created)"
                   +"values('" + name + "' ,'" + phone + "','" + birthday + "','" +
                    hashPass + "', '" + gender + "','" + createdDay + "')";

                   connection.query(sql, function(err, result) {
                       if (err) {
                           throw err;
                       }
                       //thêm xong lấy dữ liệu người dùng ra lại bằng phone vừa đăng ký
                       var data = "select * from users where phone = '" + phone + "'";
                       connection.query(data, function(err, resultdata) {
                           if (err) {
                               throw err;
                           }
                           //tạo cookie với name và id của người dùng.
                           res.cookie('user', [resultdata[0].name, resultdata[0].id]);
                           req.flash('userSigin', "bạn đã đăng ký thành công");
                           
                           
                           res.redirect("/index");
                       });
                   });

                   } catch (error) {
                    console.error(error);
                   }
                  

                }
            });
        }







    });

}