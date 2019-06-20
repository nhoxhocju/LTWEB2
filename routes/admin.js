var express = require('express');
var router = express.Router();
var adminRestricted = require('../middlewares/adminRestricted');
var adminPanel = require('../models/admin.model');
var editorModel = require('../models/editor.model');
var indexModel = require('../models/index.model');


var qty = 3;
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
        editorModel.selectAllTag().then(rows2 => {
            if (rows.length == 0)
                return res.render('404');
            editStatus(rows);
            res.render('vwAdminPanel/vwManagePost/approved', {
                post: rows,
                tag: rows2,
            });
        });
    })
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
            delete entity.id_tag;
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
    if (!req.query.name) {
        return res.render('vwAdminPanel/vwManageCategory/addCat');
    }
    var nameCat = req.query.name;
    var entity = req.body;
    entity.name = nameCat;
    adminPanel.addCat(entity).then(n => {
        res.redirect('/admin/listCat');
    })


})
router.get('/editCat/:id', adminRestricted, (req, res) => {
    var idCat = req.params.id;
    if (!req.query.name) {
        return res.render('vwAdminPanel/vwManageCategory/addCat', {
            editCat: 'editCat'
        });
    }
    var nameCat = req.query.name;
    var entity = req.body;
    entity.name = nameCat;
    adminPanel.editCat(idCat, entity).then(n => {
        res.redirect('/admin/listCat');
    })
})

router.get('/deleteCat/:id', adminRestricted, (req, res) => {
    var idCat = req.params.id;
    if (!req.query.delete) {
        return res.render('vwAdminPanel/vwManageCategory/addCat', {
            deleteCat: 'deleteCat'
        });
    }
    delete req.query.delete;
    adminPanel.findAllCommentOfCat(idCat).then(rows => {
        for (var i = 0; i < rows.length; i++) {
            adminPanel.deleteCommentById(rows[i].idcm).then(n => {
            })

        }
        adminPanel.deletePostByIdCat(idCat).then(n => {
            adminPanel.deleteCat(idCat).then(n => {
                res.redirect('/admin/listCat');
            })
        })
    });
})
router.get('/listTags', adminRestricted, (req, res) => {

    var page = parseInt(req.query.page) || 1;
    if (page < 1)
        return res.redirect('404');
    var start = (page - 1) * qty;
    adminPanel.selectAllTag(start, qty).then(rows => {
        adminPanel.totalTag().then(rows2 => {
            var totalPage = [];
            var showPage;
            var numPage = Math.ceil(rows2[0].totalTag / qty);
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
            res.render('vwAdminPanel/vwManageTag/listTag', {
                tags: rows,
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
router.get('/addTag', adminRestricted, (req, res) => {
    if (!req.query.nameTag) {
        return res.render('vwAdminPanel/vwManageTag/addTag');
    }
    var nameTag = req.query.nameTag;
    var entity = req.body;
    entity.nameTag = nameTag;
    adminPanel.addTag(entity).then(n => {
        res.redirect('/admin/listTags');
    })
})
router.get('/editTag/:id', adminRestricted, (req, res) => {
    var idTag = req.params.id;
    if (!req.query.nameTag) {
        return res.render('vwAdminPanel/vwManageTag/addTag', {
            editTag: 'editTag'
        });
    }
    var nameTag = req.query.nameTag;
    var entity = req.body;
    entity.nameTag = nameTag;
    adminPanel.editTag(idTag, entity).then(n => {
        res.redirect('/admin/listTags');
    })
})
router.get('/deleteTag/:id', adminRestricted, (req, res) => {
    var idTag = req.params.id;
    if (!req.query.delete) {
        return res.render('vwAdminPanel/vwManageTag/addTag', {
            deleteTag: 'deleteTag'
        });
    }
    delete req.query.delete;
    id_tag = 1;
    adminPanel.editIdTagOfPost(idTag).then(n => {
        adminPanel.deleteTagById(idTag).then(n => {
            res.redirect('/admin/listTags');
        })
    })
})
router.get('/listUsers', adminRestricted, (req, res) => {

    var page = parseInt(req.query.page) || 1;
    if (page < 1)
        return res.redirect('404');
    var start = (page - 1) * qty;
    adminPanel.selectAllUser(start, qty).then(rows => {
        var users = [];
        rows.forEach(item => {
            if (item.userRight === 0) {
                item.userRight = 'Thành viên thường';
                users.push({ id: item.id, name: item.name, userRight: item.userRight });
            }
            if (item.userRight === 1) {
                item.userRight = 'Thành viên VIP';
                users.push({ id: item.id, name: item.name, userRight: item.userRight });
            }
            if (item.userRight === 2) {
                item.userRight = 'Phóng viên';
                users.push({ id: item.id, name: item.name, userRight: item.userRight });
            }
            if (item.userRight === 3) {
                item.userRight = 'Biên tập viên';
                users.push({ id: item.id, name: item.name, userRight: item.userRight, isEditor: 'isEditor' });
            }
            if (item.userRight === 9) {
                item.userRight = 'Admin';
                users.push({ id: item.id, name: item.name, userRight: item.userRight });
            }
        });
        adminPanel.totalAllUser().then(rows2 => {
            var totalPage = [];
            var showPage;
            var numPage = Math.ceil(rows2[0].totalUser / qty);
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
            res.render('vwAdminPanel/vwManageUser/listUser', {
                users: users,
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
router.get('/editUser/:id', adminRestricted, (req, res) => {
    var idUser = req.params.id;
    var success = req.query.valid;
    var notSetRight;
    if (req.user.id == idUser)
        notSetRight = 'noSetRight';
    adminPanel.findUserById(idUser).then(rows => {
        var expirationVIP = [];
        rows.forEach(item => {
            if (item.userRight === 0)
                item.userRight = 'Thành viên thường';
            if (item.userRight === 1) {
                item.userRight = 'Thành viên VIP';
                var today = new Date();
                var dateExpiration = new Date(item.expirationVIP);

                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var diffDays = Math.round((dateExpiration.getTime() - today.getTime()) / (oneDay));
                if (diffDays >= 0) {
                    expirationVIP.push({ expDate: diffDays });
                } else {
                    indexModel.updateUserVip((err, post) => {
                        if (err) return res.json({ error: err.message });
                    });
                    expirationVIP.push({ expDate: diffDays });
                    
                }
            }
            if (item.userRight === 2)
                item.userRight = 'Phóng viên';
            if (item.userRight === 3)
                item.userRight = 'Biên tập viên';
            if (item.userRight === 9)
                item.userRight = 'Admin';

        });
        res.render('vwAdminPanel/vwManageUser/editUser', {
            user: rows,
            success: success,
            notSetRight: notSetRight,
            expirationVIP: expirationVIP,
        })
    })
})
router.post('/editUser/:id', adminRestricted, (req, res) => {
    var idUser = req.params.id;
    var entity = req.body;

    // var today = req.app.get('today');


    if (entity.userRight == 1 && entity.expirationVIP == null) {
        var date = new Date();
        var oneDay = 24 * 60 * 60 * 1000;
        var day = date.setTime(date.getTime()+(7*(oneDay)));
        var expDate = new Date(day);
        entity.expirationVIP = expDate;
    }else if(entity.userRight != 1 && entity.userRight != 'default'){
        entity.expirationVIP = null;
    }
    if (entity.userRight == 'default'){
        delete entity.userRight;
        delete entity.expirationVIP;
    }

    adminPanel.editUserByIdUser(idUser, entity, (err, post) => {
        if (err) return res.json({ error: err.message });
    }).then(n => {
        var success = 'Sửa thành công thành viên!';
        res.redirect('/admin/editUser/' + idUser + '/?valid=' + success);
    })
})
router.get('/setEditorCat/:id', adminRestricted, (req, res) => {
    var idUser = req.params.id;
    var success = req.query.valid;
    adminPanel.findUserById(idUser).then(rows => {
        adminPanel.selectAllCategory().then(rows2 => {
            var manageCat = [];
            rows.forEach(item => {
                if (item.userRight !== 3) {
                    return res.redirect('/404');
                }
                manageCat.push({ manageCategory: item.manageCategory });
            });
            if (manageCat[0] === undefined) {
                return 0;
            }
            adminPanel.findCatByUser(manageCat[0].manageCategory).then(rows3 => {
                if (rows3.length === 0)
                    rows3.push({ name: 'Bạn không quản lý thể loại nào!' });
                res.render('vwAdminPanel/vwManageUser/setEditor', {
                    user: rows,
                    listcat: rows2,
                    catUser: rows3,
                    success: success,
                })
            })

        })
    })
})
router.post('/setEditorCat/:id', adminRestricted, (req, res) => {
    var idUser = req.params.id;
    var entity = req.body;
    if (entity.manageCategory === 'default') {
        adminPanel.findUserById(idUser).then(rows => {
            entity.manageCategory = rows[0].manageCategory;
            adminPanel.editUserByIdUser(idUser, entity, (err, post) => {
                if (err) return res.json({ error: err.message });
            }).then(n => {
                var success = 'Phân công thể loại thành công!';
                res.redirect('/admin/setEditorCat/' + idUser + '/?valid=' + success);
            })
        })
    } else {
        adminPanel.editUserByIdUser(idUser, entity, (err, post) => {
            if (err) return res.json({ error: err.message });
        }).then(n => {
            var success = 'Phân công thể loại thành công!';
            res.redirect('/admin/setEditorCat/' + idUser + '/?valid=' + success);
        })
    }
})
module.exports = router;