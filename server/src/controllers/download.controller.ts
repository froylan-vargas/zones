import { Request, Response } from 'express';
import { getProductsByCategoryId, productsToTemplateFormat, createTemplateData } from '../handlers/product.handler';
import { BadRequestError } from '../errors/bad-request-error';

export const getProductsTemplate = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const currentProducts = await getProductsByCategoryId(categoryId);
    if (!currentProducts?.length) throw new BadRequestError('No hay productos en esta categoría');
    const preTransformedProducts = productsToTemplateFormat(currentProducts);
    const templateData = createTemplateData(preTransformedProducts);
    res.status(200).send(templateData);
};