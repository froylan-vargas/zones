import xlsx from 'xlsx';
import constants from './constants.utils';

export const readExcelFile = data => {
    var workbook = xlsx.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelData = xlsx.utils.sheet_to_json(sheet, { skipHeader: 'A' })
    return excelData;
}

export const downloadFile = data => {
    const sheet = xlsx.utils.json_to_sheet(data, { skipHeader: 'A' });
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, sheet, "products");
    xlsx.writeFile(wb, constants.DOWNLOAD_FILENAME);
}