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
        title: '寸幼萱api',
        desc: '查看token剩余可用次数'
      }
    ]
  },
  {
    group: '寸幼萱管理设置',
    list: [
      {
        icon: 2,
        title: '#测试',
        desc: '。。。。'
      }
    ]
  }
]

export const isSys = true
