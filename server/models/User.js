const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
});

userSchema.pre('save',function(next){
    const user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err,encrypted){
                user.password = encrypted;
                //console.log(encrypted);
                next();
            });
        });
    }else{
        next();
    }
});

userSchema.methods.comparePassword = function(inputPw, cb){

    bcrypt.compare(inputPw, this.password, function(err, isMatch){
        if(err) return cb(err);
        return cb(null,isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    const user = this;
    const token = jwt.sign(user._id.toHexString(),'secret');
    user.token = token;
    user.save((err,user)=>{
        if(err) cb(err);
        return cb(null,user);
    });
}

userSchema.statics.findByToken = function(token, cb){
    const user = this;

    jwt.verify(token,'secret',function(err,decoded){
        if(err) return cb(err);
        user.findOne({"token":token,"_id":decoded}, function(err,user){
            if(err) return cb(err);
            return cb(null, user);
        });
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};