import request from 'supertest';
import { app } from '../../../app';

it('returns 400 if no product for the category', async () => {
    const { body: download } = await request(app)
        .get('/download/products/1')
        .send()
        .expect(400);

    expect(download.errors[0].message).toEqual('No hay productos en esta categoría');
});

it('returns template data if products in the category', async () => {
    await request(app)
        .post('/product')
        .send({ categoryId: 1, name: 'mariposas', description: 'Son distintas pero existen', priority: '0', price: '22.5', isActive: true })
        .expect(201);
    const { body: download } = await request(app)
        .get('/download/products/1')
        .send()
        .expect(200);
    console.log(download);
    expect(download[0][0]).toEqual('name');
    expect(download[1][0]).toEqual('mariposas');
});