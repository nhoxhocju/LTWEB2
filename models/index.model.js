var db = require('../utils/db');
module.exports = {
    all : ()=>{
        // var sql = 'select * form post';
        return db.load('select * from post');
    },
    topView : ()=>{
        return db.load('select * from post order by views desc');
    }
};