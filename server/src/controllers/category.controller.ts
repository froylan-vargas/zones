import { Request, Response } from 'express';
import Category from '../models/category.model';

export const get = async (req: Request, res: Response) => {
    const categories = await Category.findAll<Category>({})
    res.status(200).send(categories);
};