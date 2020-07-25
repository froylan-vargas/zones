const router = require("express").Router()

const productController = require("../../controllers/product.controller")

router.route("/").get(productController.getAllProducts);
router.route("/productsByCategory/:categoryId").get(productController.getProductByCategoryId);

module.exports = router