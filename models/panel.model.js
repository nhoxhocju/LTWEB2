var db = require('../utils/db');
module.exports = {
    all : ()=>{
        // var sql = 'select * form post';
        return db.load('select * from post');
    },
    add : entity => {
        return db.add('post', entity);
    }
};