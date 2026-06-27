function isIOSMobile() {
  if (typeof window !== 'undefined') {
    const ua = window?.navigator?.userAgent || '';
    return ['iPhone', 'iPad'].some(item => ~ua.indexOf(item));
  }
  return false;
}

export default isIOSMobile;
