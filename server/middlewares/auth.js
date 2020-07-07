const {User} = require('../models/User');

let auth = (req,res,next)=>{
    
    let token = req.cookies.x_auth;

    User.findByToken(token, function(err,user){
        if(err) return res.json({isAuth:false});

        if(!user) return res.json({isAuth:false, message:'유저 없음'});

        req.user = user;
        req.token = token;
        next();
    });
}

module.exports = {auth};