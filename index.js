import fs from 'node:fs';
import path from 'path';
import chalk from 'chalk';
logger.info(logger.red('~~~~~~~~~~~~~~~~~~~~'));
logger.info('开始寸幼萱插件初始化');
const folder1 = process.cwd()+'/plugins/cunyx-plugin/config';
const folder2 = process.cwd()+'/plugins/cunyx-plugin/def_config';

function getAllFiles(dirPath, files) {
  const fileList = fs.readdirSync(dirPath);
  files = files || [];
  fileList.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files = getAllFiles(filePath, files);
    } else {
      files.push(filePath);
    }
  });
  return files;
}

function compareFolders(folder1, folder2) {
  const files1 = getAllFiles(folder1);
  const files2 = getAllFiles(folder2);
  files2.forEach((file2) => {
    if (files1.indexOf(file2) === -1) {
      const dest = path.join(folder1, path.relative(folder2, file2));
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(file2, dest);
        logger.info(`检测到文件${path.basename(file2)}初始化，需再次重启机器人才可生效！\n请给机器人发送【#重启】指令完成本次初始化`);
      } else {
        logger.info(`配置文件${path.basename(file2)}已经存在，略过初始化~`);
      }
    }
  });
}
compareFolders(folder1, folder2);
const files = fs.readdirSync('./plugins/cunyx-plugin/apps').filter(file => file.endsWith('.js'));
let ret = [];
files.forEach((file) => {
  ret.push(import (`./apps/${file}`));
});
ret = await Promise.allSettled(ret);
let apps = {};
for (let i in files) {
  let name = files[i].replace('.js', '');
  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`);
    logger.error(ret[i].reason);
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]];
}
logger.info('寸幼萱插件初始化完成');
logger.info(`~\t${chalk.green('寸幼萱交流群')}${'  '}${chalk.underline('786034611')}\t~`);
logger.info(logger.red('~~~~~~~~~~~~~~~~~~~~'));
export { apps };