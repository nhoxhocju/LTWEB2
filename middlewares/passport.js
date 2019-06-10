var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/user.model');
var bcrypt = require('bcrypt');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        
            
        }, (username, password, done) => {
            
            userModel.selectByEmail(username).then(rows => {
                if (rows.length === 0) {
                    return done(null, false, { message: 'Email hoặc mật khẩu không chính xác!' });
                }
                var user = rows[0];
                var ret = bcrypt.compareSync(password, user.password);
                if (ret) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Email hoặc mật khẩu không chính xác!' });
            }).catch(err =>{
                return done(err, false);
            })
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })


}