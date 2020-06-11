import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/initial/Index'
import Set from '@/initial/Set'
import SetBluetooth from '@/initial/SetBluetooth'
import Recovery from '@/recovery/Recovery'
import Loss from '@/recovery/Loss'
import R_disinfect from '@/recovery/R_disinfect'
import Guidance from '@/guidance/Guidance'
import G_into from '@/guidance/G_into'
import Inspection from '@/inspection/Inspection'
import I_pack from '@/inspection/I_pack'
import Sterilization from '@/sterilization/Sterilization'
import S_pack from '@/sterilization/S_pack'
import Pack from '@/pack/Pack'
import Packing from '@/pack/Packing'
import P_clean from '@/pack/P_clean'
import Clean from '@/clean/Clean'
import C_recovery from '@/clean/C_recovery'
import Feedback from '@/components/Feedback'
import Top from '@/components/Top'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      // 设置
      path: '/Set',
      name: 'Set',
      component: Set
    },
    {
      // 设置蓝牙
      path: '/SetBluetooth',
      name: 'SetBluetooth',
      component: SetBluetooth
    },
    {
      // 回收
      path: '/Recovery',
      name: 'Recovery',
      component: Recovery
    },
    {
      // 回收--报损/报失
      path: '/Loss',
      name: 'Loss',
      component: Loss
    },
    {
      // 回收--消毒包
      path: '/R_disinfect',
      name: 'R_disinfect',
      component: R_disinfect
    },
    {
      // 导诊
      path: '/Guidance',
      name: 'Guidance',
      component: Guidance
    },
    {
      // 导诊-进入
      path: '/G_into',
      name: 'G_into',
      component: G_into
    },
    {
      // 质检
      path: '/Inspection',
      name: 'Inspection',
      component: Inspection
    },
    {
      // 质检-灭菌
      path: '/I_pack',
      name: 'I_pack',
      component: I_pack
    },
    {
      // 灭菌
      path: '/Sterilization',
      name: 'Sterilization',
      component: Sterilization
    },
    {
      // 灭菌-打包
      path: '/S_pack',
      name: 'S_pack',
      component: S_pack
    },
    {
      // 打包
      path: '/Pack',
      name: 'Pack',
      component: Pack
    },
    {
      // 打包-打包中
      path: '/Packing',
      name: 'Packing',
      component: Packing
    },
    {
      // 打包-清洗
      path: '/P_clean',
      name: 'P_clean',
      component: P_clean
    },
    {
      // 清洗
      path: '/Clean',
      name: 'Clean',
      component: Clean
    },
    {
      // 清洗-回收
      path: '/C_recovery',
      name: 'C_recovery',
      component: C_recovery
    },
    {
      // 反馈
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/Top',
      name: 'Top',
      component: Top
    }
  ]
})
