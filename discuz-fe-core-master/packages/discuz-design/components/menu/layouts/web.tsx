import React, { Component } from 'react';
import { ConfigContext } from '../../../extends/configContext';
import classNames from 'classnames';
import { MenuProps } from '../interface';
import { MenuContext, INITIAL_VALUE } from '../MenuContext';


export class MenuWebLayout extends Component<MenuProps> {
  public static contextType = ConfigContext;

  public constructor(props) {
    super(props);

    // 初始化默认选中
    // 多选
    let initCurrentActiveSubMenuIndexSet = new Set();
    let initCurrentActiveItemIndexSet = new Set();
    // 单选
    const initCurrentActiveSubMenuIndex = props?.defaultSubmenuActives?.length
      ? props.defaultSubmenuActives[0]
      : INITIAL_VALUE;
    const initCurrentActiveItemIndex = props?.defaultActives?.length
      ? props.defaultActives[0]
      : INITIAL_VALUE;
    if (props.multiple) {
      props?.defaultSubmenuActives?.length && (initCurrentActiveSubMenuIndexSet = new Set(props.defaultSubmenuActives));
      props?.defaultActives?.length && (initCurrentActiveItemIndexSet = new Set(props.defaultActives));
    }

    this.state = {
      hoverSubMenuIndex: INITIAL_VALUE,
      setHoverSubMenuIndex: this.setHoverSubMenuIndex.bind(this),
      currentActiveSubMenuIndex: initCurrentActiveSubMenuIndex,
      setCurrentActiveSubMenuIndex: this.setCurrentActiveSubMenuIndex.bind(this),
      currentActiveItemIndex: initCurrentActiveItemIndex,
      setCurrentActiveItemIndex: this.setCurrentActiveItemIndex.bind(this),
      uniqueOpened: props.uniqueOpened,
      mode: props.mode,
      menuTrigger: props.menuTrigger,

      // 多选相关
      multiple: props.multiple,
      currentActiveSubMenuIndexSet: initCurrentActiveSubMenuIndexSet,
      currentActiveItemIndexSet: initCurrentActiveItemIndexSet,
      setCurrentActiveSubMenuIndexSet: this.setCurrentActiveSubMenuIndexSet.bind(this),
      setCurrentActiveItemIndexSet: this.setCurrentActiveItemIndexSet.bind(this),

      // 默认展开
      defaultOpeneds: props.defaultOpeneds,
    };
  }

  public setHoverSubMenuIndex(index) {
    this.setState({
      hoverSubMenuIndex: index,
    });
  }

  public setCurrentActiveSubMenuIndex(index) {
    this.setState({
      currentActiveSubMenuIndex: index,
    });
  }

  public setCurrentActiveItemIndex(index) {
    this.setState({
      currentActiveItemIndex: index,
    });
  }

  public setCurrentActiveItemIndexSet(currentActiveItemIndexSet) {
    this.setState({
      currentActiveItemIndexSet,
    });
  }

  public setCurrentActiveSubMenuIndexSet(currentActiveSubMenuIndexSet) {
    this.setState({
      currentActiveSubMenuIndexSet,
    });
  }

  public render() {
    const { style, className, mode }: MenuProps = this.props;

    const { clsPrefix } = this.context;

    const componentPrefix = `${clsPrefix}-menu`;

    const classNameStr: string = classNames(
      componentPrefix,
      className,
      {
        [`${componentPrefix}--horizontal`]: mode === 'horizontal',
      },
    );

    return (
      <ul className={classNameStr} style={style}>
        <MenuContext.Provider value={this.state}>
          {this.props.children}
        </MenuContext.Provider>
      </ul>
    );
  }
}
