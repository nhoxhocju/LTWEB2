var express = require('express');
var router = express.Router();
var editorModel = require('../models/editor.model');
var editorRestricted = require('../middlewares/editorRestricted');

router.get("/", editorRestricted, (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var qty = 6;
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
                if(rows3.length == 0){
                    var notCat = 'Bạn không quản lý thể loại nào!'
                }
                console.log(rows3);
                res.render('vwEditorPanel/index', {
                    post: rows,
                    cat : rows3,
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
module.exports = router;