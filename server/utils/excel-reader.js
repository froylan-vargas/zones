const xlsx = require('xlsx');

const readUploadTemplate = async (buffer) => {
    var workbook = xlsx.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet, { skipHeader: 'A' })
}

module.exports = {
    readUploadTemplate
}