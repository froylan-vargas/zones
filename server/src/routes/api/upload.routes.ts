import express from 'express'
const uploadRouter = express.Router();

import { uploadProducts } from '../../controllers/upload.controller';
import { param } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
uploadRouter.route("/products/:categoryId").post(
    [
        param('categoryId')
            .exists()
            .isNumeric()
            .withMessage('categoría invalida')

    ],
    validateRequest,
    uploadProducts);

export { uploadRouter };