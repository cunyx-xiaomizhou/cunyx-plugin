/*
    跑路啦 跑路啦 有缘再见！
        
import plugin from '../../../lib/plugins/plugin.js';
export class Pictures extends plugin {

  constructor() {
    super({
      name: "寸幼萱插件:随机图片",
      dsc: "随机从API中抽取一张图片",
      event: "message", 
      priority: 1, // 优先级
      rule: [
        {
          reg: "^#?随机(爱坤|ikun|坤图)|小黑子$",
          fnc: "ikun",
        },
        {
          reg: "^#?(op|原批|玩原神玩的)$",
          fnc: "op",
        },
        {
          reg: "^#?随机原神(表情包|小表情|表情)$",
          fnc: "Genshin",
        },
        {
          reg: "^#?随机(纳西妲表情包|纳西妲)$",
          fnc: "Nahida",
        },
        {
          reg: "^#?随机(白圣女|圣女|塞西莉亚|Cecilia|cecilia)$",
          fnc: "Cecilia",
        },
        {
          reg: "^#?随机真寻(表情包)?$",
          fnc: "zhenxun",
        },
        {
          reg: "^#?(全彩|动漫)?白圣女表情包$",
          fnc: "Cecilia_Anime",
        },
        {
          reg: "^#?随机甘城(猫猫)?(表情包)?$",
          fnc: "gancheng",
        },
        {
          reg: "^#?随机(诺诺|兔兔|宇佐纪诺诺|usagi)(表情包)?$",
          fnc: "usagi",
        },
        {
          reg: "^#?随机柴郡(猫猫)?(表情包)?$",
          fnc: "Cheshire",
        },
        {
          reg: "^#?随机(珊瑚宫)?心海(表情包)?$",
          fnc: "kokomi",
        },
        {
          reg: "^#?随机滑稽(表情包)?$",
          fnc: "funny",
        },
        {
          reg: "^#?(一眼|一言|随机)(丁真|顶针)$",
          fnc: "Tenzin",
        },
        {
          reg: "^#?随机?(龙|l|L)(图|t|T)$",
          fnc: "longtu",
        },
        {
          reg: "^#?随机(小鲨鱼)?古拉(表情包)?$",
          fnc: "Gura",
        },
        {
          reg: "^#?随机星铁(表情包)?$",
          fnc: "sr",
        },
        {
          reg: "^#?随机散兵(表情包)?$",
          fnc: "Balladeer",
        },
        {
          reg: "^#?随机阿妮亚(表情包)?$",
          fnc: "Anya",
        },
        {
          reg: "^#?随机晓山瑞希(表情包)?$",
          fnc: "Mizuki",
        },
        {
          reg: "^#?随机(崩三|崩坏3|崩3|三蹦子)(表情包)?$",
          fnc: "Honkai3",
        },
        {
          reg: "^#?随机真白花音(表情包)?$",
          fnc: "Mashiro",
        },
        {
          reg: "^#?随机(永雏)?菲塔(表情包)?$",
          fnc: "Taffy",
        },
        {
          reg: "^#?随机(蜜汁)?(工坊)?(小C|小c)(表情包)?$",
          fnc: "c",
        },
      ],
    });
  }

  // ikun坤图
  async ikun(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/ikun`))
    return true
    }
  // 原神怎么你了
  async op(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/op`))
    return true
    }
  // 随机原神表情包
  async Genshin(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Genshin`))
    return true
    }
  // 纳西妲表情包
    async Nahida(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Nahida`))
    return true
    }
  // 白圣女
    async Cecilia(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Cecilia`))
    return true
    }
  // 真寻
    async zhenxun(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/zhenxun`))
    return true
    }
  // 彩色白圣女
    async Cecilia_Anime(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Cecilia_Anime`))
    return true
    }
    // 甘城猫猫
    async gancheng(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Natsuki`))
    return true
    }
    // 宇佐紀ノノ_usagi
    async usagi(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/usagi`))
    return true
    }
    // 柴郡猫
    async Cheshire(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Cheshire`))
    return true
    }
    // 珊瑚宫心海
    async kokomi(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Kokomi`))
    return true
    }
    // 滑稽图
    async funny(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/funny`))
    return true
    }
    // 一眼丁真
    async Tenzin(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Tenzin`))
    return true
    }
    // 龙图
    async longtu(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/long`))
    return true
    }
    // 古拉
    async Gura(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Gura`))
    return true
    }
    // 星铁
    async sr(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/sr`))
    return true
    }
    // 散兵
    async Balladeer(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Balladeer`))
    return true
    }
    // 阿妮亚
    async Anya(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Anya`))
    return true
    }
    // 晓山瑞希
    async Mizuki(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Mizuki`))
    return true
    }
    // 崩三
    async Honkai3(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Honkai3`))
    return true
    }
    // 真白花音
    async Mashiro(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Mashiro`))
    return true
    }
    // 永雏菲塔
    async Taffy(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/Taffy`))
    return true
    }
    // 小c
    async c(e) {
    this.e.reply(segment.image(`http://api.dengfenglai.cloud/c`))
    return true
    }
}

*/