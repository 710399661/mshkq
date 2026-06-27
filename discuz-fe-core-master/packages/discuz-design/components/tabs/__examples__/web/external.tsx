import React, { useState } from "react";
import { Tabs, Button, Icon } from '@discuzq/design';

const tabList = [
  // id, label, badge, icon
  { title: "Tab 1", content: "Content of Tab Pane 1", key: "1" },
  { title: "Tab 2", content: "Content of Tab Pane 2", key: "2" },
];

let newTabIndex = 0;

export default function TabsExample() {
  let [panes, setPanes] = useState(tabList);

  let [activeKey, setActiveKey] = useState(panes[0]?.key);

  const add = () => {
    const activeKey = `newTab${newTabIndex++}`;
    let new_panes = [...panes];
    new_panes.push({
      title: "New Tab",
      content: "New Tab Pane",
      key: activeKey,
    });
    setPanes(new_panes);
    setActiveKey(activeKey);
  };

  const remove = (targetKey) => {
    let lastIndex;
    let new_panes = [...panes];
    new_panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        if (lastIndex === 0) {
          lastIndex = 0;
        } else {
          lastIndex = i - 1;
        }
      }
    });

    new_panes = new_panes.filter((pane) => pane.key !== targetKey);

    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = "";
      }
    }

    setPanes(new_panes);
    setActiveKey(activeKey);
  };

  const onActive = (activeId) => {
    setActiveKey(activeId);
  };

  const onClick = (e, removeId) => {
    e && e.stopPropagation();
    remove(removeId);
  };

  return (
    <div className="page">
      <div className="tabs-section">
        <Tabs
          tabBarExtraContent={
            <div
              style={{
                width: 200,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="primary" onClick={() => add()}>ADD</Button>
            </div>
          }
          activeId={activeKey}
          onActive={onActive}
        >
          {panes.map((item) => {
            return (
              <Tabs.TabPanel
                key={item.key}
                id={item.key}
                label={
                  <span>
                    {item.title}&nbsp;&nbsp;
                    {item.key !== "1" && (
                      <Icon
                        onClick={(e: any) => onClick(e, item["key"])}
                        size={12}
                        name="CloseOutlined"
                      />
                    )}
                  </span>
                }
              >
                <div
                  style={{
                    width: 200,
                    height: 80,
                    marginTop: 20,
                  }}
                >
                  {item.content}
                </div>
              </Tabs.TabPanel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
