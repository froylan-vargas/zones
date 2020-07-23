const fs = require('fs');
const { readUploadTemplate } = require('../utils/excel-reader');
const { _getProducts, batchUpload} = require('../controllers/product.controller');
const {preTransformCurrentProducts} = require('../models/product.model');
const {transformArrayToObject} = require('../utils/array');

const handleExcelUpload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.send('please upload a valid file')
        }
        const filePath = `public/${req.file.filename}`;
        const excelData = readUploadTemplate(filePath);
        const currentProducts = await _getProducts();
        const preTransformedCurrentProducts = preTransformCurrentProducts(currentProducts);
        const transformed = transformArrayToObject(preTransformedCurrentProducts, 'name');
        await batchUpload(excelData, transformed);
        fs.unlinkSync(filePath);
        res.send("Upload succees");
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    handleExcelUpload
}