const router = require("express").Router()

const uploadController = require("../../controllers/upload.controller")
router.route("/products/:categoryId").post(uploadController.handleExcelUpload)

module.exports = router