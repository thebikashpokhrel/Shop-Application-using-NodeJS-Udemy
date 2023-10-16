const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../util/path");
const adminRoutes = require("./admin");

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCartDelete);

router.get("/checkout", shopController.getCheckout);
router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);

//Put dynamic route at end
router.get("/products/:productId", shopController.getProduct);

module.exports = router;
