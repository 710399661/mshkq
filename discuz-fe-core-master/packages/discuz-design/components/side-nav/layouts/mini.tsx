import React from 'react';
import classNames from 'classnames';
import { SideNavProps } from '../interface';
import { ConfigContext } from '../../../extends/configContext';
import {SideNavItemContext} from '../sideNavContext'
import { noop } from '../../../utils/noop';
import { View } from '@tarojs/components'
export class SideNavMiniLayout extends React.Component<SideNavProps> {
  static contextType = ConfigContext;

  render() {
    const { clsPrefix } = this.context;
    const { className='', style = {}, direction='vertical', onClick=noop, activeIndex, defaultActiveIndex=-1, activeClassName='', activeStyle={}, connect} = this.props
    const context ={
      activeIndex,
      defaultActiveIndex,
      direction,
      activeStyle,
      activeClassName,
      onClick,
      connect,
    }
    return (<View
      style={style}
      className={classNames(
        className,
        `${clsPrefix}-side-nav`,
        {
          [`${clsPrefix}-side-nav--vertical`]: direction==='vertical',
          [`${clsPrefix}-side-nav--horizontal`]: direction==='horizontal'
        }
      )}
    >
      <SideNavItemContext.Provider value={context}>
        {this.props.children}
      </SideNavItemContext.Provider>
    </View>)
  }
}
