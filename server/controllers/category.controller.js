const Category = require('../models/category');
const { sequelize } = require('../config/database');

const getCategories = async (req,res) => {
    try {
        const categories = await Category.findAll()
        res.json({
            categories
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports = {
    getCategories
}