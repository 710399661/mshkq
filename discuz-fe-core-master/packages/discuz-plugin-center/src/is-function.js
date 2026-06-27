export default function isFunction(val) {
  return {}.toString.call(val) === '[object Function]';
}
