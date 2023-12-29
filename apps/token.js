 import plugin from '../../../lib/plugins/plugin.js';
 import fetch from 'node-fetch';
 import YAML from 'yaml';
 import fs from 'fs';
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
        {reg:"^#?(.*)?(寸幼萱|(c|C)(u|U)?(n|N)?(y|Y)(x|X))(t|T|a|A)(.*)?$",
          fnc:"api",},
        {reg:"^#?寸幼萱查看当前绑定",fnc:"ck"}
      ]
    });
  }
  /*命令执行*/
  async api (e) {
    let json = await fetch(`http://api.cunyx.cn/Yunzai-Bot/chakantoken.php?qq=${data.qq}&token=${data.api}`);
    json = await json.json();
    var text = json;
    if (e.isMaster || e.user_id=='2996849867') {
      if (text.msg!==/^\d/) {
        e.reply(`QQ号${data.qq}的查询结果：\n\n剩余免费次数：${text.msg.times}\n剩余付费次数：${text.msg.pay_tk}\n账号状态：${text.msg.cond}\n\n提示：可用【#兑换免费额度 + [花费付费额度]】指令将付费额度兑换为免费额度，付费额度兑换为免费额度比率为1:3`);
      } else {
        e.reply(`token查询时出现错误：\n\n${text.msg}`);
      }
    } else {
      e.reply('求求你做点人事吧，你也配命令我？');
    }
  }
  async ck (e) {
    e.reply('当前绑定QQ为：'+data.qq);
  }
}