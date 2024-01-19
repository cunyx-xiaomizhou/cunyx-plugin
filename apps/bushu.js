import fs from 'fs';
import YAML from 'yaml';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
let UO = {};
export class cunyx_bushu extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]刷步",
      dsc:"刷取微信/支付宝步数",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?(寸幼萱)?(步数|刷步)帮助",fnc:"help"},
        {reg:/^#?绑定zepp账号(.*)/gi,fnc:'bind_account'},
        {reg:/^#?设置zepp密码(.*)/gi,fnc:'bind_password'},
        {reg:/^#?查看(我的)?zepp(账(号|户)|绑定)/gi,fnc:'search'},
        {reg:/^#?(刷步|(刷取)?步数(刷取)?)(.*)/,fnc:'bushu'}
      ]
    });
  }
  async help (e) {
    e.reply('点击链接查看刷步教程：\nhttps://mp.weixin.qq.com/s?__biz=Mzg4ODY3MjYyNg==&mid=2247484185&idx=1&sn=c3b7e760dd6d3a62b5d92ba7c7e7868f&chksm=cff6db04f8815212b90c95a254be5fc4181a6b9520b36c3de816b7d33fa2516323a963829016#rd',true);
    return true;
  }
  async bind_account (e) {
    let account = e.msg.replace(/绑定zepp账号|#/gi, '').trim();
    if (write(e,'account',account)) {
      e.reply('Zepp账号已成功绑定为：【'+account+'】',true);
    }
  }
  async bind_password (e) {
    let password = e.msg.replace(/设置zepp密码|#/gi, '').trim();
    if (write(e,'password',password)) {
      e.reply('Zepp密码已成功设置为：【'+password+'】',true);
    }
  }
  async search (e) {
    try {
      let userData = fs.readFileSync('./plugins/cunyx-plugin/data/bushu.json');
      let user = JSON.parse(userData);
      if (!user.bind[e.user_id].account) {
        e.reply('你还没有绑定Zepp账号，请先【#绑定Zepp账号】',true);
        return false;
      } else {
        UO.account = user.bind[e.user_id].account;
      }
      if (!user.bind[e.user_id].password) {
        e.reply('你还没有设置Zepp密码，请先【#设置Zepp密码】',true);
        return false;
      } else {
        UO.password = user.bind[e.user_id].password;
      }
      e.reply(`QQ号${e.user_id}的Zepp绑定内容：\n绑定账号：${UO.account}\n设置密码：${UO.password}`)
    } catch (err) {
      e.reply('你还没有绑定Zepp的账号信息，请先发送【#寸幼萱帮助】查看绑定指令',true);
    }
  }
  async bushu (e) {
    try {
      let userData = fs.readFileSync('./plugins/cunyx-plugin/data/bushu.json');
      let user = JSON.parse(userData);
      if (!user.bind[e.user_id].account) {
        e.reply('你还没有绑定Zepp账号，请先【#绑定Zepp账号】',true);
        return false;
      } else {
        UO.account = user.bind[e.user_id].account;
      }
      if (!user.bind[e.user_id].password) {
        e.reply('你还没有设置Zepp密码，请先【#设置Zepp密码】',true);
        return false;
      } else {
        UO.password = user.bind[e.user_id].password;
      }
      let data = YAML.parse(fs.readFileSync('./plugins/cunyx-plugin/config/cunyx_api.yaml','utf-8'));
      let Day = date('Y-m-d');
      let bushu = e.msg.replace(/(刷步|(刷取)?步数(刷取)?)|#/g, '').trim();
      if (!(bushu>-1)&&user.temp[e.user_id][Day]>15000) {
        e.reply('今日步数已大于15000步，不能使用随机刷取步数');
        return false;
      }
      if (user.temp[e.user_id][Day]&&user.temp[e.user_id][Day]>bushu) {
        e.reply(`当日步数已更新为${user.temp[e.user_id][Day]}步，大于${bushu}步。\n当日步数只可多不可少，请重试！`,true);
        return false;
      }
      let url;
      if (data.domain!==undefined) {
          url = `https://${data.domain}/api/api/bushu?qq=${data.qq}&token=${data.api}&temp=${bushu}&account=${UO.account}&password=${UO.password}`;
      } else {
          url = `https://api.cunyx.cn/api/api/bushu?qq=${data.qq}&token=${data.api}&temp=${bushu}&account=${UO.account}&password=${UO.password}`;
      }
      e.reply('我开始尝试刷取了，请稍等哦~',true);
      try {
        let text = await fetch(url);
        text = await text.json();
        var json = text;
        if (json.code==200) {
          let temp = json.data.temp;
          write(e,'temp',temp);
          if (json.data.notice==null) {
            e.reply(`成功刷取${temp}步，将立马同步...`),true;
          } else {
            e.reply(`官方通告：${json.data.notice}\n\n成功刷取${temp}步，将立马同步...`,true);
          }
        } else {
          e.reply(json.msg);
        }
      } catch (err) {
        e.reply('喜报喜报！作者服务器被打死了！\n详情请加群：786034611咨询');
      }
    } catch (err) {
      e.reply('你还没有绑定Zepp的账号信息，请先发送【#寸幼萱帮助】查看绑定指令',true);
    }
  }
}
async function sent(Json) {
    if (typeof Json === 'string') {
        Json = JSON.parse(Json);
    }
    let json = JSON.stringify(Json, null, 2).replace(/\\\//g, '/');
    return json;
}
async function write (e,keys,value) {
    let Json;
    try {
        Json = JSON.parse(fs.readFileSync('./plugins/cunyx-plugin/data/bushu.json'));
    } catch (err) {
        Json = {
            "bind":{},
            "temp":{}
        }
    }
    if (!Json.bind[e.user_id]) {
        Json.bind[e.user_id] = {};
    }
    let Day = date('Y-m-d');
    if (!Json.temp[e.user_id]) {
        Json.temp[e.user_id] = {}
    }
    if (!Json.temp[e.user_id][Day]) {
        Json.temp[e.user_id][Day] = 0;
    }
    if (keys=='account') {
        Json.bind[e.user_id].account=value;
    } else if(keys=='password') {
        Json.bind[e.user_id].password=value;
    } else if (keys=='temp') {
        Json.temp[e.user_id][Day]=value;
    }
    const content = await sent(Json);
    try {
        fs.writeFile('./plugins/cunyx-plugin/data/bushu.json', content,(err)=>{
            if (err) {
                e.reply('绑定失败：\n'+err);
                return false;
            } else {
                return true;
            }
        });
    } catch (error) {
        e.reply('出现错误：\n'+error);
        return false;
    }
}
function date(format, timestamp = null) {
    const currentDate = timestamp ? new Date(timestamp) : new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');
    const formattedDate = format
        .replace('Y', year)
        .replace('m', month)
        .replace('d', day)
        .replace('H', hours)
        .replace('i', minutes)
        .replace('s', seconds)
        .replace('l', milliseconds);
    return formattedDate;
}