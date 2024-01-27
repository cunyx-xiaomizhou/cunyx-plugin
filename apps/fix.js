import fs from 'fs';
import YAML from 'yaml';
import plugin from './../../../lib/plugins/plugin.js';
export class cunyx_fix extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]开发测试",
      dsc:"你管我干嘛",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?查看文件(.*)",fnc:"cx"},
        {reg:"^#?查看签名",fnc:"ck"}
      ]
    });
  }
  async cx (e) {
    if (!e.isMaster) {
      e.reply('你有毒吧，真以为自己挺有能耐啊？',true);
      return false;
    }
    try {
      let path = process.cwd() + '/' + e.msg.replace(/查看文件|#/g,'');
      e.reply(path,true);
      let content = fs.readFileSync(path,'utf8');
      e.reply(content);
    } catch (err) {
      e.reply('未找到该文件'+err);
    }
  }
  async ck (e) {
    if (!e.isMaster) {
      e.reply([segment.at(e.user_id),'6'],true)
    }
    let path = process.cwd() + '/config/config/bot.yaml';
    let Yaml = YAML.parse(fs.readFileSync(path,'utf8'));
    e.reply('当前签名服务器地址：\n'+Yaml.sign_api_addr);
  }
}