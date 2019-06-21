var express = require('express');

var router = express.Router();

var indexModel = require('../models/index.model');
var tagsModel = require('../models/tags.model');

var qty = 10;

router.get('/:id', (req, res) => {
    var idTag = req.params.id;
    var page = parseInt(req.query.page) || 1;
    var start = (page - 1) * qty;
    tagsModel.selectPostByTag(idTag, start, qty).then(rows => {
        indexModel.hotNews().then(rows2 => {
            tagsModel.totalPostByTag(idTag).then(rows3 => {
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
                var nameTag = [];
                var i = 1;
                rows.forEach(item => {
                    if (i === 1) {
                        nameTag.push({nameTag: item.nameTag});
                    }
                    i++;
                });
                res.render('tags', {
                    tags: rows,
                    nameTag: nameTag,
                    hotNews: rows2,
                    totalPage: totalPage,
                    pre: pre,
                    next: ne,
                    disPre: disPre,
                    disNext: disNext,
                    showPage: showPage,
                    notPost: notPost,
                });
                // })
            })
        }).catch(error => {
            console.log(error);
            res.end('Lỗi');
        })
    })

})
module.exports = router;
