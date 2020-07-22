const router = require("express").Router()
const uploadFile = require("../../middlewares/upload")

const uploadController = require("../../controllers/upload.controller")

router.route("/excel").post(uploadFile.single('file'), uploadController.handleExcelUpload)

module.exports = router