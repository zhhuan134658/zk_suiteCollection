import { PrintColumn } from '../utils/printStringParser';

const UploadColumns: Array<PrintColumn> = [
  {
    name: 'huowu',
    title: '货物或应税劳务、服务名称',
    length: 16,
  },
  {
    name: 'size',
    title: '规格型号',
    length: 12,
  },
  {
    name: 'unit',
    title: '单位',
    length: 12,
  },
  {
    name: 'number',
    title: '数量',
    length: 12,
  },
  {
    name: 'price',
    title: '单价',
    length: 12,
  },
  {
    name: 'money',
    title: '金额',
    length: 12,
  },

  {
    name: 'shuilv',
    title: '税率',
    length: 12,
  },
  {
    name: 'shuier',
    title: '税额',
    length: 12,
  },
];
export { UploadColumns };
