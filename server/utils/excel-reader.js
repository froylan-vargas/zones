const xlsx = require('xlsx');

const readUploadTemplate = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet, { skipHeader: 'A' })
}

module.exports = {
    readUploadTemplate
}