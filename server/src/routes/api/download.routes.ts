import express from 'express'
import { param } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

import { getProductsTemplate } from '../../controllers/download.controller';

const downloadRouter = express.Router();
downloadRouter.route("/products/:categoryId").get(
    [
        param('categoryId')
            .exists()
            .isNumeric()
            .withMessage('categoría invalida')

    ],
    validateRequest,
    getProductsTemplate);

export { downloadRouter };