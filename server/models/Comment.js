const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)

const CommentSchema = mongoose.Schema({
    userFrom:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    userEmail:{
        type:String,
    },
    productFrom:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    },
    content:{
        type:String,
        maxLength:100
    }
},{timestamps:true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {Comment};