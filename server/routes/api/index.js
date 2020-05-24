const router = require("express").Router();

const statusRoutes = require('./status')
const authRoutes = require('./auth')

router.use("/", statusRoutes)
router.use("/auth", authRoutes)

module.exports = router
