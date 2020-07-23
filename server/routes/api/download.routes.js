const router = require("express").Router()

const downloadController = require("../../controllers/download.controller")

router.route("/products").get(downloadController.handleExcelDownload)

module.exports = router