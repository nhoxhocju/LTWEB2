var db = require('../utils/db');
module.exports = {
    showCategoryById: id => {
        // var sql = 'select * form post';
        // return db.load('select c.name from category c inner join post p on c.id = p.id_category where p.id_category = ' + id);
        return db.load('select * from category where id = ' + id);
    },
    alllWithDetails: () => {
        return db.load('select * from category');
    },
    allCategoryChild: () => {
        return db.load(`
        SELECT c.*, COUNT(p.id) AS num_of_post FROM categorychild c LEFT JOIN post p ON c.id = p.id_categorychild group by c.id, c.name
        `);
    },
    selectPostByCategory: (idCat,pos, qty) =>{
        return db.load(`select p.*, c.name from post p inner join category c where p.id_category = c.id and c.id = ${idCat} order by id desc limit ${pos},${qty}`);
    },
    totalPostOfCategory: idCat =>{
        return db.load(`SELECT count(id) as totalPost FROM Post where id_category = ${idCat}`);
    },
};