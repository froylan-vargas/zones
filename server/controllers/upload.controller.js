const { readUploadTemplate } = require('../utils/excel-reader');
const { getProductsByCategoryId, batchUpload } = require('../models/product.model');
const { preTransformCurrentProducts } = require('../models/product.model');
const { transformArrayToObject } = require('../utils/array');
const productValidator = require('../utils/serverValidators/product-validators.utils');
const keys = require('../config/keys');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: keys.AWS_CLIENT,
    secretAccessKey: keys.AWS_SECRET,
    Bucket: 'zones-images'
});

const handleExcelUpload = async (req, res) => {
    const { categoryId } = req.params
    if (!productValidator.validateCategory(categoryId)) {
        return res.json({ error: 'Categoria invalida' });
    }

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

            const uploadErrors = excelData.reduce((result, product, i) => {
                const errors = productValidator.validateUploadProduct(product);
                if (errors.length) {
                    result.push(`error en la fila ${i + 2}: ${errors.join(', ')}`);
                }
                return result;
            }, []);
    
            if (uploadErrors.length) {
                console.log(uploadErrors);
                return res.send({ error: uploadErrors });
            }

            const currentProducts = await getProductsByCategoryId(categoryId);
            const preTransformedCurrentProducts = preTransformCurrentProducts(currentProducts);
            const transformed = transformArrayToObject(preTransformedCurrentProducts, 'name');
            try {
                await batchUpload(excelData, transformed, categoryId);
                res.send("Upload succees");
            }
            catch (error) {
                res.send({ error: 'No fue posible subir los productos' });
            }
        });
    } catch (err) {
        console.log(err);
        const error = err.code ? err.message : 'No fue posible subir los productos';
        res.send(error);
    }
}

module.exports = {
    handleExcelUpload
}