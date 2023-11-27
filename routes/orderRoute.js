const { func } = require("joi");
const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItems");
const express = require("express");
const orderRouter = express.Router();
const { productModel } = require("../models/product");


orderRouter.get(`/orders`, async (req, res) => {
  try {
    const orderList = await Order.find().populate('user', 'name');
    if (!orderList) {
      return res.status(500).json({ success: false });
    }  
    return res.send(orderList);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});



orderRouter.post("/order", async (req, res, next) => {
  try {
    const { orderItems, status, location, user, totalPrice, dateOfOrder } = req.body;
    const orderIds = await Promise.all(
      orderItems.map(async (items) => {
        const orderItem = new OrderItem({
          quantity: items.quantity,
          product: items.product
        });
        const savedOrderItem = await orderItem.save();

        return savedOrderItem._id;
      })
    );
    const order = new Order({
      orderItems: orderIds,
      status,
      location,
      user,
      totalPrice,
      dateOfOrder
    });
    const savedOrder = await order.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
});


module.exports = { orderRouter };
