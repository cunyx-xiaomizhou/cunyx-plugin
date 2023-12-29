import plugin from './../../../lib/plugins/plugin.js';
import { segment } from 'icqq';
import YAML from 'yaml';
import fs from 'fs';

let cond;
let qq;
let data_json;
let path = process.cwd()+'/plugins/cunyx-plugin';

let yaml = YAML.parse(fs.readFileSync('./plugins/cunyx-plugin/config/impact.yaml','utf-8'));

export class cunyx_impact extends plugin {
  constructor () {
    super({
      name:"寸幼萱QQ淫趴",
      dsc:"寸幼萱QQ群淫趴小游戏",
      event:"message",
      priority:1,/*优先级（搞不懂为什么能和土块的串命令）*/
      rule:[
        {reg:"^#?(淫|银|阴)(趴|扒|啪|爬)初始化",fnc:"int"},
        {reg:"^#?开启(淫|银|阴)(趴|扒|啪|爬)",fnc:"start"},
        {reg:"^#?关闭(淫|银|阴)(趴|扒|啪|爬)",fnc:"close"},
        {reg:"^#?(淫|银|阴)(趴|扒|啪|爬|)状态",fnc:"cond"},
        {reg:"^#?(重置|初始化)(淫|银|阴)(趴|扒|啪|爬)(控|配)(置|制)(面板)?",fnc:"reset"},
        {reg:"^#?(创建|生成)(牛|鸡|坤|j|J)(牛|子|坤|八|巴|8|鸡)",fnc:"append"},
        {reg:"^#?(导管子|打胶|开导)$",fnc:"daoguanzi"},
        {reg:"^#?(日|透)(群友)",fnc:"fuck"},
        {reg:"^#?(决斗|对决|击剑)",fnc:"juedou"},
        {reg:"^#?(重置|初始化)(牛|鸡|坤|j|J)(牛|子|坤|八|巴|8|鸡)",fnc:"restart"},
        {reg:"^#?查(看|询)(牛|鸡|坤|j|J)(牛|子|坤|八|巴|8|鸡)",fnc:"seek"}
      ]
    });
  }
  async int (e) {
    if (e.group_id) {
      if (e.isMaster) {
        try {
          fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`);
        } catch (err) {
          fs.writeFile(process.cwd()+'/plugins/cunyx-plugin/data/impact/'+e.group_id+'.json', '{"cond":"0","data":{}}', function (err) {
          if (err) throw err;
            e.reply(`QQ群${e.group_id}淫趴初始化完成~`);
          });
          return true;
        }
        e.reply('本群淫趴已经初始化了，可以涩涩了~');
      } else {
        e.reply('只有我的主人才能初始化本群淫趴文件');
      }
    } else {
      e.reply('该功能只能在群聊使用');
    }
  }
  async cond (e) {
    if (!e.group_id) {
      if (e.isMaster) {
        let group_id = e.msg.replace(/(淫|银|阴)(趴|扒|啪|爬)状态|#/g, '').trim();
        try {
          fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${group_id}.json`);
        } catch (err) {
          cond = '未初始化';
        }
        let data_json = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
        if (data_json.cond == '0') {
          cond = '关闭';
        }
        if (data_json.cond == '1') {
          cond = '开启';
        }
        if (data_json.cond !== '0' && data_json.cond !== '1') {
          cond = '未知';
        }
        e.reply(`群聊${group_id}淫趴开启状态为：${cond}`);
      } else {
        e.reply('该功能只能在群聊中使用');
      }
      return true;
    }
    try {
      fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`);
    } catch (err) {
      e.reply('本群还没有淫趴文件，请本群的狗管理或机器人主人发送【#淫趴初始化】来创建淫趴文件');
    }
    let data_json = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
    if (data_json.cond=='0') {
      e.reply('本群未开启淫趴功能，请本群的狗管理或机器人主人发送【#开启淫趴】指令开启本群淫趴！');
      return true;
    }
    if (data_json.cond=='1') {
      e.reply('本群已开启淫趴，若想关闭，请本群的狗管理或机器人主人发送【#关闭淫趴】指令来关闭淫趴（为什么要关闭，给我涩涩！）');
      return true;
    }
    if (data_json.cond!=='0' && data_json.cond!=='1') {
      e.reply('我的主人乱改我的代码，我也不知道开没开启');
      return true;
    }
  }
  async start (e) {
    if (e.group_id) {
      if (e.isMaster || e.member.is_owner || e.member.is_admin ) {
        let json = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
        json.cond = '1';
        fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(json), (err) => {
            if (err) throw err;
            e.reply('恭喜本群成功开启淫趴了哦~\n快和群友淫乱起来吧~');
        });
      } else {
          e.reply('你没有权限更改本群淫趴状态！');
      }
    } else {
      e.reply('该功能只能在群聊中使用哦~');
    }
  }
  async close (e) {
    if (e.isMaster || e.member.is_owner || e.member.is_admin) {
      try {
        let data_json = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
        if (data_json.cond=='0') {
          e.reply('笨蛋！本群本来就没有开启淫趴！你让我怎么关闭！快去开启，给我涩涩！');
          return true;
        }
        data_json.cond = '0';
        try {
          fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(data_json), (err) => {
            e.reply('唔，本群淫趴被关闭了。不能涩涩惹......\n为什么不涩涩！给我【#开启淫趴】！');
          });
        } catch (err) {
          e.reply('关闭失败了，给我涩涩！.....');
        }
      } catch (err) {
        e.reply('本群还没有淫趴文件，快发送【#淫趴初始化】来创建淫趴文件');
      }
    } else {
      e.reply('你没有权限更改本群淫趴状态，快去找管理！狗管理，我要涩涩！');
    }
  }
  async append (e) {
    try {
      let yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
    } catch (err) {
      e.reply('本群还没有淫趴文件，请发送【#淫趴初始化】来创建淫趴文件');
      return true;
    }
    let yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
    if (yp_cond.cond=='1') {
      try {
        if (yp_cond.data[e.user_id].long) {
          e.reply('你的牛牛都'+yp_cond.data[e.user_id].long+'厘米了，你想成为2个牛牛的怪物吗？');
        }
      } catch (err) {
        let new_yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
        new_yp_cond.data[e.user_id]={"long":yaml.long,"inject":0,"be_inject":0,"cd_daoguan":Date.now(),"cd_suoniuzi":Date.now(),"cd_riqunyou":Date.now(),"cd_juedou":Date.now()};
        fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(new_yp_cond), (err) => {
          if (err) throw err;
          e.reply(`恭喜你长出了一根长度为${yaml.long}cm的牛牛`);
        });
      }
    } else {
      e.reply('本群没有开启淫趴，请本群的狗管理或者机器人主人发送【#开启淫趴】开启本群淫趴');
    }
  }
  async seek (e) {
    try {
      let yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
      if (yp_cond.cond=='0') {
        e.reply('本群没有开启淫趴，请狗管理或主人发送【#开启淫趴】指令开启本群淫趴');
        return true;
      }
      if (!e.group_id) {
        e.reply('请在群聊使用本功能');
        return true;
      }
      try {
        let qq = e.msg.replace(/查(看|询)(牛|鸡|坤|j|J)(牛|子|坤|八|巴|8|鸡)|#/g, '').trim();
        if (qq=='') {
          qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
          if (qq=='') {
            qq=e.user_id;
          }
        }
        var res_yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
        e.reply('查询结果：\n牛牛长度：'+res_yp_cond.data[qq].long+'cm\n注射总量：'+res_yp_cond.data[qq].inject+'ml\n共被注射：'+res_yp_cond.data[qq].be_inject+'ml，真是一群变态');
      } catch (err) {
        let qq = e.msg.replace(/查(看|询)(牛|鸡|坤|j|J)(牛|子|坤|八|巴|8|鸡)|#/g, '').trim();
        if (qq=='') {
          qq = e.message.filter(item => item.type == 'at')?.map(item =>  item?.qq);
            if (qq=='') {
              qq=e.user_id;
            }
        }
        e.reply(`@${qq} 连牛牛都没有，快发送【#创建牛牛】来创建一个吧~（你个没有牛牛的废材！）`);
      }
    } catch (err) {
      e.reply('本群还没有淫趴文件，请发送【#淫趴初始化】来创建淫趴文件');
    }
  }
  async reset (e) {
    if (e.isMaster) {
      fs.copyFileSync(path+'/def_config/impact.yaml', path+'/config/impact.yaml');
      e.reply('淫趴控制面板已完成重置');
    } else {
      e.reply('呸！hentai！呵忒！');
    }
  }
  async daoguanzi (e) {
    try {
      let qq = e.msg.replace(/(导管子|打胶|开导)|#/g, '').trim();
      if (qq=='') {
        qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
        if (qq=='') {
          qq=e.user_id;
        }
      }
      let yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
      if (!e.group_id) {
        e.reply('该功能只能在群聊中使用哦~');
        return true;
      }
      if (yp_cond.cond == '0') {
        e.reply('本群没有开启淫趴，请本群的狗管理或机器人主人发送【#开启淫趴】指令开启本群淫趴吧~');
        return true;
      }
      try {
        try {
          if (yp_cond.data[e.user_id].cd_daoguan > Date.now()) {
            let time = yp_cond.data[qq].cd_daoguan - Date.now();
            let times = time / 1000;
            e.reply(`你已经软了，导不动了，距离你恢复还有${times}秒`);
          } else {
            let time = yaml.cd_daoguan * 1000;
            let times = Date.now() + time;
            yp_cond.data[e.user_id].cd_daoguan = times;
            let new_long_xiaoshu = Math.floor(Math.random() * 1000) / 1000;
            let cheng = yaml.daoguan_height - yaml.daoguan_low;
            let new_long_zhengshu = Math.floor(Math.random() * cheng + yaml.daoguan_low);
            let new_long = Number(new_long_zhengshu) + Number(new_long_xiaoshu);
            let write_long = yp_cond.data[qq].long + new_long;
            yp_cond.data[qq].long = write_long;
            fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(yp_cond), (err) => {
              if (err) throw err;
                if (qq == e.user_id) {
                  let msg = [
                    "导管成功了，你的牛牛很满意~\n牛牛努力生长了"+new_long+"cm\n你的牛牛一共有"+write_long+"cm了",
                    segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${e.user_id}`)
                  ];
                  e.reply(msg);
                } else {
                  let msg = [
                  "导管成功了，ta的牛牛很满意~\n牛牛努力生长了"+new_long-"cm\nta的牛牛现在一共有"-write_long+"cm了",
                  segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${qq}`)
                  ];
                  e.reply(msg);
                }
            });
          }
        } catch (err) {
          e.reply('你或者对方有一个没有牛牛，快发送【#创建牛牛】来创建一个吧');
        }
      } catch (err) {
        e.reply('你连牛牛都没有，不能帮别人导管子；\n快发送【#创建牛牛】来创建一个吧~');
      }
    } catch (err) {
      e.reply('本群还没有淫趴文件，快发送【#淫趴初始化】来创建淫趴文件吧~');
    }
  }
  async fuck (e) {
    if (!e.group_id) {
      e.reply('该功能只能在群聊中使用哦');
      return true;
    }
    try {
      let yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
      if (yp_cond.cond=='0') {
        e.reply('本群没有开启淫趴，快让狗管理或机器人主人发送【#开启淫趴】指令开启本群淫趴吧');
        return true;
      }
      let qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
      if (qq == '') {
        let qq = e.msg.replace(/(日|透)(群友)?|#/g,'').trim();
        qq = qq;
        if (qq !== /^\d/) {
          e.reply('你都不把你要日的人at出来，我该怎么知道你要日谁？！！');
          return true;
        }
      }
      if (qq == e.user_id) {
        e.reply('不能对着自己导');
        return true;
      }
      try {
        if (yp_cond.data[e.user_id].long < yaml.riqunyou_least) {
          let msg = [
            "你的牛牛太短了，只有"+yp_cond.data[e.user_id].long+"cm，小辣鸡！都没办法捅入ta！\n想要捅入ta，你至少需要"+yaml.riqunyou_least+"cm的牛牛。多去【#打胶】让你的牛牛变长！",
            segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${e.user_id}`),
            ];
            e.reply(msg);
          return true;
        }
        if (!yp_cond.data[qq]) {
          e.reply('对方连牛牛都没有，换个人撅吧');
          return true;
        }
        if (yp_cond.data[e.user_id].cd_riqunyou > Date.now()) {
          let time = yp_cond.data[e.user_id].cd_riqunyou - Date.now();
          let times = time / 1000;
          e.reply(`你已经被榨干了，软男！距离你恢复还有${times}秒`);
        } else {
          let time = yaml.cd_riqunyou * 1000;
          let times = Date.now() + time;
          yp_cond.data[e.user_id].cd_riqunyou = times;
          fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(yp_cond), (err) => {
            if (err) throw err;
            let die_niuzi_xiaoshu = Math.floor(Math.random() * 1000) / 1000;
            let die_niuzi_cheng = yaml.riqunyou_height - yaml.riqunyou_low;
            let die_niuzi_zhengshu = Math.floor(Math.random() * die_niuzi_cheng + yaml.riqunyou_low);
            let die_niuzi = Number(die_niuzi_zhengshu) + Number(die_niuzi_xiaoshu);
            yp_cond.data[e.user_id].long = yp_cond.data[e.user_id].long - die_niuzi;
            let zhushe_xiaoshu = Math.floor(Math.random() * 1000) / 1000;
            let zhushe_cheng = yaml.riqunyou_inject_height - yaml.riqunyou_inject_low;
            let zhushe_zhengshu = Math.floor(Math.random() * zhushe_cheng + yaml.riqunyou_inject_low);
            let zhushe = Number(zhushe_zhengshu) + Number(zhushe_xiaoshu);
            yp_cond.data[qq].be_inject = yp_cond.data[qq].be_inject +  zhushe;
            yp_cond.data[e.user_id].inject = yp_cond.data[e.user_id].inject + zhushe;
            fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(yp_cond), (err) => {
              if (err) throw err;
              let msg = [
                "卧槽，为什么这么紧，这家伙没少被透，好熟练，你的牛牛要被夹爆了！你损伤了"+die_niuzi+"cm牛子，给Ta注射了"+zhushe+"ml的脱氧核糖核酸~",
                segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${qq}`),
                ];
                e.reply(msg);
            });
          });
        }
      } catch (err) {
        e.reply('你都没有牛牛，搞啥呢？发送【#创建牛牛】去长一根吧');
      }
    } catch (err) {
      e.reply('本群还没有淫趴文件，快发送【#淫趴初始化】来创建淫趴文件吧~');
    }
  }
  async juedou (e) {
    if (yaml.cd_juedou == undefined) {
      e.reply('控制面板缺少决斗的数据项，该指令无法运行。\n\n请机器人主人将寸幼萱插件更新至最新版本后执行：\n【#重置淫趴配置面板】指令进行重置\n\n然后对机器人进行重启。\n\n请注意：该操作会使之前自定义的数据变为默认值，如果有需要，请重新对配置文件进行更改！');
      return true;
    } else {
      if (!e.group_id) {
        e.reply('该功能只能在群聊中使用哦');
        return true;
      }
      try {
        let yp_cond = JSON.parse(fs.readFileSync(`${path}/data/impact/${e.group_id}.json`));
        if (yp_cond.cond == '0') {
          e.reply('本群没有开启淫趴，快让机器人主人或者管理员发送【#开启淫趴】指令开启本群淫趴吧~');
          return true;
        }
        let qq = e.message.filter(item => item.type == 'at')?.map(item => item?.qq);
        if (qq == '') {
          let qq = e.msg.replace(/(决斗|对决|击剑)|#/g,'').trim();
          qq = qq;
          if (qq !== /^\d/) {
            e.reply('你都不把你要决斗的人at出来，我该怎么知道你要和谁一决天下？！！');
            return true;
          }
        }
        if (qq == e.user_id) {
          e.reply('不能跟自己击剑哦~');
          return true;
        }
        if (!yp_cond.data[qq]) {
          e.reply('对方连牛牛都没有，是个人妖，你怎么和ta决斗？');
          return true;
        }
        if (!yp_cond.data[e.user_id]) {
          e.reply('你都没有牛牛，搞啥呢？发送【#创建牛牛】去长一根吧');
          return true;
        }
        if (yp_cond.data[e.user_id].cd_juedou > Date.now()) {
          let time = yp_cond.data[e.user_id].cd_juedou - Date.now();
          let times = time / 1000;
          e.reply(`软男！你已经被榨干了，距离你恢复还有${times}秒`);
        } else {
          yp_cond.data[e.user_id].cd_juedou = Date.now() + yaml.cd_juedou * 1000 ;
          fs.writeFile(`${path}/data/impact/${e.group_id}.json`, JSON.stringify(yp_cond), (err) => {
            if (err) throw err;
            let user1 = Math.random();
            let user2 = Math.random();
            let win_niuzi_xiaoshu = Math.floor(Math.random() * 1000) / 1000;
            let win_niuzi_cheng = yaml.juedou_height - yaml.juedou_low;
            let win_niuzi_zhengshu = Math.floor(Math.random() * win_niuzi_cheng + yaml.juedou_low);
            let win_niuzi = Number(win_niuzi_zhengshu) + Number(win_niuzi_xiaoshu);
            let die_niuzi = win_niuzi * yaml.juedou_mult;
            let yp_cond = JSON.parse(fs.readFileSync(`${path}/data/impact/${e.group_id}.json`));
            if (user1 > user2) {
              yp_cond.data[e.user_id].long = yp_cond.data[e.user_id].long + win_niuzi;
              yp_cond.data[qq].long = yp_cond.data[qq].long - die_niuzi;
              let msg = [
                "对决成功了哦~\n你的牛牛增长了"+win_niuzi+"cm了，但是对方因为不堪受辱，牛牛缩小了"+die_niuzi+"cm\n你的牛牛现在是"+yp_cond.data[e.user_id].long+"cm",
                segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${qq}`)
              ];
              fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(yp_cond), (err) => {
                if (err) throw err;
                e.reply(msg);
              });
            } else {
              yp_cond.data[qq].long = yp_cond.data[qq].long + win_niuzi;
              yp_cond.data[e.user_id].long = yp_cond.data[e.user_id].long - die_niuzi;
              let msg = [
                "对决失败了，你个废材！\n你的牛牛不堪受辱缩小了"+die_niuzi+"cm了，但是对方洋洋得意，Ta的牛牛当着你的面增长了"+win_niuzi+"cm。\n你的牛牛现在是"+yp_cond.data[e.user_id].long+'cm',
                segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${qq}`)
              ];
              fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(yp_cond), (err) => {
                if (err) throw err;
                e.reply(msg);
              });
            }
          });
        }
      } catch (err) {
        e.reply('本群还没有淫趴文件，快发送【#淫趴初始化】来创建淫趴文件吧~');
      }
    }
  }
  async restart (e) {
    if (!e.group_id) {
      e.reply('该功能只能在群聊中使用哦');
      return true;
    }
    try {
      let yp_cond = JSON.parse(fs.readFileSync(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`));
      if (yp_cond.cond == '0') {
        e.reply('本群没有开启淫趴，快让机器人主人或狗管理发送【#开启淫趴】指令开启本群淫趴吧');
        return true;
      }
      yp_cond.data[e.user_id].long = yaml.long;
      fs.writeFile(`${process.cwd()}/plugins/cunyx-plugin/data/impact/${e.group_id}.json`, JSON.stringify(yp_cond),(err) => {
          if (err) throw err;
          let msg = [
            "你舍去了这根牛子，并用全身功力重新长了一根"+yaml.long+"cm的牛子",
            segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${e.user_id}`)
          ];
          e.reply(msg);
      });
    } catch (err) {
      e.reply('本群还没有淫趴文件，快发送【#淫趴初始化】来创建淫趴文件吧');
      return;
    }
  }
}
