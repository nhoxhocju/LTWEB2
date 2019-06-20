var db = require('../utils/db');
module.exports = {
    search: (keyword, pos, qty) =>{
        return db.load(`SELECT * FROM post
        WHERE MATCH(title, short_content, content) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE) and status = 2 limit ${pos}, ${qty}`);
    },
    totalSearch: (keyword) =>{
        return db.load(`SELECT count(id) as totalSearch FROM post
        WHERE MATCH(title, short_content, content) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE) and status = 2`);
    }

};