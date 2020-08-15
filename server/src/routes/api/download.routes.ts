import express from 'express'
const downloadRouter = express.Router();

import { excelDownload } from '../../controllers/download.controller';

downloadRouter.route("/products/:categoryId").get(excelDownload);

export { downloadRouter }