// 处理文件大小的显示
const BYTE_PER_KB = 1024;
const BYTE_PER_MB = 1024 * 1024;

export const transferFileSize = (fileSize: String | Number) => {
  // 非数字类型直接展示，数字类型需要折算
  if (typeof fileSize !== 'number') {
    return fileSize;
  }
  
  if (fileSize >= BYTE_PER_MB) {
    return `${parseFloat((fileSize / BYTE_PER_MB).toFixed(2))} MB`;
  }
  if (fileSize >= BYTE_PER_KB) {
    return `${parseFloat((fileSize / BYTE_PER_KB).toFixed(2))} KB`;
  }
  return `${fileSize} B`;
};
