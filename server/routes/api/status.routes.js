const router = require("express").Router()

const productController = require("../../controllers/statusController")
const statusController = require("../../controllers/statusController")

router.route("/").get(statusController.handleStatusCheck)

module.exports = router