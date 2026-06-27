export type Locale = 'zh-CN' | 'en-US';

export interface LocaleMessages {
  common: {
    home: string;
    login: string;
    register: string;
    post: string;
    search: string;
    settings: string;
    notifications: string;
    users: string;
    threads: string;
    posts: string;
    comments: string;
    categories: string;
    tags: string;
    topics: string;
  };
  actions: {
    publish: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    confirm: string;
    loadMore: string;
    logout: string;
    loggingOut: string;
    profile: string;
    myPosts: string;
    myNotifications: string;
    accountSettings: string;
  };
  form: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    verifyCode: string;
    searchPlaceholder: string;
  };
  status: {
    success: string;
    failed: string;
    loading: string;
    noData: string;
  };
  tips: {
    loginSuccess: string;
    registerSuccess: string;
    publishSuccess: string;
    deleteConfirm: string;
    loggedOut: string;
    loggedOutDesc: string;
  };
  nav: {
    home: string;
    categories: string;
    tags: string;
    users: string;
    topics: string;
  };
  admin: {
    dashboard: string;
    adminPanel: string;
    userManagement: string;
    threadManagement: string;
    postManagement: string;
    commentManagement: string;
    categoryManagement: string;
    tagManagement: string;
    systemSettings: string;
    version: string;
  };
  language: {
    zhCN: string;
    enUS: string;
  };
}

export type I18nKey = string;

export type I18nParams = Record<string, string | number>;
