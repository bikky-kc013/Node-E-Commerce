const express = require("express");
const authRoute = express.Router();
const createError = require("http-errors");
const { userModel } = require("../models/user");
const { registerValidate, loginValidate } = require("../controllers/validateSchema");
const { signInAccessToken } = require("../controllers/jwtValidation");
const { validatePassword } = require("../controllers/passValidator");
const { signInRefreshToken } = require("../controllers/jwtValidation");



authRoute.post("/register", async (req, res, next) => {
  try {
       const result = await registerValidate.validateAsync(req.body);
       const ifExists= await userModel.findOne({email:result.email});
       if(ifExists) throw createError.Conflict("The email already exists in the database");
       const newUser=new userModel(result);
       const saveUser=await newUser.save();
       console.log(saveUser.email);
       if(result['isAdmin']==='true'){
        const adminToken = await signInAccessToken(saveUser.id, true);
        res.json({
          adminToken
        })
       }
       const signInAccess= await signInAccessToken(saveUser.id);
       const refreshToken=await signInRefreshToken(saveUser.id);
       console.log(signInAccess);
      
    res.json({
        accessToken: signInAccess
    });
  } catch (error) {
    next(error);
  }
});



authRoute.post("/login", async(req,res,next)=>{
    try{
        const { email, password } = req.body;
        const result = await loginValidate.validateAsync({email,password});
        const isUser = await userModel.findOne({email:result.email});
        if(!isUser) throw createError.NotFound(`The user with the ${result.email} does not exists`);
        const passCheck = await validatePassword(isUser.password, result.password);
        if(!passCheck)  throw createError.Unauthorized("Please enter the valid password ");  
        if(isUser['isAdmin']){ const adminToken = await signInAccessToken(isUser.id, true); return res.json({ adminToken}) }
        const accessToken = await signInAccessToken(isUser.id);
        const refreshToken=await signInRefreshToken(isUser.id);

      res.json({
        accessToken
      });

    }catch(error){
        next(error)
    }
});



authRoute.get("/allusers", async(req,res,next)=>{
  try{
    const getAllUsers = await userModel.find().select("-password -_id -__v");

    res.json(getAllUsers);

  }catch(error){
    next(error);
  }
})


module.exports = { authRoute };
