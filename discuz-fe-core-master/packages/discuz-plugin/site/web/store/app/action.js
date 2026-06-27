import { observable, action } from 'mobx';
import AppStore from './store';
class AppAction extends AppStore {
  constructor() {
    super();
  }
  @action
  changeValue() {
    this.value = 'HOHOHOHO';
  }

  @action
  changeUser() {
    this.user.other.a = 'HOHOHOHO';
  }
}

export default AppAction;
