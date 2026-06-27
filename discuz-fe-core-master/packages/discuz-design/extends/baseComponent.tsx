import { Component } from 'react';

// DZQDesign 组件库组件抽象基类
class BaseComponent<P = {}, S = {}, View extends Object = {}, Adapter extends Object = {}> extends Component<P, S> {
  viewAdapter: {
    component: React.ComponentClass<View>;
  };

  logicalAdapter: Adapter;

  constructor(props, { viewAdapter: ViewAdapter, logicalAdapter: LogicalAdapter }) {
    super(props);
    this.viewAdapter = new ViewAdapter().init();
    const adapterInstance = new LogicalAdapter().init();
    this.logicalAdapter = {} as any;
    Object.keys(adapterInstance).forEach((key) => {
      this.logicalAdapter[key] = adapterInstance[key].bind(this);
    });
  }

  /**
   * 获取 class prefix
   */
  static readonly clsPrefix = 'dzq';

  /**
   * 获取渲染的 Component
   */
  get RenderComponent() {
    return this.viewAdapter.component;
  }

  /**
   * 获取 视图适配器，子类需要实现 viewAdapter
   */
  get defaultViewAdapter() {
    return {
      component: null,
    };
  }

  /**
   * 获取 逻辑处理适配器 ，子类需要实现 adapter
   */
  static get defaultLogicalAdapter() {
    return {};
  }

  /**
   * adapter 适配器实例
   */
  get adapter() {
    return this.logicalAdapter;
  }
}

/**
 * 工厂方法，用于生成基于抽象基类的具体继承类
 * @param {*} param0
 */
export const baseComponentFactory = <
  P extends Object = {},
  S extends Object = {},
  V extends Object = {},
  L extends Object = {}
>({
    viewAdapter,
    logicalAdapter,
  }) => class ExtendComponent extends BaseComponent<P, S, V, L> {
    constructor(props) {
      super(props, {
        viewAdapter,
        logicalAdapter,
      });
    }
  };

/**
 * 工厂方法，用于生成视图Adapter
 * @param {*} component
 */
export const BaseViewAdapterFactory = component => ({
  component,
});

export default BaseComponent;
