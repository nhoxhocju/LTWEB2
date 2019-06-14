var db = require('../utils/db');
module.exports = {
    showCategoryById: id => {
        // var sql = 'select * form post';
        return db.load('select c.name from category c inner join post p on c.id = p.id_category where p.id_category = ' + id);
    },
    alllWithDetails: () => {
        return db.load('select * from category');
    },
    allCategoryChild: () => {
        return db.load(`
        SELECT c.*, COUNT(p.id) AS num_of_post FROM categorychild c LEFT JOIN post p ON c.id = p.id_categorychild group by c.id, c.name
        `);
    }
};