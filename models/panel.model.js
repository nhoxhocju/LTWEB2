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
    },
    selectPostByAuthorAndId: (idAuthor, id) =>{
        return db.load(`select * from post where id_author = ${idAuthor} and id = ${id}`);
    },
    deletePostByAuthorAndId: (idAuthor, idPost) =>{
        return db.delete('post',('id_author', 'id'), (idAuthor, idPost));
    },
};