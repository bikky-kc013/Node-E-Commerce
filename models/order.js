//This is order.js
const mongoose =  require("mongoose");
const { OrderItem } = require("./orderItems"); 
const { userModel } = require("./user");
const { productModel } = require("./product");

const orderSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    location:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    },
    totalPrice:{
        type:Number
    },
    dateOfOrder:{
        type:Date,
        default:Date.now,
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };