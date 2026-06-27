class BaseLayout {
  init() {
    const layoutInstance = this.layoutImplement();
    return {
      component: layoutInstance ? layoutInstance : this.defaultLayout(),
    };
  }

  // 默认 layout，子类未实现 layout 时，返回默认 null
  defaultLayout() {
    return null;
  }

  // adapter 具体实现，子类应该具体实现
  layoutImplement() {
    return null;
  }
}

export const baseLayoutFactory = ({ layoutImplement }) => class extends BaseLayout {
  layoutImplement() {
    return layoutImplement();
  }
};

export default BaseLayout;
