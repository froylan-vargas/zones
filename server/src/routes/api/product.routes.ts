import express from 'express'
const productRouter = express.Router();

import {
    getAllProducts,
    getProductByCategoryId,
    updateProduct,
    createProduct
} from '../../controllers/product.controller';

productRouter.route("/").get(getAllProducts);
productRouter.route("/productsByCategory/:categoryId").get(getProductByCategoryId);
productRouter.route("/update").put(updateProduct);
productRouter.route("/create").post(createProduct);

export { productRouter }