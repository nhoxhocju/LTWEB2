var express = require('express');

var router = express.Router();

var categoryModel = require('../models/category.model');
var postModel = require('../models/index.model');

router.get("/:idCat", (req, res) => {

    var idCategory = req.params.idCat;
    var page = parseInt(req.query.page) || 1;
    var qty = 4;
    var start = (page - 1) * qty;
    categoryModel.selectPostByCategory(idCategory, start, qty).then(rows => {
        postModel.hotNews().then(rows2 => {
            categoryModel.totalPostOfCategory(idCategory).then(rows3 => {
                categoryModel.showCategoryById(idCategory).then(rows4 => {
                    var totalPage = [];
                    var showPage;
                    var numPage = Math.ceil(rows3[0].totalPost / qty);
                    if (rows.length == 0 && page == 1) {
                        var notPost = 'notPost';
                    }
                    if (page > numPage && page != 1) {
                        return res.redirect('/404');
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
                    res.render('vwCategory/index', {
                        index: rows,
                        hotNews: rows2,
                        category : rows4,
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
        }).catch(error => {
            console.log(error);
            res.end('Lỗi');
        })
    })
})
module.exports = router;

