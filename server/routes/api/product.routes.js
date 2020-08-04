const router = require("express").Router()

const productController = require("../../controllers/product.controller")

router.route("/").get(productController.getAllProducts);
router.route("/productsByCategory/:categoryId").get(productController.getProductByCategoryId);
router.route("/update").put(productController.updateProduct);
router.route("/create").post(productController.createProduct);

module.exports = router