var db = require('../utils/db');
module.exports = {
    selectPostByAuthor : idAuthor =>{
        // var sql = 'select * form post';
        return db.load('select * from post where id_author = '+ idAuthor);
    },
    add : entity => {
        return db.add('post', entity);
    },
    selectAllCategory : () => {
        return db.load('select * from category');
    }
};