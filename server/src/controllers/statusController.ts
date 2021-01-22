import { Request, Response } from 'express';

export const statusCheck = (req: Request, res: Response) => {
    res.status(201).send({status:'healthy'});
}