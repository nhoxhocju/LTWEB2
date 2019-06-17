var db = require('../utils/db');
module.exports = {
    all : (pos, qty)=>{
        return db.load(`select * from post order by id desc limit ${pos},${qty}`);
    },
    totalPost:()=>{
        return db.load('SELECT count(id) as totalPost FROM post');
    },
    topView : (pos, qty)=>{
        return db.load(`select * from post order by views desc limit ${pos},${qty}`);
    },
    selectAllCategory: ()=>{
        return db.load('select * from category');
    },
    hotNews : () => {
        return db.load('select * from post where hotNews = 1 order by id desc');
    }
};