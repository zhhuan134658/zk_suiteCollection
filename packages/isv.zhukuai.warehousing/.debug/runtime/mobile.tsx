import React from "react";
import SwapDemoSuite from "../src/runtime/mobile";
import createReactClass from "create-react-class";
import SelectProField from "./SelectProField/mobile";
import SelectProtwoField from "./SelectProtwoField/mobile";
import SelectTbproField from "./SelectTbproField/mobile";
import SelectHeField from "./SelectHeField/mobile";
import SelectRelatedField from "./SelectRelatedField/mobile";
import SelectHeshouField from "./SelectHeshouField/mobile";
import SelectLeaseField from "./SelectLeaseField/mobile";
import SelectZuField from "./SelectZuField/mobile";
import SelectFenField from "./SelectFenField/mobile";
import SelectOtherField from "./SelectOtherField/mobile";
import SelectOtherZhiField from "./SelectOtherZhiField/mobile";
import SelectConField from "./SelectConField/mobile";
import SelectjiaField from "./SelectjiaField/mobile";
import SelectLaoField from "./SelectLaoField/mobile";
import SelectSpoField from "./SelectSpoField/mobile";
import SelecTickeField from "./SelecTickeField/mobile";
import SelecTickefaField from "./SelecTickefaField/mobile";
import TestMaterField from "./TestMaterField/mobile";
import TestCollectionField from "./TestCollectionField/mobile";
import TestLabourField from "./TestLabourField/mobile";
import TestSubconField from "./TestSubconField/mobile";
import TestRegistField from "./TestRegistField/mobile";
import SelectAccField from "./SelectAccField/mobile";
import CorpSupplierField from "./CorpSupplierField/mobile";
import CorpSupplieryiField from "./CorpSupplieryiField/mobile";
import CorpHouseField from "./CorpHouseField/mobile";
import PositionDesField from "./PositionDesField/mobile";
import TestBiddingField from "./TestBiddingField/mobile";
import TestBidzhiField from "./TestBidzhiField/mobile";
import TestBidshouField from "./TestBidshouField/mobile";
import TestPlanField from "./TestPlanField/mobile";
import TestOrderField from "./TestOrderField/mobile";
import TestOrdernewField from "./TestOrdernewField/mobile";
import TestSheField from "./TestSheField/mobile";
import TestMaterialField from "./TestMaterialField/mobile";
import TestApplicationField from "./TestApplicationField/mobile";
import TestSetField from "./TestSetField/mobile";
import TestPurField from "./TestPurField/mobile";
import TestCdyField from "./TestCdyField/mobile";
import TestReturnField from "./TestReturnField/mobile";
import TestExpeField from "./TestExpeField/mobile";
import TestCinField from "./TestCinField/mobile";
import TestOutField from "./TestOutField/mobile";
import TestCunField from "./TestCunField/mobile";
import TestLeaseField from "./TestLeaseField/mobile";
import TestLeconField from "./TestLeconField/mobile";
import TestMachineryField from "./TestMachineryField/mobile";
import TestDemandField from "./TestDemandField/mobile";
import TestInspecField from "./TestInspecField/mobile";
import TestMainField from "./TestMainField/mobile";
import TestOliField from "./TestOliField/mobile";
import TestScienceField from "./TestScienceField/mobile";
import TestOpeningField from "./TestOpeningField/mobile";
import AntdUploadFiled from "./AntdUploadFiled/mobile";

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
      <div className="isvzhukuaiwarehousing">
        <div className="mobile-runtime-wrap">
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
if (field.props.commonBizType === 'TestCdyField' || field.props.commonBizType === 'TestCdy') {
              return <TestCdyField {...this.props}  bizAlias={field.props.bizAlias} />;
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