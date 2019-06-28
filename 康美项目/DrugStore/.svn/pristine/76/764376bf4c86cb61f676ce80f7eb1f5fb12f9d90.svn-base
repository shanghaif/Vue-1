import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Report from '../view/Report'
import HealthFile from '../view/HealthFile'
import HealthNotes from '../view/HealthNotes'
import Manual from '../view/Manual'
import BloodOxygenReport from '../view/BloodOxygenReport'
import BloodPressureReport from '../view/BloodPressureReport'
import Index from '../view/Index'

import LivingHabit from '../view/LivingHabit'
import EatingHabits from '../view/EatingHabits'
import DrinkingSmoking from '../view/Drinking&Smoking'
import Labor from '../view/Labor'

import BasicFile from '../view/BasicFile'
import HealthHistory from '../view/HealthHistory'
import PhoneNumber from '../view/PhoneNumber'
import IDNumber from '../view/IDNumber'
import VerificationCode from '../view/VerificationCode'
import BingSucces from '../view/BingSucces'
import Error from '../view/Error'
import IntegrationReport from '../view/IntegrationReport'
import MedicationRecord from '../view/MedicationRecord'
import PrescriptionDetailed from '../view/treatmentRecord/PrescriptionDetailed'
import TreatmentRecordList from '../view/treatmentRecord/TreatmentRecordList'
import TreatmentRecordSee from '../view/treatmentRecord/TreatmentRecordSee'
import HtmlTempalte from '../view/LocalStorage'
import examList from '../view/examination/examList'
import examDetail from '../view/examination/examDetail'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        requireAuth: true,
        title: '全程健康管理',
      },
      component: Index
    },
    {
      path: '/report',
      name: 'report',
      meta: {
        requireAuth: false,
        title: '检测报告',
      },
      component: Report
    },
    {
      path: '/healthFile',
      name: 'health-file',
      meta: {
        requireAuth: true,
        title: '健康档案',
      },
      component: HealthFile
    },
    {
      path: '/healthNotes',
      name: 'health-notes',
      meta: {
        requireAuth: true,
        title: '健康记录',
      },
      component: HealthNotes
    },
    {
      path: '/manual/:showId',
      name: 'manual',
      meta: {
        requireAuth: true,
        title: '手动输入',
      },
      component: Manual
    },
    {
      path: '/bloodOxygenReport',
      name: 'blood-oxygen-report',
      meta: {
        requireAuth: true,
        title: '血糖报告',
      },
      component: BloodOxygenReport
    },
    {
      path: '/bloodPressureReport',
      name: 'blood-pressure-report',
      meta: {
        requireAuth: true,
        title: '血压报告',
      },
      component: BloodPressureReport
    },
    {
      path: '/Drinking&Smoking',
      name: 'drinkingSmoking',
      meta: {
        requireAuth: true,
        title: '吸烟饮酒',
      },
      component: DrinkingSmoking
    },
    {
      path: '/labor',
      name: 'labor',
      meta: {
        requireAuth: true,
        title: '体力劳动和运动',
      },
      component: Labor
    },
    {
      path: '/eatingHabits',
      name: 'eating-habits',
      meta: {
        requireAuth: true,
        title: '饮食习惯',
      },
      component: EatingHabits
    },
    {
      path: '/healthHistory',
      name: 'health-history',
      meta: {
        requireAuth: true,
        title: '健康史',
      },
      component: HealthHistory
    },
    {
      path: '/livingHabit',
      name: 'living-habit',
      meta: {
        requireAuth: true,
        title: '生活习惯',
      },
      component: LivingHabit
    },
    {
      path: '/basicFile',
      name: 'basic-file',
      meta: {
        requireAuth: true,
        title: '基础档案',
      },
      component: BasicFile
    },
    {
      path: '/phoneNumber',
      name: 'phone-number',
      meta: {
        requireAuth: false,
        title: '手机认证',
      },
      component: PhoneNumber

    },
    {
      path: '/idNumber',
      name: 'id-number',
      meta: {
        requireAuth: false,
        title: '身份认证',
      },
      component: IDNumber

    },
    {
      path: '/verificationCode',
      name: 'verification-code',
      meta: {
        requireAuth: false,
        title: '手机认证码',
      },
      component: VerificationCode
    },
    {
      path: '/bingSucces',
      name: 'bing-succes',
      meta: {
        requireAuth: false,
        title: '绑定成功',
      },
      component: BingSucces
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        requireAuth: false,
        title: '错误信息',
      },
      component: Error
    },
    {
      path: '/integrationReport',
      name: 'integration-report',
      meta: {
        requireAuth: false,
        title: '整合报告',
      },
      component: IntegrationReport
    },
    {
      path: '/medicationRecord',
      name: 'medication-record',
      meta: {
        requireAuth: false,
        title: '体检记录',
      },
      component: MedicationRecord
    },
    {
      path: '/prescriptionDetailed',
      name: 'prescription-detailed',
      meta: {
        requireAuth: false,
        title: '处方详细',
      },
      component: PrescriptionDetailed
    },
    {
      path: '/treatmentRecordList',
      name: 'treatment-record-list',
      meta: {
        requireAuth: false,
        title: '问诊记录列表',
      },
      component: TreatmentRecordList
    },
    {
      path: '/treatmentRecordSee',
      name: 'treatment-record-see',
      meta: {
        requireAuth: false,
        title: '问诊记录',
      },
      component: TreatmentRecordSee
    },
    {
      path: '/localStorage',
      name: 'local-storage',
      meta: {
        requireAuth: false,
        title: 'localStorage',
      },
      component: HtmlTempalte
    },
    {
      path: '/examList',
      name: 'exam-list',
      meta: {
        requireAuth: false,
        title: '体检记录',
      },
      component: examList
    },
    {
      path: '/examDetail',
      name: 'exam-detail',
      meta: {
        requireAuth: false,
        title: '体检指标',
      },
      component: examDetail
    }
  ]
})
