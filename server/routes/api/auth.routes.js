const router = require("express").Router()

const authController = require("../../controllers/authController")

router.route("/fblogin").post(authController.fbAuthentication)

module.exports = router