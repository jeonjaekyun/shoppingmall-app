const express = require('express');
const router = express.Router();
const { Cart } = require("../models/Cart");
const { auth } = require("../middlewares/auth");
//=================================
//             cart
//=================================

router.post('/:productId', auth, function(req, res){

    const cart = new Cart(req.body);
    cart.save((err)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true})
    })
});

router.post('/', auth, function(req, res){
    const userFrom = req.body.userFrom;

    Cart.find({userFrom:userFrom}, (err, result) => {
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true, result});
    });
})

router.delete('/', auth, function(req, res){
    
    Cart.findOneAndDelete({'userFrom':req.body.userFrom,'productFrom':req.body.productFrom})
    .exec((err,info)=>{
        if(err) return res.status(400).send(err);

        res.status(200).json({success:true});
    })
});


module.exports = router;