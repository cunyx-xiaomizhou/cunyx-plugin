import YAML from 'yaml';
import fs from 'fs';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
let data = YAML.parse(fs.readFileSync('./plugins/cunyx-plugin/config/cunyx_api.yaml','utf-8'));
export class cunyx_msg extends plugin {
  constructor () {
    super({
      name:"原神星铁信息",
      dsc:"获取原神星铁的基本信息",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?(原神)?信息",fnc:"gs"}
      ]
    });
  }
  async gs (e) {
    let qq = e.msg.replace(/(原神)?信息|#/g, '').trim();
    if (qq=='') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      if (qq=='') {
        qq=e.user_id;
      }
    }
    try {
      //
    } catch (err) {
        //
    }
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