var db = require('../utils/db');
module.exports = {
    selectPostByTag : (idTag, pos, qty) =>{
        return db.load(`SELECT p.*, t.nameTag FROM post p inner join tag t on p.id_tag = t.id where t.id = ${idTag} and p.status = 2 order by p.id limit ${pos}, ${qty}`);
    },
    totalPostByTag: (idTag)=>{
        return db.load(`SELECT count(p.id) as totalPost FROM post p inner join tag t on p.id_tag = t.id where t.id = ${idTag} and p.status = 2`);
    }
}