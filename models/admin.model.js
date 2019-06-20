var db = require('../utils/db');
module.exports = {
    Statistic_Cat : () => {
        return db.load(`SELECT count(id) as totalCat FROM category`);
    },
    Statistic_Post : () => {
        return db.load(`SELECT count(id) as totalPost FROM Post`);
    },
    Statistic_Tag : () => {
        return db.load(`SELECT count(id) as totalTag FROM tag where id != 1`);
    },
    Statistic_Member : () => {
        return db.load(`SELECT count(id) as totalMember FROM user where userRight = 0 or userRight = 1`);
    },
    Statistic_Writter : () => {
        return db.load(`SELECT count(id) as totalWritter FROM user where userRight = 2`);
    },
    Statistic_Editor : () => {
        return db.load(`SELECT count(id) as totalEditor FROM user where userRight = 3`);
    },
    SelectAllPost: (pos, qty)=>{
        return db.load(`select p.*, c.name from post p inner join category c on p.id_category = c.id order by id desc limit ${pos}, ${qty}`);
    },
    totalAllPost: ()=>{
        return db.load(`select count(id) as totalAllPost from post`);
    },
    selectPostStatus: (status, pos, qty) => {
        return db.load(`select p.*, c.name from post p inner join category c on p.id_category = c.id where status = ${status} order by id desc limit ${pos}, ${qty}`);
    },
    totalPostByStatus: (status)=>{
        return db.load(`select count(id) as totalPost from post where status = ${status}`);
    },
    findPostById: (idPost)=>{
        return db.load(`select p.*, c.name from post p inner join category c on p.id_category = c.id where p.id = ${idPost}`);
    },
    selectAllCat: (pos, qty)=>{
        return db.load(`select * from category order by id desc limit ${pos}, ${qty}`);
    },
    totalAllCat: ()=>{
        return db.load(`select count(id) as totalAllCat from category`);
    },
    addCat: entity=>{
        return db.add('category',entity);
    },
    editCat: (idCat, entity) =>{
        return db.update('category', 'id', entity, idCat);
    },
    deleteCat: (idCat) =>{
        return db.delete('category', 'id', idCat);
    },
    deletePostByIdCat: (idCat)=>{
        return db.delete('post', 'id_category', idCat);
    },
    deleteCommentById: (id)=>{
        return db.delete('comment', 'id', id);
    },
    findAllCommentOfCat: (idCat)=>{
        return db.load(`SELECT cm.id as idcm from post p inner join category c on p.id_category = c.id inner join comment cm on p.id = cm.id_post where c.id = ${idCat}`)
    }
}