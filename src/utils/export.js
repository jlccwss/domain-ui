import XLSX from "xlsx";

export function exportCsv(fileName, data) {
  /* 从表生成工作簿对象 */
  let ws = XLSX.utils.aoa_to_sheet(data);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '数据详情')
  var wbout = XLSX.writeFile(wb, `${fileName}.csv`);
  return wbout
}