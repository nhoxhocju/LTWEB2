var express = require('express');

var router = express.Router();

// var indexModel = require('../models/index.model');
var singlePost = require('../models/single_post.model');

router.get('/:id', (req, res) => {
    var id = req.params.id;
    var page = parseInt(req.query.page) || 1;
    var qty = 2;
    var start = (page - 1) * qty;
    singlePost.updateView(id);
    singlePost.single(id).then(rows => {
        singlePost.selectView(id).then(rows2 => {
            singlePost.selectAllComment(id, start, qty).then(rows3 => {
                singlePost.totalCommentOfPost(id).then(rows4 => {
                    singlePost.selectPostLikeCategory(rows[0].idCat).then(rows5 => {
                        var totalPage = [];
                        var showPage;
                        var numPage = Math.ceil(rows4[0].totalComment / qty);
                        if (rows3.length == 0 && page == 1) {
                            var notComment = 'notComment';
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

                        if (rows.length > 0) {
                            res.render('single_post', {
                                single: rows[0],
                                view: rows2[0],
                                comment: rows3,
                                postLikeCat : rows5,
                                totalPage: totalPage,
                                pre: pre,
                                next: ne,
                                disPre: disPre,
                                disNext: disNext,
                                showPage: showPage,
                                notComment: notComment,
                            });
                        } else {
                            res.render('/404');
                        }
                    })
                })
            })
        })

    })

});
router.post('/:id', (req, res) => {
    var id_post = req.params.id;
    var page = parseInt(req.query.page) || 1;
    var qty = 2;
    var start = (page - 1) * qty;
    var entity = req.body;
    entity.id_post = id_post;
    entity.id_user = req.user.id;
    singlePost.addComment(entity, (err, post) => {
        if (err) return res.json({ error: err.message });
    });
    singlePost.selectAllComment(id_post, start, qty);
    // var success = 'Thêm thành công bài viết!';
    res.redirect('/single_post/' + id_post);
});
router.get('/', (req, res) => {
    res.render('404', {
        layout: false
    });
})

module.exports = router;

