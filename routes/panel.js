var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var restricted = require('../middlewares/restricted');
var writterRetricted = require('../middlewares/writterRestricted');


var panelModel = require('../models/panel.model');

var router = express.Router();
var session = require('express-session');


router.get('/', writterRetricted, (req, res, next) => {
    panelModel.selectPostByAuthor(req.user.id).then(rows => {
        res.render('vwPanel/panel', {
            panel: rows
        });
    })

})

router.get('/insert', writterRetricted, (req, res, next) => {
    panelModel.selectAllCategory().then(rows => {
        res.render('vwPanel/insert', {
            category: rows
        });
    })
})

router.get('/update/:id', writterRetricted, (req, res, next) => {
    var id = req.params.id;
    panelModel.selectPostByAuthorAndId(req.user.id, id).then(rows => {
        panelModel.selectAllCategory().then(rows2 => {
            res.render('vwPanel/update', {
                post: rows,
                categories: rows2
            });
        });
    });
})

router.get('/delete', writterRetricted,
    (req, res, next) => {
        res.render('vwPanel/delete');
    })


module.exports = router;

