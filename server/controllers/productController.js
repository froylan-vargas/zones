const Product = require('../models/product');
const { sequelize } = require('../config/database');

const getAllProducts = async (req,res) => {
    try {
        const products = await Product.findAll()
        res.json({
            data: products
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports = {
    getAllProducts
}