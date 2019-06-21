var express = require('express');
var router = express.Router();
var adminRestricted = require('../middlewares/adminRestricted');
var indexModel = require('../models/index.model');
var searchModel = require('../models/search.model');

var qty = 10;
router.get('/', (req, res) => {
    response = {
        keyword: req.query.keyword,
        page: parseInt(req.query.page) || 1,
    }
    var keyword = response.keyword;
    var page = response.page;

    if (page < 1)
        return res.redirect('404');

    var start = (page - 1) * qty;

    searchModel.search(keyword, start, qty).then(rows => {
        searchModel.totalSearch(keyword).then(rows2 => {
            indexModel.hotNews().then(rows3 => {
                var totalPage = [];
                var showPage;
                var notPost
                if (rows.length == 0) {
                    notPost = 'notPost';
                    showPage = 'noShowPage';
                }

                var numPage = Math.ceil(rows2[0].totalSearch / qty);
                if (page > numPage && page != 1) {
                    return res.redirect('404');
                }
                for (var i = 1; i <= numPage; i++) {
                    if (numPage == 1) {
                        showPage = 'noShowPage';
                        break;
                    }
                    if (page == i) {
                        totalPage.push({ page: i, choose: 'active', keyword: keyword });
                        continue;
                    }
                    totalPage.push({ page: i, keyword: keyword });
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
                res.render('search', {
                    post: rows,
                    hotNews: rows3,
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
});

module.exports = router;