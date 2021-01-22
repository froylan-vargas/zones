import express from 'express'
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';

const productRouter = express.Router();

const productValidations = [
    body('categoryId').isNumeric().withMessage('La categoria debe ser un numero'),
    body('name').notEmpty().withMessage('El nombre del producto es requerido'),
    body('description').notEmpty().withMessage('La descripción del producto es requerida'),
    body('priority').isNumeric().withMessage('La prioridad debe ser un número'),
    body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    body('isActive').isBoolean().withMessage('El producto debe estar activo o inactivo')
];

const updateImageValidations = [
    body('id').isNumeric().withMessage('El id de producto es requerido'),
    body('name').notEmpty().withMessage('El nombre de producto es requerido'),
    body('action').notEmpty().withMessage('La accion es requerida')
];

import {
    getAll,
    getProductByCategoryId,
    update,
    create,
    updateImage,
    geById
} from '../../controllers/product.controller';

productRouter.route('/').get(getAll);
productRouter.route('/productsByCategory/:categoryId').get(getProductByCategoryId);

productRouter.route('/:productId').put(
    productValidations
    , validateRequest
    , update);

productRouter.route('/').post(
    productValidations
    , validateRequest
    , create);

productRouter.route('/image/update').put(
    updateImageValidations
    , validateRequest
    , updateImage);

productRouter.route('/:id').get(geById);

export { productRouter }