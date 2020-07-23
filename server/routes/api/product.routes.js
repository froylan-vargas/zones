const router = require("express").Router()

const productController = require("../../controllers/product.controller")

router.route("/").get(productController.getAllProducts);
router.route("/productsByCategory/:categoryid").get(productController.getProductByCategoryId);

module.exports = router