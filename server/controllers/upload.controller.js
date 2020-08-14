const { getProductsByCategoryId, batchUpload } = require('../models/product.model');
const { preTransformCurrentProducts } = require('../models/product.model');
const { transformArrayToObject } = require('../utils/array');
const productValidator = require('../utils/serverValidators/product-validators.utils');

const handleExcelUpload = async (req, res) => {
    const { categoryId } = req.params;
    const { data } = req.body;
    if (!productValidator.validateCategory(categoryId)) {
        return res.json({ error: 'Categoria invalida' });
    }

    const uploadErrors = data.reduce((result, product, i) => {
        const errors = productValidator.validateUploadProduct(product);
        if (errors.length) {
            result.push(`error en la fila ${i + 2}: ${errors.join(', ')}`);
        }
        return result;
    }, []);

    if (uploadErrors.length) {
        return res.send({ error: uploadErrors });
    }

    const currentProducts = await getProductsByCategoryId(categoryId);
    const preTransformedCurrentProducts = preTransformCurrentProducts(currentProducts);
    const transformed = transformArrayToObject(preTransformedCurrentProducts, 'name');
    try {
        await batchUpload(data, transformed, categoryId);
        res.send("Upload succees");
    }
    catch (error) {
        res.send({ error: 'No fue posible subir los productos' });
    }
}

module.exports = {
    handleExcelUpload
}