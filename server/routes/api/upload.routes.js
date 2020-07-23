const router = require("express").Router()
const uploadFile = require("../../middlewares/upload")

const uploadController = require("../../controllers/upload.controller")

router.route("/products").post(uploadFile.single('file'), uploadController.handleExcelUpload)

module.exports = router