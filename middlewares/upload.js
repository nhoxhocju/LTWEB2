// var multer = require('multer');
// var panelModel = require('../models/panel.model');
// var restricted = require('./restricted');
// var authmdw = require('./auth.mdw');
// module.exports = function(app) {
//     var storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, './public/image')
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.originalname)
//         }
//     });

//     // app.post('/panel/insert', restricted, (req, res, next) => {
//     //     multer({ storage }).single('image')(req, res, err => {
//     //         if (err) {
//     //             return res.json({
//     //                 error: err.message
//     //             });
//     //         }
//     //         var entity = req.body;
//     //         entity.image = '/public/image/' + req.file.filename;
//     //         entity.id_author = req.user.id;


//     //         panelModel.add(entity, (err, post) => {
//     //             if (err) return res.json({ error: err.message });
//     //             // console.log(post);
//     //         });
//     //         var success = 'Thêm thành công bài viết!';
//     //         res.redirect('/panel/insert?valid=' + success);
//     //     })
//     // });

//     app.post('/panel/edit/:id', restricted, (req, res, next) => {
//         var id = req.params.id;
//         multer({ storage }).single('image')(req, res, err => {
//             if (err) {
//                 return res.json({
//                     error: err.message
//                 });
//             }
//             var entity = req.body;
//             entity.image = '/public/image/' + req.file.filename;
//             entity.id_author = req.user.id;
//             // delete entity.id;
            

//             panelModel.editPostByAuthorAndId(req.user.id, id, entity, (err, post) => {
//                 if (err) return res.json({ error: err.message });
                
//             });
//             console.log(entity);
//             var success = 'Thêm thành công bài viết!';
//             res.redirect('/panel/reloadEdit/'+id);
//         })
//     })

// }