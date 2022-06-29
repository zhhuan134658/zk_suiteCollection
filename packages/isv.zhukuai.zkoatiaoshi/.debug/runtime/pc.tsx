import React from "react";
import SwapDemoSuite from "../src/runtime/pc";
import createReactClass from "create-react-class";
import SelectProField from "./SelectProField/pc";
import SelectProtwoField from "./SelectProtwoField/pc";
import SelectTbproField from "./SelectTbproField/pc";
import SelectHeField from "./SelectHeField/pc";
import SelectRelatedField from "./SelectRelatedField/pc";
import SelectHeshouField from "./SelectHeshouField/pc";
import SelectLeaseField from "./SelectLeaseField/pc";
import SelectZuField from "./SelectZuField/pc";
import SelectFenField from "./SelectFenField/pc";
import SelectOtherField from "./SelectOtherField/pc";
import SelectOtherZhiField from "./SelectOtherZhiField/pc";
import SelectConField from "./SelectConField/pc";
import SelectjiaField from "./SelectjiaField/pc";
import SelectLaoField from "./SelectLaoField/pc";
import SelectSpoField from "./SelectSpoField/pc";
import SelecTickeField from "./SelecTickeField/pc";
import SelecTickefaField from "./SelecTickefaField/pc";
import TestMaterField from "./TestMaterField/pc";
import TestCollectionField from "./TestCollectionField/pc";
import TestLabourField from "./TestLabourField/pc";
import TestSubconField from "./TestSubconField/pc";
import TestRegistField from "./TestRegistField/pc";
import SelectAccField from "./SelectAccField/pc";
import CorpSupplierField from "./CorpSupplierField/pc";
import CorpSupplieryiField from "./CorpSupplieryiField/pc";
import CorpHouseField from "./CorpHouseField/pc";
import PositionDesField from "./PositionDesField/pc";
import TestBiddingField from "./TestBiddingField/pc";
import TestBidzhiField from "./TestBidzhiField/pc";
import TestBidshouField from "./TestBidshouField/pc";
import TestPlanField from "./TestPlanField/pc";
import TestOrderField from "./TestOrderField/pc";
import TestOrdernewField from "./TestOrdernewField/pc";
import TestSheField from "./TestSheField/pc";
import TestMaterialField from "./TestMaterialField/pc";
import TestApplicationField from "./TestApplicationField/pc";
import TestSetField from "./TestSetField/pc";
import TestPurField from "./TestPurField/pc";
import TestReturnField from "./TestReturnField/pc";
import TestExpeField from "./TestExpeField/pc";
import TestCinField from "./TestCinField/pc";
import TestOutField from "./TestOutField/pc";
import TestCunField from "./TestCunField/pc";
import TestLeaseField from "./TestLeaseField/pc";
import TestLeconField from "./TestLeconField/pc";
import TestMachineryField from "./TestMachineryField/pc";
import TestDemandField from "./TestDemandField/pc";
import TestInspecField from "./TestInspecField/pc";
import TestMainField from "./TestMainField/pc";
import TestOliField from "./TestOliField/pc";
import TestScienceField from "./TestScienceField/pc";
import TestOpeningField from "./TestOpeningField/pc";
import AntdUploadFiled from "./AntdUploadFiled/pc";

const Suite = createReactClass({
  mixins: [SwapDemoSuite],
  componentWillMount() {
    this.suiteWillMount && this.suiteWillMount();
  },
  componentDidMount() {
    this.suiteDidMount && this.suiteDidMount();
  },
  componentDidUpdate() {
    this.suiteDidUpdate && this.suiteDidUpdate();
  },
  render() {
    if (this.suiteRender) {
      return this.suiteRender();
    }

    return (
      <div className="isvzhukuaizkoatiaoshi">
        <div className="pc-runtime-wrap">
          {this.props.form.getFields().map(field => {
            if (field.props.commonBizType === 'SelectProField' || field.props.commonBizType === 'SelectPro') {
              return <SelectProField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectProtwoField' || field.props.commonBizType === 'SelectProtwo') {
              return <SelectProtwoField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectTbproField' || field.props.commonBizType === 'SelectTbpro') {
              return <SelectTbproField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectHeField' || field.props.commonBizType === 'SelectHe') {
              return <SelectHeField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectRelatedField' || field.props.commonBizType === 'SelectRelated') {
              return <SelectRelatedField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectHeshouField' || field.props.commonBizType === 'SelectHeshou') {
              return <SelectHeshouField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectLeaseField' || field.props.commonBizType === 'SelectLease') {
              return <SelectLeaseField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectZuField' || field.props.commonBizType === 'SelectZu') {
              return <SelectZuField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectFenField' || field.props.commonBizType === 'SelectFen') {
              return <SelectFenField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectOtherField' || field.props.commonBizType === 'OtherContract') {
              return <SelectOtherField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectOtherZhiField' || field.props.commonBizType === 'OtherZhisett') {
              return <SelectOtherZhiField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectConField' || field.props.commonBizType === 'SelectCon') {
              return <SelectConField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectjiaField' || field.props.commonBizType === 'Selectjia') {
              return <SelectjiaField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectLaoField' || field.props.commonBizType === 'SelectLao') {
              return <SelectLaoField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectSpoField' || field.props.commonBizType === 'SelectSpo') {
              return <SelectSpoField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelecTickeField' || field.props.commonBizType === 'SelecTicke') {
              return <SelecTickeField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelecTickefaField' || field.props.commonBizType === 'SelecTickefa') {
              return <SelecTickefaField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestMaterField' || field.props.commonBizType === 'TestMater') {
              return <TestMaterField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestCollectionField' || field.props.commonBizType === 'TestCollection') {
              return <TestCollectionField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestLabourField' || field.props.commonBizType === 'TestLabour') {
              return <TestLabourField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestSubconField' || field.props.commonBizType === 'TestSubcon') {
              return <TestSubconField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestRegistField' || field.props.commonBizType === 'TestRegist') {
              return <TestRegistField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'SelectAccField' || field.props.commonBizType === 'SelectAcc') {
              return <SelectAccField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'CorpSupplierField' || field.props.commonBizType === 'CorpSupplier') {
              return <CorpSupplierField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'CorpSupplieryiField' || field.props.commonBizType === 'CorpSupplieryi') {
              return <CorpSupplieryiField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'CorpHouseField' || field.props.commonBizType === 'CorpHouse') {
              return <CorpHouseField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'PositionDesField' || field.props.commonBizType === 'PositionDes') {
              return <PositionDesField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestBiddingField' || field.props.commonBizType === 'TestBidding') {
              return <TestBiddingField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestBidzhiField' || field.props.commonBizType === 'TestBidzhi') {
              return <TestBidzhiField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestBidshouField' || field.props.commonBizType === 'TestBidshou') {
              return <TestBidshouField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestPlanField' || field.props.commonBizType === 'TestPlan') {
              return <TestPlanField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestOrderField' || field.props.commonBizType === 'TestOrder') {
              return <TestOrderField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestOrdernewField' || field.props.commonBizType === 'TestOrdernew') {
              return <TestOrdernewField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestSheField' || field.props.commonBizType === 'TestShe') {
              return <TestSheField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestMaterialField' || field.props.commonBizType === 'TestMaterial') {
              return <TestMaterialField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestApplicationField' || field.props.commonBizType === 'TestApplication') {
              return <TestApplicationField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestSetField' || field.props.commonBizType === 'TestSet') {
              return <TestSetField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestPurField' || field.props.commonBizType === 'TestPur') {
              return <TestPurField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestReturnField' || field.props.commonBizType === 'TestReturn') {
              return <TestReturnField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestExpeField' || field.props.commonBizType === 'TestExpe') {
              return <TestExpeField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestCinField' || field.props.commonBizType === 'TestCin') {
              return <TestCinField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestOutField' || field.props.commonBizType === 'TestOut') {
              return <TestOutField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestCunField' || field.props.commonBizType === 'TestCun') {
              return <TestCunField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestLeaseField' || field.props.commonBizType === 'TestLease') {
              return <TestLeaseField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestLeconField' || field.props.commonBizType === 'TestLecon') {
              return <TestLeconField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestMachineryField' || field.props.commonBizType === 'TestMachinery') {
              return <TestMachineryField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestDemandField' || field.props.commonBizType === 'TestDemand') {
              return <TestDemandField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestInspecField' || field.props.commonBizType === 'TestInspec') {
              return <TestInspecField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestMainField' || field.props.commonBizType === 'TestMain') {
              return <TestMainField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestOliField' || field.props.commonBizType === 'TestOli') {
              return <TestOliField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestScienceField' || field.props.commonBizType === 'TestScience') {
              return <TestScienceField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestOpeningField' || field.props.commonBizType === 'TestOpening') {
              return <TestOpeningField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'AntdUploadFiled' || field.props.commonBizType === 'AntdUpload') {
              return <AntdUploadFiled {...this.props}  bizAlias={field.props.bizAlias} />;
            }
            return field.renderComponent();
          })}
        </div>
      </div>
    );
  },
});

export default Suite;