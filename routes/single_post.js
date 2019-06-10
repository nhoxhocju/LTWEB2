var express = require('express');

var router = express.Router();

// var indexModel = require('../models/index.model');
var singlePost = require('../models/single_post.model');

router.get('/:id', (req, res) => {
    var id = req.params.id;
    singlePost.updateView(id);
    singlePost.single(id).then(rows => {
        singlePost.selectView(id).then(rows2 => {
            if (rows.length > 0) {
                res.render('single_post', {
                    single: rows[0],
                    view : rows2[0]
                });
            } else {
                res.render('404');
            }
        })

    })

})
router.get('/', (req, res) => {
    res.render('404', {
        layout: false
    });
})

module.exports = router;

