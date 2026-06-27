import * as fs from "fs";
import * as path from "path";
import * as uppercamelcase from "uppercamelcase";
import * as fileSave from "file-save";
import { chalk } from "@tarojs/helper";
import toASTString from "./ast";

const miniToWeb = (name: string, onlyExample: boolean) => {
  const ComponentName = uppercamelcase(name);

  // 获取目标文件路径
  let targetPaths = ['__examples__'];
  if (!onlyExample) {
    targetPaths.push('layouts')
  }

  targetPaths.forEach(item => {
    const targetDirPath = `${getRootPath(name)}/${item}`;

    // 获取目标文件路径
    const targetPath = `${targetDirPath}/mini`;
    handleFiles({targetPath, targetDirPath, componentName: ComponentName})
  })
};

// 文件处理
const handleFiles = ({targetPath, targetDirPath, componentName}) => {
  if (isDirec(targetPath)) {
    const files = fs.readdirSync(targetPath);

    // 若文件不存在，结束执行
    if (!files || !files.length) {
      console.log(chalk.red.bold.bgWhite(`ats-h5: 没有找到${targetDirPath}下的文件`));
      return;
    }

    // 遍历处理文件夹中的tsx文件
    files.filter(item => item.endsWith('.tsx')).forEach((item) => {
      const miniComponentPath = `${targetPath}/${item}`;
      let res = toASTString(miniComponentPath, componentName);
      saveFile(`${targetDirPath}/web/${item}`, res);
    });
  } else {
    const miniComponentPath = `${targetPath}.tsx`;

    // 若文件不存在，结束执行
    if (!fs.existsSync(miniComponentPath)) {
      console.log(chalk.red.bold.bgWhite(`ats-h5: 没有找到${targetDirPath}下的文件`));
      return;
    }

    let res = toASTString(miniComponentPath, componentName);
    saveFile(`${targetDirPath}/web.tsx`, res);
  }
}

// 判断是以文件夹还是单文件形式书写
const isDirec = (targetPath) => {
  let isBool = false;
  try {
    const stat = fs.statSync(targetPath);
    isBool = stat.isDirectory();
  } catch (error) {
    isBool = false;
  }

  return isBool;
}

// 写文件
const saveFile = (path: string, content: string) => {
  fileSave(path).write(content, "utf8").end();
};

// 获取组件的layout文件夹路径
const getRootPath = (name: string) => {
  return path.resolve(
    __dirname,
    `../../../../../../components/${name}`
  );
};
export default miniToWeb;
