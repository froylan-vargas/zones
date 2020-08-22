import { Request, Response } from 'express';
import AWS from 'aws-sdk';

import keys from '../config/keys';

const s3 = new AWS.S3({
    accessKeyId: keys.UPLOADKEY,
    secretAccessKey: keys.UPLOADSECRET,
    region: 'us-east-2'
});

export const create = async (req: Request, res: Response) => {
    const { name, id } = req.query;
    const key = `${id}/${name}`;
    s3.getSignedUrl('putObject', {
        Bucket: keys.ASSETS_BUCKET,
        ContentType: 'image/jpeg,image/png',
        Key: key
    }, (err: any, url: string) => res.send({ key, url }));
}

export const remove = async (req: Request, res: Response) => {
    const { name, id } = req.query;
    const key = `${id}/${name}`;
    s3.getSignedUrl('deleteObject', {
        Bucket: keys.ASSETS_BUCKET,
        Key: key
    }, (err: any, url: string) => res.send({ key, url }));
}