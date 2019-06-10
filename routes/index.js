var express = require('express');

var router = express.Router();

var indexModel = require('../models/index.model');

// var dateFormat = require('dateformat');
// var now = new Date();

router.get("/", (req, res) => {
    indexModel.all().then(rows => {
        indexModel.topView().then(rows2 => {
            res.render('home', {
                index: rows,
                topView : rows2
            });
        }).catch(error => {
            console.log(error);
            res.end('Ko thể kn database');
        })
    })

        // res.render('home', {
        //     index: rows
        // });
    // })
    //     .catch(error => {
    //         console.log(error);
    //         res.end('Ko thể kn database');
    //     })
    // indexModel.topView()
    // .then(rows => {
    //     res.redirect('home',{
    //         view: rows
    //     });
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.end('Ko thể kn database');
    // })
    // data = {
    //     row : indexModel.all(),
    //     row1: indexModel.topView()
    // }
    // res.render('home',{
    //     data : data
    // })
})
module.exports = router;

