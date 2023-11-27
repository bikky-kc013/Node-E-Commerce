const express = require("express");
const productRoute = express.Router();
const { productModel } = require("../models/product");
const createError = require("http-errors");
const { validateProductSchema } = require("../controllers/productSchemaValidator");




//This is the route to add the product in the store
productRoute.post("/addproduct", async (req, res, next) => {
  try {
    const productDetails = await validateProductSchema.validateAsync(req.body);
    console.log(productDetails);
    const productExists = await productModel.findOne({
      productName: productDetails.productName,
    });
    if (productExists) {
      if (req.body.action === "addAgain") {
        const addProduct = new productModel(productDetails);
        const saveProduct = await addProduct.save();
        return res.json({
          message: "The product again added in the store",
        });
      } else {
        return res.status(200).json({
          message: "The product was not added",
        });
      }
    } else {
      const addProduct = new productModel(productDetails);
      const saveProduct = await addProduct.save();
      res.json({
        message: "You, have successfully added the product",
      });
    }
  } catch (error) {
    next(error);
  }
});

//This is route to get all the details of the product
productRoute.get("/getallproduct", async (req, res, next) => {
  try {
    const getAllProduct = await productModel.find();
    res.json(getAllProduct);
  } catch (error) {
    next(error);
  }
});

//This is the route to search and get the details of the single product
productRoute.get("/:productid", async (req, res, next) => {
  try {
    const productDetail = req.params.productid;
    console.log(productDetail);
    const foundProduct = await productModel.findById(productDetail);
    if (!foundProduct) throw createError.NotFound("sorry, product not found");
    res.json(foundProduct);
  } catch (error) {
    next(error);
  }
});

//This is the route to update the existing product
productRoute.patch("/:productid", async (req, res, next) => {
  try {
    const productDetail = req.params.productid;
    const updatedProduct = await validateProductSchema.validateAsync(req.body);
    const foundProduct = await productModel.findByIdAndUpdate(
      productDetail,
      updatedProduct,
      { new: true }
    );
    if (!foundProduct) {
      throw createError.NotFound();
    }
    const saveUpdatedProduct = await foundProduct.save();
    res.json({
      message: "successfully updated the product",
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json("Invalid productId");
    }
    next(error);
  }
});

//This is the route to search the product by its id and delete the product
productRoute.delete("/:productid", async (req, res, next) => {
  try {
    const productDetail = req.params.productid;
    const deleteProduct = await productModel.findByIdAndDelete(productDetail);
    if (!deleteProduct) {
      throw createError.NotFound();
    }
    res.json({
      message: "Successfully deleted the product",
      productDetails: deleteProduct,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { productRoute };
