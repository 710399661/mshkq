/**
 * h5和pc复制链接分享
 * @param {ShareInfo | string} shareInfo 如果是string就当作标题
 *    @ShareInfo
 *      @title  {string} 标题
 *      @path   {string} 分享的路由会使用内部host
 *      @url    {string} 分享的url会替代内部合成的url
 * @return  {boolean} 复制是否成功
 * @example h5Share({title:"dzq123", path:"/home/post?ddd=123"}) 复制 -> `dzq123 ${host}/home/post?ddd=123`
 */
export function h5Share(shareInfo) {
  let themeTitle = '';
  let path = ''
  let url = '';
  // title处理
  switch (typeof shareInfo) {
    case 'string':
      themeTitle = shareInfo;
      break;
    default:
      shareInfo = shareInfo || {}
      // path处理
      path = shareInfo.path || ''
      if (path && /^\/.*/.test(path)) {
        // 处理开头的/
        path = path.slice(1);
      }
      themeTitle = shareInfo.title;
  }
  themeTitle = themeTitle || 'Discuz!Q'

  const reTag = /<img(?:.|\s)*?>/g;
  const reTag2 = /(<\/?br.*?>)/gi;
  const reTag3 = /(<\/?p.*?>)/gi;
  themeTitle = themeTitle.toString().replace(reTag, '');
  themeTitle = themeTitle.toString().replace(reTag2, '');
  themeTitle = themeTitle.toString().replace(reTag3, '');
  themeTitle = themeTitle.toString().replace(/\s+/g, '');
  themeTitle = `${themeTitle.substring(0, 17)}`;
  // url合并
  const DISCUZ_REQUEST_HOST = window && window.location && window.location.origin || '';

  url = shareInfo.url || `${DISCUZ_REQUEST_HOST}/${path}`

  // 复制流程
  const oInput = document.createElement('input');
  oInput.value = url;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  oInput.readOnly = true;
  oInput.id = 'copyInp';
  // 执行浏览器复制命令
  const copyState = document.execCommand('Copy');
  oInput.setAttribute('onfocus', undefined);
  oInput.blur();
  oInput.className = 'oInput';
  oInput.style.display = 'none';

  return copyState;
}

export default h5Share;