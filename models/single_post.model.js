var db = require('../utils/db');
module.exports = {
    single : id =>{
        // var sql = 'select * form post';
        return db.load('select c.name, c.id as idCat, p.* from category c inner join post p on c.id = p.id_category where p.id = ' + id);
    },
    updateView: id =>{
        // var views = views + 1;
        return db.updateView('UPDATE post SET views = views + 1 WHERE id = ' +id);
    },
    selectView : id =>{
        return db.load('select views from post where id = ' + id);
    },
    addComment : entity =>{
        return db.add('comment', entity);
    },
    selectAllComment : (id ,pos, qty) =>{
        return db.load(`select c.*, u.name from user u inner join comment c on u.id = c.id_user where c.id_post = ${id} order by id desc limit ${pos},${qty}`);
    },
    totalCommentOfPost: idPost =>{
        return db.load(`SELECT count(id) as totalComment FROM Comment where id_post = ${idPost}`);
    },
    selectPostLikeCategory: idCat => {
        // return db.load(`SELECT * FROM post AS p1 JOIN (SELECT CEIL(RAND() * (SELECT MAX(id) FROM post)) AS id) AS p2 
        // WHERE p1.id >= p2.id and p1.id_category = ${idCat} ORDER BY p1.id_category ASC LIMIT 3`);
        return db.load(`select p.*, c.id as idCat, c.name from post p inner join category c on p.id_category = c.id where c.id = ${idCat} order by rand() limit 5`);
    }
};