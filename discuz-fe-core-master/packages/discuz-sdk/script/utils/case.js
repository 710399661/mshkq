/**
 * 判断是否字母或数字
 * @param {string} str 字母
 * @returns {boolean}
 */
const isCase = str => /^[a-zA-Z_\d-]*$/.test(str);

/**
 * 判断字母是否是大写
 * @param {string} ch 字母
 * @returns {boolean}
 */
const isUpperCase = (ch) => {
  if (ch.length !== 1) return false;
  return /[A-Z]/.test(ch);
};

module.exports = {
  isCase,
  isUpperCase,
};
