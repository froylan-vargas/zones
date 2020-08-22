import { Request, Response } from 'express';

import Product from '../models/product.model';
import { validateProduct } from '../utils/serverValidators/product-validators.utils';
import { getProducts, getProductsByCategoryId } from '../handlers/product.handler';
import { transformArrayToObject } from '../utils/array';
import { constants } from '../utils/serverConstants.utils';

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

export const getProductById = async (req: Request, res: Response) => {
    const {id} = req.params;
    res.send(await Product.findByPk(id));
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
    const { categoryId, name, description, priority, price, isActive } = req.body;
    let product = new Product();
    product.categoryId = categoryId;
    product.name = name;
    product.description = description;
    product.priority = priority;
    product.price = price;
    product.isActive = isActive;

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

export const updateImage = async (req: Request, res: Response) => {
    const { id, name, action } = req.body;
    const product = await Product.findByPk(id);
    if (product) {
        let prdImages = JSON.parse(product.images) || [];
        switch (action) {
            case 'add':
                if (prdImages.length >= constants.MAX_IMAGE_NUMBER)
                    return res.send({ error: `Solo se pueden subir ${constants.MAX_IMAGE_NUMBER.toString()} imágenes por producto` });
                const transImages = transformArrayToObject(prdImages, 'name');
                if (transImages[name])
                    return res.send({ error: `El nombre ${name} ya existe para este producto` });
                prdImages.push({ name });
                break;
            case 'remove':
                prdImages = prdImages.filter((image: any) => image.name !== name);
                break;
            default:
                break;
        }
        const imageValue = JSON.stringify(prdImages);
        product.images = imageValue;
        product.save();
        res.send(imageValue);
    } else {
        res.send({ error: 'el producto no existe' })
    }
}