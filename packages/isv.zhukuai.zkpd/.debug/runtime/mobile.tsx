import React from "react";
import SwapDemoSuite from "../src/runtime/mobile";
import createReactClass from "create-react-class";
import TestPurField from "./TestPurField/mobile";

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
        <div className="mobile-runtime-wrap">
          {this.props.form.getFields().map(field => {
            if (field.props.commonBizType === 'TestPurField' || field.props.commonBizType === 'TestPur') {
              return <TestPurField {...this.props}  bizAlias={field.props.bizAlias} />;
            }
            return field.renderComponent();
          })}
        </div>
      </div>
    );
  },
});

export default Suite;