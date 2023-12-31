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
