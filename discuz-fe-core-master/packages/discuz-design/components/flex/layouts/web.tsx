import React, { useContext, Component } from 'react';
import classNames from 'classnames';
import { RowProps, ColProps } from '../interface';
import { useConfig } from '../../../extends/configContext';
import { useReport } from '../../../utils/report';

interface FlexContextValue {
  gutter: number;
}

const FlexContext = React.createContext<FlexContextValue>({ gutter: 20 });

export function Row({
  gutter = 20,
  flexWrap = 'wrap',
  reverse = false,
  align = 'stretch',
  justify = 'flex-start',
  children,
  className,
  style,
}: RowProps) {
  let flex: FlexContextValue = null;
  let rowStyle: React.CSSProperties = null;

  useReport({
    componentName: 'flex'
  })

  const { clsPrefix } = useConfig();

  // 定义了 gutter 的，才生成一个 flex 上下文，否则使用默认样式即可
  if (typeof gutter === 'number') {
    const gutterCompensation = Math.ceil(Number(gutter) / 2) * -1;
    flex = {
      gutter,
    };
    rowStyle = {
      margin: `${gutterCompensation}px`,
    };
  }

  rowStyle = {
    ...(rowStyle || {}),
    ...(style || {}),
  };

  const rowClassName = classNames(`${clsPrefix}-row`, className, {
    [`${clsPrefix}-flex-wrap-nowrap`]: flexWrap === 'nowrap',
    [`${clsPrefix}-align-items-${align}`]: typeof align !== 'undefined',
    [`${clsPrefix}-justify-content-${justify}`]: typeof justify !== 'undefined',
    [`${clsPrefix}-flex-row-reverse`]: reverse,
  });

  return (
    <div className={rowClassName} style={rowStyle}>
      <FlexContext.Provider value={flex}>{children}</FlexContext.Provider>
    </div>
  );
}

export function Col({ children, className, offset = 0, order = 0, flex: flexStyle, span, style }: ColProps) {
  const flex = useContext(FlexContext);
  const { clsPrefix } = useConfig();

  let colStyle: React.CSSProperties = null;
  if (flex) {
    const gutterCompensation = Math.ceil(Number(flex.gutter) / 2);
    colStyle = {
      padding: `${gutterCompensation}px`,
    };
  }

  colStyle = {
    ...(colStyle || {}),
    ...(style || {}),
  };

  return (
    <div
      className={classNames(`${clsPrefix}-col`, className, {
        [`col-offset-${offset}`]: offset >= 1 && offset <= 11,
        [`col-${span}`]: span >= 1 && span <= 12,
      })}
      style={{
        ...colStyle,
        order,
        flex: flexStyle,
      }}
    >
      {children}
    </div>
  );
}

export const FlexWebLayout = {
  Row,
  Col,
};
