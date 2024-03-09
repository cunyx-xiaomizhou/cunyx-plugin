 import plugin from '../../../lib/plugins/plugin.js';
 import fetch from 'node-fetch';
 import YAML from 'yaml';
 import fs from 'fs';
 /*全局变量声明*/
 let msg;
 let cond;
 let json;
 /*文件读取*/
 let data = YAML.parse(fs.readFileSync('./plugins/cunyx-plugin/config/cunyx_api.yaml','utf-8'));
 /* 插件介绍部分 */
export class cunyx_api extends plugin {
  constructor () {
    super({
      name:"寸幼萱api",/*功能名称*/
      dsc:"查询我的token可用次数",/*功能介绍*/
      event:"message",/*抄的，不知道啥玩意*/
      priority:-999999999,/*优先级*/
      rule:[
        {reg:/^#?(CUNY(OU)?X(UAN)?|(寸|村)(幼|优)萱)api$/i,fnc:"api"},
        {reg: /^#?(CUNY(OU)?X(UAN)?|(寸|村)(幼|优)萱)(当前)绑定$/gi,fnc:"ck"},
        {reg:"^#?token核验",fnc:"isTrue"}
      ]
    });
  }
  /*命令执行*/
  async api (e) {
      if (!e.atme && !e.at){
      return false
      }
    try {
        json = await fetch(`http://${data.domain}/mine/token?qq=${data.qq}&token=${data.api}`);
    } catch (err) {
        json = await fetch(`http://api.cunyx.cn/mine/token?qq=${data.qq}&token=${data.api}`);
    }
    try {
      json = await json.json();
      var Json = json;
      Json = Json
    } catch (err) {
        e.reply(json);
    }
    if (e.isMaster || e.user_id=='2996849867') {
      if (Json.code==200) {
          if (Json.data.condition==0) {
              cond = '正常';
          } else if (Json.data.condition==1) {
              cond = '封禁';
          } else if (Json.data.condition==2) {
              cond = '管理员';
          } else {
              cond = '未知';
          }
          if (Json.data.special==null) {
            msg = `查询账号：${data.qq}\n账号状态：${cond}\n普通额度次数：${Json.data.normal.times}次\n无限普通额度状态：${rather_time(Json.data.normal.time)}\n无限普通额度有效期至：${Json.data.normal.date}\n高级额度次数：${Json.data.senior.times}次\n无限高级额度状态：${rather_time(Json.data.senior.time)}\n无限高级额度有效期至：${Json.data.senior.date}\n\n特殊额度：未开通`;
          } else {
            msg = `查询账号：${data.qq}\n账号状态：${cond}\n普通额度次数：${Json.data.normal.times}次\n无限普通额度状态：${rather_time(Json.data.normal.time)}\n无限普通额度有效期至：${Json.data.normal.date}\n高级额度次数：${Json.data.senior.times}次\n无限高级额度状态：${rather_time(Json.data.senior.time)}\n无限高级额度有效期至：${Json.data.senior.date}\n\n特殊额度：\n绑定手机号：${Json.data.special.phone}\n账户余额：${Json.data.special.balance}元\n短信验证码发送次数：${Json.data.special.sms}次\n邮件验证码发送次数：${Json.data.special.email}次\n匿名邮件次数：${Json.data.special.mail}次`;
          }
          e.reply(msg,true);
      } else {
          e.reply(Json.msg,true);
      }
    } else {
      e.reply('求求你做点人事吧，你也配命令我？');
    }
  }
  async ck (e) {
    e.reply('当前绑定QQ为：'+data.qq);
  }
  async isTrue (e) {
    try {
        json = await fetch(`http://${data.domain}/mine/token?qq=${data.qq}&token=${data.api}`);
    } catch (err) {
        json = await fetch(`http://api.cunyx.cn/mine/token?qq=${data.qq}&token=${data.api}`);
    }
    try {
      json = await json.json();
      var Json = json;
      Json = Json
    } catch (err) {
        e.reply(json);
    }
    if (Json.code==200) {
        if (Json.data.cond==1) {
            e.reply('测试成功');
        } else {
            e.reply(`测试失败！\n请求的QQ：${data.qq}\n请求的token：${data.token}`,true);
        }
    } else {
        e.reply(`请求失败，原因如下：${Json.msg}\n\n原始数据：${json}`,true);
    }
  }
}
function rather_time(phpTimestamp) {
      const currentTimestamp = Date.now();
      const phpTimestampInMilliseconds = phpTimestamp * 1000;
      if (currentTimestamp > phpTimestampInMilliseconds) {
          return '已过期';
      } else {
          return '未过期';
      }
}
