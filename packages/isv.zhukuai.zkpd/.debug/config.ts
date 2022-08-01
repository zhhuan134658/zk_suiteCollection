export default {
  "isUnique": true,
  "isSuite": true,
  "componentName": "DDBizSuite",
  "category": "suite_test",
  "name": "筑快OA swap-cli2.0",
  "description": "筑快OA swap-cli2.0",
  "icon": "",
  "props": {
    "bizType": "isv.zhukuai.zkpd",
    "bizAlias": "isv.zhukuai.zkpd",
    "extract": true,
    "isThirdSuite": true
  },
  "children": [
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "ceshi",
        "required": true,
        "placeholder": "请输入",
        "label": "ceshi",
        "maxLength": 10
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "Autopro",
        "required": false,
        "placeholder": "请选择",
        "label": "项目",
        "asyncCondition": true,
        "options": [
          {
            "key": "1",
            "value": "是"
          },
          {
            "key": "2",
            "value": "否"
          }
        ]
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "theirCompany",
        "commonBizType": "TheirCompanyField",
        "required": false,
        "placeholder": "请选择",
        "label": "所属分公司"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "company",
        "required": true,
        "placeholder": "请输入",
        "label": "所属分公司",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "theirUnit",
        "commonBizType": "TheirUnitField",
        "required": false,
        "placeholder": "请选择",
        "label": "建设单位"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "unit",
        "required": true,
        "placeholder": "请输入",
        "label": "建设单位",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestCdy",
        "commonBizType": "TestCdyField",
        "required": true,
        "placeholder": "请输入",
        "label": "TestCdy"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "TestCdyAll",
        "required": true,
        "placeholder": "请输入",
        "label": "TestCdyAll"
      }
    },
    {
      "componentName": "TableField",
      "props": {
        "bizAlias": "TestPurTables",
        "actionName": "增加明细",
        "tableViewMode": "table",
        "placeholder": "请输入",
        "label": "明细"
      },
      "children": [
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "name",
            "disabled": true,
            "placeholder": "请输入",
            "label": "物资名称",
            "id": "name"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "number",
            "disabled": false,
            "placeholder": "请输入",
            "label": "数量",
            "id": "number"
          }
        }
      ]
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "noAmountTax",
        "required": true,
        "maxLength": "100",
        "notUpper": "0",
        "formula": [
          {
            "id": "number"
          }
        ],
        "label": "累加计算",
        "placeholder": "自动计算数值"
      }
    }
  ]
};