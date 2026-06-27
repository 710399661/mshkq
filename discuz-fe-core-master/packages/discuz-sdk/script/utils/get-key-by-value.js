/**
 * 获取值对应的键
 * @param {object} obj 对象
 * @param {string} value 值
 * @returns {string} 键
 */
const getKeyByValue = (obj = {}, value) => {
  let result = '';
  Object.keys(obj).forEach((key) => {
    if (obj[key] === value) result = key;
  });
  return result;
};

module.exports = {
  getKeyByValue,
};
