import express from 'express'
const configurationRouter = express.Router();

import { getConfigs } from '../../controllers/configuration.controller';

configurationRouter.route("/").get(getConfigs);

export { configurationRouter }