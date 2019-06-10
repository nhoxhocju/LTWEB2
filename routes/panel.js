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


router.get('/', (req, res, next) => {
    res.render('vwPanel/panel')
})

router.get('/insert', (req, res, next) =>{
    res.render('vwPanel/insert');
})

router.get('/update', (req, res, next) =>{
    res.render('vwPanel/update');
})

router.get('/delete', (req, res, next) =>{
    res.render('vwPanel/delete');
})


module.exports = router;

