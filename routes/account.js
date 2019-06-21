var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');

var userModel = require('../models/user.model');
var restricted = require('../middlewares/restricted');
var bodyParser = require('body-parser');

var router = express.Router();
var indexModel = require('../models/index.model');
var session = require('express-session');


router.get('/register', (req, res, next) => {
    res.render('vwAccount/register')
})
router.post('/register', (req, res, next) => {
    var saltRounds = 10;
    var entity = req.body;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    entity.password = hash;
    delete entity.confirmPassword;
    userModel.add(entity).then(id => {
        res.redirect('/account/login');
    });
})

router.get('/login', (req, res, next) => {
    res.render('vwAccount/login');
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            return res.render('vwAccount/login', {
                err_message: info.message
            })
        }
        var retUrl = req.query.retUrl || '/';
        req.logIn(user, err => {
            if (err)
                return next(err);
            return res.redirect(retUrl);
        });
    })(req, res, next);

})
router.get('/profile', restricted, (req, res, next) => {
    var query = req.query.valid;
    userModel.selectById(req.user.id).then(rows => {
        var expirationVIP = [];
        rows.forEach(item => {
            if (item.userRight === 0)
                item.userRight = "Thành viên thường";
            if (item.userRight === 1) {
                item.userRight = "Thành viên VIP";
                var today = new Date();
                var dateExpiration = new Date(item.expirationVIP);

                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var diffDays = Math.round((dateExpiration.getTime() - today.getTime()) / (oneDay));
                if (diffDays >= 0) {
                    expirationVIP.push({ expDate: diffDays });
                } else {
                    indexModel.updateUserVip((err, post) => {
                        if (err) return res.json({ error: err.message });
                    });
                    expirationVIP.push({ expDate: diffDays });
                }
            }
            if (item.userRight === 2)
                item.userRight = "Phóng viên";
            if (item.userRight === 1)
                item.userRight = "Biên tập viên";
            if (item.userRight === 1)
                item.userRight = "Admin";

        });
        res.render('vwAccount/profile', {
            user: rows,
            expirationVIP: expirationVIP,
            query: query,
        });
    })
})
router.get('/editProfile/:id', restricted, (req, res, next) => {
    var id = req.params.id;
    if (req.user.id != id) {
        return res.redirect('/404');
    }
    userModel.selectById(req.user.id).then(rows => {
        res.render('vwAccount/editProfile', {
            user: rows,
        });
    })
})
router.post('/editProfile/:id', restricted, (req, res, next) => {
    var id = req.params.id;
    if (req.user.id != id) {
        return res.redirect('/404');
    }
    var entity = req.body;

    userModel.editProfile(req.user.id, entity).then(n => {
        res.redirect('/account/profile');
    })
})
router.get('/changePassword', restricted, (req, res, next) => {
    userModel.selectById(req.user.id).then(rows => {
        res.render('vwAccount/changePassword', {
            user: rows,
        });
    })
});
router.post('/changePassword', restricted, (req, res, next) => {
    var saltRounds = 10;
    var entity = req.body;
    var hash = bcrypt.hashSync(req.body.passwordNew2, saltRounds);
    userModel.selectById(req.user.id).then(rows => {
        rows.forEach(item => {
            if (bcrypt.compareSync(req.body.passwordOld, item.password))
            {
                entity.password = hash;
                delete entity.passwordNew2;
                delete entity.passwordNew1;
                delete entity.passwordOld;
                userModel.changePassword(req.user.id, entity).then(n => {
                    var query = 'Đổi password thành công!';
                    res.redirect('/account/profile'+ '/?valid=' + query);
                })
            }else{
                var query = 'Đổi password thất bại!';
                    res.redirect('/account/profile'+ '/?valid=' + query);
            }
        });
    })
})

router.post('/logout', restricted, (req, res, next) => {
    req.logout();
    res.redirect('/account/login');
})
module.exports = router;

