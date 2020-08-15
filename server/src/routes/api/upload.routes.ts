import express from 'express'
const uploadRouter = express.Router();

import { excelUpload } from '../../controllers/upload.controller';
uploadRouter.route("/products/:categoryId").post(excelUpload);

export { uploadRouter };