function isMobile() {
  const userAgentInfo = navigator.userAgent;

  const mobileAgents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];

  let mobileFlag = false;

  // 根据userAgent判断是否是手机
  for (let v = 0; v < mobileAgents.length; v++) {
    if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
      mobileFlag = true;
      break;
    }
  }

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  // 根据屏幕分辨率判断是否是手机
  if (screenWidth < 500 && screenHeight < 800) {
    mobileFlag = true;
  }

  return mobileFlag;
}

export default isMobile;
