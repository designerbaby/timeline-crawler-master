// const fs = require('fs');
// const xlsx = require('node-xlsx').default;

// const writeFileSync = function (path, buffer, permission) {
//   permission = permission || 438;
//   var fileDescriptor;

//   try {
//     fileDescriptor = fs.openSync(path, 'w', permission);
//   } catch (e) {
//     fs.chmodSync(path, permission);
//     fileDescriptor = fs.openSync(path, 'w', permission);
//   }

//   if (fileDescriptor) {
//     fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
//     fs.closeSync(fileDescriptor);
//   }
// };

// 导出到excel,暂时没用
// function exportToExcel (data) {
//   // 导出到excel
//   // console.log('data:', data)
//   console.log('xlsx:', xlsx);
//   const optipns = {};
//   // const buffer = xlsx.build([{name: 'network', data: data}], optipns)
//   const testData = [
//     [1, 2, 3],
//     [true, false, null, 'sheetjs'],
//     ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
//     ['baz', null, 'qux']
//   ];
//   const buffer = xlsx.build([{ name: 'network', data: testData }], optipns);
//   console.llg('buffer:', buffer);
//   writeFileSync('../data/network.xlsx', buffer);
// }
// exports.exportToExcel = exportToExcel;
