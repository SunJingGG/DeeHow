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
      redirect:'/BOM',
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
    {
      path: '/BOMS',
      component: Layout,
      redirect: '/BOMS/bomManage/',
      name: 'BOMS',
      children: [
        {
          path: 'bomManage',
          component: MainLayout,
          name: 'BOM管理',
          icon: 'zonghe',
          redirect: '/BOMS/bomManage/bomImport',
          children: [
            { path: 'toCompare', component:  () => import('@/views/boms/bomManage/toCompare'), name: '比较预览', icon: 'zonghe' },
            { path: 'productCompare', component:  () => import('@/views/boms/bomManage/productCompare'), name: '器件比较', icon: 'zonghe' },
          ]
        },
      ]
    },
  ]


export const asyncRouterMap = [
  {
    path: '/BOM',
    component: Layout,
    redirect: '/BOM/bomManage/',
    name: 'BOM',
    children: [
      {
        path: 'bomManage',
        component: MainLayout,
        name: 'BOM管理',
        icon: 'zonghe',
        redirect: '/BOM/bomManage/bomImport',
        children: [
          { path: 'bomImport', component:  () => import('@/views/bom/bomManage/bomImport'), name: 'BOM导入', icon: 'zonghe' },
          { path: 'bomCompare', component:  () => import('@/views/bom/bomManage/bomCompare'), name: 'BOM比较', icon: 'zonghe' },
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
