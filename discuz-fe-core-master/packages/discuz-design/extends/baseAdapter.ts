import BaseComponent from './baseComponent';

class BaseAdapter {
  init() {
    const adapterInstance = this.defaultAdapter();
    const adapterImplementInstance = this.adapterImplement();
    Object.assign(adapterInstance, adapterImplementInstance);
    return adapterInstance;
  }

  // 默认 adapter，子类未实现 adapter 时，返回默认 adapter
  // 子类应该覆盖此默认 adapter，防止报错
  defaultAdapter() {
    return BaseComponent.defaultLogicalAdapter;
  }

  // adapter 具体实现，子类应该具体实现
  adapterImplement() {}
}

export const baseAdapterFactory = ({ defaultAdapter, adapterImplement }) => class extends BaseAdapter {
  defaultAdapter() {
    return defaultAdapter;
  }

  adapterImplement() {
    return adapterImplement();
  }
};

export default BaseAdapter;
