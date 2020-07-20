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
    createdon: { type: Sequelize.TIME },
    modifiedon: { type: Sequelize.TIME },
    isactive: { type: Sequelize.BOOLEAN }
}, { timestamps: false })

module.exports = Product