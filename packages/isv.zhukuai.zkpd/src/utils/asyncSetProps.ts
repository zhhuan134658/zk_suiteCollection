import { refreshDataResolve, resRefreshData } from '../types/Response';
import { NewPage } from '../types/runtime';

const asyncSetProps = async (
  _this: any,
  params: NewPage,
  bizAlias: string,
  biaoName?: string,
  altProjectName?: string,
  projectBiz?: string,
) => {
  const { form, spi } = _this.props;
  const projectBizAlias = projectBiz ? projectBiz : 'Autopro';
  const ProjectName = form.getFieldValue(projectBizAlias);

  params.project_name = ProjectName;
  altProjectName && (params.project_name = altProjectName);
  biaoName && (params.biao_name = biaoName);
  const keyField = form.getFieldInstance(bizAlias);
  const key = keyField.getProp('id');

  try {
    const promise = await spi.refreshData({
      modifiedBizAlias: [bizAlias],
      bizAsyncData: [
        {
          key,
          bizAlias,
          extendValue: params,
          value: '1',
        },
      ],
    });
    const res: resRefreshData = promise;
    console.log(
      'BIZALIAS_RESULT',
      bizAlias,
      JSON.parse(res?.dataList[0]?.value),
    );

    try {
      const {
        data = [],
        page = 1,
        count = 0,
        type = '',
        list = [],
        typeList = [],
        optionNature = [],
        extendArray = [],
        pageSize = 10,
        success = undefined,
        message = undefined,
      } = JSON.parse(res?.dataList[0]?.value);
      const resolveData: refreshDataResolve = {
        success,
        message,
        page,
        count,
        type,
        list,
        typeList,
        pageSize,
        optionNature,
      };
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
      resolveData.modelUrl = res.dataArray[0]?.['url'] || '';
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
