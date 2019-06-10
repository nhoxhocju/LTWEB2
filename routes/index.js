var express = require('express');

var router = express.Router();

var indexModel = require('../models/index.model');
router.get("/", (req, res) => {
    indexModel.all().then(rows => {
        indexModel.hotNews().then(rows2 => {
            indexModel.topView().then(rows3 => {
                res.render('home', {
                    index: rows,
                    hotNews: rows2,
                    topView: rows3
                });
            })
        }).catch(error => {
            console.log(error);
            res.end('Lỗi');
        })
    })
})
module.exports = router;

