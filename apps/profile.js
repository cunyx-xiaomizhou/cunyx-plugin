import YAML from 'yaml';
import fs from 'fs';
import fetch from 'node-fetch';
import plugin from './../../../lib/plugins/plugin.js';
import { getTargetUid } from './../../miao-plugin/apps/profile/ProfileCommon.js';
let data = YAML.parse(fs.readFileSync('./plugins/cunyx-plugin/config/cunyx_api.yaml','utf-8'));
let qq;
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
    let uid = e.msg.replace(/(原神)?信息|#/g, '').trim();
    if (uid == '') {
      qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      if (qq=='') {
        qq = e.user_id;
      }
      e.user_id = qq;
      uid = await getTargetUid(e);
    }
    try {
      let url;
      try {
        url = `https://${data.domain}/api/api/profile?ys&qq=${data.qq}&token=${data.api}&uid=${uid}`
      } catch (err) {
        url = `https://api.cunyx.cn/api/api/profile?ys&qq=${data.qq}&token=${data.api}&uid=${uid}`
      }
      let json = await fetch(url);
      json = await json.json();
      var Json = json;
      if (Json.code==200) {
        e.reply('成功')
      } else {
        e.reply(Json.msg);
      }
    } catch (err) {
        e.reply('喜报喜报！作者服务器被打死了！\n详情请加群：786034611咨询');
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