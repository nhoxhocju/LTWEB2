var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var multer = require('multer');

var restricted = require('../middlewares/restricted');
var writterRetricted = require('../middlewares/writterRestricted');
var panelModel = require('../models/panel.model');
var session = require('express-session');

var router = express.Router();

// Upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});


router.get('/', writterRetricted, (req, res, next) => {
    panelModel.selectPostByAuthor(req.user.id).then(rows => {
        rows.forEach(item => {
            if (item.status == 0) {
                item.status = 'Chờ duyệt';
            } else if (item.status == 1) {
                item.status = 'Chờ đăng bài';
            } else if (item.status == 2) {
                item.status = 'Đã xuất bản';
            } else if (item.status == -1) {
                item.status = 'Bị từ chối';
            }

        });
        res.render('vwPanel/panel', {
            panel: rows,
            success: req.query.valid
        });
    })
})

router.get('/insert', writterRetricted, (req, res, next) => {
    panelModel.selectAllCategory().then(rows => {
        res.render('vwPanel/insert', {
            category: rows,
            success: req.query.valid
        });
    })
})

router.post('/insert', restricted, (req, res, next) => {
    multer({ storage }).single('image')(req, res, err => {
        if (err) {
            return res.json({
                error: err.message
            });
        }
        var entity = req.body;
        entity.image = '/public/image/' + req.file.filename;
        entity.id_author = req.user.id;


        panelModel.add(entity, (err, post) => {
            if (err) return res.json({ error: err.message });
        });
        var success = 'Thêm thành công bài viết!';
        res.redirect('/panel/insert?valid=' + success);
    })
});

router.get('/update', writterRetricted, (req, res, next) => {
    panelModel.selectPostByAuthorAndStatus(req.user.id).then(rows => {
        rows.forEach(item => {
            if (item.status == 0) {
                item.status = 'Chờ duyệt';

            } else if (item.status == -1) {
                item.status = 'Bị từ chối';
            }

        });
        res.render('vwPanel/update', {
            panel: rows,
        });
    })
})

router.get('/edit/:id', writterRetricted, (req, res, next) => {
    var id = req.params.id;

    panelModel.selectPostByAuthorAndIdAndStatus(req.user.id, id).then(rows => {
        if (rows.length == 0)
            return res.render('404');
        panelModel.selectAllCategory().then(rows2 => {
            res.render('vwPanel/update_post', {
                post: rows,
                categories: rows2
            });
        });
    });
})

router.post('/edit/:id', restricted, (req, res, next) => {
    var id = req.params.id;
    multer({ storage }).single('image')(req, res, err => {
        if (err) {
            return res.json({
                error: err.message
            });
        }
        var entity = req.body;
        entity.image = '/public/image/' + req.file.filename;
        
        entity.id_author = req.user.id;


        panelModel.editPostByAuthorAndId(req.user.id, id, entity, (err, post) => {
            if (err) return res.json({ error: err.message });

        });
        return res.redirect('/panel/reloadEdit');
    })
})

router.get('/reloadEdit', writterRetricted, (req, res, next) => {
    panelModel.selectPostByAuthorAndStatus(req.user.id).then(rows => {
        rows.forEach(item => {
            if (item.status == 0) {
                item.status = 'Chờ duyệt';

            } else if (item.status == -1) {
                item.status = 'Bị từ chối';
            }

        });
        res.redirect('/panel/update');
    })

})

router.get('/delete', writterRetricted, (req, res, next) => {
    res.render('404');
})

router.get('/delete/:id', writterRetricted, (req, res, next) => {
    res.render('vwPanel/delete');
})

router.post('/delete/:id', writterRetricted, (req, res, next) => {
    var id = req.params.id;
    var entity = [];
    entity.push = id;
    entity.push = req.user.id;
    panelModel.deletePostByAuthorAndId(req.user.id, id).then(rows => {
        var success = 'Xóa thành công!';
        res.redirect('/panel?valid=' + success);
    });
})



module.exports = router;

