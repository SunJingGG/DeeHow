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
      redirect:'/PlatformApplications',
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
        // {
        //   path: 'logUser',
        //   name: 'logUser',
        //   component: () => import('@/views/login/logUser'),
        // },
        // {
        //   path: 'logCode',
        //   name:'logCode',
        //   component: () => import('@/views/login/logCode'),
        // },
      ]
    },
    {
      path: '/EDM',
      component: Layout,
      redirect: '/EDM/engineeringManage/',
      name: '编码规则',
      children: [
        {
          path: 'engineeringManage',
          component: MainLayout,
          name: '工程管理',
          icon: 'zonghe',
          redirect: '/EDM/engineeringManage/engineeringList',
          children: [
            { path: 'engineeringList', component:  () => import('@/views/edm/engineeringManage/engineeringList'), name: '工程列表', icon: 'zonghe' },
            { path: 'engineeringNew', component:  () => import('@/views/edm/engineeringManage/engineeringNew'), name: '新建工程', icon: 'zonghe' },
          ]
        }
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
    path: '*',
    redirect: '/404',
    hidden: true
  },
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
