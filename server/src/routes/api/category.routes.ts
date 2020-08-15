import express from 'express'
const categoryRouter = express.Router();

import { getCategories } from '../../controllers/category.controller';
categoryRouter.route("/").get(getCategories);

export { categoryRouter }