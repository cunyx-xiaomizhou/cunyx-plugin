/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */
import fs from 'fs';
let data = JSON.parse(fs.readFileSync('./package.json'));
export const helpCfg = {
  title: '寸幼萱插件帮助',
  subTitle: data.name + ' && cunyx-plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 4,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
  {
    group: '插件功能',
    list: [
      {
        icon: 1,
        title: '随机cos图',
        desc: '来一张三次元动漫图片'
      },
      {
        icon: 4,
        title: '答案之书',
        desc: '我想的问题可以实现吗？'
      },
      {
        icon: 6,
        title: '原神壁纸',
        desc: '来一张帅气的原神壁纸吧'
      },
      {
        icon: 9,
        title: '随机美图',
        desc:'劳累了一天，还是歇一歇眼睛吧'
      },
      {
        icon: 10,
        title: '随机动漫图',
        desc: '主人要换一个动漫头像嘛？'
      },
      {
        icon: 11,
        title: '买家秀',
        desc: '来看看淘宝上的买家秀吧！'
      },
      {
          icon: 12,
          title: '疯狂星期四',
          desc: '再试试，一定会有人V你50的'
      },
      {
        icon: 13,
        title: '发癫[神里绫华]',
        desc: '啊啊啊！我是神里绫华的狗！'
      },
      {
        icon: 14,
        title: '看看腿',
        desc: '麻溜滴，把你的腿子给俺看看'
      },
      {
        icon: 19,
        title: '随机柴郡',
        desc: '今天也是看猫猫的一天呢'
      },
      {
        icon: 20,
        title: '随机丁真',
        desc: '一眼丁真，鉴定为....'
      },
      {
        icon: 21,
        title: '随机涩图',
        desc: '我哪知道，妈妈告诉我这个功能不能用'
      }
    ]
  },
  {
    group: '刷步功能',
    list: [
      {
        icon: 15,
        title: '#步数帮助',
        desc: '查看刷步帮助文档'
      },
      {
        icon: 16,
        title: '#绑定zepp账号[账号]',
        desc: '绑定一个zepp账号用来刷步'
      },
      {
        icon: 17,
        title: '#设置zepp密码[密码]',
        desc: '设置对应账号的正确密码'
      },
      {
        icon: 18,
        title: '#刷步[步数]',
        desc: '开始刷取步数'
      }
    ]
  },
  {
    group: '加强版功能(一般人我都不告诉TA)',
    auth: 'master',
    list: [
      {
        icon: 7,
        title: 'p站',
        desc: '来一张p站的涩图'
      },
      {
        icon: 8,
        title: 'p站r18',
        desc: '来一张p站的涩图(漏点,慎重使用)'
      }
    ]
  },
  {
    group: '寸幼萱管理设置',
    auth: 'master',
    list: [
      {
        icon: 2,
        title: '#寸幼萱API',
        desc: '查看API剩余次数'
      },
      {
        icon: 3,
        title: '#寸幼萱兑换码',
        desc: '为你的token使用兑换码增加额度'
      },
      {
        icon: 5,
        title: '#寸幼萱(强制)更新',
        desc: '更新本插件，使用更多功能'
      }
    ]
  }
]

export const isSys = true
