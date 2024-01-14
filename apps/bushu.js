import plugin from './../../../lib/plugins/plugin.js';
export class cunyx_bushu extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]刷步",
      dsc:"刷取微信/支付宝步数",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?(寸幼萱)?(步数|刷步)帮助",fnc:"help"}
      ]
    });
  }
  async help (e) {
    e.reply('点击链接查看刷步教程：\nhttps://mp.qq.com/s/我文章没写呢，着急有屁用？',true);
    return true;
  } 
}