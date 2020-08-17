import { Request, Response } from 'express';

import Product from '../models/product.model';
import { sequelize } from '../config/database';
import { validateProduct } from '../utils/serverValidators/product-validators.utils';
import { getProducts, getProductsByCategoryId } from '../handlers/product.handler';
import { BeforeDestroy } from 'sequelize-typescript';
import { categoryRouter } from '../routes/api/category.routes';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.json({
            data: products
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

export const getProductByCategoryId = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
        const products = await getProductsByCategoryId(categoryId);
        res.json({
            data: products
        })
    } catch (err) {
        res.send(err);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const {categoryid,name,description,priority,price,isactive} = req.body;
    let product = new  Product();
    product.categoryId = categoryid;
    product.name = name;
    product.description = description;
    product.priority = priority;
    product.price = price;
    product.isActive = isactive;
    
    const errors = validateProduct(product);
    if (errors.length) {
        return res.json({ error: errors });
    } 

    try {
        await product.save();
        res.send({ message: 'product created' });
    } catch (error) {
        let errorMessage = ''; 
        if (error.parent.code == 23505) errorMessage = 'El nombre de producto ya existe';
        else errorMessage = 'Error al guardar el producto';
        res.json({ error: errorMessage }).status(400);
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    const product = req.body;
    const errors = validateProduct(product);

    if (errors.length) {
        return res.json({ error: errors });
    }

    try {
        product.modifiedon = new Date(Date.now());
        const updatedProduct = await Product.update(product, {
            where: { id: product.id }
        })
        if (updatedProduct[0] > 0) return res.json('edited');
        else res.json({ error: 'no se pudo editar el producto' }).status(400);
    } catch (error) {
        let errorMessage = '';
        if (error.parent.code == 23505) errorMessage = 'El nombre de producto ya existe';
        else errorMessage = 'Error al guardar el producto';
        res.json({ error: errorMessage }).status(400);
    }
}