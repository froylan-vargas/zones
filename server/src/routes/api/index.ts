import express from "express";
const router = express.Router();

import { statusRouter } from './status.routes';
import { categoryRouter } from './category.routes';
import { productRouter } from './product.routes';
import { uploadRouter } from './upload.routes';
import { downloadRouter } from './download.routes';
import { imageRouter } from './image.routes';
import {configurationRouter} from './configuration.routes';

router.use("/status", statusRouter);
router.use("/product", productRouter);
router.use("/categories", categoryRouter);
router.use("/upload", uploadRouter);
router.use("/download", downloadRouter);
router.use("/image", imageRouter);
router.use("/config", configurationRouter);

export { router as apiRouter };
