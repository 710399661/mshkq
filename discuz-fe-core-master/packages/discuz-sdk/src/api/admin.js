/**
 * 管理后台的新 api
 */
import RequestAPI from './api';
import { RESPONSE_CODE } from './code';

import { updateSettings } from './admin/update-settings';
import { readSettings } from './admin/read-settings';
import { createSettingsLogo } from './admin/create-settingslogo';
import { deleteSettingsLogo } from './admin/delete-settingslogo';
import { readSiteinfo } from './admin/read-siteinfo';
import { createGroups } from './admin/create-groups';
import { deleteGroups } from './admin/delete-groups';
import { readGroupsList } from './admin/read-groupslist';
import { updateGroups } from './admin/update-groups';
import { readGroupResource } from './admin/read-groupresource';
import { updateStopWords } from './admin/update-stopwords';
import { readStopWords } from './admin/read-stopwords';
import { deleteStopWords } from './admin/delete-stopwords';
import { readAdminSigninfieldsList } from './admin/read-adminsigninfieldslist';
import { createAdminSigninfieldsCreate } from './admin/create-adminsigninfieldscreate';
import { updateSigninfieldsUpdate } from './admin/update-signinfieldsupdate';
import { readSigninfieldsResource } from './admin/read-signinfieldsresource';
import { readUserSigninfieldsList } from './admin/read-usersigninfieldslist';
import { createUserSigninfieldsCreate } from './admin/create-usersigninfieldscreate';
import { readFinance } from './admin/read-finance';
import { readFinanceChart } from './admin/read-financechart';
import { readNotificationTpl } from './admin/read-notificationtpl';
import { readTplDetail } from './admin/read-tpldetail';
import { updatePermission } from './admin/update-permission';
/**
 * 初始化实例
 * @param {axios config} options axios 的配置
 */
const apiIns = (options = {}) => {
  // 实例化请求 api
  const api = new RequestAPI(options);

  // 将要请求的接口挂载在实例化之后的 api 中，统一请求实例
  api.updateSettings = updateSettings;
  api.readSettings = readSettings;
  api.createSettingsLogo = createSettingsLogo;
  api.deleteSettingsLogo = deleteSettingsLogo;
  api.readSiteinfo = readSiteinfo;
  api.createGroups = createGroups;
  api.deleteGroups = deleteGroups;
  api.readGroupsList = readGroupsList;
  api.updateGroups = updateGroups;
  api.readGroupResource = readGroupResource;
  api.updateStopWords = updateStopWords;
  api.readStopWords = readStopWords;
  api.deleteStopWords = deleteStopWords;
  api.readAdminSigninfieldsList = readAdminSigninfieldsList;
  api.createAdminSigninfieldsCreate = createAdminSigninfieldsCreate;
  api.updateSigninfieldsUpdate = updateSigninfieldsUpdate;
  api.readSigninfieldsResource = readSigninfieldsResource;
  api.readUserSigninfieldsList = readUserSigninfieldsList;
  api.createUserSigninfieldsCreate = createUserSigninfieldsCreate;
  api.readFinance = readFinance;
  api.readFinanceChart = readFinanceChart;
  api.readNotificationTpl = readNotificationTpl;
  api.readTplDetail = readTplDetail;
  api.updatePermission = updatePermission;
  return api;
};

export {
  apiIns,
  RESPONSE_CODE,
};
