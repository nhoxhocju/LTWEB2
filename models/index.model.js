var db = require('../utils/db');
module.exports = {
    all : ()=>{
        return db.load('select * from post order by id desc');
    },
    topView : ()=>{
        return db.load('select * from post order by views desc');
    },
    selectAllCategory: ()=>{
        return db.load('select * from category');
    },
    hotNews : () => {
        return db.load('select * from post where hotNews = 1 order by id desc');
    }
};