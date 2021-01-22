import request from 'supertest';
import { app } from '../../../app';
import Product from '../../../models/product.model';

const validData = [
    {
        name: 'mariposas',
        description: 'son distintas pero existen',
        price: 20,
        isActive: true
    }
];

const invalidData = [
    {
        name: '',
        description: '',
        price: 'adios',
        isActive: 'hola'
    },
    {
        name: '',
        description: '',
        price: 'adios',
        isActive: 'hola'
    }
];

it('returns 1 error for each invalid row', async () => {
    const { body: upload } = await request(app)
        .post('/upload/products/1')
        .send({ data: invalidData })
        .expect(400);
    expect(upload.errors.length).toEqual(2);
});

it('saves all the uploaded products to db', async () => {
    await request(app)
        .post('/upload/products/1')
        .send({ data: validData })
        .expect(200);
    const products = await Product.findAll();
    expect(products[0].name).toEqual('mariposas');
});




