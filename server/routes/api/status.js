const router = require("express").Router();

const statusController = require("../../controllers/statusController");

router.route("/")
.get(statusController.handleStatusCheck);

module.exports = router;