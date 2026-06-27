import { RESPONSE_CODE } from '../code';

/**
 * 错误处理
 * @param {object} error 错误
 */
export function handleError(error) {
  const { message } = error;
  let status = RESPONSE_CODE.OTHER; // 其它错误
  if (message && /timeout of (\d)*ms exceeded/.test(message)) {
    status = RESPONSE_CODE.TIMEOUT;
  }
  return {
    Code: status,
    Message: message,
    Data: {},
  };
}
