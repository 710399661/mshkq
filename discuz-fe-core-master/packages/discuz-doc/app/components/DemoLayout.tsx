import React, { ReactNode } from 'react';
import classNames from 'classnames';

export default function DemoLayout({ children, col }) {
  if (col === 1) {
    return children;
  }

  const left: ReactNode[] = [];
  const right: ReactNode[] = [];
  React.Children.forEach(children, (child, index) => {
    if (index % 2 === 0) {
      left.push(child);
    } else {
      right.push(child);
    }
  });
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: 5 }}>{left}</div>
      <div style={{ flex: 1, marginLeft: 5 }}>{right}</div>
    </div>
  );
}

DemoLayout.Block = ({ children, className }) => (
  <div className="tdesign-demo-wrapper">
    <div className={classNames('tdesign-demo-item', className)}>{children}</div>
  </div>
);
