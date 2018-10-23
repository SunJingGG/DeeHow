import Vue from 'vue'
import Router from 'vue-router'
/* layout */
import Layout from '../views/layout/index';
// import Layout from '../views/layout2/Layout';



/* 布局*/
import MainLayout from '../views/layout/MainLayout'

Vue.use(Router)
export const constantRouterMap =
  [
    {
      path: '/',
      name: 'layout',
      // component: Layout,
      redirect:'/RULEBASE',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index'),
      redirect: '/login/logHome',
      children: [
        {
          path: 'logHome',
          name: 'logHome',
          component: () => import('@/views/login/logHome'),
        },
        {
          path: 'logUser',
          name: 'logUser',
          component: () => import('@/views/login/logUser'),
        },
        {
          path: 'findPassword',
          name: 'findPassword',
          component: () => import('@/views/login/findPassword'),
        },
      ]
    },
    {
      path: '/PlatformApplications',
      name: 'PlatformApplications',
      component: () => import('@/views/Application/PlatformApplications'),
    },
    {
      path: '/RULEBASES',
      component: Layout,
      redirect: '/RULEBASES/singles/',
      name: '流程应用',
      children: [
        {
          path: 'singles',
          component: MainLayout,
          name: '规则',
          icon: 'zonghe',
          redirect: '/RULEBASES/singles/addEntry',
          children: [
            { path: 'addEntry', component:  () => import('@/views/rule/singles/addEntry'), name: '添加条目', icon: 'zonghe' },
          ]
        },
      ]
    },
    {
      path: '/404',
      component: () => import('@/views/errorPage/404'),
      hidden: true
    },
  ]


export const asyncRouterMap = [
  {
    path: '/RULEBASE',
    component: Layout,
    redirect: '/RULEBASE/myBaseRule/',
    name: '规则库',
    children: [
      {
        path: 'myBaseRule',
        component: MainLayout,
        name: '我的规则库',
        icon: 'zonghe',
        redirect: '/RULEBASE/myBaseRule/processDesign',
        children: [
          { path: 'ruleManage', component:  () => import('@/views/rule/myBaseRule/ruleManage'), name: '规则库管理', icon: 'zonghe' },
          { path: 'entryMaintenance', component:  () => import('@/views/rule/myBaseRule/entryMaintenance'), name: '条目维护项', icon: 'zonghe' },
        ]
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
