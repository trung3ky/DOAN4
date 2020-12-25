module.exports.checkcookie = function(req, res, next) {
    if (req.cookies.user != null) {
        res.render("index", { user: req.cookies.user[0], idUser: req.cookies.user[1], message: req.flash('userSigin') });
    } else {
        res.redirect('/dangnhap');
    }
    next();
};

module.exports.search = function(req, res, next) {};