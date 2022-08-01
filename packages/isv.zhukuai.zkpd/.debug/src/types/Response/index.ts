interface ArrayObj {
  [key: string]: any;
}
export interface resRefreshData {
  dataList: Array<dataListObjects>;
  schemaList: Array<schemaListObjects>;
  seqId: Number;
}

export interface dataListObjects {
  bizAlias: string;
  extendValue: string;
  value: string;
}

export interface schemaListObjects {
  bizAlias: string;
  componentName: string;
  extendValue: string;
  value: string;
}

export interface refreshDataResolve {
  dataArray?: any;
  extendArray?: any;
  message?: any;
  page?: number;
  count?: number;
  type?: string;
  list?: ArrayObj[];
  typeList?: ArrayObj[];
  pageSize?: number;
  success?: boolean | undefined;
  errorMessage?: string;
  optionNature?: ArrayObj[];
}
