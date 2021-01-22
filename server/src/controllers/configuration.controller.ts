import { Request, Response } from 'express';

import Configuration from '../models/configuration.model';
import {transformArrayToObject} from '../utils/array';

export const getConfigs = async (req: Request, res: Response) => {
    
    const configs = await Configuration.findAll({
        where: {
            isActive: true
        }
    });
    const configValues = transformArrayToObject(configs,'name'); 
    res.send(configValues);
}