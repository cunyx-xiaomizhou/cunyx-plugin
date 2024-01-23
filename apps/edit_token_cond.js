import plugin from './../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';
import YAML from 'yaml';
import fs from 'fs';
let data = YAML.parse(fs.readFileSync('./plugins/cunyx-plugin/config/cunyx_api.yaml','utf-8'));
export class edit_token_cond extends plugin {
  constructor () {
    super({
      name:"token状态管理",
      dsc:"封禁/解禁某人的寸幼萱token",
      event:"message",
      priority:-99999999,/*优先级*/
      rule:[
        {reg:"^#?寸幼萱封禁账号",fnc:"ban"},
        {reg:"^#?寸幼萱解禁账号",fnc:"lift"},
        {reg:"^#?寸幼萱封神账号",fnc:"oi"}
      ]
    });
  }
  async ban (e) {
    let qq = e.msg.replace(/寸幼萱封禁账号|#/g, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      if (qq=='') {
        qq=e.user_id;
      }
    }
    let json = await fetch(`http://api.cunyx.cn/mine/account?qq=${data.qq}&token=${data.api}&qid=${qq}&uid=${e.user_id}&type=1`);
    json = await json.json();
    var text = json;
    e.reply(text.msg);
  }
  async lift (e) {
    let qq = e.msg.replace(/寸幼萱解禁账号|#/g, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      if (qq=='') {
        qq=e.user_id;
      }
    }
    let json = await fetch(`http://api.cunyx.cn/mine/account?qq=${data.qq}&token=${data.api}&qid=${qq}&uid=${e.user_id}&type=2`);
    json = await json.json();
    var text = json;
    e.reply(text.msg);
  }
  async oi (e) {
    let qq = e.msg.replace(/寸幼萱封神账号|#/g, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      if (qq=='') {
        qq=e.user_id;
      }
    }
    let json = await fetch(`http://api.cunyx.cn/mine/account?qq=${data.qq}&token=${data.api}&qid=${qq}&uid=${e.user_id}&type=3`);
    json = await json.json();
    var text = json;
    e.reply(text.msg);
  }
}