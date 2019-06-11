module.exports = (req, res, next) =>{

    if(req.user){
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.user;
        if(req.user.userRight == '2'){
            res.locals.writter = true;
        }
    }

    next();
}