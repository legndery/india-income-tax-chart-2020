import React, { useState } from "react";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import emitter from "./../util/eventEmitter";
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

const Handle = Slider.Handle;

const wrapperStyle = { width: 400, margin: 50 };
function SalaryBreakup() {
  const [salaryDivision, setSalaryDivision] = useState({
    basic: 40,
    HRA: 50,
    HRA_CLAIM: 60,
    CLAIM_80C: 100,
    metro: false
  });
  emitter.emit("SALARY_CHANGE", salaryDivision);
  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };
  const onChange = ({ id, value }) => {
    setSalaryDivision({
      ...salaryDivision,
      [id]: value
    });
    emitter.emit("SALARY_CHANGE", salaryDivision);
  };
  return (
    <div>
      <div style={wrapperStyle}>
        <p style={{ marginBottom: 20 }}>
          <strong>Basic Salary:</strong> % of Salary
        </p>
        <Slider
          min={0}
          max={100}
          defaultValue={40}
          handle={handle}
          onChange={v => onChange({ id: "basic", value: v })}
          className="slider1"
        />
        <p>
          <strong>HRA:</strong> % of Basic Salary
        </p>
        <Slider
          min={0}
          max={100}
          defaultValue={50}
          handle={handle}
          onChange={v => onChange({ id: "HRA", value: v })}
          className="slider1"
        />
        <p style={{ marginTop: 20 }}>
          <strong>Metro City:</strong>{" "}
          <input
            type="checkbox"
            defaultChecked={salaryDivision.metro}
            onChange={e => onChange({ id: "metro", value: e.target.checked })}
          />
        </p>

        <p style={{ marginTop: 20 }}>
          <strong>HRA Claimed: </strong>% of HRA
        </p>
        <Slider
          min={0}
          max={100}
          defaultValue={60}
          handle={handle}
          onChange={v => onChange({ id: "HRA_CLAIM", value: v })}
        />
        <p style={{ marginTop: 20 }}>
          <strong>80C Claimed:</strong> % of 1.5Lakh
        </p>
        <Slider
          min={0}
          max={100}
          defaultValue={100}
          handle={handle}
          onChange={v => onChange({ id: "CLAIM_80C", value: v })}
        />
      </div>
    </div>
  );
}

export default SalaryBreakup;
