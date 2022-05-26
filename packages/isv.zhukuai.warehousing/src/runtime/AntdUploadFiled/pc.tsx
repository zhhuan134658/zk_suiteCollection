import { Upload, Button, Table, Tooltip, Input } from 'antd';
import React from 'react';
import { ColumnTypes, ISwapFormField } from '../../types/runtime';
import { asyncSetProps } from '../../utils/asyncSetProps';
import { UploadOutlined } from '@ant-design/icons';
import { EditableRow } from '../../components/editableRow';
import { EditableCell } from '../../components/editableCell';
import { parsePrintString } from '../../utils/printStringParser';
import { UploadColumns } from '../../printColumns/AntdUpload';
const FormField: ISwapFormField = {
  getInitialState() {
    return {
      imgBase64: '',
      fileList: [],
      OSSData: {},
      value: '',
      options: [],
      current_page: '', //当前页
      total2: '',
      allData: { type: '0', number: '10', page: '1', name: '' },
      isModalVisible: false,
      listData: [],
      detailData: [],
      invoice_number: '',
      totalData: {
        taxFree: '',
        tax: '',
        total: '',
      },
    };
  },
  async fieldDidMount() {
    await this.methods().init();
  },
  fieldDidUpdate() {
    if (!this.props.runtimeProps.viewMode) {
      console.log('发起页：fieldDidUpdate');
      const editData = {
        hanmoney: 0,
        nomoney: 0,
        tax: 0,
        invoice_number: '',
        detailedData: [], //物资明细
      };
      if (this.state.totalData.total) {
        editData.hanmoney = Number(this.state.totalData.total);
      }
      if (this.state.totalData.taxFree) {
        editData.nomoney = Number(this.state.totalData.taxFree);
      }
      if (this.state.totalData.tax) {
        editData.tax = Number(this.state.totalData.tax);
      }

      editData.invoice_number = this.state.invoice_number;
      editData.detailedData = this.state.detailData;
      const { form } = this.props;
      form.setFieldExtendValue('AntdUpload', editData);
    }
  },
  asyncSetFieldProps(data: any, type: any) {
    const _this = this;
    const { form } = this.props;
    const promise = asyncSetProps(_this, data, 'AntdUpload');
    promise.then(res => {
      console.log('上传接口', res);
      if (type === 'jsapi') {
        _this.setState({
          OSSData: res.dataArray,
        });
      } else if (type === 'upload') {
        console.log('发票详情', res);
        console.log(res.dataArray.invoice_details);
        _this.setState({
          detailData: res.dataArray.invoice_details,
          totalData: {
            taxFree: res.dataArray.no_shui_money,
            tax: res.dataArray.invoice_shuier,
            total: res.dataArray.invoice_money,
          },
          invoice_number: res.dataArray.invoice_number,
        });
        const d = res.dataArray.invoice_details;
        try {
          const str2 = this.state.invoice_number;
          const str1 = `不含税金额合计(元)：${this.state.totalData.taxFree}\n 税额合计(元)：${this.state.totalData.tax}\n 含税金额合计(元)：${this.state.totalData.total}`;
          const str = str2 + parsePrintString(d, UploadColumns, str1);
          console.log('e', str);
          form.setFieldValue('AntdUpload', str);
        } catch (e) {
          console.log('error', e);
        }
        form.setFieldValue('SelectType', res.dataArray.invoice_type);
        form.setFieldExtendValue('SelectType', res.dataArray.invoice_type);
        form.setFieldValue('TextfaNumber', res.dataArray.invoice_number);
        form.setFieldExtendValue('TextfaNumber', res.dataArray.invoice_number);
        form.setFieldValue('CorpSupplier', res.dataArray.xiao_unit);
        form.setFieldExtendValue('CorpSupplier', res.dataArray.xiao_unit);
        form.setFieldValue('Textshou', res.dataArray.shou_shuihao);
        form.setFieldExtendValue('Textshou', res.dataArray.shou_shuihao);
        form.setFieldValue('CorpSupplieryi', res.dataArray.shou_unit);
        form.setFieldExtendValue('CorpSupplieryi', res.dataArray.shou_unit);
        form.setFieldValue('Textkai', res.dataArray.shou_bank_cert);
        form.setFieldExtendValue('Textkai', res.dataArray.shou_bank_cert);
        form.setFieldValue('Textcard', res.dataArray.shou_bank_cert);
        form.setFieldExtendValue('Textcard', res.dataArray.shou_bank_cert);
        form.setFieldValue('Textaddress', res.dataArray.xiao_address);
        form.setFieldExtendValue('Textaddress', res.dataArray.xiao_address);
      }
    });
  },
  methods() {
    const _this = this;
    return {
      //   文件上传
      async init() {
        try {
          const newData = _this.state.allData;
          newData.rk_id = ['jsapi'];
          _this.asyncSetFieldProps(newData, 'jsapi');
        } catch (error) {
          console.log('error:', error);
        }
      },
      uploadonChange(fileList) {
        const { OSSData } = _this.state;
        console.log('Aliyun OSS:', fileList);
        if (fileList.file.status === 'done') {
          const fileurl = OSSData.host + '/' + fileList.file.url;
          const newData = _this.state.allData;
          newData.rk_id = ['upload'];
          newData.img_url = fileurl;
          _this.asyncSetFieldProps(newData, 'upload');
          console.log('fileurl', fileurl);
          _this.setState({ fileList: fileList.fileList });
        } else if (fileList.file.status === 'uploading') {
        }
      },

      getExtraData(file) {
        const { OSSData } = _this.state;
        console.log('oss', OSSData);
        return {
          key: file.url,
          OSSAccessKeyId: OSSData.accessid,
          success_action_status: '200', //让服务端返回200,不然，默认会返回204
          policy: OSSData.policy,
          Signature: OSSData.signature,
          callback: OSSData.callback,
        };
      },

      async beforeUpload(file) {
        console.log('file', file);
        // if (file.type !== 'image/png') {
        //   return notification.open({
        //     message: `${file.name} 不是png格式`,
        //   });
        // }
        // file.type === 'image/png' ? true : Upload.LIST_IGNORE;
        const { OSSData } = _this.state;
        console.log('beforeUpload', OSSData);
        const expire = OSSData.expire * 1000;

        if (expire < Date.now()) {
          await _this.init();
        }
        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const filename = Date.now() + suffix;
        file.url = OSSData.dir + filename;
        console.log('fileurl', file);
        return file;
      },
    };
  },
  handleCancel() {
    this.setState({
      isModalVisible: false,
      selectedRowKeys: [],
    });
  },
  handleOk() {
    return true;
  },
  fieldRender() {
    const { form, runtimeProps } = this.props;
    const { viewMode } = runtimeProps;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = [
      {
        title: '货物或应税劳务、服务名称',
        dataIndex: 'huowu',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.huowu}>
            <span>{record.huowu}</span>
          </Tooltip>
        ),
      },
      {
        title: '规格型号',
        dataIndex: 'size',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.size}>
            <span>{record.size}</span>
          </Tooltip>
        ),
      },
      {
        title: '单位',
        dataIndex: 'unit ',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.size}>
            <span>{record.size}</span>
          </Tooltip>
        ),
      },
      {
        title: '数量',
        dataIndex: 'number',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.number}>
            <span>{record.number}</span>
          </Tooltip>
        ),
      },
      {
        title: '单价',
        dataIndex: 'price',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.price}>
            <span>{record.price}</span>
          </Tooltip>
        ),
      },
      {
        title: '金额',
        dataIndex: 'money',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.money}>
            <span>{record.money}</span>
          </Tooltip>
        ),
      },
      {
        title: '税率',
        dataIndex: 'shuilv',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.shuilv}>
            <span>{record.shuilv}</span>
          </Tooltip>
        ),
      },
      {
        title: '税额',
        dataIndex: 'shuier',
        render: (_, record: any) => (
          <Tooltip placement="topLeft" title={record.shuier}>
            <span>{record.shuier}</span>
          </Tooltip>
        ),
      },
    ];
    const field = form.getFieldInstance('AntdUpload');
    const label = form.getFieldProp('AntdUpload', 'label');
    const required = form.getFieldProp('AntdUpload', 'required');
    const { detailData } = this.state;
    //   文件上传
    const { value } = this.props;
    const uploadprops = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.methods().uploadonChange,
      data: this.methods().getExtraData,
      beforeUpload: this.methods().beforeUpload,
    };
    // 详情页
    if (viewMode) {
      const value = field.getExtendValue();
      const {
        detailname = '',
        nomoney = 0,
        hanmoney = 0,
        tax = 0,
        detailedData = [],
      } = value ? value : {};
      return (
        <div className="field-wrapper">
          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>
          <div>{detailname}</div>

          <div className="label" style={{ marginTop: '10px' }}>
            {label}
          </div>

          {/* <div>
            {detailedData.map(item => {
              return <div>{item.toString()}</div>;
            })}
          </div> */}
          <div>
            <Table
              scroll={{ x: '1500px' }}
              components={components}
              className="full-size-editable"
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={value instanceof Array ? value : detailedData}
              columns={columns}
              pagination={false}
            />
          </div>
          <div className="label" style={{ marginTop: '10px' }}>
            不含税金额合计(元)
          </div>
          <div>{nomoney ? Number(nomoney).toFixed(2) : ''}</div>
          <div className="label" style={{ marginTop: '10px' }}>
            税额合计(元)
          </div>
          <div>{tax ? Number(tax).toFixed(2) : ''}</div>
          <div className="label" style={{ marginTop: '10px' }}>
            含税金额合计(元)
          </div>
          <div>{hanmoney ? Number(hanmoney).toFixed(2) : ''}</div>
        </div>
      );
    }

    return (
      <div className="pc-custom-field-wrap">
        <div className="label" style={{ marginTop: '10px' }}>
          {required ? (
            <span style={{ color: '#ea6d5c' }}>*</span>
          ) : (
            <span style={{ color: '#fff' }}>*</span>
          )}
          {label}
        </div>
        <div>
          <Upload
            showUploadList={{ showRemoveIcon: false }}
            onPreview={file => {
              const { OSSData } = this.state;
              const fileurl = OSSData.host + '/' + file.url;
              window.open(fileurl);
            }}
            maxCount={1}
            {...uploadprops}
          >
            <Button icon={<UploadOutlined />}>上传文件（仅支持图片）</Button>
          </Upload>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Table
            scroll={{ x: '1500px' }}
            components={components}
            className="full-size-editable"
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={detailData}
            columns={columns as ColumnTypes}
            pagination={false}
          />
        </div>
        <div className="label" style={{ marginTop: '10px' }}>
          不含税金额合计(元)
        </div>
        <div>
          <Input
            readOnly
            value={this.state.totalData.taxFree}
            placeholder="自动计算"
          />
        </div>
        <div className="label" style={{ marginTop: '10px' }}>
          税额合计(元)
        </div>
        <div>
          <Input
            readOnly
            value={this.state.totalData.tax}
            placeholder="自动计算"
          />
        </div>

        <div className="label" style={{ marginTop: '10px' }}>
          含税金额合计(元)
        </div>
        <div>
          <Input
            readOnly
            value={this.state.totalData.total}
            placeholder="自动计算"
          />
        </div>
      </div>
    );
  },
};

export default FormField;
