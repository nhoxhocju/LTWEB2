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
    })
        .catch(error => {
            res.end(error);
        })
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
router.get('/profile', restricted, (req, res, next) =>{
    res.end('PROFILE');
})


router.post('/logout', restricted, (req, res, next) => {
    req.logout();
    res.redirect('/account/login');
})
module.exports = router;

