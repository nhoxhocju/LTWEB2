var db = require('../utils/db');
module.exports = {
    Statistic_Cat : () => {
        return db.load(`SELECT count(id) as totalCat FROM category`);
    },
    Statistic_Post : () => {
        return db.load(`SELECT count(id) as totalPost FROM Post`);
    },
    Statistic_Tag : () => {
        return db.load(`SELECT count(tag) as totalTag FROM Post`);
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
        return db.load(`select * from category order by id limit ${pos}, ${qty}`);
    },
    totalAllCat: ()=>{
        return db.load(`select count(id) as totalAllCat from post`);
    }
}