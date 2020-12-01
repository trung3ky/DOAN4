var express = require('express');
var app = express();

var homeController = require("./controller/homeController");
var siginController = require("./controller/siginController");


// cổng cho server
var port = 8000;

//đường dẫn public cho người dùng
app.use('/assets', express.static(__dirname + "/public"));
app.set("view engine", "ejs"); //tạo view ejs


homeController(app);
siginController(app);


//server đang lắng nghe các request
app.listen(port, function() {
    console.log("server is listening on port: ", port);
});