var db = require('../utils/db');
module.exports = {
    selectAllPostOfEditorAndManageCategory: (idEditor, pos, qty) => {
        return db.load(`SELECT * FROM post WHERE id_category = 
        (SELECT u.manageCategory from user u WHERE u.id = ${idEditor}) order by id desc limit ${pos},${qty}`);
    },
    totalPost: idEditor => {
        return db.load(`SELECT COUNT(id) as totalPost FROM post WHERE id_category = 
        (SELECT u.manageCategory from user u WHERE u.id = ${idEditor}) order by COUNT(id) desc`)
    },
    selectCategoryByManageCat: idCategory=>{
        return db.load(`select * from category where id = ${idCategory}`);
    }
};