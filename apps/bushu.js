import fs from 'fs';
import YAML from 'yaml';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
let UO;
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
        {reg:/^#?查看(我的)?zepp(账(号|户)|绑定)/,fnc:'search'}
      ]
    });
  }
  async help (e) {
    e.reply('点击链接查看刷步教程：\nhttps://mp.weixin.qq.com/s/我文章没写呢，着急有屁用？',true);
    return true;
  }
  async bind_account (e) {
    let account = e.msg.replace(/绑定zepp账号|#/gi, '').trim();
    if (write(e,'account',account)) {
      e.reply('绑定Zepp账号：【'+account+'】成功',true);
    }
  }
  async bind_password (e) {
    let password = e.msg.replace(/设置zepp密码|#/gi, '').trim();
    if (write(e,'password',password)) {
      e.reply('Zepp密码已设置为：【'+password+'】',true);
    }
  }
  async search (e) {
    try {
      let user = JSON.parse(fs.readFileSync('./plugins/cunyx-plugin/data/bushu.json','utf-8'));
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
      e.reply(`QQ号${e.user_id}的Zepp绑定内容：\n绑定账号：${Object.account}\n设置密码：${Object.password}`)
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