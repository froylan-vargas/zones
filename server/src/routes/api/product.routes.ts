import express from 'express'
const productRouter = express.Router();

import {
    getAllProducts,
    getProductByCategoryId,
    updateProduct,
    createProduct,
    updateImage,
    getProductById
} from '../../controllers/product.controller';

productRouter.route('/').get(getAllProducts);
productRouter.route('/productsByCategory/:categoryId').get(getProductByCategoryId);
productRouter.route('/update').put(updateProduct);
productRouter.route('/create').post(createProduct);
productRouter.route('/imageupdate').post(updateImage);
productRouter.route('/:id').get(getProductById);

export { productRouter }