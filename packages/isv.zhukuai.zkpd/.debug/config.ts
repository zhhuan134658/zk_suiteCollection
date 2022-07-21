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
        "bizAlias": "TestPur",
        "commonBizType": "TestPurField",
        "placeholder": "请输入",
        "label": "采购合同"
      }
    }
  ]
};