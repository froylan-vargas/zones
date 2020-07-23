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
            categoryid: product.categoryid,
            name: product.name,
            price: product.price,
            images: product.images,
            isActive: product.isactive
        }
    });
}

const createTemplateData = transformedProducts => {
    let templateData = [
        ['categoryid', 'name', 'price', 'images', 'isactive']
    ]
    transformedProducts.forEach(transformedProduct => {
        templateData.push(Object.values(transformedProduct));
    });
    return templateData;
}

module.exports = {
    Product,
    preTransformCurrentProducts,
    productsToTemplateFormat,
    createTemplateData
}