const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middlewares/auth");

//=================================
//             users
//=================================
router.post('/register', (req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo)=>{
        if(err) res.status(400).json({err});
        res.status(200).json({success:true});
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //user 정보찾기
    User.findOne({'email':email}, function(err, user){
        if(!user) return res.json({loginSuccess:false, message:'아이디를 확인하세요!'});

        //비밀번호 비교
        user.comparePassword(password, function(err, isMatch){
            if(!isMatch) return res.json({loginSuccess:false, message:'비밀번호를 확인하세요!'});
            
            //토큰생성
            if(isMatch){
                user.generateToken(function(err, user){
                    if(err) return res.status(400).json(err);
                    res.cookie('x_auth',user.token)
                    .status(200)
                    .json({loginSuccess:true, userId:user._id});
                });
            }
        });
    })
});

router.get('/auth', auth ,function(req,res){
    var user = req.user;

    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        lastname:user.lastname,
        isAdmin: user.role === 0 ? false : true,
        isAuth:true,
        role:user.role,
        image: user.image
    });
});

router.get('/logout', auth, function(req,res){
    User.findOneAndUpdate({_id:req.user._id}, {token:""}, (err, user) => {
        if(err) return res.json({success:false});
        res.status(200).json({success:true});
    });
});

module.exports = router;