import setting from './config/utils/setting.js'
import lodash from 'lodash'
import { pluginResources } from './config/utils/path.js'
import path from 'path'

// 支持锅巴
export function supportGuoba () {
  let allGroup = []
  Bot.gl.forEach((v, k) => { allGroup.push({ label: `${v.group_name}(${k})`, value: k }) })
  return {
    pluginInfo: {
      name: 'cunyx-plugin',
      title: '寸幼萱插件',
      author: '@最好喝的小米粥',
      authorLink: 'https://gitee.com/cunyx',
      link: 'https://gitee.com/cunyx/cunyx-plugin',
      isV3: true,
      isV2: false,
      description: '具体功能请见md中目前功能板块',
      icon: 'bi:box-seam',
      iconColor: '#7ed99e',
      iconPath: path.join(pluginResources, 'resources/help/theme/default/main.png')
    },
    // 配置项信息
    configInfo: {
      schemas: [{
      // ikun配置项信息
        component: 'Divider',
        label: 'ikun设置'
      },
      {
        field: 'ikun.nian_low',
        label: '最早出生日期(年)',
        bottomHelpMessage: '设置最早出生日期(年)',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'ikun.nian_height',
        label: '最晚出生日期(年)',
        bottomHelpMessage: '设置最晚出生日期(年)',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'ikun.yue_low',
        label: '最早出生日期(月)',
        bottomHelpMessage: '设置最早出生日期(月)',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 1,
          max: 12,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'ikun.yue_height',
        label: '最早出生日期(月)',
        bottomHelpMessage: '最早出生日期(月)',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 1,
          max: 12,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'ikun.ri_low',
        label: '最早出生日期(日)',
        bottomHelpMessage: '设置最早出生日期(日)',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 1,
          max: 31,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'ikun.ri_height',
        label: '最早晚生日期(日)',
        bottomHelpMessage: '设置最早晚生日期(日)',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 1,
          max: 31,
          placeholder: '请输入数字'
        }
      },
            // 淫趴配置项信息
      {
        component: 'Divider',
        label: '淫趴设置'
      },
      {
        field: 'impact.long',
        label: '牛牛默认值',
        bottomHelpMessage: '生成牛牛时的默认值（cm）',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: -99999,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.cd_daoguan',
        label: '导管冷却时间',
        bottomHelpMessage: '导管冷却时间（秒）',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 86400,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.daoguan_height',
        label: '导管牛牛增加长度',
        bottomHelpMessage: '最大值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.daoguan_low',
        label: '导管牛牛增加长度',
        bottomHelpMessage: '最小值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.cd_riqunyou',
        label: '日群友的冷却',
        bottomHelpMessage: '日群友的冷却',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 86400,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.riqunyou_least',
        label: '参与日群友的牛牛最低',
        bottomHelpMessage: '参与日群友的牛牛最低（cm）',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.riqunyou_height',
        label: '日群友后牛牛献祭长度',
        bottomHelpMessage: '最大值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.riqunyou_low',
        label: '日群友后牛牛献祭长度',
        bottomHelpMessage: '最小值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.riqunyou_inject_low',
        label: '日群友后注入的量',
        bottomHelpMessage: '最大值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.riqunyou_inject_height',
        label: '日群友后注入的量',
        bottomHelpMessage: '最小值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.cd_juedou',
        label: '决斗冷却时间',
        bottomHelpMessage: '决斗冷却时间（秒）',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.juedou_height',
        label: '日群友后注入的量',
        bottomHelpMessage: '最大值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.juedou_low',
        label: '日群友后注入的量',
        bottomHelpMessage: '最小值',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
      {
        field: 'impact.juedou_mult',
        label: '决斗失败者',
        bottomHelpMessage: '失去成功者失去牛牛的倍率',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 0,
          max: 99999,
          placeholder: '请输入数字'
        }
      },
          // 开关配置项信息
      {
        component: 'Divider',
        label: '功能开关'
      },
      {
        field: 'pwd.cond',
        label: '功能开关',
        bottomHelpMessage: '请选择是否开启',
        component: "Select",
        required: true,
          componentProps: {
            options: [
              { label: "开启", value: true },
              { label: "不开启", value: false },
            ],
            placeholder: "请选择是否开启",
          },
    },
    {
      field: 'pwd.Master',
      label: 'Master',
      bottomHelpMessage: '是否为只有主人能用',
      component: "Select",
      required: true,
        componentProps: {
          options: [
            { label: "不", value: false },
            { label: "是", value: true },
          ],
          placeholder: "请选择是否开启",
        },
  },
  {
    field: 'pwd.key',
    label: 'key',
    bottomHelpMessage: '将会影响解密加密结果',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: -9999,
      max: 99999,
      placeholder: '请输入数字'
    }
  },
    ],
      getConfigData () {
        return setting.merge()
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData (data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, setting.merge, config)
        setting.analysis(config)
        return Result.ok({}, '保存成功~')
      }
    }
  }
}
