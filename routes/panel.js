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

var qty = 1;

router.get('/', writterRetricted, (req, res, next) => {

    var page = parseInt(req.query.page) || 1;
    if (page < 1)
        return res.redirect('404');
    
    var start = (page - 1) * qty;

    panelModel.selectPostByAuthor(req.user.id, start, qty).then(rows => {
        panelModel.totalPostByAuthor(req.user.id).then(rows2 => {
            var totalPage = [];
            var showPage;

            if (rows.length == 0) {
                var notPost = 'notPost';
                showPage = 'noShowPage';
            }
            rows.forEach(item => {
                if (item.status == 0) {
                    item.status = 'Chờ duyệt';
                } else if (item.status == 1) {
                    item.status = 'Chờ xuất bản';
                } else if (item.status == 2) {
                    item.status = 'Đã xuất bản';
                } else if (item.status == -1) {
                    item.status = 'Bị từ chối';
                }
            });

            var numPage = Math.ceil(rows2[0].totalPost / qty);
            if (page > numPage && page != 1) {
                return res.redirect('404');
            }
            for (var i = 1; i <= numPage; i++) {
                if (numPage == 1) {
                    showPage = 'noShowPage';
                    break;
                }
                if (page == i) {
                    totalPage.push({ page: i, choose: 'active' });
                    continue;
                }
                totalPage.push({ page: i });
            }
            if (page == 1 || page == 2 || page == 3) {
                totalPage.splice(5, numPage - 1);
            }
            if (page != 1 && page != 2 && page != 3) {
                var limitLeft = page - 2;
                var limitRight = page + 2;
                for (var i = 0; i < limitLeft - 1; i++) {
                    delete totalPage[i];
                }
                for (var i = limitRight; i < totalPage.length; i++) {
                    delete totalPage[i];
                }
            }
            var pre = page - 1;
            var ne = page + 1;
            if (page == numPage) {
                var disNext = 'disabled';
                ne = page;
            }
            if (page == 1) {
                var disPre = 'disabled';
            }
            res.render('vwPanel/panel', {
                panel: rows,
                notPost: notPost,
                totalPage: totalPage,
                pre: pre,
                next: ne,
                disPre: disPre,
                disNext: disNext,
                showPage: showPage
            });
        })
    })
})

router.get('/filter', writterRetricted, (req, res, next) => {
    response = {
        status: req.query.status,
        page: parseInt(req.query.page) || 1,
    }
    var status = response.status;
    var page = response.page;
    if (status != 'pendding' && status != 'reject' && status != 'waitPublish' && status != 'publish')
        return res.render('404');

    if (status == 'pendding')
        status = 0;
    else if (status == 'reject')
        status = -1;
    else if (status == 'waitPublish')
        status = 1;
    else if (status == 'publish')
        status = 2;
    if (page < 1)
        return res.redirect('404');
    
    var start = (page - 1) * qty;

    panelModel.showPostByAuthorAndStatus(req.user.id, status, start, qty).then(rows => {
        panelModel.totalPostByAuthorAndStatus(req.user.id, status).then(rows2 => {
            var totalPage = [];
            var showPage;

            if (rows.length == 0) {
                var notPost = 'notPost';
                showPage = 'noShowPage';
            }
            rows.forEach(item => {
                if (item.status == 0) {
                    item.status = 'Chờ duyệt';
                } else if (item.status == 1) {
                    item.status = 'Chờ xuất bản';
                } else if (item.status == 2) {
                    item.status = 'Đã xuất bản';
                } else if (item.status == -1) {
                    item.status = 'Bị từ chối';
                }
            });
            if (status == 0)
                status = 'Chờ duyệt';
            else if (status == -1)
                status = 'Bị từ chối';
            else if (status == 1)
                status = 'Chờ xuất bản';
            else if (status == 2)
                status = 'Đã xuất bản';


            var numPage = Math.ceil(rows2[0].totalPost / qty);
            if (page > numPage && page != 1) {
                return res.redirect('404');
            }
            for (var i = 1; i <= numPage; i++) {
                if (numPage == 1) {
                    showPage = 'noShowPage';
                    break;
                }
                if (page == i) {
                    totalPage.push({ page: i, choose: 'active', status: req.query.status });
                    continue;
                }
                totalPage.push({ page: i, status: req.query.status });
            }
            if (page == 1 || page == 2 || page == 3) {
                totalPage.splice(5, numPage - 1);
            }
            if (page != 1 && page != 2 && page != 3) {
                var limitLeft = page - 2;
                var limitRight = page + 2;
                for (var i = 0; i < limitLeft - 1; i++) {
                    delete totalPage[i];
                }
                for (var i = limitRight; i < totalPage.length; i++) {
                    delete totalPage[i];
                }
            }
            var pre = page - 1;
            var ne = page + 1;
            if (page == numPage) {
                var disNext = 'disabled';
                ne = page;
            }
            if (page == 1) {
                var disPre = 'disabled';
            }
            res.render('vwPanel/panel', {
                panel: rows,
                notPost: notPost,
                statusPost: status,
                totalPage: totalPage,

                pre: pre,
                next: ne,
                disPre: disPre,
                disNext: disNext,
                showPage: showPage,
                status: req.query.status,

            });
        })
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
        // var today = req.app.get('today');

        var entity = req.body;
        entity.image = '/public/image/' + req.file.filename;
        entity.id_author = req.user.id;

        var today = req.app.get('today');
        entity.date_post = today;


        panelModel.add(entity, (err, post) => {
            if (err) return res.json({ error: err.message });
        }).then(n=>{
            res.redirect('/panel');
        })
    })
});

router.get('/update', writterRetricted, (req, res, next) => {
    var page = parseInt(req.query.page) || 1;
    if (page < 1)
        return res.redirect('404');
    
    var start = (page - 1) * qty;
    panelModel.selectPostByAuthorAndStatus(req.user.id, start, qty).then(rows => {
        panelModel.totalPostByAuthorAndStatus(req.user.id).then(rows2 => {
            var totalPage = [];
            var showPage;

            if (rows.length == 0) {
                var notPost = 'notPost';
                showPage = 'noShowPage';
            }

            var numPage = Math.ceil(rows2[0].totalPost / qty);
            if (page > numPage && page != 1) {
                return res.redirect('404');
            }
            for (var i = 1; i <= numPage; i++) {
                if (numPage == 1) {
                    showPage = 'noShowPage';
                    break;
                }
                if (page == i) {
                    totalPage.push({ page: i, choose: 'active' });
                    continue;
                }
                totalPage.push({ page: i });
            }
            if (page == 1 || page == 2 || page == 3) {
                totalPage.splice(5, numPage - 1);
            }
            if (page != 1 && page != 2 && page != 3) {
                var limitLeft = page - 2;
                var limitRight = page + 2;
                for (var i = 0; i < limitLeft - 1; i++) {
                    delete totalPage[i];
                }
                for (var i = limitRight; i < totalPage.length; i++) {
                    delete totalPage[i];
                }
            }
            var pre = page - 1;
            var ne = page + 1;
            if (page == numPage) {
                var disNext = 'disabled';
                ne = page;
            }
            if (page == 1) {
                var disPre = 'disabled';
            }
            rows.forEach(item => {
                if (item.status == 0) {
                    item.status = 'Chờ duyệt';

                } else if (item.status == -1) {
                    item.status = 'Bị từ chối';
                }

            });
            res.render('vwPanel/update', {
                panel: rows,
                notPost: notPost,
                totalPage: totalPage,
                pre: pre,
                next: ne,
                disPre: disPre,
                disNext: disNext,
                showPage: showPage
            });
        })
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
        if (!req.file) {
            delete entity.image;
        } else {
            entity.image = '/public/image/' + req.file.filename;
        }
        if (entity.submitAgain) {
            entity.status = 0;
            entity.cause_not_approved = '';
        }

        delete entity.submitAgain;

        entity.id_author = req.user.id;

        var today = req.app.get('today');
        entity.date_post = today;


        panelModel.editPostByAuthorAndId(req.user.id, id, entity, (err, post) => {
            if (err) return res.json({ error: err.message });

        }).then(n => {
            res.redirect('/panel/update');
        })
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

