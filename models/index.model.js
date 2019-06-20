var db = require('../utils/db');
module.exports = {
    all : (pos, qty)=>{
        return db.load(`select * from post where status = 2 order by id desc limit ${pos},${qty}`);
    },
    totalPost:()=>{
        return db.load('SELECT count(id) as totalPost FROM post where status = 2');
    },
    topView : (pos, qty)=>{
        return db.load(`select * from post where status = 2 order by views desc limit ${pos},${qty}`);
    },
    selectAllCategory: ()=>{
        return db.load('select * from category');
    },
    hotNews : () => {
        return db.load('select * from post where hotNews = 1 and status = 2 order by id desc');
    },
    updateStatusPost: () =>{
        return db.updateDate('update post set status = 2 where DATEDIFF(NOW(), date_post) >= 0 and status = 1');
    },
    updateUserVip: () =>{
        return db.updateDate('update user set userRight = 0, expirationVIP = NULL  where DATEDIFF(NOW(), expirationVIP) >= 0 and userRight = 1');
    },
};