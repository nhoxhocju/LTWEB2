var db = require('../utils/db');

module.exports = {
    all : () =>{
        return db.load('select * from user');
    },

    selectById : id =>{
        return db.load(`select * from user where id = ${id}`);
    },
    add: entity => {
        return db.add('user', entity);
    },
    selectByEmail : email =>{
        return db.load(`select * from user where email = '${email}'`);
    },
    editProfile : (idUser, entity) =>{
        return db.update('user', 'id', entity, idUser);
    },
    changePassword: (idUser, entity)=>{
        return db.update('user', 'id', entity, idUser);
    }
}