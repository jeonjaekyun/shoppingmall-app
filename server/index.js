const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {LocalStorage} = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const db = require('./config/db');
const {User} = require('./models/User');
const {auth} = require('./middlewares/auth');

db();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/hello',(req, res)=>{
    res.send('안녕하세요!');
});

app.post('/api/users/register', (req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo)=>{
        if(err) res.status(400).json({err});
        res.status(200).json({success:true});
    });
});

app.post('/api/users/login', (req, res) => {
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
                    .json({loginSuccess:true, userid:user._id});
                    localStorage.setItem('user_id',user._id);
                });
            }
        });
    })
});

app.get('/api/users/auth', auth ,function(req,res){
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

app.get('/api/users/logout', auth, function(req,res){
    User.findOneAndUpdate({_id:req.user._id}, {token:""}, (err, user) => {
        if(err) return res.json({success:false});
        res.status(200).json({success:true});
    });
});

app.listen(port, ()=>{
    console.log(`port : ${port}`);
});