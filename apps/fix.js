import fs from 'fs';
import YAML from 'yaml';
import plugin from './../../../lib/plugins/plugin.js';
let isTrss = fs.existsSync(process.cwd() + '/config/ICQQ.yaml')
export class cunyx_fix extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]开发测试",
      dsc:"你管我干嘛",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?查看文件(.*)",fnc:"cx"},
        {reg:"^#?查看签名",fnc:"ck"},
        {reg:/^#?帮我(at|艾特|@)(\d+)/gi,fnc:"at"},
       // {reg: '你(的|)主人是(谁|哪个)',fnc: 'whoismaster'},
      ]
    });
  }
      async whoismaster(e) {
        if (!e.atme && !e.atBot) return false
        let map = await e.group.getMemberMap()
        let other = YAML.parse(fs.readFileSync(`${process.cwd()}/config/config/other.yaml`))
        let memberlist = [...map].map(item => item[0])
        let msg = ['我的主人是']
        if (Array.isArray(other.masterQQ)) {
            let isinGroup = false
            other.masterQQ.forEach(item => {
                if (memberlist.includes(item)) {
                    isinGroup = true
                    msg.push(segment.at(item))
                }
            })
            if (!isinGroup) {
                return this.reply(`我的主人不在这个群，主人qq号为:${other.masterQQ.join('、')}`)
            }
        } else {
            return this.reply("我是一枚野生的机器人呢！")
        }
        return this.reply(msg)

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
      e.reply([segment.at(e.user_id),'6死了'],true);
      return false;
    }
    if (!isTrss) {
    let path = process.cwd() + '/config/config/bot.yaml';
    let Yaml = YAML.parse(fs.readFileSync(path,'utf8'));
    e.reply('当前签名服务器地址：\n'+Yaml.sign_api_addr);
    }else{
            let pathtrss = process.cwd() + '/config/ICQQ.yaml';
    let Yaml = YAML.parse(fs.readFileSync(pathtrss,'utf8'));
    e.reply('当前签名服务器地址：\n'+Yaml.bot.sign_api_addr);
    }
  }
  async at (e) {
    let qq = e.at? e.at : e.msg.replace(/帮我(at|@|艾特)|#/gi, '').trim();
    try {
      e.reply([segment.at(qq),segment.at(qq)+'喂！出来！有人找你！'],true);
    } catch (err) {
      e.reply('at失败，原因：\n'+err,true);
    }
  }
}