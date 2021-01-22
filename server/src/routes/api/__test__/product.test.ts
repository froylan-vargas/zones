import request from 'supertest';
import { app } from '../../../app';

const invalidProduct = {
    categoryId: '',
    name: '',
    description: '',
    priority: '',
    price: '',
    isActive: ''
};

const validProduct = {
    categoryId: 1,
    name: 'mariposas',
    description: 'Son distintas pero existen',
    priority: '0',
    price: '22.5',
    isActive: true
}

//CREATE PRODUCT//
it('returns 400 when invalid product, returns correct errors count', async () => {
    const response = await request(app)
        .post('/product')
        .send(invalidProduct)
        .expect(400)

    expect(response.body.errors.length).toEqual(6);
});

it('returns 201 when product created, product name is valid', async () => {
    const response = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201);

    expect(response.body.name).toEqual(validProduct.name);
});

it('returns 400 when product name already exists', async () => {
    const name = 'mariposas';
    await request(app)
        .post('/product')
        .send({
            categoryId: 1,
            name,
            description: 'Son distintas pero existen',
            priority: '0',
            price: '22.5',
            isActive: true
        })
        .expect(201);

    const response = await request(app)
        .post('/product')
        .send({
            categoryId: 1,
            name,
            description: 'Son distintas pero existen',
            priority: '0',
            price: '22.5',
            isActive: true
        })
        .expect(400)

    expect(response.body.errors[0].message).toEqual('El nombre de producto ya existe');
});

//UPDATE PRODUCT//
it('returns 401 when invalid product, returns correct errors count', async () => {
    const response = await request(app)
        .put('/product/423422')
        .send(invalidProduct)
        .expect(400)
    expect(response.body.errors.length).toEqual(6);
});

it('returns not found when the product is not in db', async () => {
    await request(app)
        .put('/product/4332')
        .send(validProduct)
        .expect(404)
});

it('returns 401 if the product name is duplicated', async () => {
    const { body: newProduct } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201)
    await request(app)
        .post('/product')
        .send({ ...validProduct, name: 'cacahuates' })
        .expect(201)
    const { body: updatedProduct } = await request(app)
        .put(`/product/${newProduct.id}`)
        .send({ ...validProduct, name: 'cacahuates' })
        .expect(400);

    expect(updatedProduct.errors[0].message).toEqual('el nombre del producto ya existe');
});

it('returns 200 when product updated', async () => {
    const { body: newProduct } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201)
    await request(app)
        .put(`/product/${newProduct.id}`)
        .send({ ...validProduct, name: 'cacahuates' })
        .expect(200);
});

//GET ALL PRODUCTS//
it('return the created products', async () => {
    await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201)
    await request(app)
        .post('/product')
        .send({ ...validProduct, name: 'cacahuates' })
        .expect(201)
    const { body: products } = await request(app)
        .get('/product')
        .send()
        .expect(200)
    expect(products.length).toEqual(2);
});

//GET PRODUCT BY ID//
it('return product by id', async () => {
    const { body: newProduct } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201)
    const { body: foundProduct } = await request(app)
        .get(`/product/${newProduct.id}`)
        .send()
        .expect(200)
    expect(foundProduct.name).toEqual('mariposas');
});

it('if no product return not found', async () => {
    await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201)
    await request(app)
        .get('/product/32')
        .send()
        .expect(404)
});

//IMAGE UPDATE
it('returns 400 when body is invalid', async () => {
    await request(app)
        .put('/product/image/update')
        .send({ id: 'hola', name: '', action: '' })
        .expect(400);
});

it('returns 404 if product is invalid', async () => {
    await request(app)
        .put('/product/image/update')
        .send({ id: 1, name: 'danna.jpg', action: 'add' })
        .expect(404);
});

it('returns 400 if more than 3 images for a product', async () => {
    const { body: product } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201);
    await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever-up.jpg', action: 'add' })
        .expect(200);
    await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forver-down.jpg', action: 'add' })
        .expect(200);
    await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever-love.jpg', action: 'add' })
        .expect(200);
    await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever.jpg', action: 'add' })
        .expect(400);
});

it('returns 400 if the extension of image is invalid', async () => {
    const { body: product } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201);
    const { body: images } = await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'hola.adios', action: 'add' })
        .expect(400);
    expect(images.errors[0].message).toEqual('La extensión del archivo es invalida');
});

it('returns 400 if the name of the image already exist', async () => {
    const { body: product } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201);
    await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever-up.jpg', action: 'add' })
        .expect(200);
    await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever-up.jpg', action: 'add' })
        .expect(400);
});

it('add the new image in the correct product', async () => {
    const { body: product } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201);
    const { body: images } = await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever-up.jpg', action: 'add' })
        .expect(200);
    expect(JSON.parse(images.imageValue).length).toEqual(1);
});

it('return 400 when name to remove does not exist', async () => {
    const { body: product } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201);
    const { body: images } = await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever-up.jpg', action: 'remove' })
        .expect(400);
    expect(images.errors[0].message).toEqual('La imagen que desea eliminar no existe');
});

it('remove the correct image', async () => {
    const { body: product } = await request(app)
        .post('/product')
        .send(validProduct)
        .expect(201);
    const { body: images } = await request(app)
        .put('/product/image/update')
        .send({ id: product.id, name: 'forever-up.jpg', action: 'add' })
        .expect(200);
});

it('testing', async () => { });



