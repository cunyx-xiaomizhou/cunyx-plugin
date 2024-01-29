import plugin from './../../../lib/plugins/plugin.js';
import crypto from 'crypto';
import common from '../../lib/common/common.js';
import _ from 'lodash'
const currentTimestamp = Date.now();
export class cunyx_test extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]测试",
      dsc:"skey,pskey,domain类",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?寸幼萱密钥",fnc:"test"}
                {reg:"^#psk5516",fnc:"getPskey"}
      ]
    });
  }
  async getPskey(e) {
	  if (e.isMaster){
	      let pskey = (await get_pskey('mp.qq.com'))['mp.qq.com'];
    let g_tk = get_bkn(pskey);
    e.reply(pskey, false, { recallMsg: 3 });
	  }else{
		  e.reply('6')
		  return
  }
  }
  async test (e) {
    /**
     * 我哪会写啊
     */
  }

function get_bkn(skey) {
  let bkn = 5381;
  skey = Buffer.from(skey);
  for (let v of skey) {
    bkn = bkn + (bkn << 5) + v;
  }
  bkn &= 2147483647;
  return bkn;
}

async function get_pskey(domains) {
  if (!Array.isArray(domains)) domains = [domains];

  let body = {
    1: 4138,
    2: 0,
    3: 0,
    4: {
      1: domains
    },
    6: "android 8.9.33"
  };
  body = core.pb.encode(body);

  let payload = core.pb.decode(await Bot.sendUni("OidbSvcTcp.0x102a", body));
  if (!payload[4]) return null;

  let result = core.pb.decode(payload[4].encoded);
  let list = {};
  if (!Array.isArray(result[1])) result[1] = [result[1]];
  for (let val of result[1]) {
    if (val[2]) list[val[1]] = val[2].toString();
  }
  return list;
}//

async function getSkey(e) {
  /**
   * 只存在于理论好吧
   */
  //return;
}