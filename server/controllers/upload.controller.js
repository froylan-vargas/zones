const { readUploadTemplate } = require('../utils/excel-reader');
const { _getProductsByCategoryId, batchUpload } = require('../controllers/product.controller');
const { preTransformCurrentProducts } = require('../models/product.model');
const { transformArrayToObject } = require('../utils/array');
const keys = require('../config/keys');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: keys.AWS_CLIENT,
    secretAccessKey: keys.AWS_SECRET,
    Bucket: 'zones-images'
});

const handleExcelUpload = async (req, res) => {
    const { categoryId } = req.params
    try {
        if (req.file == undefined) {
            return res.send('please upload a valid file')
        }
        const params = {
            Bucket: 'zones-images', Key: req.file.key
        }
        var file = s3.getObject(params).createReadStream();
        var buffers = [];
        file.on('data', function (data) {
            buffers.push(data);
        });
        file.on('end', async function () {
            var buffer = Buffer.concat(buffers);
            const excelData = await readUploadTemplate(buffer);
            console.log(excelData);
            const currentProducts = await _getProductsByCategoryId(categoryId);
            const preTransformedCurrentProducts = preTransformCurrentProducts(currentProducts);
            const transformed = transformArrayToObject(preTransformedCurrentProducts, 'name');
            await batchUpload(excelData, transformed, categoryId);
            res.send("Upload succees");
        });
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    handleExcelUpload
}