const Sequelize = require('sequelize')
const { sequelize } = require('../config/database')

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryid: { type: Sequelize.INTEGER },
    name: { type: Sequelize.TEXT },
    description: { type: Sequelize.TEXT },
    priority: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    price: { type: Sequelize.NUMBER },
    images: { type: Sequelize.TEXT },
    createdon: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    modifiedon: { type: 'TIMESTAMP' },
    isactive: { type: Sequelize.BOOLEAN }
}, { timestamps: false })

const preTransformCurrentProducts = currentProducts => {
    return currentProducts.map(product => {
        const transformedProduct = {
            id: product.id,
            categoryid: product.categoryid,
            name: product.name,
            price: product.price,
            images: product.images,
            createdOn: product.createdon,
            modifiedOn: product.modifiedon,
            isActive: product.isactive
        }
        return transformedProduct;
    });
}

const productsToTemplateFormat = currentProducts => {
    return currentProducts.map(product => {
        return {
            name: product.name,
            price: product.price,
            description: product.description,
            isActive: product.isactive
        }
    });
}

const createTemplateData = transformedProducts => {
    let templateData = [
        ['name', 'price', 'description', 'isactive']
    ]
    transformedProducts.forEach(transformedProduct => {
        templateData.push(Object.values(transformedProduct));
    });
    return templateData;
}

const getProducts = async () => {
    try {
        return await Product.findAll({
            order: [
                ['isactive', 'DESC'],
                ['priority', 'DESC']
            ]
        });
    } catch (err) {
        console.log(err);
    }
}

const getProductsByCategoryId = async (categoryid) => {
    try {
        const products = await Product.findAll({
            where: {
                categoryid
            }
        })
        return products
    } catch (err) {
        console.log(err);
    }
}

const createProduct = async (product, transaction) => {
    console.log(product);
    return Product.create(product, {
        fields: ['categoryid', 'name', 'description', 'price', 'createdon', 'modifiedon', 'isactive'],
        transaction
    })
}

const batchUpload = async (productsToUpload, availableProducts, categoryId) => {
    try {
        await sequelize.transaction(async (t) => {
            const promises = [];
            productsToUpload.forEach(async productToUpload => {
                productToUpload.categoryid = categoryId;
                const availableProduct = availableProducts[productToUpload.name.toLowerCase()];
                let promise = null;
                if (!availableProduct) {
                    promise = createProduct(productToUpload, t);
                } else {
                    productToUpload.modifiedon = new Date(Date.now());
                    promise = Product.update(productToUpload, {
                        where: { id: availableProduct.id },
                    }, { transaction: t })
                }
                promises.push(promise);
            });
            return Promise.all(promises)
        })
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    Product,
    preTransformCurrentProducts,
    productsToTemplateFormat,
    createTemplateData,
    batchUpload,
    getProductsByCategoryId,
    getProducts
}