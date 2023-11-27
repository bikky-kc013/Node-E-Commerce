const joi=require('joi');
const registerValidate = joi.object({
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(2).required(),
    isAdmin:joi.boolean().default(false),
    username: joi.string().required(),
    location:joi.string().required()

})

const loginValidate = joi.object({
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(2).required(),
});

module.exports={ registerValidate  ,loginValidate };
