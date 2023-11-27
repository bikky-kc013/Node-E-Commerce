const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type: Number,
        required: true
    },
    ProductImage:{
        type:String
    }
});

const productModel = mongoose.model('Product', productSchema );


module.exports = { productModel };