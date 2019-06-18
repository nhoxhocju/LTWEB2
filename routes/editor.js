var express = require('express');
var router = express.Router();
var editorModel = require('../models/editor.model');
var editorRestricted = require('../middlewares/editorRestricted');
var panelModel = require('../models/panel.model');
var indexModel = require('../models/index.model');

var handlebars = require('handlebars');
handlebars.registerHelper('dateformat', require('helper-dateformat'))

var qty = 1;
router.get("/", editorRestricted, (req, res) => {

    indexModel.updateStatusPost((err, post) => {
        if (err) return res.json({ error: err.message });
    });

    var page = parseInt(req.query.page) || 1;
    if (page < 1)
        return res.redirect('404');
    var start = (page - 1) * qty;
    editorModel.selectAllPostOfEditorAndManageCategory(req.user.id, start, qty).then(rows => {
        editorModel.totalPost(req.user.id).then(rows2 => {
            editorModel.selectCategoryByManageCat(req.user.manageCategory).then(rows3 => {
                var totalPage = [];
                var showPage;
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
                    } else if (item.status == 1) {
                        item.status = 'Chờ xuất bản';
                    } else if (item.status == 2) {
                        item.status = 'Đã xuất bản';
                    } else if (item.status == -1) {
                        item.status = 'Bị từ chối';
                    }

                });
                if (rows3.length == 0) {
                    var notCat = 'Bạn không quản lý thể loại nào!'
                }
                res.render('vwEditorPanel/index', {
                    post: rows,
                    cat: rows3,
                    totalPage: totalPage,
                    pre: pre,
                    next: ne,
                    disPre: disPre,
                    disNext: disNext,
                    showPage: showPage,
                    notCat: notCat,
                });
            })
        })
    })
})

router.get('/filter', editorRestricted, (req, res, next) => {
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

    editorModel.selectPostOfEditorAndManageCategoryAndStatus(req.user.id, status, start, qty).then(rows => {
        editorModel.totalPostByStatus(req.user.id, status).then(rows2 => {
            editorModel.selectCategoryByManageCat(req.user.manageCategory).then(rows3 => {
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
                if (rows3.length == 0) {
                    var notCat = 'Bạn không quản lý thể loại nào!'
                }
                res.render('vwEditorPanel/index', {
                    post: rows,
                    cat: rows3,
                    totalPage: totalPage,
                    pre: pre,
                    next: ne,
                    disPre: disPre,
                    disNext: disNext,
                    showPage: showPage,
                    notCat: notCat,
                    status: req.query.status,
                });
            })
        })
    })

})
router.get('/approved/:id', editorRestricted, (req, res, next) => {
    var id = req.body.id;
    var id = req.params.id;

    editorModel.findPostByEditorAndIdPost(req.user.id, id).then(rows => {
        if (rows.length == 0)
            return res.render('404');
        panelModel.selectAllCategory().then(rows2 => {
            res.render('vwEditorPanel/approved', {
                post: rows,
                categories: rows2
            });
        });
    });
})

router.post('/approved/:id', editorRestricted, (req, res, next) => {
    var entity = req.body;

    editorModel.findIdCatByNameCat(entity.id_category).then(rows => {
        if (entity.ok) {
            var today = new Date();
            var date = new Date(entity.date_post);

            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var diffDays = Math.round((date.getTime() - today.getTime()) / (oneDay));

            if (diffDays <= 0) {
                entity.status = 2;
            } else entity.status = 1;
            delete entity.image;
            if (entity.cause_not_approved.length != 0)
                entity.cause_not_approved = '';
        }
        if (entity.reject) {
            entity.status = -1;
            if (entity.cause_not_approved.length == 0)
                entity.cause_not_approved = 'Người kiểm duyệt không đưa ra lý do';
            delete entity.image;
        }


        entity.id_category = rows[0].id;
        delete entity.reject;
        delete entity.ok;
        editorModel.approvedPostByAndId(req.params.id, entity, (err, post) => {
            if (err) return res.json({ error: err.message });
        }).then(n => {
            res.redirect('/EditorPage/');
        })
    })
})

module.exports = router;