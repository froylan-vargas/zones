const router = require("express").Router();

const statusRoutes = require('./status')
const authRoutes = require('./auth')
const productRoutes = require('./product')

router.use("/status", statusRoutes)
router.use("/auth", authRoutes)
router.use("/product", productRoutes)

module.exports = router
