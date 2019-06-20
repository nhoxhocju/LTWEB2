var express = require('express');
var router = express.Router();
var adminRestricted = require('../middlewares/adminRestricted');
var adminPanel = require('../models/admin.model');
var editorModel = require('../models/editor.model');


var qty = 1;
function editStatus(rows) {
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
}

router.get("/", adminRestricted, (req, res) => {
    adminPanel.Statistic_Post().then(rows => {
        adminPanel.Statistic_Cat().then(rows2 => {
            adminPanel.Statistic_Tag().then(rows3 => {
                adminPanel.Statistic_Member().then(rows4 => {
                    adminPanel.Statistic_Writter().then(rows5 => {
                        adminPanel.Statistic_Editor().then(rows6 => {
                            res.render('vwAdminPanel/index', {
                                post: rows[0].totalPost,
                                cat: rows2[0].totalCat,
                                tag: rows3[0].totalTag,
                                member: rows4[0].totalMember,
                                writter: rows5[0].totalWritter,
                                editor: rows6[0].totalEditor,
                            })
                        })
                    })
                })
            })
        })
    })
    router.get('/listPost/', adminRestricted, (req, res) => {
        // indexModel.updateStatusPost((err, post) => {
        //     if (err) return res.json({ error: err.message });
        // });

        var page = parseInt(req.query.page) || 1;
        if (page < 1)
            return res.redirect('404');
        var start = (page - 1) * qty;
        adminPanel.SelectAllPost(start, qty).then(rows => {
            adminPanel.totalAllPost().then(rows2 => {
                var totalPage = [];
                var showPage;
                var notPost;
                if (rows.length == 0) {
                    notPost = 'notPost';
                    showPage = 'noShowPage';
                }
                var numPage = Math.ceil(rows2[0].totalAllPost / qty);
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
                editStatus(rows);
                res.render('vwAdminPanel/vwManagePost/listPost', {
                    post: rows,
                    totalPage: totalPage,
                    pre: pre,
                    next: ne,
                    disPre: disPre,
                    disNext: disNext,
                    showPage: showPage,
                    notPost: notPost,
                });
            })
        })
    })
    router.get('/filter', adminRestricted, (req, res, next) => {
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

        adminPanel.selectPostStatus(status, start, qty).then(rows => {
            adminPanel.totalPostByStatus(status).then(rows2 => {
                var totalPage = [];
                var showPage;
                var notPost;
                if (rows.length == 0) {
                    notPost = 'notPost';
                    showPage = 'noShowPage';
                }
                editStatus(rows);
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
                res.render('vwAdminPanel/vwManagePost/listPost', {
                    post: rows,
                    totalPage: totalPage,
                    pre: pre,
                    next: ne,
                    disPre: disPre,
                    disNext: disNext,
                    showPage: showPage,
                    status: req.query.status,
                    notPost: notPost,
                });
            })
        })
    })
    router.get('/approved/:id', adminRestricted, (req, res, next) => {
        var id = req.params.id;

        adminPanel.findPostById(id).then(rows => {
            if (rows.length == 0)
                return res.render('404');
            editStatus(rows);
            res.render('vwAdminPanel/vwManagePost/approved', {
                post: rows,
            });
        });
    });
    router.post('/approved/:id', adminRestricted, (req, res, next) => {
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
                res.redirect('/admin/listPost');
            })
        })
    })
    router.get('/listCat', adminRestricted, (req, res) => {

        var page = parseInt(req.query.page) || 1;
        if (page < 1)
            return res.redirect('404');
        var start = (page - 1) * qty;
        adminPanel.selectAllCat(start, qty).then(rows => {
            adminPanel.totalAllCat().then(rows2 => {
                var totalPage = [];
                var showPage;
                var numPage = Math.ceil(rows2[0].totalAllCat / qty);
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
                res.render('vwAdminPanel/vwManageCategory/listCat', {
                    cat: rows,
                    totalPage: totalPage,
                    pre: pre,
                    next: ne,
                    disPre: disPre,
                    disNext: disNext,
                    showPage: showPage,
                });
            })
        })
    })
    router.get('/addCat', adminRestricted, (req, res) => {
        if(!req.query.name){
            return res.render('vwAdminPanel/vwManageCategory/addCat');
        }
        var nameCat = req.query.name;
        var entity = req.body;
        entity.name = nameCat;
        adminPanel.addCat(entity).then(n=>{
            res.redirect('/admin/listCat');
        })

        
    })
    router.get('/editCat/:id',adminRestricted, (req, res) => {
        var idCat = req.params.id;
        if(!req.query.name){
            return res.render('vwAdminPanel/vwManageCategory/addCat',{
                editCat : 'editCat'
            });
        }
        var nameCat = req.query.name;
        var entity = req.body;
        entity.name = nameCat;
        adminPanel.editCat(idCat, entity).then(n=>{
            res.redirect('/admin/listCat');
        })
    })

    router.get('/deleteCat/:id',adminRestricted, (req, res) => {
        var idCat = req.params.id;
        if(!req.query.delete){
            return res.render('vwAdminPanel/vwManageCategory/addCat',{
                deleteCat : 'deleteCat'
            });
        }
        delete req.query.delete;
        adminPanel.deletePostByIdCat(idCat);
        adminPanel.deleteCat(idCat).then(n=>{
            res.redirect('/admin/listCat');
        })
    });

})
module.exports = router;