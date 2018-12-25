import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'report',
      meta: {
        requireAuth: false,
        title: '检测报告',
      },
      component: resolve => require(['../view/Report'],resolve)
    },
    {
      path: '/healthFile',
      name: 'health-file',
      meta: {
        requireAuth: true,
        title: '健康档案',
      },
      component: resolve => require(['../view/HealthFile'],resolve)
    },
    {
      path: '/healthNotes',
      name: 'health-notes',
      meta: {
        requireAuth: true,
        title: '健康记录',
      },
      component: resolve => require(['../view/HealthNotes'],resolve),
    },
    {
      path: '/manual/:showId',
      name: 'manual',
      meta: {
        requireAuth: true,
        title: '手动输入',
      },
      component: resolve => require(['../view/Manual'],resolve)
    },
    {
      path: '/bloodOxygenReport',
      name: 'blood-oxygen-report',
      meta: {
        requireAuth: true,
        title: '血氧报告',
      },
      component: resolve => require(['../view/BloodOxygenReport'],resolve)
    },
    {
      path: '/bloodPressureReport',
      name: 'blood-pressure-report',
      meta: {
        requireAuth: true,
        title: '血压报告',
      },
      component: resolve => require(['../view/BloodPressureReport'],resolve)
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        requireAuth: true,
        title: '全程健康管理',
      },
      component: resolve => require(['../view/Index'],resolve),
    },

    {
      path: '/drinking',
      name: 'drinking',
      meta: {
        requireAuth: true,
        title: '饮酒情况',
      },
      component: resolve => require(['../view/Drinking'],resolve)
    },
    {
      path: '/smoking',
      name: 'smoking',
      meta: {
        requireAuth: true,
        title: '吸烟情况',
      },
      component: resolve => require(['../view/Smoking'],resolve)
    },
    {
      path: '/labor',
      name: 'labor',
      meta: {
        requireAuth: true,
        title: '体力劳动和运动',
      },
      component: resolve => require(['../view/Labor'],resolve)
    },
    {
      path: '/eatingHabits',
      name: 'eating-habits',
      meta: {
        requireAuth: true,
        title: '饮食习惯',
      },
      component: resolve => require(['../view/EatingHabits'],resolve)
    },
    {
      path: '/healthHistory',
      name: 'health-history',
      meta: {
        requireAuth: true,
        title: '健康史',
      },
      component: resolve => require(['../view/HealthHistory'],resolve)
    },
    {
      path: '/familyHistory',
      name: 'family-history',
      meta: {
        requireAuth: true,
        title: '家族史',
      },
      component: resolve => require(['../view/FamilyHistory'],resolve)
    },
    {
      path: '/medicalHistory',
      name: 'medical-history',
      meta: {
        requireAuth: true,
        title: '疾病史',
      },
      component: resolve => require(['../view/MedicalHistory'],resolve)
    },
    {
      path: '/livingHabit',
      name: 'living-habit',
      meta: {
        requireAuth: true,
        title: '生活习惯',
      },
      component: resolve => require(['../view/LivingHabit'],resolve)
    },
    {
      path: '/basicFile',
      name: 'basic-file',
      meta: {
        requireAuth: true,
        title: '基础档案',
      },
      component: (resolve)=> require(['../view/BasicFile'],resolve)
    },

    {
      path: '/phoneNumber',
      name: 'phone-number',
      meta: {
        requireAuth: false,
        title: '手机认证',
      },
      component: (resolve)=> require(['../view/PhoneNumber'],resolve),

    },
    {
      path: '/verificationCode',
      name: 'verification-code',
      meta: {
        requireAuth: false,
        title: '手机认证码',
      },
      component: (resolve)=> require(['../view/VerificationCode'],resolve)
    },
    {
      path: '/bingSucces',
      name: 'bing-succes',
      meta: {
        requireAuth: false,
        title: '绑定成功',
      },
      component: (resolve)=> require(['../view/BingSucces'],resolve)
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        requireAuth: false,
        title: '错误信息',
      },
      component: (resolve)=> require(['../view/Error'],resolve)
    },
    {
      path: '/integrationReport',
      name: 'integration-report',
      meta: {
        requireAuth: false,
        title: '整合报告',
      },
      component: (resolve)=> require(['../view/IntegrationReport'],resolve)
    },
    {
      path: '/medicationRecord',
      name: 'medication-record',
      meta: {
        requireAuth: false,
        title: '体检记录',
      },
      component: (resolve)=> require(['../view/MedicationRecord'],resolve)
    },
  ]
})
