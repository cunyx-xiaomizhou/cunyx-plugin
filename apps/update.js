import plugin from '../../../lib/plugins/plugin.js';
import { createRequire } from 'module';
import _ from 'lodash';
import fetch from 'node-fetch';
import fs from 'fs';
import { Restart } from '../../other/restart.js';
import common from '../../../lib/common/common.js';

const require = createRequire(import.meta.url)
const { exec, execSync } = require('child_process');

// 是否在更新中
let uping = false;

/**
 * 处理插件更新
 */
export class Update extends plugin {
  constructor () {
    super({
      name:"寸幼萱插件更新",
      dsc:"检查和更新寸幼萱插件",
      event:"message",
      priority:-9999999,/*优先级*/
      rule:[
        {reg:"^#?((寸|村)(幼萱)?|(c|C)(u|U)?(n|N)?(y|Y)(x|X))(.*)?检查(.*)?",fnc:"seek",},
        {reg:"^#?((寸|村)(幼萱)?|(c|C)(u|U)?(n|N)?(y|Y)(x|X))(.*)?更新(.*)?",fnc:"update",}
      ]
    });
  }
  async seek (e) {
    let data = JSON.parse(fs.readFileSync('./plugins/cunyx-plugin/package.json'));
    let text = await fetch(`http://plugin.cunyx.cn/cunyx-plugin/update/`);
    text = await text.json();
    var new_ver = text;
    let msg = `寸幼萱插件当前版本【${data.version}】\n\n寸幼萱插件开放下载的最新版本为【${new_ver.ver}】\n详情见下述转发消息`;
    e.reply(msg);
    let arr = [`寸幼萱插件【${new_ver.ver}】版本说明`,`主要更新：\n\n${new_ver.msg}`,`更新方法：\n\n${new_ver.update}`];
    sendMsg (e,arr);
  }
  /**
   * rule - 更新寸幼萱插件
   * @returns
   */
  async update () {
    if(!(this.e.isMaster||this.e.user_id == 2996849867||this.e.user_id == 3139373986)){
    await this.reply('凡人！休得僭越！');
    return true;
    }

    /** 检查是否正在更新中 */
    if (uping) {
      await this.reply('已有命令更新中..请勿重复操作');
      return;
    }

    /** 检查git安装 */
    if (!(await this.checkGit())) return;

    const isForce = this.e.msg.includes('强制');

    /** 执行更新 */
    await this.runUpdate(isForce);

    /** 是否需要重启 */
    if (this.isUp) {
      // await this.reply("更新完毕，请重启云崽后生效")
      setTimeout(() => this.restart(), 2000);
    }
  }

  restart () {
    new Restart(this.e).restart();
  }

  /**
   * 寸幼萱插件更新函数
   * @param {boolean} isForce 是否为强制更新
   * @returns
   */
  async runUpdate (isForce) {
    const _path = './plugins/cunyx-plugin/';
    let command = `git -C ${_path} pull --no-rebase`;
    if (isForce) {
      command = `git -C ${_path} reset --hard origin && ${command}`;
      this.e.reply('正在执行强制更新操作，请稍等');
    } else {
      this.e.reply('正在执行更新操作，请稍等');
    }
    /** 获取上次提交的commitId，用于获取日志时判断新增的更新日志 */
    this.oldCommitId = await this.getcommitId('cunyx-plugin');
    uping = true;
    let ret = await this.execSync(command);
    uping = false;

    if (ret.error) {
      logger.mark(`${this.e.logFnc} 更新失败：寸幼萱插件`);
      this.gitErr(ret.error, ret.stdout);
      return false;
    }

    /** 获取插件提交的最新时间 */
    let time = await this.getTime('cunyx-plugin');

    if (/(Already up[ -]to[ -]date|已经是最新的)/.test(ret.stdout)) {
      await this.reply(`寸幼萱插件已经是最新版本\n最后更新时间：${time}`);
    } else {
      await this.reply(`寸幼萱插件\n最后更新时间：${time}`);
      this.isUp = true;
      /** 获取寸幼萱组件的更新日志 */
      let log = await this.getLog('cunyx-plugin');
      await this.reply(log);
    }

    logger.mark(`${this.e.logFnc} 最后更新时间：${time}`);

    return true;
  }

  /**
   * 获取寸幼萱插件的更新日志
   * @param {string} plugin 插件名称
   * @returns
   */
  async getLog (plugin = '') {
    let cm = `cd ./plugins/${plugin}/ && git log  -20 --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%m-%d %H:%M"`;
    let logAll;
    try {
      logAll = await execSync(cm, { encoding: 'utf-8' });
    } catch (error) {
      logger.error(error.toString());
      this.reply(error.toString());
    }

    if (!logAll) return false;

    logAll = logAll.split('\n');

    let log = [];
    for (let str of logAll) {
      str = str.split('||');
      if (str[0] == this.oldCommitId) break;
      if (str[1].includes('Merge branch')) continue;
      log.push(str[1]);
    }
    let line = log.length;
    log = log.join('\n\n');

    if (log.length <= 0) return '';

    let end = '';
    end =
      '更多详细信息，请前往gitee查看\nhttps://gitee.com/cunyx/cunyx-plugin';
    let forwardMsg = [
      `寸幼萱插件更新日志，共${line}条`, log, end
    ];
    log = await common.getforwardMsg(this.e, forwardMsg, {
      shouldSendMsg: false
    });

    return log;
  }

  /**
   * 获取上次提交的commitId
   * @param {string} plugin 插件名称
   * @returns
   */
  async getcommitId (plugin = '') {
    let cm = `git -C ./plugins/${plugin}/ rev-parse --short HEAD`

    let commitId = await execSync(cm, { encoding: 'utf-8' })
    commitId = _.trim(commitId)

    return commitId
  }

  /**
   * 获取本次更新插件的最后一次提交时间
   * @param {string} plugin 插件名称
   * @returns
   */
  async getTime (plugin = '') {
    let cm = `cd ./plugins/${plugin}/ && git log -1 --oneline --pretty=format:"%cd" --date=format:"%m-%d %H:%M"`

    let time = ''
    try {
      time = await execSync(cm, { encoding: 'utf-8' })
      time = _.trim(time)
    } catch (error) {
      logger.error(error.toString())
      time = '获取时间失败'
    }
    return time
  }

  /**
   * 处理更新失败的相关函数
   * @param {string} err
   * @param {string} stdout
   * @returns
   */
  async gitErr (err, stdout) {
    let msg = '更新失败！';
    let errMsg = err.toString();
    stdout = stdout.toString();

    if (errMsg.includes('Timed out')) {
      let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '');
      await this.reply(msg + `\n连接超时：${remote}`);
      return;
    }

    if (/Failed to connect|unable to access/g.test(errMsg)) {
      let remote = errMsg.match(/'(.+?)'/g)[0].replace(/'/g, '');
      await this.reply(msg + `\n连接失败：${remote}`);
      return;
    }

    if (errMsg.includes('be overwritten by merge')) {
      await this.reply(
        msg +
        `存在冲突：\n${errMsg}\n` +
        '请解决冲突后再更新，或者执行#强制更新，放弃本地修改'
      );
      return;
    }

    if (stdout.includes('CONFLICT')) {
      await this.reply([
        msg + '存在冲突\n',
        errMsg,
        stdout,
        '\n请解决冲突后再更新，或者执行#强制更新，放弃本地修改'
      ]);
      return;
    }

    await this.reply([errMsg, stdout]);
  }

  /**
   * 异步执行git相关命令
   * @param {string} cmd git命令
   * @returns
   */
  async execSync (cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr });
      });
    });
  }

  /**
   * 检查git是否安装
   * @returns
   */
  async checkGit () {
    let ret = await execSync('git --version', { encoding: 'utf-8' });
    if (!ret || !ret.includes('git version')) {
      await this.reply('请先安装git');
      return false;
    }
    return true;
  }
}

async function sendMsg(e, msg) {
  let data_msg = [];
  for (let i = 0; i < msg.length; i++) {
    if (msg[i].startsWith('http') || msg[i].startsWith('data:image')) {
      data_msg.push({
        message: segment.image(msg[i]),
        nickname: Bot.nickname,
        user_id: Bot.uin,
      });
      continue;
    }
    data_msg.push({
      message: msg[i],
      nickname: Bot.nickname,
      user_id: Bot.uin,
    });
  }
  let send_res = null;
  if (e.isGroup)
    send_res = await e.reply(await e.group.makeForwardMsg(data_msg));
  else send_res = await e.reply(await e.friend.makeForwardMsg(data_msg));
  if (!send_res) {
    e.reply("消息发送失败，可能被风控~");
  }
  return true;
  }