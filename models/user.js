const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { boolean } = require("joi");
const userRegister= mongoose.Schema({
    username:
    {
       type:String,
       required:true
    },
    isAdmin:
    {
        type:Boolean,
        default:false
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
    },
    password:
    {
        type:String,
        required:true,
    },
    location:
    {
        type:String,
        required:true
    }
});
userRegister.pre('save', async function(next){
    try{
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(this.password, salt);
       this.password=hashedPassword;
       next();
    }catch(error){
        next(error);
    }
})


const userModel=mongoose.model('userModel', userRegister);

module.exports= { userModel };
 