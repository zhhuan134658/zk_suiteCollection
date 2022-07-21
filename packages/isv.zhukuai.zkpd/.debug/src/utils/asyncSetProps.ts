import { refreshDataResolve, resRefreshData } from '../types/Response';

const asyncSetProps = async (
  _this: any,
  value: any,
  bizAlias: string,
  biaoName?: string,
  altProjectName?: string,
  projectBiz?: string,
) => {
  const { form, spi } = _this.props;
  const projectBizAlias = projectBiz ? projectBiz : 'Autopro';
  const ProjectName = form.getFieldValue(projectBizAlias);
  console.log('123456', projectBizAlias, ProjectName, form);
  value.project_name = ProjectName;
  const biz = bizAlias;
  if (altProjectName) {
    value.project_name = altProjectName;
  }
  if (biaoName) {
    value.biao_name = biaoName;
  }
  const keyField = form.getFieldInstance(biz);
  const key = keyField.getProp('id');
  const bizAsyncData = [
    {
      key,
      bizAlias: biz,
      extendValue: value,
      value: '1',
    },
  ];
  console.log(bizAsyncData, 'bizAsyncData');
  try {
    const promise = await spi.refreshData({
      modifiedBizAlias: [biz],
      bizAsyncData,
    });
    const res: resRefreshData = promise;
    // console.log(
    //   res,
    //   '11111111111111111111',
    //   JSON.parse(res?.dataList[0]?.value),
    // );
    const resolveData: refreshDataResolve = {
      dataArray: undefined,
      extendArray: undefined,
      currentPage: undefined,
      totalCount: undefined,
      message: undefined,
    };
    try {
      resolveData.dataArray = JSON.parse(res?.dataList[0]?.value).data;
      resolveData.currentPage = JSON.parse(res?.dataList[0]?.value).page;
      //   resolveData.extendArray = JSON.parse(res?.dataList[0]?.extendValue);
      resolveData.totalCount = JSON.parse(res?.dataList[0]?.value).count;
      //   resolveData.message = JSON.parse(res?.dataList[0]?.value).msg;
      return resolveData;
    } catch (e) {
      throw new Error(e);
    }
  } catch (e) {
    throw new Error(e);
  }
};

const uploadAsyncSetProps = async (
  _this: any,
  data: any,
  type: string,
  bizAlias: string,
) => {
  const promise = await asyncSetProps(_this, data, bizAlias);
  const resolveData = {
    OSSData: null,
    uploadData: null,
    modelUrl: null,
  };
  const res = promise;
  switch (type) {
    case 'jsapi':
      resolveData.OSSData = res.dataArray;
      break;
    case 'upload':
      resolveData.uploadData = res.dataArray;
      break;
    case 'ModelType':
      resolveData.modelUrl = res.dataArray[0]['url'];
      break;
    default:
      throw new Error('type error');
  }
  return resolveData;
};

const parseTableAsync = async (_this: any, data: any, bizAlias: string) => {
  const { form } = _this.props;
  const ProjectName = form.getFieldValue('Autopro');
  const ck_name = _this.state.detailname;
  if (ck_name) {
    data['ck_name'] = ck_name;
  }
  if (!ProjectName) {
    throw new Error('请先选择项目');
  }
  const resolve = await asyncSetProps(_this, data, bizAlias);
  const resolveData = {
    uploadData: null,
  };
  resolveData.uploadData = resolve.dataArray;
  return resolveData;
};

export { asyncSetProps, uploadAsyncSetProps, parseTableAsync };
