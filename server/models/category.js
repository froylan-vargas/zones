const Sequelize = require('sequelize')
const { sequelize } = require('../config/database')

const Category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: Sequelize.TEXT },
    createdon: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    isactive: { type: Sequelize.BOOLEAN }
}, { timestamps: false })

module.exports = Category