import { Request, Response } from 'express';
import Category from '../models/category.model';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll<Category>({})
        res.json({
            categories
        });

    } catch (err) {
        res.status(400).json(err);
    }
}