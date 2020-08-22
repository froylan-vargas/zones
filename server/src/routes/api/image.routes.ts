import express from 'express'
const imageRouter = express.Router();

import { create, remove } from '../../controllers/image.controller';

imageRouter.route("/create").get(create);
imageRouter.route("/remove").get(remove);

export { imageRouter }