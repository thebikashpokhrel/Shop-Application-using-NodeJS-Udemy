const express = require("express");
const path = require("path");

const router = express.Router();

const adminController = require("../controllers/admin");
const products = [];

//admin/add - get
router.get("/add",adminController.getAddProduct);

//admin/products - get
router.get("/products",adminController.getProducts);

//admin/add - post
router.post("/add",adminController.postAddProduct);

router.get("/edit-product/:productId",adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);


module.exports=router;