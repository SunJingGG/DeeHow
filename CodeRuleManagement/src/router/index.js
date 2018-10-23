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
      redirect:'/CODERM',
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
      path: '/404',
      component: () => import('@/views/errorPage/404'),
      hidden: true
    },
  ]


export const asyncRouterMap = [
  {
    path: '/CODERM',
    component: Layout,
    redirect: '/CODERM/codeManage/',
    name: '编码规则',
    children: [
      {
        path: 'codeManage',
        component: MainLayout,
        name: '编码管理',
        icon: 'zonghe',
        redirect: '/CODERM/codeManage',
        children: [
          { path: 'codeClass', component:  () => import('@/views/coderm/codeManage/codeClass'), name: '编码分类', icon: 'zonghe' },
          { path: 'codeGenerate', component:  () => import('@/views/coderm/codeManage/codeGenerate'), name: '生成编码', icon: 'zonghe' },
          { path: 'codeRuleSetting', component:  () => import('@/views/coderm/codeManage/codeRuleSetting'), name: '创建规则', icon: 'zonghe' },
        ]
      }
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
