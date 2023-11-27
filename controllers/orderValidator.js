const Joi = require('joi');

const orderItemValidate = Joi.object({
    quantity: Joi.number().required(),
    product: Joi.string().required(),
});

const orderSchemaValidate = Joi.object({
    orderItems: Joi.array().items(orderItemValidate).required(),
    status: Joi.string().required(),
    location: Joi.string().required(),
    user: Joi.string().required(),
    totalPrice: Joi.number(),
    dateOfOrder: Joi.date(),
});

const combinedSchema = Joi.object({
    orderItems: Joi.array().items(Joi.object({
        quantity: Joi.number().required(),
        product: Joi.string().required(),
    })).required(),
    status: Joi.string().required(),
    location: Joi.string().required(),
    user: Joi.string().required(),
    totalPrice: Joi.number(),
    dateOfOrder: Joi.date(),
});

module.exports = {  combinedSchema };