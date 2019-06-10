var db = require('../utils/db');
module.exports = {
    single : id =>{
        // var sql = 'select * form post';
        return db.load('select c.name, p.* from category c inner join post p on c.id = p.id_category where p.id_category = ' + id);
    },
    updateView: id =>{
        // var views = views + 1;
        return db.update('UPDATE post SET views = views + 1 WHERE id = ' +id);
    }
};