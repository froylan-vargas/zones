const { Product, getProductsByCategoryId, getProducts } = require('../models/product.model');
const { sequelize } = require('../config/database');
const validateProduct = require('../utils/serverValidators/product-validators.utils');

const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.json({
            data: products
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const getProductByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await getProductsByCategoryId(categoryId);
        res.json({
            data: products
        })
    } catch (err) {
        res.send(err);
    }
}

const createProduct = async (req, res) => {
    const product = req.body;
    const error = validateProduct(product);

    if (error) {
        return res.json({ error }).status(400);
    }

    try {
        const newProduct = await Product.create(product, {
            fields: ['categoryid', 'name', 'price', 'images', 'createdon', 'modifiedon', 'isactive']
        })

        res.send(newProduct);
    } catch (error) {
        let errorMessage = '';
        if (error.parent.code == 23505) errorMessage = 'El nombre de producto ya existe';
        else errorMessage = 'Error al guardar el producto';
        res.json({ error: errorMessage }).status(400);
    }

}

const updateProduct = async (req, res) => {
    const product = req.body;
    const error = validateProduct(product);
    product.modifiedon = new Date(Date.now());
    if (error) {
        return res.json({ error }).status(400);
    }
    try {
        const updatedProduct = await Product.update(product, {
            where: { id: product.id }
        })
        if (updatedProduct[0] > 0) return res.json('edited');
        else res.json({ error: 'no se pudo editar el producto' }).status(400);
    } catch (error) {
        let errorMessage = '';
        if (error.parent.code == 23505) errorMessage = 'El nombre de producto ya existe';
        else errorMessage = 'Error al guardar el producto';
        res.json({ error: errorMessage }).status(400);
    }
}

module.exports = {
    getAllProducts,
    getProductByCategoryId,
    createProduct,
    updateProduct
}