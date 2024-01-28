import plugin from './../../../lib/plugins/plugin.js';
export class cunyx_test extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]测试",
      dsc:"skey,pskey,domain类",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?寸幼萱密钥",fnc:"test"}
      ]
    });
  }
  async test (e) {
    /**
     * 我哪会写啊
     */
  }
}
async function getSkey(e) {
  /**
   * 只存在于理论好吧
   */
  //return;
}