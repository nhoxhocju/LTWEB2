var session = require('express-session');

module.exports = function(app){
    app.use(session({
        secret: 'LuongBadssdffdsfdsfdfsdo1998',
        resave: true,
        saveUninitialized: true 
    }));

}