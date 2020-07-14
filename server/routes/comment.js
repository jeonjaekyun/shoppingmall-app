const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middlewares/auth");

//=================================
//             comment
//=================================

router.post('/', auth, function(req,res){
    const comment = new Comment(req.body);
    comment.save((err)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true});
    });
});

router.get('/:productId', function(req,res){
    const productFrom = req.params.productId;

    Comment.find({productFrom:productFrom},{userEmail:true, content:true, createdAt:true, userFrom:true}, function(err, results){
        if(err) return res.status(400).json({success:false,err});
        return res.status(200).json({success:true, results});
    })
});

router.delete('/',function(req,res){
    console.log(req.body.userFrom, req.body.productFrom, req.body.commentId);

    Comment.findOneAndDelete({_id:req.body.commentId, userFrom:req.body.userFrom, productFrom:req.body.productFrom},function(err,result){
        if(err) return res.status(400).json({success:false,err});
        return res.status(200).json({success:true});
    });
})


module.exports = router;