const joi = require("joi");

const validateProductSchema = joi.object({
    productName: joi.string().required(),
    productPrice: joi.number().required(),
    productImage: joi.string(),
    action: joi.string().valid("addAgain")   
}); 

module.exports = { validateProductSchema };