import { Request, Response } from 'express';

import { getProductsByCategoryId, productsToTemplateFormat, createTemplateData } from '../handlers/product.handler';
import { validateCategory } from '../utils/serverValidators/product-validators.utils';

export const excelDownload = async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    if (!validateCategory(categoryId)) {
        return res.json({ error: 'Categoria invalida' });
    }

    try {
        const currentProducts: any = await getProductsByCategoryId(categoryId);
        if (!currentProducts.length) throw { code: 1 }
        const preTransformedProducts = productsToTemplateFormat(currentProducts);
        const templateData = createTemplateData(preTransformedProducts);
        res.send(templateData);
    } catch (err) {
        const error = err.code === 1 ? 'No hay productos en la catgoría' : 'No fue posible descargar el archivo';
        res.send({ error });
    }
}