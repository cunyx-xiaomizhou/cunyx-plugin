import plugin from './../../../lib/plugins/plugin.js';
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
}