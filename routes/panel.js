var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var restricted = require('../middlewares/restricted');


var panelModel = require('../models/panel.model');

var router = express.Router();
var session = require('express-session');


router.get('/',restricted, (req, res, next) => {
    panelModel.all().then(rows=>{
        res.render('vwPanel/panel', {
            panel : rows
        });
    })
    
})

router.get('/insert',restricted, (req, res, next) =>{
    res.render('vwPanel/insert');
})

router.get('/update',restricted, (req, res, next) =>{
    res.render('vwPanel/update');
})

router.get('/delete',restricted,
 (req, res, next) =>{
    res.render('vwPanel/delete');
})


module.exports = router;

