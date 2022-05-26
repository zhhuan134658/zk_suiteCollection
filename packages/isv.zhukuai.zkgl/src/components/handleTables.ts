import { DataType } from '../types/runtime';
import { fpAdd, fpDivide, fpMul, toFixed } from '../utils/fpOperations';

const deleteRowForTaxCalcTables = (_this: any, row: DataType) => {
  const dataSource = [..._this.state.dataSource];
  const remainArray = dataSource.filter(item => item.id !== row.id);
  _this.setState({
    dataSource: remainArray,
  });
  let taxedArray = [];
  taxedArray = remainArray.filter(item => {
    if (item.amount_tax) {
      return item;
    }
  });
  taxedArray = taxedArray.map(item => {
    return item.amount_tax;
  });
  let taxfreeArray = remainArray.filter(item => {
    if (item.no_amount_tax) {
      return item;
    }
  });
  taxfreeArray = taxfreeArray.map(item => {
    return item.no_amount_tax;
  });
  let totalTaxed: number, totalTaxfree: number;
  if (taxedArray.length > 0) {
    taxedArray.forEach((value, index) => {
      const number = parseFloat(value);
      taxedArray[index] = number;
    });
    totalTaxed = taxedArray.reduce(fpAdd, 0); // Add up all taxed price
    totalTaxed = toFixed(totalTaxed, 2);
  } else {
    totalTaxed = 0;
  }
  if (taxfreeArray.length > 0) {
    taxfreeArray.forEach((value, index) => {
      const number = parseFloat(value);
      taxfreeArray[index] = number;
    });
    totalTaxfree = taxfreeArray.reduce(fpAdd, 0); // Add up all tax free price
    totalTaxfree = toFixed(totalTaxfree, 2);
  } else {
    totalTaxfree = 0;
  }

  _this.setState({
    Inputmoney1: totalTaxed,
    Inputmoney2: totalTaxfree,
  });
};

const handleSaveTaxTable = (
  _this: any,
  dataList: Array<DataType>,
  row: DataType,
  key: string,
) => {
  const regex = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
  const newData = dataList;
  const index = newData.findIndex(item => row.id === item.id);
  const item = newData[index];
  if (regex.test(row['wz_number'])) {
    row['det_quantity'] = row['wz_number'];
  }
  //   if (!regex.test(row['det_quantity'])) {
  //     row['det_quantity'] = 0;
  //   }
  newData.splice(index, 1, { ...item, ...row });
  //   for (const key in row) {
  //     if (row[key]) {
  //       row[key] = row[key].toString();
  //     }
  //   }
  //   if (!(regex.test(row.tax_rate) || regex.test(row.det_quantity))) {
  //     return newData;
  //   }
  switch (key) {
    case 'no_unit_price':
      if (!regex.test(row.unit_price)) {
        _this.setState({
          fixedColumn: key,
        });
      }
      if (regex.test(row.no_unit_price) && regex.test(row.tax_rate)) {
        const taxBase = 1 + row.tax_rate * 0.01;
        const taxedUnitPrice = fpMul(row.no_unit_price, taxBase);
        console.log('2213123231231', taxedUnitPrice);
        newData[index].unit_price = toFixed(taxedUnitPrice, 2);
      } else if (
        !regex.test(row.no_unit_price) &&
        regex.test(row.tax_rate) &&
        regex.test(row.unit_price)
      ) {
        const taxBase = 1 + row.tax_rate * 0.01;
        const taxfreeUnitPrice = fpDivide(row.unit_price, taxBase);
        newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
      }
      break;
    case 'unit_price':
      if (!regex.test(row.no_unit_price)) {
        _this.setState({
          fixedColumn: key,
        });
      }
      if (regex.test(row.unit_price) && regex.test(row.tax_rate)) {
        const taxBase = 1 + row.tax_rate * 0.01;
        const taxfreeUnitPrice = fpDivide(row.unit_price, taxBase);
        newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
      } else if (
        !regex.test(row.unit_price) &&
        regex.test(row.tax_rate) &&
        regex.test(row.no_unit_price)
      ) {
        const taxBase = 1 + row.tax_rate * 0.01;
        const taxedUnitPrice = fpMul(row.no_unit_price, taxBase);
        const unitPrice = toFixed(taxedUnitPrice, 2);
        newData[index].unit_price = unitPrice;
        const amountTax = fpMul(unitPrice, row.det_quantity);
        newData[index].amount_tax = toFixed(amountTax, 2);
      }
      if (regex.test(row.unit_price) && regex.test(row.det_quantity)) {
        const totalTaxed = fpMul(row.unit_price, row.det_quantity);
        newData[index].amount_tax = toFixed(totalTaxed, 2);
        if (regex.test(row.tax_rate)) {
          const taxBase = 1 + row.tax_rate * 0.01;
          const totalTaxed = fpMul(row.unit_price, row.det_quantity);
          const totalTaxfree = fpDivide(totalTaxed, taxBase);
          newData[index].no_amount_tax = toFixed(totalTaxfree, 2);
          const taxRate = row.tax_rate * 0.01;
          const totalTaxAmount = fpMul(totalTaxfree, taxRate);
          newData[index].tax_amount = toFixed(totalTaxAmount, 2);
        }
      }
      break;
    case 'tax_rate':
      if (regex.test(row.no_unit_price) && !regex.test(row.unit_price)) {
        if (_this.state.fixedColumn === 'unit_price') {
          const taxedUnitPrice = row.unit_price;
          if (regex.test(row.tax_rate)) {
            const taxBase = 1 + row.tax_rate * 0.01;
            const taxfreeUnitPrice = fpDivide(taxedUnitPrice, taxBase);
            newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
            newData[index].no_amount_tax = toFixed(
              fpMul(taxfreeUnitPrice, row.det_quantity),
              2,
            );
            newData[index].amount_tax = toFixed(
              fpMul(row.unit_price, row.det_quantity),
              2,
            );
          }
        } else {
          const taxBase = 1 + row.tax_rate * 0.01;
          const taxedUnitPrice = fpMul(row.no_unit_price, taxBase);
          newData[index].unit_price = toFixed(taxedUnitPrice, 2);
          newData[index].no_amount_tax = toFixed(
            fpMul(row.no_unit_price, row.det_quantity),
            2,
          );
          newData[index].amount_tax = toFixed(
            fpMul(newData[index].unit_price, newData[index].det_quantity),
            2,
          );
        }
      } else if (!regex.test(row.no_unit_price) && regex.test(row.unit_price)) {
        const taxBase = 1 + row.tax_rate * 0.01;
        const taxfreeUnitPrice = fpDivide(row.unit_price, taxBase);
        newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
        const totalTaxed = fpMul(row.unit_price, row.det_quantity);
        newData[index].amount_tax = toFixed(totalTaxed, 2);
        const totalTaxfree = fpMul(row.det_quantity, taxfreeUnitPrice);
        newData[index].no_amount_tax = toFixed(totalTaxfree, 2);
        const totalTaxAmount = fpAdd(totalTaxed, -totalTaxfree);
        newData[index].tax_amount = toFixed(totalTaxAmount, 2);
      } else if (
        regex.test(row.no_unit_price) &&
        regex.test(row.unit_price) &&
        regex.test(row.tax_rate)
      ) {
        if (_this.state.fixedColumn === 'unit_price') {
          const taxedUnitPrice = row.unit_price;
          const taxBase = 1 + row.tax_rate * 0.01;
          const taxfreeUnitPrice = fpDivide(taxedUnitPrice, taxBase);
          newData[index].no_unit_price = toFixed(taxfreeUnitPrice, 2);
          newData[index].no_amount_tax = toFixed(
            fpMul(taxfreeUnitPrice, row.det_quantity),
            2,
          );
          newData[index].amount_tax = toFixed(
            fpMul(newData[index].unit_price, row.det_quantity),
            2,
          );
        } else {
          const taxfreeUnitPrice = row.no_unit_price;
          const taxBase = 1 + row.tax_rate * 0.01;
          const taxedUnitPrice = fpMul(taxfreeUnitPrice, taxBase);
          newData[index].unit_price = toFixed(taxedUnitPrice, 2);
          newData[index].no_amount_tax = toFixed(
            fpMul(taxfreeUnitPrice, row.det_quantity),
            2,
          );
          newData[index].amount_tax = toFixed(
            fpMul(newData[index].unit_price, row.det_quantity),
            2,
          );
        }
      }
      if (
        regex.test(row.no_unit_price) &&
        regex.test(row.det_quantity) &&
        regex.test(row.tax_rate)
      ) {
        const totalTaxfree = fpMul(row.no_unit_price, row.det_quantity);
        const totalTaxed = fpMul(newData[index].unit_price, row.det_quantity);
        const totalTaxAmount = fpAdd(totalTaxed, -totalTaxfree);
        newData[index].tax_amount = toFixed(totalTaxAmount, 2);
        newData[index].amount_tax = toFixed(totalTaxed, 2);
      }
      break;
    default:
      break;
  }
  if (key !== 'unit_price') {
    if (regex.test(row.no_unit_price) && regex.test(row.det_quantity)) {
      const totalTaxfree = fpMul(row.no_unit_price, row.det_quantity);
      if (regex.test(row.tax_rate)) {
        const taxRate = row.tax_rate * 0.01;
        const totalTaxAmount = fpMul(totalTaxfree, taxRate);
        const totalTaxed = fpMul(newData[index].unit_price, row.det_quantity);
        newData[index].tax_amount = toFixed(totalTaxAmount, 2);
        newData[index].amount_tax = toFixed(totalTaxed, 2);
      }
      newData[index].no_amount_tax = toFixed(totalTaxfree, 2);
    }
  }
  for (const key in newData[index]) {
    if (newData[index][key]) {
      newData[index][key] = newData[index][key].toString();
    }
  }
  return newData;
};

const handleTaxTableStatistics = (_this: any, dataArray?: Array<any>) => {
  let allArray: Array<any>;
  if (dataArray && dataArray.length > 0) {
    allArray = [...dataArray];
  } else {
    allArray = [..._this.state.dataSource];
  }
  let taxedArray = allArray.filter(item => {
    if (item.amount_tax) {
      return item;
    }
  });
  taxedArray = taxedArray.map(item => {
    return item.amount_tax;
  });
  let taxfreeArray = allArray.filter(item => {
    if (item.no_amount_tax) {
      return item;
    }
  });
  taxfreeArray = taxfreeArray.map(item => {
    return item.no_amount_tax;
  });
  if (taxedArray.length > 0) {
    taxedArray.forEach((e, index) => {
      const number = parseFloat(e);
      taxedArray[index] = number;
    });
    const taxedSum = taxedArray.reduce(fpAdd, 0); // Add up all taxed price
    _this.setState({
      Inputmoney1: toFixed(taxedSum, 2),
    });
  }
  if (taxfreeArray.length > 0) {
    taxfreeArray.forEach((e, index) => {
      const number = parseFloat(e);
      taxfreeArray[index] = number;
    });
    const taxfreeSum = taxfreeArray.reduce(fpAdd, 0); // Add up all tax free price
    _this.setState({
      Inputmoney2: toFixed(taxfreeSum, 2),
    });
  }
};

export {
  deleteRowForTaxCalcTables,
  handleSaveTaxTable,
  handleTaxTableStatistics,
};
