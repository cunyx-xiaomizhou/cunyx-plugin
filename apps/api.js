import plugin from './../../../lib/plugins/plugin.js';
import fetch from 'node-fetch';
import yaml from 'yaml';
import YamlReader from '../components/YamlReader.js';
let data = new YamlReader('./plugins/cunyx-plugin/config/cunyx_api.yaml').jsonData
let bk = yaml.parse(fs.readFileSync('./plugins/cunyx-plugin/config/BlackQQ.yaml', 'utf8'))
const baseUrl = "https://api.cunyx.cn/api/api/"

const urlMap = (type, data) => {
    const Url = {
        //pixiv图片
        'pixiv': {
            reg: '^#?p站$',
            url: 'pixiv',//基础url后面的不同url
            type: 'image',//返回的数据类型,
            msg: [`标题:${data?.title}\n`, `作者:${data?.author}\n`, `标签：${data?.tags?.join('、')}`, segment.image(data?.url)]
        },
        //pixivr18图片
        'pixiv_r18': {
            reg: '^#?p站r18$',
            url: 'pixiv_r18',//基础url后面的不同url
            type: 'image',//返回的数据类型
            msg: [`标题:${data?.title}\n`, `作者:${data?.author}\n`, `标签：${data?.tags?.join('、')}`, segment.image(data?.url)]
        },
        //答案之书
        'answer': {
            reg: '^#?答案之书',
            url: 'answer',//基础url后面的不同url
            type: 'text',//返回的数据类型,
            msg: [data?.zh, data?.en]//要返回参数类型消息时填写
        },
        //原神壁纸
        'genshin_wp': {
            reg: '^#?原神壁纸$',
            url: 'genshin_wp',//基础url后面的不同url
            type: 'image'//返回的数据类型
        },
        //看看腿
        'lookleg': {
            reg: '^#?看看腿$',
            url: 'lookleg',//基础url后面的不同url
            type: 'image'//返回的数据类型
        },
        //疯狂星期四
        'crazy_thursday': {
            reg: '^#?疯狂星期四$',
            url: 'crazy_thursday',//基础url后面的不同url
            type: 'text'//返回的数据类型
        },
        //qq域名检测
        'qq_domain': {
            reg: '^#?qq域名检测',
            url: `qq_domain?url=`,//基础url后面的不同url
            type: 'text',//返回的数据类型
            replaceText: 'qq域名检测'//需要参数时要去除的文本
        },
        //手机归属地查询
        'phone': {
            reg: '^#?手机归属地查询',
            url: `phone?num=`,//基础url后面的不同url
            type: 'text',//返回的数据类型
            replaceText: '手机归属地查询'//需要参数时要去除的文本
        },
        //随机美图
        'beauty': {
            reg: '^#?随机美图$',
            url: `beauty`,//基础url后面的不同url
            type: 'image',//返回的数据类型
        },
        //随机cos图
        'cos': {
            reg: '^#?随机cos图$',
            url: `cos`,//基础url后面的不同url
            type: 'image',//返回的数据类型
        },
        //淘宝买家秀
        'buyer_show': {
            reg: '^#?买家秀$',
            url: `buyer_show`,//基础url后面的不同url
            type: 'image',//返回的数据类型
        },
        //随机动漫图
        'acg_img': {
            reg: '^#?随机动漫图$',
            url: `acg_img`,//基础url后面的不同url
            type: 'image',//返回的数据类型
        },
        //发癫
        'attack': {
            reg: '^#?发癫',
            url: `attack?name=`,//基础url后面的不同url
            type: 'text',//返回的数据类型
            replaceText: '发癫'
        },
        //随机柴郡
        'cj': {
            reg: '^#?随机柴郡(猫)?$',
            url: 'cj',
            type: 'image'
        },
        //随机丁真
        'dz': {
          reg: '^#?随机丁真$',
          url: 'dz',
          type: 'image'
        },
        //随机涩图
        'setu': {
          reg: '^#?随机(涩|色)图$',
          url: 'setu',
          type: 'image'
        }
    }
    return type ? Url[type] : Url
}
const Url = urlMap()
export class Api extends plugin {
    constructor() {
        super({
            name: "寸幼萱api",
            dsc: "寸幼萱api",
            event: "message",
            priority: 500,/*优先级*/
            rule: [
                {
                    reg: Object.keys(Url).map(item => Url[item].reg).join('|'),
                    fnc: "api"
                }
            ]
        });
    }
    async api(e) {
if ((bk.blackGroup && bk.blackGroup.includes(e.group_id)) || (bk.blackQQ && bk.blackQQ.includes(e.user_id))) {
    return false;
}


        if (!data.api || !data.qq) {
            return e.reply(`还没有填写${data.api ? 'qq' : 'token'},请先填写${data.api ? 'qq' : 'token'}`);
        }
        let type = Object.keys(Url).find(item => new RegExp(Url[item].reg).test(e.msg))
        let param;
        if (Url[type].replaceText) {
            param = e.msg.replace(Url[type].replaceText, "")
        }
        let url = urlMap(type);
        let rsp;
        try {
            rsp = await fetch(`https://${data.domain}/api/api/${url.url}${param ? param + "&" : "?"}qq=${data.qq}&token=${data.api}`);
        } catch (err) {
            rsp = await fetch(`${baseUrl}${url.url}${param ? param + "&" : "?"}qq=${data.qq}&token=${data.api}`);
        }
        let json = await rsp.json();
        if (json.code != 200) {
            return e.reply(json.msg);
        }
        if (url.msg) {
            return e.reply(urlMap(type, json.data).msg);
        }
        if (url.type == 'image') {
            return e.reply(segment.image(json.data.url))
        } else {
            return e.reply(json.data.message)
        }
    }

}

