import plugin from './../../../lib/plugins/plugin.js';
export class cunyx_fix extends plugin {
  constructor () {
    super({
      name:"[寸幼萱]开发测试",
      dsc:"你管我干嘛",
      event:"message",
      priority:1,/*优先级*/
      rule:[
        {reg:"^#?查看文件(.*)",fnc:"cx"}
      ]
    });
  }
  async cx (e) {
    if (!e.isMaster) {
      e.reply('你有毒吧，真以为自己挺有能耐啊？',true);
      return false;
    }
    try {
      let path = e.msg.replace(/查看文件|#/g,'');
      e.reply(path,true);
      e.reply(fs.readFile(process.cwd()+'/'+path),true);
    } catch (err) {
      e.reply('未找到该文件');
    }
  }
}