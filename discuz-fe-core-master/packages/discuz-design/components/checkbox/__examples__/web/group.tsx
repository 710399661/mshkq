import React, { useState } from "react";
import { Checkbox, Divider } from '@discuzq/design';

export default function CheckboxExample() {
  const CheckboxGroup = Checkbox.Group;

  const plainOptions = ["舞蹈", "唱歌", "羽毛球", "篮球", "乒乓球", "弹吉他"];
  const defaultCheckedList = ["舞蹈", "唱歌"];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (value) => {
    setCheckedList(value ? plainOptions : []);
    setCheckAll(value);
  };

  return (
    <div className="page">
      <div>
        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
        <Divider style={{ margin: "16px 0" }} />
        <CheckboxGroup
          value={checkedList}
          onChange={onChange}
        >
          {plainOptions.map((item) => {
            return <Checkbox name={item}>{item}</Checkbox>;
          })}
        </CheckboxGroup>
      </div>
    </div>
  );
}
