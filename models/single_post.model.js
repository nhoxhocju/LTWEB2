var db = require('../utils/db');
module.exports = {
    single : id =>{
        // var sql = 'select * form post';
        return db.load('select c.name, p.* from category c inner join post p on c.id = p.id_category where p.id = ' + id);
    },
    updateView: id =>{
        // var views = views + 1;
        return db.updateView('UPDATE post SET views = views + 1 WHERE id = ' +id);
    },
    selectView : id =>{
        return db.load('select views from post where id = ' + id);
    }
};