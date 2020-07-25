const router = require("express").Router();

const statusRoutes = require('./status.routes')
const authRoutes = require('./auth.routes')
const productRoutes = require('./product.routes')
const categoryRoutes = require('./category.routes')
const uploadRoutes = require('./upload.routes')
const downloadRoutes = require('./download.routes')

router.use("/status", statusRoutes)
router.use("/auth", authRoutes)
router.use("/product", productRoutes)
router.use("/categories", categoryRoutes)
router.use("/upload", uploadRoutes)
router.use("/download", downloadRoutes)

module.exports = router
