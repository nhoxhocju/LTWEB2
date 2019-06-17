module.exports = (req, res, next) =>{
    // console.log(req.user.Id);
    if(!req.user){
        var retUrl = req.originalUrl;
        return res.redirect(`/account/login?retUrl=${retUrl}`);
    }
    if(req.user.userRight != 3){
        return res.redirect('/404');
    }

    next();
}