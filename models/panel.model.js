var db = require('../utils/db');
module.exports = {
    selectPostByAuthor : idAuthor =>{
        // var sql = 'select * form post';
        return db.load('select * from post where id_author = '+ idAuthor);
    },
    selectPostByAuthorAndStatus: idAuthor =>{
        return db.load(`select * from post where id_author = ${idAuthor} and (status = 0 or status = -1)`);
    },
    add : entity => {
        return db.add('post', entity);
    },
    selectAllCategory : () => {
        return db.load('select * from category');
    },
    selectPostByAuthorAndIdAndStatus: (idAuthor, id) =>{
        return db.load(`select * from post where id_author = ${idAuthor} and id = ${id} and (status = 0 or status = -1)`);
    },
    deletePostByAuthorAndId: (idAuthor, idPost) =>{
        return db.delete('post',('id_author', 'id'), (idAuthor, idPost));
    },
    editPostByAuthorAndId: (idAuthor, idPost, entity) =>{
        return db.update('post', ('id_author', 'id'), entity,(idAuthor, idPost));
    }
};