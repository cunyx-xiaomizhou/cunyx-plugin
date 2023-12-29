import plugin from './../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';
import YAML from 'yaml';
import fs from 'fs';

let data = YAML.parse(fs.readFileSync('./plugins/cunyx-plugin/config/cunyx_api.yaml','utf-8'));

export class cunyx_cdkey extends plugin {
  constructor () {
    super({
      name:"寸幼萱兑换码",
      dsc:"使用兑换码对寸幼萱token进行充值",
      event:"message",
      priority:-99999999999999,/*优先级*/
      rule:[
        {reg:"^#?(寸幼萱|(c|C)(u|U)?(n|N)?(y|Y)(x|X))兑换(码)?(.*)",fnc:"cdkey",}
      ]
    });
  }
  async cdkey (e) {
    if (!e.isMaster) {
      e.reply('只有主人才能使用兑换码哦~');
      return true;
    }
    let cdkey = e.msg.replace(/(寸幼萱|(c|C)(u|U)?(n|N)?(y|Y)(x|X))兑换(码)?|#/g, '').trim();
    let json = await fetch(`http://api.cunyx.cn/Yunzai-Bot/cdkey.php?qq=${data.qq}&token=${data.api}&cdkey=${cdkey}`);
    json = await json.json();
    var text = json;
    e.reply(text.msg);
  }
}