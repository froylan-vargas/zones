import { Request, Response } from 'express';
import Product from '../models/product.model';

import { getProductsByCategoryId, batchUpload, preTransformCurrentProducts } from '../handlers/product.handler';
import { transformArrayToObject } from '../utils/array';
import { validateCategory, validateUploadProduct } from '../utils/serverValidators/product-validators.utils';

export const excelUpload = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { data } = req.body;
    if (!validateCategory(categoryId)) {
        return res.json({ error: 'Categoria invalida' });
    }

    const uploadErrors = data.reduce((result: [string], product: Product, i: number) => {
        const errors = validateUploadProduct(product);
        if (errors.length) {
            result.push(`error en la fila ${i + 2}: ${errors.join(', ')}`);
        }
        return result;
    }, []);

    if (uploadErrors.length) {
        return res.send({ error: uploadErrors });
    }

    const currentProducts: Product[] | undefined = await getProductsByCategoryId(categoryId);
    let transformed: Product[] = [];
    if (currentProducts?.length) {
        const preTransformedCurrentProducts: any = preTransformCurrentProducts(currentProducts);
        transformed = transformArrayToObject(preTransformedCurrentProducts, 'name');
    }

    try {
        await batchUpload(data, transformed, parseInt(categoryId));
        res.send("Upload succees");
    }
    catch (error) {
        res.send({ error: 'No fue posible subir los productos' });
    }
}

