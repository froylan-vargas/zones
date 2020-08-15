import express from "express";
const router = express.Router();

import { statusRouter } from './status.routes';
import { categoryRouter } from './category.routes';
import { productRouter } from './product.routes';
import { uploadRouter } from './upload.routes';
import { downloadRouter } from './download.routes';

router.use("/status", statusRouter)
router.use("/product", productRouter)
router.use("/categories", categoryRouter)
router.use("/upload", uploadRouter)
router.use("/download", downloadRouter)

export { router as apiRouter };
