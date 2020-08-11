const xlsx = require('xlsx');
const { getProductsByCategoryId } = require('../models/product.model');
const { productsToTemplateFormat, createTemplateData } = require('../models/product.model');
const productValidator = require('../utils/serverValidators/product-validators.utils');

const handleExcelDownload = async (req, res) => {
    const { categoryId } = req.params;

    if (!productValidator.validateCategory(categoryId)) {
        return res.json({ error: 'Categoria invalida' });
    }

    try {
        const currentProducts = await getProductsByCategoryId(categoryId);
        if (!currentProducts.length) throw { code: 1 }
        const preTransformedProducts = productsToTemplateFormat(currentProducts);
        const templateData = createTemplateData(preTransformedProducts);
        res.send(templateData);
    } catch (err) {
        console.log(err);
        const error = err.code === 1 ? 'No hay productos en la catgoría' : 'No fue posible descargar el archivo';
        res.send({error});
    }
}

module.exports = {
    handleExcelDownload
}