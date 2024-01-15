import fs from 'fs';
import plugin from './../../../lib/plugins/plugin.js';
export class cunyx_bushu extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]刷步",
      dsc:"刷取微信/支付宝步数",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?(寸幼萱)?(步数|刷步)帮助",fnc:"help"},
        {reg:/^#?绑定zepp账号(.*)/gi,fnc:'bind_account'}
      ]
    });
  }
  async help (e) {
    e.reply('点击链接查看刷步教程：\nhttps://mp.weixin.qq.com/s/我文章没写呢，着急有屁用？',true);
    return true;
  }
  async bind_account (e) {
    let account = e.msg.replace(/绑定zepp账号|#/gi, '').trim();
    e.reply(account,true);
    if (write(e,'account',account)) {
      e.reply('成功');
    } else {
      e.reply('失败');
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
    e.reply(Day);
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
    const content = sent(Json);
    e.reply(content);
    try {
        fs.writeFile('./plugins/cunyx-plugin/data/bushu.json', content,(err)=>{
            if (err) throw err;
            return true;
        });
    } catch (error) {
        e.reply(error);
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