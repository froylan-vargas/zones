import express from 'express'
import {apiRouter} from './api'

const router = express.Router();

router.use("/", apiRouter);

export default router;

