import { observable } from 'mobx';
class AppStore {
    @observable value = 'LamHo';
    @observable user = {
      name: 'lamho',
      age: 18,
      other: {
        a: 123,
        b: 333,
      },
    }
}

export default AppStore;
