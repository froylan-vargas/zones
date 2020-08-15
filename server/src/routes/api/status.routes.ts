import express from 'express'
const statusRouter = express.Router();

import { statusCheck } from '../../controllers/statusController';

statusRouter.route("/").get(statusCheck);

export { statusRouter };