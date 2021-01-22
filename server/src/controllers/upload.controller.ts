import { Request, Response } from 'express';
import Product from '../models/product.model';

import { getProductsByCategoryId, batchUpload, preTransformCurrentProducts } from '../handlers/product.handler';
import { transformArrayToObject } from '../utils/array';
import { validateUploadProduct } from '../utils/serverValidators/product-validators.utils';
import { UploadValidationError } from '../errors/upload-validation-error';

export const uploadProducts = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { data } = req.body;

    const uploadErrors = data.reduce((result: [Error], product: Product, i: number) => {
        const errors = validateUploadProduct(product);
        if (errors.length) {
            result.push(new Error(`error en la fila ${i + 2}: ${errors.join(', ')}`));
        }
        return result;
    }, []);

    if (uploadErrors.length) {
        throw new UploadValidationError(uploadErrors);
    }

    const currentProducts: Product[] | undefined = await getProductsByCategoryId(categoryId);
    let transformed: Product[] = [];
    if (currentProducts?.length) {
        const preTransformedCurrentProducts: any = preTransformCurrentProducts(currentProducts);
        transformed = transformArrayToObject(preTransformedCurrentProducts, 'name');
    }

    try {
        await batchUpload(data, transformed, parseInt(categoryId));
        res.status(200).send("Upload succees");
    }
    catch (error) {
        throw new Error(error);
    }
}

