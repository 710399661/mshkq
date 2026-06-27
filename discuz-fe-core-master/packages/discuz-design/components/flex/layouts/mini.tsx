import React, { useContext, Component } from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import { RowProps, ColProps } from '../interface';
import { useConfig } from '../../../extends/configContext';

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
    <View className={rowClassName} style={rowStyle}>
      <FlexContext.Provider value={flex}>{children}</FlexContext.Provider>
    </View>
  );
}

export function Col({ children, className, offset = 0, order = 0, flex: flexStyle, span, style }: ColProps) {
  const { clsPrefix } = useConfig();

  const flex = useContext(FlexContext);

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
    <View
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
    </View>
  );
}

export const FlexMiniLayout = {
  Row,
  Col,
};
