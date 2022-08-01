import React from "react";
import SwapDemoSuite from "../src/runtime/pc";
import createReactClass from "create-react-class";
import TheirCompanyField from "./TheirCompanyField/pc";
import TheirUnitField from "./TheirUnitField/pc";
import TestCdyField from "./TestCdyField/pc";

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
      <div className="isvzhukuaizkpd">
        <div className="pc-runtime-wrap">
          {this.props.form.getFields().map(field => {
            if (field.props.commonBizType === 'TheirCompanyField' || field.props.commonBizType === 'theirCompany') {
              return <TheirCompanyField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TheirUnitField' || field.props.commonBizType === 'theirUnit') {
              return <TheirUnitField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
if (field.props.commonBizType === 'TestCdyField' || field.props.commonBizType === 'TestCdy') {
              return <TestCdyField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
            return field.renderComponent();
          })}
        </div>
      </div>
    );
  },
});

export default Suite;