import { observable } from 'mobx';
import { appTheme } from '@constants/app';

class AppStore {
  // 主题
  @observable theme = appTheme.light;
}

export default AppStore;
