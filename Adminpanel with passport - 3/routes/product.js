const express = require("express");
const route = express.Router();
const ProductCtl = require("../Controllers/ProductCtl")


route.get("/addProduct",ProductCtl.AddProduct)
route.post("/AddProductData",ProductCtl.AddProductData)
route.get("/ViewProduct",ProductCtl.ViewProductCat)


module.exports = route