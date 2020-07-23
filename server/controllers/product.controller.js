const {Product} = require('../models/product.model');
const { sequelize } = require('../config/database');

const getAllProducts = async (req,res) => {
    try {
        const products = await _getProducts()
        res.json({
            data: products
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

const _getProducts = async () => {
    try {
        return await Product.findAll({})
    } catch (err) {
        console.log(err);
    }
}

const createProduct = async (product, transaction) => {
    return Product.create(product, {
        fields: ['categoryid', 'name', 'price', 'images', 'createdon', 'modifiedon', 'isactive'],
        transaction
    })
}

const batchUpload = async (productsToUpload, availableProducts) => {
    try {
        await sequelize.transaction(async (t) => {
            const promises = [];
            productsToUpload.forEach(async productToUpload => {
                const availableProduct = availableProducts[productToUpload.name.toLowerCase()];
                let promise = null;
                if (!availableProduct) {
                    promise = createProduct(productToUpload, t);
                } else {
                    productToUpload.modifiedon = new Date(Date.now());
                    promise = Product.update(productToUpload, {
                        where: { id: availableProduct.id },
                    },{transaction:t})
                }
                promises.push(promise);
            });
            return Promise.all(promises)
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllProducts,
    _getProducts, 
    batchUpload
}