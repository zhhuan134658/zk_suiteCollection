import {
  CheckCircleTwoTone,
  DownloadOutlined,
  EyeOutlined,
  FileFilled,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Modal,
  Steps,
  Upload,
  Table,
  notification,
  Pagination,
} from 'antd';
import React, { useEffect } from 'react';
import { parseTableAsync, uploadAsyncSetProps } from '../utils/asyncSetProps';

const ImportDialog: React.FC<{
  columns: Array<any>;
  binding: any;
  setTableData: (tableData: any) => void;
  bizAlias: string;
}> = props => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [showReset, setShowReset] = React.useState(false);
  const [paginationData, setPaginationData] = React.useState({
    type: '0',
    number: '10',
    page: '1',
    name: '',
    rk_id: [],
    url: '',
  });
  const [fileList, setFileList] = React.useState(undefined);
  const [OSSData, setOSSData] = React.useState({
    expire: 0,
    host: '',
    policy: '',
    signature: '',
    callback: null,
    dir: '',
    accessid: '',
  });
  const [uploadData, setUploadData] = React.useState([]);
  const [uploadAction, setUploadAction] = React.useState('');
  const [modelURL, setModelURL] = React.useState('https://www.baidu.com');
  const [fileName, setFileName] = React.useState('');
  const [errArray, setErrArray] = React.useState([]);
  const [processedColumns, setProcessedColumns] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [pagedData, setPagedData] = React.useState([]);
  const [validData, setValidData] = React.useState([]);
  const resetState = () => {
    setCurrentStep(0);
    setLoading(false);
    setPaginationData({
      type: '0',
      number: '10',
      page: '1',
      name: '',
      rk_id: [],
      url: '',
    });
    setFileList(undefined);
    setUploadData([]);
    setUploadAction('');
    setShowReset(false);
    setFileName('');
    setProcessedColumns([]);
    setTableData([]);
    setPagedData([]);
    setValidData([]);
    setErrArray([]);
  };
  const initUpload = async () => {
    resetState();
    const data = paginationData;
    data.rk_id = ['jsapi'];
    data.url = '';
    data['ModelType'] = '';
    data['ImportType'] = '';
    const APIPromise = uploadAsyncSetProps(
      props.binding,
      data,
      'jsapi',
      props.bizAlias,
    );
    const errorColumn = {
      title: '错误',
      dataIndex: 'errInfo',
      ellipsis: true,
    };
    const columns = [...props.columns];
    columns.forEach((item, index) => {
      if (item.dataIndex === 'operation') {
        columns.splice(index, 1);
      }
      if (item.editable) {
        item.editable = false;
      }
    });
    columns.push(errorColumn);
    console.log('上传的columns', columns);

    setProcessedColumns(columns);
    APIPromise.then(res => {
      console.info(
        'APIReturn',
        res,
        'APIRequest',
        data,
        'BizAlias',
        props.bizAlias,
      );
      if (res.OSSData) {
        setOSSData(res.OSSData);
        setUploadAction(res.OSSData.host);
      }
    }).catch(err => {
      console.log('出错了', err);
      notification.open({
        message: `错误${err}`,
        type: 'error',
      });
    });
    setPaginationData(data);
    data['ModelType'] = props.bizAlias;
    const modelPromise = uploadAsyncSetProps(
      props.binding,
      data,
      'ModelType',
      props.bizAlias,
    );
    modelPromise.then(res => {
      if (res.modelUrl) {
        setModelURL(res.modelUrl);
      }
    });
  };
  const getDuplicateIDs = (uploadData: Array<any>) => {
    const duplicatedArrays = [];

    uploadData.forEach((item, index) => {
      const duplicate = {
        origin: index + 1,
        duplicate: [],
      };
      const id = item.id;
      uploadData.forEach((e, i) => {
        if (i !== index && e.id === id) {
          duplicate.duplicate.push(i + 1);
        }
      });
      if (duplicate.duplicate.length > 0) {
        duplicatedArrays.push(duplicate);
      }
    });
    return duplicatedArrays;
  };

  const beforeUpload = async (file: File) => {
    if (
      file.type !== 'application/vnd.ms-excel' &&
      file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      notification.open({
        message: `文件类型错误,请上传excel文件`,
        type: 'error',
      });
      return Upload.LIST_IGNORE;
    }
    if (!OSSData.accessid) {
      await initUpload();
    }
    const expire = OSSData.expire * 1000;
    if (expire < Date.now()) {
      await initUpload();
    }
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file['url'] = OSSData.dir + filename;
    return file;
  };
  const handleCancel = () => {
    resetState();
    initUpload();
    setModalVisible(false);
  };
  const onChange = (info: any) => {
    console.log('UPLOAD INFO', info);
    if (info.file.status === 'done') {
      const fileurl = `${OSSData.host}/${info.file.url}`;
      const data = paginationData;
      data.rk_id = ['upload'];
      data['ModelType'] = props.bizAlias;
      data['ImportType'] = props.bizAlias;
      data.url = fileurl;
      const UploadPromise = parseTableAsync(
        props.binding,
        data,
        props.bizAlias,
      );
      setLoading(true);
      UploadPromise.then(res => {
        const start = performance.now();
        if (res.uploadData) {
          const uploadData = res.uploadData;
          const duplicateIds = getDuplicateIDs(uploadData);
          if (duplicateIds && duplicateIds.length > 0) {
            uploadData.forEach((item, index) => {
              const duplicateArrs = duplicateIds.map(e => e.origin);
              if (duplicateArrs.includes(index + 1)) {
                uploadData[index]['integrity'] = false;
                uploadData[index]['errInfo'] = `数据和${duplicateIds
                  .find(e => e.origin === index + 1)
                  .duplicate.join(`、`)}行重复`;
              }
            });
          }
          const errorArray = errArray;
          uploadData.forEach((item, index) => {
            if (item.id === 0) {
              item['errInfo'] = '数据不正确';
              uploadData[index] = item;
              errorArray.push(index);
            }
          });
          const pagedData = [];
          for (let i = 0; i < uploadData.length; i += 10) {
            pagedData.push(uploadData.slice(i, i + 10));
          }
          const valid = uploadData.filter(item => item.id !== 0);
          setValidData(valid);
          setPagedData(pagedData);
          setTableData(pagedData[0]);
          setErrArray(errorArray);
          setUploadData(uploadData);
          setLoading(false);
          setFileName(info.file.name);
          //   setCurrentStep(1);
          setShowReset(true);
          const end = performance.now();
          console.log(
            `Call to resolve response took ${end - start} milliseconds.`,
          );
        }
      }).catch(err => {
        console.log('ERROR', err);
        notification.open({
          message: `错误${err}`,
          type: 'error',
        });
        initUpload();
      });
      setFileList(info.fileList);
      setPaginationData(data);
    }
  };
  const loadExtraData = file => {
    const extra = {
      key: file.url,
      OSSAccessKeyId: OSSData.accessid,
      success_action_status: '200',
      policy: OSSData.policy,
      Signature: OSSData.signature,
      callback: OSSData.callback,
    };
    console.log('EXTRA DATA', extra);
    return extra;
  };
  const asyncSetData = (data: any) => {
    return new Promise(resolve => {
      setTimeout(() => {
        props.setTableData(data);
        resolve(null);
      }, 10);
    });
  };
  const next = async () => {
    const start = performance.now();
    //避免阻塞进程
    await asyncSetData(validData);
    setCurrentStep(currentStep + 1);
    const end = performance.now();
    console.log(`Call to setTableData took ${end - start} milliseconds.`);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  useEffect(() => {
    initUpload();
    // this is intentionally ignored as initUpload in useEffect is supposed to be called only when the component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const opLabelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '24px',
    marginTop: '16px',
    color: '#666',
    fontSize: '12px',
  };
  const controlledContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '51%',
    height: '250px',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const steps = [
    {
      title: '选择Excel文件上传',
      content: (
        <div>
          <div
            style={{
              display: 'flex',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              alignItems: 'center',
              padding: '32px, 16px',
            }}
          >
            <div
              className="download-container controlled-container"
              style={controlledContainerStyle}
            >
              <span style={{ display: 'block', marginBottom: '16px' }}>
                {`1、下载模版，填写信息`}
              </span>
              <FileFilled style={{ fontSize: '64px', color: '#c1c8ce' }} />
              <span className="op-label" style={opLabelStyle}>
                {'为保证数据导入顺利，建议下载使用模板填写信息'}
              </span>
              <Button
                icon={<DownloadOutlined />}
                href={modelURL}
                target={'_blank'}
                download={true}
              >
                下载模板
              </Button>
            </div>
            <div
              style={{
                border: '1px dashed #d9d9d9',
                height: '130px',
                width: '1px',
              }}
            ></div>
            <div
              className="upload-container controlled-container"
              style={controlledContainerStyle}
            >
              <span
                style={{
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {`2、上传填写完成的文件`}
              </span>
              {!showReset && !loading && (
                <FileFilled style={{ fontSize: '64px', color: '#c1c8ce' }} />
              )}
              {loading && (
                <LoadingOutlined
                  style={{ fontSize: '64px', color: '#c1c8ce' }}
                />
              )}
              {showReset && (
                <FileFilled style={{ fontSize: '64px', color: '#26c36a' }} />
              )}
              {!showReset && (
                <span className="op-label" style={opLabelStyle}>
                  {`仅支持上传excel文件,建议使用模板填写信息`}
                </span>
              )}
              {showReset && (
                <span className="op-label" style={opLabelStyle}>
                  {fileName}
                </span>
              )}
              {!showReset && (
                <Upload
                  maxCount={1}
                  name={'file'}
                  action={uploadAction}
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                  data={loadExtraData}
                  showUploadList={false}
                  onDownload={() => {
                    return false;
                  }}
                  onPreview={file => {
                    window.open(`${OSSData.host}/${file.url}`, '_blank');
                  }}
                  progress={{
                    strokeColor: {
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    },
                    strokeWidth: 3,
                    format: percent => `${parseFloat(percent.toFixed(2))}%`,
                  }}
                  accept=".xlsx,.xls"
                >
                  <Button icon={<UploadOutlined />} type="primary" ghost>
                    上传文件
                  </Button>
                </Upload>
              )}
              {showReset && (
                <div>
                  <Button
                    onClick={() => {
                      initUpload();
                    }}
                    type="primary"
                    ghost
                    style={{
                      marginRight: '8px',
                    }}
                  >
                    重新上传
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      setCurrentStep(1);
                    }}
                  >
                    导入文件
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      index: 0,
    },
    {
      title: '预览上传数据',
      icon: loading ? <LoadingOutlined /> : <EyeOutlined />,
      content: (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Table
            className="full-size-editable"
            scroll={{ x: 1750 }}
            columns={processedColumns}
            dataSource={tableData}
            rowClassName={record => {
              if (!record.integrity) {
                return 'squeeze-row integrity-false';
              } else {
                return 'squeeze-row';
              }
            }}
            pagination={false}
          />
          <Pagination
            hideOnSinglePage={true}
            pageSize={10}
            total={uploadData.length}
            showSizeChanger={false}
            onChange={page => {
              console.log('PAGED DATA', pagedData);
              setTableData(pagedData[page - 1]);
              console.log('TABLE DATA', tableData);
            }}
            style={{
              marginTop: '16px',
            }}
          />
        </div>
      ),
      index: 1,
    },
    {
      title: '确认上传',
      content: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            style={{ fontSize: '64px', marginBottom: '24px' }}
          />
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: '16px',
            }}
          >
            <p>{`共${uploadData.length}条数据`}</p>
            <p>{`导入${
              uploadData.filter(item => item.id !== 0).length
            }条数据成功`}</p>
            {errArray.length > 0 && (
              <p className="integrity-false">
                {`导入${errArray.length}条数据失败`}
              </p>
            )}
          </div>
        </div>
      ),
      index: 2,
    },
  ];
  return (
    <div>
      <Button type="primary" ghost onClick={() => setModalVisible(true)}>
        导入数据
      </Button>
      <style>{`
        .integrity-false {
            color: red;
        }
        .squeeze-row .ant-table-cell {
            padding-top: 8px;
            padding-bottom: 8px;
        }
      `}</style>
      <Modal
        visible={modalVisible}
        onCancel={handleCancel}
        width={750}
        title={'导入数据'}
        footer={
          <span className="steps-action">
            {currentStep === 0 && (
              <div style={{ textAlign: 'left' }}>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '12px',
                  }}
                >
                  {`当前最多只允许导入1000条数据，且文件大小不超过20MB`}
                </span>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    textAlign: 'left',
                    color: '#ccc',
                    fontSize: '12px',
                  }}
                >
                  仅支持
                  {<span style={{ color: '#666' }}>{`(*.xls和*.xlsx)`}</span>}
                  文件
                </span>
              </div>
            )}
            {currentStep > 0 && currentStep !== steps.length - 1 && !loading && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                上一步
              </Button>
            )}
            {currentStep < steps.length - 1 && currentStep !== 0 && !loading && (
              <Button
                type="primary"
                onClick={async () => {
                  setLoading(true);
                  await next();
                  setLoading(false);
                }}
              >
                下一步
              </Button>
            )}
            {currentStep > 0 && currentStep !== steps.length - 1 && loading && (
              <Button style={{ margin: '0 8px' }} disabled>
                上一步
              </Button>
            )}
            {currentStep < steps.length - 1 && currentStep !== 0 && loading && (
              <Button type="primary" disabled icon={<LoadingOutlined />}>
                导入中...
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    notification.open({
                      message: `导入成功`,
                      type: 'success',
                    });
                    initUpload();
                    setModalVisible(false);
                  }}
                >
                  完成
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    initUpload();
                  }}
                >
                  再次导入
                </Button>
              </span>
            )}
          </span>
        }
      >
        <Steps current={currentStep}>
          {steps.map(item => (
            <Steps.Step key={item.index} title={item.title} />
          ))}
        </Steps>
        <div
          className="steps-content"
          style={{
            marginTop: '24px',
            marginBottom: '24px',
          }}
        >
          {steps[currentStep].content}
        </div>
      </Modal>
    </div>
  );
};

export { ImportDialog };
