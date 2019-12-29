const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema Definition for Selling Price Customers

const cpSchema = new Schema(
    {
        productId : {
            type:Number,
            require:true
        },
        productName:{
            type:String,
            required:true,
            trim:true
        },
        quantity:{
            type:Number,
            require:true
        },
        amount:{
            type:Number,
            require:true
        },
        userName:{
            type:String,
            required:true,
            trim:true
        },
        userPno:{
            type:Number
        }
    },
    {timestamps:true}
);

const CostPrice = mongoose.model('CostPrice',cpSchema);
module.exports = CostPrice;