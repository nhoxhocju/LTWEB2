var mysql = require('mysql');
var config = require('../config/default.json');

var createConnection = () => mysql.createConnection(config['mysql']);

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },

    add: (tableName, entity) =>{
        return new Promise((resolve, reject) =>{
            var connection = createConnection();
            var sql = `insert into ${tableName} set ?`;
            connection.connect();
            connection.query(sql, entity, (error, results)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(results.insertId);
                }
                connection.end();
            });
        });
    },

    update: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    console.log(error.sqlMessage);
                } else {
                    resolve(results.changedRows);
                }
                connection.end();
            })
        });
    }
}