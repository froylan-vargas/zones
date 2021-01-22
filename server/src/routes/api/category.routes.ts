import express from 'express'
const categoryRouter = express.Router();

import { get } from '../../controllers/category.controller';
categoryRouter.route("/").get(get);

export { categoryRouter }