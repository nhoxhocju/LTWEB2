var express = require('express');

var router = express.Router();

var indexModel = require('../models/index.model');
var editorModel = require('../models/editor.model');

//qty = so luong bai
var qty = 10;

router.get("/", (req, res) => {
    response = {
        page: parseInt(req.query.page) || 1,
        pageTopViews: parseInt(req.query.pagetv) || 1,
    }
    var page = response.page;
    var pageTopViews = response.pageTopViews;

    var start = (page - 1) * qty;
    var startPosTopViews = (pageTopViews - 1) * qty;

    indexModel.updateStatusPost((err, post) => {
        if (err) return res.json({ error: err.message });
    });

    indexModel.updateUserVip((err, post)=>{
        if (err) return res.json({ error: err.message });
    });

    indexModel.all(start, qty).then(rows => {
        indexModel.hotNews().then(rows2 => {
            indexModel.topView(startPosTopViews, qty).then(rows3 => {
                indexModel.totalPost().then(rows4 => {
                    editorModel.selectAllTag().then(rows5 => {
                        var totalPage = [];
                        var totalPageTopViews = [];
                        var showPage;
                        var showPageTopViews;
                        var numPage = Math.ceil(rows4[0].totalPost / qty);
                        if (page > numPage) {
                            return res.redirect('404');
                        }
                        for (var i = 1; i <= numPage; i++) {
                            if (numPage == 1) {
                                showPage = 'noShowPage';
                                break;
                            }
                            if (page == i) {
                                totalPage.push({ page: i, choose: 'active', pageTopViews: pageTopViews });
                                continue;
                            }
                            totalPage.push({ page: i, pageTopViews: pageTopViews });
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

                        // ///////////////////////////////////////
                        if (pageTopViews > numPage) {
                            return res.redirect('/404');
                        }
                        for (var i = 1; i <= numPage; i++) {
                            if (numPage == 1) {
                                showPageTopViews = 'noShowPage';
                                break;
                            }
                            if (pageTopViews == i) {
                                totalPageTopViews.push({ pageTopViews: i, choosetv: 'active', page: page });
                                continue;
                            }
                            totalPageTopViews.push({ pageTopViews: i, page: page });
                        }
                        if (pageTopViews == 1 || pageTopViews == 2 || pageTopViews == 3) {
                            totalPageTopViews.splice(5, numPage - 1);
                        }
                        if (pageTopViews != 1 && pageTopViews != 2 && pageTopViews != 3) {
                            var limitLeftTV = pageTopViews - 2;
                            var limitRightTV = pageTopViews + 2;
                            for (var i = 0; i < limitLeftTV - 1; i++) {
                                delete totalPageTopViews[i];
                            }
                            for (var i = limitRightTV; i < totalPageTopViews.length; i++) {
                                delete totalPageTopViews[i];
                            }
                        }
                        var preTopViews = pageTopViews - 1;
                        var nextTopViews = pageTopViews + 1;
                        if (pageTopViews == numPage) {
                            var disNextTopViews = 'disabled';
                            nextTopViews = pageTopViews;
                        }
                        if (pageTopViews == 1) {
                            var disPreTopViews = 'disabled';
                        }
                        res.render('home', {
                            index: rows,
                            hotNews: rows2,
                            topView: rows3,
                            totalPage: totalPage,
                            pre: pre,
                            next: ne,
                            disPre: disPre,
                            disNext: disNext,
                            showPage: showPage,
                            /////////////////
                            totalPageTopViews: totalPageTopViews,
                            preTopViews: preTopViews,
                            nextTopViews: nextTopViews,
                            disNextTopViews: disNextTopViews,
                            disPreTopViews: disPreTopViews,
                            showPageTopViews: showPageTopViews,
                            tags: rows5,
                        });
                    })
                })
            })
        }).catch(error => {
            console.log(error);
            res.end('Lỗi');
        })
    })
})
module.exports = router;

