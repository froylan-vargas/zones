const xlsx = require('xlsx');
const { _getProductsByCategoryId } = require('../controllers/product.controller');
const { productsToTemplateFormat, createTemplateData } = require('../models/product.model');

const handleExcelDownload = async (req, res) => {
    const {categoryId} = req.params;
    console.log(categoryId);
    try {
        const filePath = 'public/Lista_Productos.xlsx';
        const currentProducts = await _getProductsByCategoryId(categoryId);
        const preTransformedProducts = productsToTemplateFormat(currentProducts);
        const templateData = createTemplateData(preTransformedProducts)
        const sheet = xlsx.utils.json_to_sheet(templateData, { skipHeader: 'A' });
        let wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, sheet, "products");
        xlsx.writeFile(wb, filePath);
        res.setHeader('Content-disposition', 'attachment; filename=Lista_Productos.xlsx');
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.download(filePath)
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    handleExcelDownload
}