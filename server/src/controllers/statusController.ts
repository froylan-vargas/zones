import { Request, Response } from 'express';

export const statusCheck = (req: Request, res: Response) => {
    res.send('app is easy')
}