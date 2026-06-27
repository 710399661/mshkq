import React, { useState } from "react";
import { Checkbox, Button } from '@discuzq/design';

export default function CheckboxExample() {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };
  const toggleDisable = () => {
    setDisabled(!disabled);
  };
  const onChange = (value) => {
    setChecked(value);
  };
  const label = `${checked ? "Checked" : "Unchecked"}-${
    disabled ? "Disabled" : "Enabled"
  }`;
  return (
    <div className="page">
      <div>
        <Checkbox onChange={onChange} checked={checked} disabled={disabled}>
          {label}
        </Checkbox>
        <br />
        <div>
          <Button type="primary" onClick={toggleChecked}>
            {!checked ? "Check" : "Uncheck"}
          </Button>
          <Button type="primary" onClick={toggleDisable}>
            {!disabled ? "Disable" : "Enable"}
          </Button>
        </div>
      </div>
    </div>
  );
}
