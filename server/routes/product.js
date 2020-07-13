const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const { auth } = require("../middlewares/auth");

const multer = require('multer');
const fs = require('fs');
//=================================
//             product
//=================================

var storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'uploads/');
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.jpg' || ext !== '.png'){
            return cb(res.status(400).end('jpg, png만 가능합니다.'), false);
        }
        cb(null,true);
    }
});

var upload = multer({storage: storage}).single('file');

router.post('/uploadImage', auth, function(req,res){
    upload(req, res, err => {
        if(err) return res.json({success:false, err});
        return res.json({success:true, image:res.req.file.path, fileName:res.req.file.filename});
    })
});

router.delete('/uploadImage', auth, function(req, res){
    const image = req.body.image;

    fs.unlink(image,function(err){
        if(err) return res.json({success:false, err});
        return res.json({success:true});
    });
});

router.post('/uploadProduct', auth, function(req,res){

    const product = new Product(req.body);
    product.save((err)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true})
    })
});

router.post('/', function(req,res){
    
    const categoryNumber = req.body.categoryNumber;

    Product.find({category:categoryNumber},{title:true, images:true, price:true},function(err,results){
        if(err) return res.json({success:false, err});
        return res.json({success:true, results});
    })
});

router.get('/:productId', function(req, res){
    let productId = req.params.productId;
    
    Product.findOne({_id:productId},{title:true, images:true, description:true, price:true},function(err,result){
        if(err) return res.json({success:false, err});
        return res.json({success:true, result});
    })
});

module.exports = router;