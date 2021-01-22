import { Request, Response } from 'express';
import Product from '../models/product.model';
import { getProducts, getProductsByCategoryId } from '../handlers/product.handler';
import { transformArrayToObject } from '../utils/array';
import { constants } from '../utils/serverConstants.utils';
import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from '../errors/not-found-error';
import path from 'path';


export const getAll = async (req: Request, res: Response) => {
    const products = await getProducts();
    res.status(200).send(products);
}



export const geById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) throw new NotFoundError();
    res.status(200).send(product);
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

//try it. 

export const create = async (req: Request, res: Response) => {
    const { categoryId, name, description, priority, price, isActive } = req.body;
    let product = new Product();
    product.categoryId = categoryId;
    product.name = name;
    product.description = description;
    product.priority = priority;
    product.price = price;
    product.isActive = isActive;

    try {
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        if (err.parent.code == 23505) throw new BadRequestError('El nombre de producto ya existe');
        throw Error(err);
    }
}

export const update = async (req: Request, res: Response) => {
    const updateValues = req.body;
    const { productId } = req.params;

    const product = await Product.findByPk(productId);

    if (!product) throw new NotFoundError();

    try {
        updateValues.modifiedon = new Date(Date.now());
        const updatedProduct = await Product.update(updateValues, {
            where: { id: productId }
        });
        res.status(200).send(updatedProduct);
    } catch (err) {
        if (err.parent.code == 23505)
            throw new BadRequestError('el nombre del producto ya existe');
        throw new Error(err);
    }
}

export const updateImage = async (req: Request, res: Response) => {
    const { id, name, action } = req.body;
    const product = await Product.findByPk(id);
    if (!product) throw new NotFoundError();
    const extension = path.extname(name);
    if (extension !== '.jpg' && extension !== '.png')
        throw new BadRequestError('La extensión del archivo es invalida');

    let prdImages = JSON.parse(product.images) || [];
    const transImages = transformArrayToObject(prdImages, 'name');
    switch (action) {
        case 'add':
            if (prdImages.length >= constants.MAX_IMAGE_NUMBER)
                throw new BadRequestError(`Solo se pueden subir ${constants.MAX_IMAGE_NUMBER} imagenes por producto`);
            if (transImages[name])
                throw new BadRequestError(`La imagen ${name} ya existe para este producto`);
            prdImages.push({ name });
            break;
        case 'remove':
            if (!transImages[name]) {
                throw new BadRequestError('La imagen que desea eliminar no existe');
            }
            prdImages = prdImages.filter((image: any) => image.name !== name);
            break;
        default:
            break;
    }
    const imageValue = JSON.stringify(prdImages);
    product.images = imageValue;
    product.save();
    res.status(200).send({ imageValue });
}