const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)

const CartSchema = mongoose.Schema({
    userFrom:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    productFrom:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    },
    title:{
        type:String,
        maxlength:50
    },
    price:{
        type:Number,
        default:0
    },
    cnt:{
        type:Number,
        default:0
    },
    category:{
        type:Number,
        default:1
    }
},{timestamps:true});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = {Cart};