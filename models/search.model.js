var db = require('../utils/db');
module.exports = {
    search: (keyword, pos, qty) => {
        return db.load(`SELECT * FROM post
        WHERE (MATCH(title, short_content, content) AGAINST('${keyword}' IN NATURAL LANGUAGE MODE)
         or title like '%${keyword}%' or short_content like '%${keyword}%' or content like '%${keyword}%')
          and status = 2 limit ${pos}, ${qty}`);
    },
    totalSearch: (keyword) => {
        return db.load(`SELECT count(id) as totalSearch FROM post WHERE (MATCH(title, short_content, content) AGAINST('${keyword}'
         IN NATURAL LANGUAGE MODE) or title like '%${keyword}%' or short_content like '%${keyword}%' or content like '%${keyword}%')
         and status = 2`);
    }

};