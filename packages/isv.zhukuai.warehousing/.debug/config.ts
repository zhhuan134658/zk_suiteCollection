export default {
  "isUnique": true,
  "isSuite": true,
  "componentName": "DDBizSuite",
  "category": "suite_test",
  "name": "筑快OA swap-cli2.0",
  "description": "筑快OA swap-cli2.0",
  "icon": "",
  "props": {
    "bizType": "isv.zhukuai.warehousing",
    "bizAlias": "isv.zhukuai.warehousing",
    "extract": true,
    "isThirdSuite": true
  },
  "children": [
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "Moneytest",
        "id": "test",
        "placeholder": "请输入",
        "label": "金额1（元）大写",
        "notUpper": "0"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "Moneybei",
        "placeholder": "请输入1",
        "label": "备用金金额（元）大写",
        "notUpper": "0"
      }
    },
    {
      "componentName": "InnerContactField",
      "props": {
        "bizAlias": "InnerContactmony",
        "placeholder": "请选择",
        "label": "联系人多选",
        "choice": "1"
      }
    },
    {
      "componentName": "InnerContactField",
      "props": {
        "bizAlias": "InnerContactone",
        "placeholder": "请选择",
        "label": "联系人单选",
        "choice": "0"
      }
    },
    {
      "componentName": "DDDateField",
      "props": {
        "bizAlias": "DateFielddate",
        "placeholder": "请选择",
        "format": "yyyy-MM-dd",
        "label": "日期"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "incomeTitle",
        "placeholder": "请输入",
        "required": false,
        "label": "入库主题"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectPro",
        "commonBizType": "SelectProField",
        "required": false,
        "placeholder": "请输入",
        "label": "项目名称"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectProtwo",
        "commonBizType": "SelectProtwoField",
        "required": false,
        "placeholder": "请输入",
        "label": "项目名称1"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectTbpro",
        "commonBizType": "SelectTbproField",
        "required": false,
        "placeholder": "请输入",
        "label": "项目名称2"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "RadioField",
        "required": false,
        "spread": false,
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "投标保证金支出"
          },
          {
            "key": "option_2",
            "value": "履约保证金支出"
          },
          {
            "key": "option_3",
            "value": "劳务分包保证金退回"
          },
          {
            "key": "option_4",
            "value": "专业分包保证金退回"
          },
          {
            "key": "option_5",
            "value": "投标保证金退回"
          },
          {
            "key": "option_6",
            "value": "履约保证金退回"
          },
          {
            "key": "option_7",
            "value": "劳务分包保证金收入"
          },
          {
            "key": "option_8",
            "value": "专业分包保证金收入"
          }
        ],
        "label": "单选框"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "Selectbaopro",
        "required": false,
        "spread": false,
        "placeholder": "请选择",
        "options": [],
        "label": "单选框"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectHe",
        "commonBizType": "SelectHeField",
        "required": false,
        "placeholder": "请输入",
        "label": "合同收款登记"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectRelated",
        "commonBizType": "SelectRelatedField",
        "required": false,
        "placeholder": "请输入",
        "label": "关联保证金申请"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectHeshou",
        "commonBizType": "SelectHeshouField",
        "required": false,
        "placeholder": "请输入",
        "label": "合同收款登记"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectLease",
        "commonBizType": "SelectLeaseField",
        "required": false,
        "placeholder": "请输入",
        "label": "请选择"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectZu",
        "commonBizType": "SelectZuField",
        "required": false,
        "placeholder": "请输入",
        "label": "租赁合同名称"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Zumoney",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "租赁合同金额",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectFen",
        "commonBizType": "SelectFenField",
        "required": false,
        "placeholder": "请输入",
        "label": "分包合同名称"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Fenmoney",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "分包合同金额",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "OtherContract",
        "commonBizType": "SelectOtherField",
        "required": false,
        "placeholder": "请输入",
        "label": "所属支出合同"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "OtherConmoney",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "合同金额",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "OtherZhisett",
        "commonBizType": "SelectOtherZhiField",
        "required": false,
        "placeholder": "请输入",
        "label": "关联其他支出合同/结算"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "OtherZhiConname",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "合同名称",
        "maxLength": "100"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "OtherZhiConmoney",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "合同金额",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectCon",
        "commonBizType": "SelectConField",
        "required": false,
        "placeholder": "请输入",
        "label": "收入合同名称"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "Selectjia",
        "commonBizType": "SelectjiaField",
        "required": false,
        "placeholder": "请选择",
        "label": "甲方"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Conmoney",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "收入合同金额",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectLao",
        "commonBizType": "SelectLaoField",
        "required": false,
        "placeholder": "请选择",
        "label": "劳务合同名称"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "ConLaomoney",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "劳务合同金额",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectSpo",
        "commonBizType": "SelectSpoField",
        "required": false,
        "placeholder": "请选择",
        "label": "关联零星劳务结算"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Jiesmoney'",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "结算金额",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelecTicke",
        "commonBizType": "SelecTickeField",
        "required": false,
        "placeholder": "请输入",
        "label": "收票登记"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelecTickefa",
        "commonBizType": "SelecTickefaField",
        "required": false,
        "placeholder": "请输入",
        "label": "法务管理"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestMater",
        "commonBizType": "TestMaterField",
        "required": false,
        "placeholder": "请输入",
        "label": "材料付款"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Conname",
        "disabled": true,
        "placeholder": "请输入",
        "label": "合同名称",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestCollection",
        "commonBizType": "TestCollectionField",
        "required": false,
        "placeholder": "请输入",
        "label": "合同收款登记"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestLabour",
        "commonBizType": "TestLabourField",
        "required": false,
        "placeholder": "请输入",
        "label": "关联劳务结算"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestSubcon",
        "commonBizType": "TestSubconField",
        "required": false,
        "placeholder": "请输入",
        "label": "分包付款登记"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestRegist",
        "commonBizType": "TestRegistField",
        "required": false,
        "placeholder": "请输入",
        "label": "租赁付款登记"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "SelectAcc",
        "commonBizType": "SelectAccField",
        "required": false,
        "placeholder": "请输入",
        "label": "账户名称"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Inputvalue1",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "账号",
        "maxLength": "100"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Inputvalue2",
        "disabled": true,
        "placeholder": "自动获取",
        "label": "开户行",
        "maxLength": "100"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "CorpSupplier",
        "commonBizType": "CorpSupplierField",
        "required": false,
        "placeholder": "请选择",
        "label": "供应商"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "CorpSupplieryi",
        "commonBizType": "CorpSupplieryiField",
        "required": false,
        "placeholder": "请选择",
        "label": "供应商"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "paraNumber",
        "placeholder": "请输入",
        "label": "税号"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "IsAutoOut",
        "required": false,
        "placeholder": "请输入",
        "label": "是否自动出库",
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
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "Autotoupro",
        "required": false,
        "placeholder": "请选择",
        "label": "投标项目",
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
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "Autoprobei",
        "required": false,
        "placeholder": "请选择",
        "label": "项目",
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
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "CaiConMoney",
        "placeholder": "请输入",
        "label": "合同金额",
        "notUpper": "1"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "CaiDingMoney",
        "placeholder": "请输入",
        "label": "合同金额",
        "notUpper": "1"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "CaiJieMoney",
        "placeholder": "请输入",
        "label": "合同金额",
        "notUpper": "1"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "ZucMoney",
        "placeholder": "请输入",
        "label": "合同金额",
        "notUpper": "1"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "ZuJieMoney",
        "placeholder": "请输入",
        "label": "合同金额",
        "notUpper": "1"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "Ljjiemoney",
        "placeholder": "请输入",
        "disabled": true,
        "label": "累计借款金额",
        "notUpper": "0"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "Ljhuanmoney",
        "placeholder": "请输入",
        "disabled": true,
        "label": "累计还款金额",
        "notUpper": "0"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "Beimoneyyu",
        "placeholder": "请输入",
        "disabled": true,
        "label": "备用金余额",
        "notUpper": "0"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "MoneyFeidk",
        "placeholder": "请输入",
        "disabled": true,
        "label": "审批中的费用报销抵扣",
        "notUpper": "0"
      }
    },
    {
      "componentName": "MoneyField",
      "props": {
        "bizAlias": "MoneyFeigh",
        "placeholder": "请输入",
        "disabled": true,
        "label": "审批中的归还",
        "notUpper": "0"
      }
    },
    {
      "componentName": "InnerContactField",
      "props": {
        "bizAlias": "outPeople",
        "placeholder": "请输入",
        "label": "出库人",
        "choice": "0"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "CorpHouse",
        "commonBizType": "CorpHouseField",
        "required": false,
        "placeholder": "请输入",
        "label": "库房"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "PositionDes",
        "commonBizType": "PositionDesField",
        "placeholder": "请选择",
        "label": "项目位置"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestBidding",
        "commonBizType": "TestBiddingField",
        "placeholder": "请输入",
        "label": "物资招标添加物资材料"
      }
    },
    {
      "componentName": "TableField",
      "props": {
        "bizAlias": "TestBidding_Table",
        "tableViewMode": "table",
        "verticalPrint": false,
        "actionName": "增加明细",
        "statField": [],
        "label": "物资招标明细",
        "id": "TestBidding-JT435H4C8"
      },
      "children": [
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "TestBidding_name",
            "disabled": true,
            "placeholder": "请输入",
            "label": "物资名称",
            "id": "TestBidding_name"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "TestBidding_size",
            "disabled": true,
            "placeholder": "请输入",
            "label": "规格型号",
            "id": "TestBidding_size"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "TestBidding_unit",
            "disabled": true,
            "placeholder": "请输入",
            "label": "单位",
            "id": "TestBidding_unit"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "TestBidding_number",
            "placeholder": "请输入数字",
            "label": "估算数量",
            "id": "TestBidding_number"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "TestBidding_number2",
            "placeholder": "请输入数字",
            "label": "估算数量2",
            "id": "TestBidding_number2"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "TestBidding_number1",
            "placeholder": "请输入数字",
            "label": "估算数量1",
            "id": "TestBidding_number1",
            "formula": [
              {
                "id": "TestBidding_number"
              },
              "*",
              {
                "id": "TestBidding_number2"
              }
            ]
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "TestBidding_purchase_unit",
            "placeholder": "请输入",
            "label": "物资采购单位",
            "id": "TestBidding_purchase_unit"
          }
        },
        {
          "componentName": "DDDateField",
          "props": {
            "bizAlias": "TestBidding_purchase_riqi",
            "placeholder": "请选择",
            "format": "yyyy-MM-dd",
            "label": "采购日期",
            "id": "TestBidding_purchase_riqi"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "TestBidding_purchase_address",
            "placeholder": "请输入",
            "label": "采购地点",
            "id": "TestBidding_purchase_address"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "TestBidding_candidate_list",
            "placeholder": "请输入",
            "label": "候选供应商名单",
            "id": "TestBidding_candidate_list"
          }
        }
      ]
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestBidzhi",
        "commonBizType": "TestBidzhiField",
        "placeholder": "请输入",
        "label": "关联投标支出申请"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestBidshou",
        "commonBizType": "TestBidshouField",
        "placeholder": "请输入",
        "label": "关联投标收入申请"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestPlan",
        "commonBizType": "TestPlanField",
        "placeholder": "请输入",
        "label": "材料总计划添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestOrder",
        "commonBizType": "TestOrderField",
        "placeholder": "请输入",
        "label": "采购订单添加物资材料"
      }
    },
    {
      "componentName": "TableField",
      "props": {
        "bizAlias": "TableApplication",
        "tableViewMode": "table",
        "statField": [
          {
            "id": "NumberField-JT435KJ8",
            "label": "数字输入框",
            "upper": false
          }
        ],
        "label": "明细",
        "id": "TableField-JT435H4C"
      },
      "children": [
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "ApplicationName",
            "disabled": true,
            "placeholder": "请输入",
            "label": "物资名称",
            "id": "ApplicationName"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "ApplicationUnit",
            "placeholder": "请输入",
            "label": "物资单位",
            "id": "ApplicationUnit"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "ApplicationSize",
            "placeholder": "请输入",
            "label": "规格型号",
            "id": "ApplicationSize"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationDet_quantity",
            "placeholder": "请输入4",
            "label": "数量",
            "unit": "个",
            "id": "ApplicationDet_quantity"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationNo_unit_price",
            "placeholder": "请输入4",
            "label": "不含税单价(元)",
            "unit": "元",
            "id": "ApplicationNo_unit_price",
            "formula": [
              {
                "id": "ApplicationUnit_price"
              },
              "/",
              "(1+",
              {
                "id": "ApplicationTax_rate"
              },
              "/100",
              ")"
            ]
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationUnit_price",
            "placeholder": "请输入4",
            "label": "含税单价(元)",
            "unit": "元",
            "id": "ApplicationUnit_price",
            "formula": [
              {
                "id": "ApplicationNo_unit_price"
              },
              "*",
              "(1+",
              {
                "id": "ApplicationTax_rate"
              },
              "/100",
              ")"
            ]
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationTax_rate",
            "placeholder": "请输入4",
            "label": "税率",
            "unit": "%",
            "id": "ApplicationTax_rate"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationTax_amount",
            "placeholder": "请输入4",
            "label": "税额",
            "unit": "元",
            "id": "ApplicationTax_amount",
            "formula": [
              {
                "id": "ApplicationAmount_tax"
              },
              "-",
              {
                "id": "ApplicationNo_amount_tax"
              }
            ]
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationNo_amount_tax",
            "placeholder": "请输入4",
            "label": "不含税金额",
            "unit": "元",
            "id": "ApplicationNo_amount_tax",
            "formula": [
              {
                "id": "ApplicationDet_quantity"
              },
              "*",
              {
                "id": "ApplicationNo_unit_price"
              }
            ]
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationAmount_tax",
            "placeholder": "请输入4",
            "label": "含税金额",
            "unit": "元",
            "id": "ApplicationAmount_tax",
            "formula": [
              {
                "id": "ApplicationDet_quantity"
              },
              "*",
              {
                "id": "ApplicationUnit_price"
              }
            ]
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationQuantity_rk",
            "placeholder": "请输入4",
            "label": "已入库量",
            "unit": "",
            "id": "ApplicationQuantity_rk"
          }
        },
        {
          "componentName": "NumberField",
          "props": {
            "bizAlias": "ApplicationQuantity_zong",
            "placeholder": "请输入4",
            "label": "总计划量",
            "unit": "",
            "id": "ApplicationQuantity_zong"
          }
        }
      ]
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestOrdernew",
        "commonBizType": "TestOrdernewField",
        "placeholder": "请输入",
        "label": "采购订单"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestShe",
        "commonBizType": "TestSheField",
        "placeholder": "请输入",
        "label": "设备名称"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestMaterial",
        "commonBizType": "TestMaterialField",
        "placeholder": "请输入",
        "label": "材料盘点添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestApplication",
        "commonBizType": "TestApplicationField",
        "placeholder": "请输入",
        "label": "采购申请"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestSet",
        "commonBizType": "TestSetField",
        "placeholder": "请输入",
        "label": "材料结算"
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
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestCdy",
        "commonBizType": "TestCdyField",
        "placeholder": "请输入",
        "label": "cdycehsi"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestReturn",
        "commonBizType": "TestReturnField",
        "placeholder": "请输入",
        "label": "退库单"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestExpe",
        "commonBizType": "TestExpeField",
        "placeholder": "请输入",
        "label": "费用报销"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestCin",
        "commonBizType": "TestCinField",
        "placeholder": "请输入",
        "label": "材料入库-明细"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestOut",
        "commonBizType": "TestOutField",
        "placeholder": "请输入",
        "label": "材料出库-明细"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestCun",
        "commonBizType": "TestCunField",
        "placeholder": "请输入",
        "label": "材料调拨"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestLease",
        "commonBizType": "TestLeaseField",
        "placeholder": "请选择",
        "label": "租赁计划添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestLecon",
        "commonBizType": "TestLeconField",
        "placeholder": "请输入",
        "label": "租赁合同添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestMachinery",
        "commonBizType": "TestMachineryField",
        "placeholder": "请输入",
        "label": "机械费登记添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestDemand",
        "commonBizType": "TestDemandField",
        "placeholder": "请输入",
        "label": "设备需用计划添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestInspec",
        "commonBizType": "TestInspecField",
        "placeholder": "请输入",
        "label": "设备检查添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestMain",
        "commonBizType": "TestMainField",
        "placeholder": "请输入",
        "label": "设备维保添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestOli",
        "commonBizType": "TestOliField",
        "placeholder": "请输入",
        "label": "设备油耗添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestScience",
        "commonBizType": "TestScienceField",
        "placeholder": "请输入",
        "label": "退库添加物资材料"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "TestOpening",
        "commonBizType": "TestOpeningField",
        "placeholder": "请输入",
        "label": "库存期初添加物资材料"
      }
    },
    {
      "componentName": "TableField",
      "props": {
        "bizAlias": "SimpleDetails",
        "actionName": "增加明细",
        "statField": [
          {
            "label": "数字输入框",
            "upper": false
          }
        ],
        "label": "明细"
      },
      "children": [
        {
          "componentName": "DDSelectField",
          "props": {
            "bizAlias": "SimpleRa",
            "placeholder": "请选择",
            "options": [
              {
                "key": "option_1",
                "value": "选项1"
              },
              {
                "key": "option_2",
                "value": "选项2"
              }
            ],
            "label": "单选框"
          }
        },
        {
          "componentName": "MoneyField",
          "props": {
            "bizAlias": "SimpleMo",
            "id": "CalculateField_JINE",
            "placeholder": "自动获取",
            "label": "金额（元）大写",
            "notUpper": "0"
          }
        },
        {
          "componentName": "TextareaField",
          "props": {
            "bizAlias": "SimpleText",
            "placeholder": "请输入",
            "label": "多行输入框",
            "maxLength": "8000"
          }
        }
      ]
    },
    {
      "componentName": "CalculateField",
      "props": {
        "bizAlias": "TaxMoneyALL",
        "notUpper": "0",
        "placeholder": "自动计算",
        "label": "金额合计",
        "id": "CalculateField_CHENGBEN",
        "formula": [
          {
            "id": "CalculateField_JINE"
          }
        ]
      }
    },
    {
      "componentName": "TableField",
      "props": {
        "bizAlias": "SimpleSporadic",
        "actionName": "增加明细",
        "statField": [
          {
            "label": "数字输入框",
            "upper": false
          }
        ],
        "label": "零星劳务-明细"
      },
      "children": [
        {
          "componentName": "TextareaField",
          "props": {
            "bizAlias": "SporadicText",
            "placeholder": "请输入",
            "label": "施工内容",
            "maxLength": "8000"
          }
        },
        {
          "componentName": "MoneyField",
          "props": {
            "bizAlias": "SporadicMo",
            "placeholder": "请输入",
            "label": "单价",
            "notUpper": "0",
            "id": "MoneyField_MXRKHSD1"
          }
        },
        {
          "componentName": "MoneyField",
          "props": {
            "bizAlias": "SporadicGo",
            "placeholder": "请输入",
            "label": "工程量",
            "notUpper": "0",
            "id": "NumberField_MXRKNM1"
          }
        },
        {
          "componentName": "MoneyField",
          "props": {
            "bizAlias": "SporadicTo",
            "placeholder": "请输入",
            "label": "金额",
            "notUpper": "0",
            "id": "CalculateField_MXRKHSE1",
            "formula": [
              {
                "id": "MoneyField_MXRKHSD1"
              },
              "*",
              {
                "id": "NumberField_MXRKNM1"
              }
            ]
          }
        }
      ]
    },
    {
      "componentName": "CalculateField",
      "props": {
        "bizAlias": "TaxMoneyT",
        "notUpper": "0",
        "placeholder": "自动计算",
        "label": "金额合计",
        "id": "CalculateField_MXRKHSH1",
        "formula": [
          {
            "id": "CalculateField_MXRKHSE1"
          }
        ]
      }
    },
    {
      "componentName": "TableField",
      "props": {
        "bizAlias": "SimpleWage",
        "actionName": "增加明细",
        "statField": [
          {
            "label": "数字输入框",
            "upper": false
          }
        ],
        "label": "自有工人工资发放-明细"
      },
      "children": [
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Wagename",
            "placeholder": "请输入",
            "label": "姓名",
            "maxLength": "100",
            "id": "TextField-JTNAME"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Wagecard",
            "placeholder": "请输入",
            "label": "身份证",
            "maxLength": "100",
            "id": "TextField-JTVARD"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": " ",
            "placeholder": "请输入",
            "label": "应发工资",
            "maxLength": "100",
            "id": "TextField-JTYNAME"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Wagesmonty",
            "placeholder": "请输入",
            "label": "实发工资",
            "maxLength": "100",
            "id": "TextField-JTSNAME"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Wagephone",
            "placeholder": "请输入",
            "label": "联系方式",
            "maxLength": "100",
            "id": "TextField-JTPHONE"
          }
        }
      ]
    },
    {
      "componentName": "CalculateField",
      "props": {
        "bizAlias": "WageMoneyY",
        "notUpper": "0",
        "placeholder": "自动计算",
        "label": "应发工资合计",
        "id": "CalculateField_MXYWAGE",
        "formula": [
          {
            "id": "TextField-JTYNAME"
          }
        ]
      }
    },
    {
      "componentName": "CalculateField",
      "props": {
        "bizAlias": "WageMoneyS",
        "notUpper": "0",
        "placeholder": "自动计算",
        "label": "实发工资合计",
        "id": "CalculateField_MXSWAGE",
        "formula": [
          {
            "id": "TextField-JTSNAME"
          }
        ]
      }
    },
    {
      "componentName": "TableField",
      "props": {
        "bizAlias": "SimpleTeam",
        "actionName": "增加明细",
        "statField": [
          {
            "label": "数字输入框",
            "upper": false
          }
        ],
        "tableViewMode": "table",
        "label": "代发班组工资-明细"
      },
      "children": [
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Teamname",
            "placeholder": "请输入",
            "label": "姓名",
            "maxLength": "100"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Teamcard",
            "placeholder": "请输入",
            "label": "身份证",
            "maxLength": "100"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Teammoney",
            "placeholder": "自动获取",
            "label": "代发金额",
            "maxLength": "100",
            "id": "CalculateField_YINGFA"
          }
        },
        {
          "componentName": "TextField",
          "props": {
            "bizAlias": "Teamphone",
            "placeholder": "请输入",
            "label": "联系方式",
            "maxLength": "100"
          }
        }
      ]
    },
    {
      "componentName": "CalculateField",
      "props": {
        "bizAlias": "Teamtmoney",
        "notUpper": "0",
        "placeholder": "自动计算",
        "label": "金额合计",
        "id": "CalculateField_TAME",
        "formula": [
          {
            "id": "CalculateField_YINGFA"
          }
        ]
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Textest",
        "required": true,
        "placeholder": "请输入",
        "label": "单行输入框"
      }
    },
    {
      "componentName": "CommonField",
      "props": {
        "bizAlias": "AntdUpload",
        "commonBizType": "AntdUploadFiled",
        "required": false,
        "placeholder": "请输入",
        "label": "上传"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "SelectType",
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "增值税发票"
          },
          {
            "key": "option_2",
            "value": "普通发票"
          }
        ],
        "label": "发票类型"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "TextfaNumber",
        "required": false,
        "placeholder": "请输入",
        "label": "发票号码"
      }
    },
    {
      "componentName": "TextareaField",
      "props": {
        "bizAlias": "Textareabei",
        "required": true,
        "placeholder": "请输入",
        "label": "备注"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Textshou",
        "required": false,
        "placeholder": "请输入",
        "label": "收票单位税号"
      }
    },
    {
      "componentName": "NumberField",
      "props": {
        "bizAlias": "Numberslv",
        "required": false,
        "placeholder": "请输入",
        "label": "税率"
      }
    },
    {
      "componentName": "TextareaField",
      "props": {
        "bizAlias": "Textshoubei",
        "required": true,
        "placeholder": "请输入",
        "label": "开票详情"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Textkai",
        "required": false,
        "placeholder": "请输入",
        "label": "开户银行"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Textcard",
        "required": false,
        "placeholder": "请输入",
        "label": "银行账号"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "Textaddress",
        "required": false,
        "placeholder": "请输入",
        "label": "地址电话"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "LabourField",
        "placeholder": "请输入",
        "label": "合同名称1"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "SubconField",
        "placeholder": "请输入",
        "label": "合同名称2"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "RegistField",
        "placeholder": "请输入",
        "label": "合同名称3"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "TextFieldone",
        "placeholder": "请输入",
        "label": "单行输入框1"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "TextFieldtwo",
        "placeholder": "请输入",
        "label": "单行输入框2"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "TextFieldthree",
        "placeholder": "请输入",
        "label": "单行输入框3"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "TextFieldfore",
        "placeholder": "请输入",
        "label": "单行输入框"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "TextFieldfive",
        "placeholder": "请输入",
        "label": "单行输入框"
      }
    },
    {
      "componentName": "TextareaField",
      "props": {
        "bizAlias": "TextareaFieldone",
        "placeholder": "请输入",
        "label": "多行输入框",
        "maxLength": "8000"
      }
    },
    {
      "componentName": "TextareaField",
      "props": {
        "bizAlias": "TextareaFieldtwo",
        "placeholder": "请输入",
        "label": "多行输入框",
        "maxLength": "8000"
      }
    },
    {
      "componentName": "TextareaField",
      "props": {
        "bizAlias": "TextareaFieldthree",
        "placeholder": "请输入",
        "label": "多行输入框",
        "maxLength": "8000"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "SelectFieldone",
        "spread": false,
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "选项1"
          },
          {
            "key": "option_2",
            "value": "选项2"
          }
        ],
        "label": "单选框"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "SelectFieldtwo",
        "spread": false,
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "选项1"
          },
          {
            "key": "option_2",
            "value": "选项2"
          }
        ],
        "label": "单选框"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "SelectFieldthree",
        "spread": false,
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "选项1"
          },
          {
            "key": "option_2",
            "value": "选项2"
          }
        ],
        "label": "单选框"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "SelectFieldfore",
        "spread": false,
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "选项1"
          },
          {
            "key": "option_2",
            "value": "选项2"
          }
        ],
        "label": "单选框"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "SelectFieldfive",
        "spread": false,
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "选项1"
          },
          {
            "key": "option_2",
            "value": "选项2"
          }
        ],
        "label": "单选框"
      }
    },
    {
      "componentName": "TextField",
      "props": {
        "bizAlias": "XJTextField",
        "placeholder": "请输入",
        "label": "协同单行输入框1"
      }
    },
    {
      "componentName": "DDSelectField",
      "props": {
        "bizAlias": "XJSelectField",
        "spread": false,
        "placeholder": "请选择",
        "options": [
          {
            "key": "option_1",
            "value": "选项1"
          },
          {
            "key": "option_2",
            "value": "选项2"
          }
        ],
        "label": "协同建设单选框2"
      }
    }
  ]
};