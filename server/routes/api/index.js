const router = require("express").Router();

const statusRoutes = require('./status')
const authRoutes = require('./auth')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const uploadRoutes = require('./upload')

router.use("/status", statusRoutes)
router.use("/auth", authRoutes)
router.use("/product", productRoutes)
router.use("/categories", categoryRoutes)
router.use("/upload", uploadRoutes)

module.exports = router
