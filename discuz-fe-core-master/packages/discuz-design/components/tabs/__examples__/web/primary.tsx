import React, { useState } from "react";
import { Tabs } from '@discuzq/design';

const tabList: [string, string][] = [
  // id, label, badge, icon
  ["1", "Tab1"],
  ["2", "Tab2"],
  ["3", "Tab3"],
];

export default function TabsExample() {
  return (
    <div className="page">
      <div className="tabs-section">
        <Tabs
          scrollable={true}
          type={"primary"}
          defaultActiveId={'1'}
        >
          {tabList.map(([id, label]) => (
            <Tabs.TabPanel key={id} id={id} label={label}>
              <div
                style={{
                  width: 200,
                  height: 80,
                  marginTop: 20,
                }}
              >
                Content of Tab Pane {id}
              </div>
            </Tabs.TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
