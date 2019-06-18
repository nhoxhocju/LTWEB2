var db = require('../utils/db');
module.exports = {
    selectAllPostOfEditorAndManageCategory: (idEditor, pos, qty) => {
        return db.load(`SELECT * FROM post WHERE id_category = 
        (SELECT u.manageCategory from user u WHERE u.id = ${idEditor}) order by id desc limit ${pos},${qty}`);
    },
    totalPost: idEditor => {
        return db.load(`SELECT COUNT(id) as totalPost FROM post WHERE id_category = 
        (SELECT u.manageCategory from user u WHERE u.id = ${idEditor}) order by COUNT(id) desc`)
    },
    selectCategoryByManageCat: idCategory=>{
        return db.load(`select * from category where id = ${idCategory}`);
    },
    selectPostOfEditorAndManageCategoryAndStatus: (idEditor, status, pos, qty) => {
        return db.load(`SELECT * FROM post WHERE id_category = 
        (SELECT u.manageCategory from user u WHERE u.id = ${idEditor}) and status = ${status} order by id desc limit ${pos},${qty}`);
    },
    totalPostByStatus: (idEditor, status) => {
        return db.load(`SELECT COUNT(id) as totalPost FROM post WHERE id_category = 
        (SELECT u.manageCategory from user u WHERE u.id = ${idEditor}) and status = ${status} order by COUNT(id) desc`)
    },
    findPostByEditorAndIdPost : (idEditor, idPost) =>{
        return db.load(`Select p.*, c.name FROM post p inner join category c on p.id_category = c.id WHERE p.id_category = 
        (SELECT u.manageCategory from user u WHERE u.id = ${idEditor}) and p.id = ${idPost}`);
    },
    approvedPostByAndId: (idPost, entity) =>{
        return db.update('post', 'id', entity, idPost);
    },
    findIdCatByNameCat: namePost =>{
        return db.load(`Select * from category where name = '${namePost}'`);
    }
};