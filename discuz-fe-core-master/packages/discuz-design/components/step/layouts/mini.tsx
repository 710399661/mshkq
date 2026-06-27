import React from 'react';
import classNames from 'classnames';
import { StepProps } from '../interface';
import { ConfigContext } from '../../../extends/configContext';
import { noop } from '../../../utils/noop';
import { StepContext } from '../stepContext';
import { View } from '@tarojs/components'
export class StepMiniLayout extends React.Component<StepProps> {
  static contextType = ConfigContext;
  render() {
    const { clsPrefix } = this.context;
    const { style, className, readonly, direction = 'vertical' } = this.props
    let currentKey = this.props.currentKey || 0
    // @ts-ignore
    const length = this.props.children.length
    if(readonly) {
      currentKey = length
    }
    const context = {
      direction: direction,
      currentKey: currentKey,
      onChange: this.props.onChange || noop,
      connectNode: this.props.connectNode || '',
      length: length,
    }
    return (
      <View className={classNames(
          className,
          `${clsPrefix}-step`,
          {
            [`${clsPrefix}-step--vertical`]: direction === 'vertical',
            [`${clsPrefix}-step--horizontal`]: direction === 'horizontal',
          }
        )}
        style={style}
      >
        <StepContext.Provider value={context}>
          {this.props.children}
        </StepContext.Provider>
      </View>
    )
  }
}
