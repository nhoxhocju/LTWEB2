var db = require('../utils/db');
module.exports = {
    showCategoryById : id=>{
        // var sql = 'select * form post';
        return db.load('select c.name from category c inner join post p on c.id = p.id_category where p.id_category = ' + id);
    },
    alllWithDetails : ()=>{
        return db.load('select * from category');
    }
};