/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */
import fs from 'fs';
let data = JSON.parse(fs.readFileSync('./package.json'));
export const helpCfg = {
  title: '寸幼萱帮助',
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
    group: 'cunyx插件功能',
    list: [
      {
        icon: 1,
        title: '寸幼萱api',
        desc: '查看token剩余可用次数'
      },
      {
        icon: 2,
        title: '#寸幼萱检查更新',
        desc: '检查寸幼萱插件是否有新版本'
      },
      {
        icon: 3,
        title: '#寸幼萱强制更新',
        desc: '强制更新寸幼萱插件'
      },
      {
        icon: 4,
        title: '#ai+对话内容',
        desc: '调用寸幼萱api进行对话'
      },
      {
        icon: 5,
        title: '#加密',
        desc: '使用key对字符串进行加密'
      },
      {
        icon: 6,
        title: '#解密',
        desc: '使用key对密文进行解密'
      },
      {
        icon: 7,
        title: '#土味情话[@群友]',
        desc: '对指定群友发送肉麻消息'
      },
      {
        icon: 8,
        title: '#后缀名',
        desc: '生成带后缀的名字'
      },
      {
        icon: 9,
        title: '#发邮件 收件人:邮件主题:邮件内容',
        desc: '可以给指定邮箱发送邮件'
      },
      {
        icon: 10,
        title: '#ikun',
        desc: '生成专属ikun身份证'
      },
      {
        icon: 11,
        title: '#提交信息',
        desc: '将自己的信息上传至云端'
      },
      {
        icon: 12,
        title: '#获取信息',
        desc: '获取云端用户主动上传的信息'
      },
      {
        icon: 13,
        title: '#前瞻',
        desc: '获取本期《原神》前瞻直播主要内容'
      },
      {
        icon: 14,
        title: '#兑换码',
        desc: '获取本期《原神》前瞻直播兑换码'
      },
      {
        icon: 15,
        title: '#星铁前瞻',
        desc: '获取本期《星穹铁道》前瞻直播兑换码'
      },
      {
        icon: 16,
        title: '#星铁兑换码',
        desc: '获取本期《星穹铁道》前瞻主要内容'
      },
      {
        icon: 17,
        title: '#身份证核验+数字',
        desc: '判断一串数字是否为身份证号\n不需要token'
      },
      {
        icon: 18,
        title: '#生成二维码+内容',
        desc: '将内容生成为二维码；QQ如果想要识别二维码，要求生成内容必须为`http`或`https`开头的链接，否则无法识别\n不需要token'
      },
      {
        icon: 19,
        title: '#encode+转换内容',
        desc: '将一串字符串转码encode格式\n不需要token'
      },
      {
        icon: 20,
        title: '#解析encode+解析内容',
        desc: '把一串encode编码还原至明文\n不需要token'
      },
      {
        icon: 21,
        title: '#随机小米粥',
        desc: '获取小米粥表情包'
      },
      {
        icon: 22,
        title: '#随机寸幼萱',
        desc: '获取cunyx表情包'
      },
      {
        icon: 23,
        title: '#寸幼萱用户协议',
        desc: '查看寸幼萱用户协议'
      },
      {
        icon: 24,
        title: '#寸幼萱帮助',
        desc: '寸幼萱帮助功能，让你更快上手寸幼萱插件'
      }
    ]
  },
  {
    group: 'cunyx淫趴功能',
    list: [
      {
        icon: 25,
        title: '#xxx',
        desc: '哼哼，当个老年人不香吗\n付费额度: 1'
      }
    ]
  }
]

export const isSys = true
