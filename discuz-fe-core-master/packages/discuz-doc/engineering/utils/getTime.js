/**
 * 获取时间，格式为：2021/10/28 10:26:34
 * @param {Date} time 时间
 */
function getTime(time) {
  const date = new Date(time);
  const y = date.getFullYear();
  const m = timeStandard(date.getMonth() + 1);
  const d = timeStandard(date.getDate());
  const h = timeStandard(date.getHours());
  const mi = timeStandard(date.getMinutes());
  const s = timeStandard(date.getSeconds());
  return `${y}/${m}/${d} ${h}:${mi}:${s}`;
}

// 个位数前面带 0
function timeStandard (time = 0) {
  return time > 9 ? time : "0" + time;
}

module.exports = getTime;
