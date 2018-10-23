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
      redirect:'/OPMA',
    },
    {
      path: '/byProduct',
      name: 'byProduct',
      component: () => import('@/views/byProduct/index'),
    },
    {
      path: '/byProduct1',
      name: 'byProduct',
      component: () => import('@/views/byProduct/index'),
    },
    {
      path: '/subOrder',
      name: 'subOrder',
      component: () => import('@/views/byProduct/subOrder'),
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
      path: '/findPassword1',
      name: 'findPassword1',
      component: () => import('@/views/login/findPassword1'),
    },
    {
      path: '/findPassword2',
      name: 'findPassword2',
      component: () => import('@/views/login/findPassword2'),
    },
    {
      path: '/findPassword3',
      name: 'findPassword3',
      component: () => import('@/views/login/findPassword3'),
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
    path: '/OPMA',
    component: Layout,
    redirect: '/OPMA/tenantManage',
    name: '基础运维',
    children: [
      {
        path: 'tenantManage',
        component: MainLayout,
        name: '租户管理',
        icon: 'zonghe',
        redirect: '/OPMA/tenantManage/waitAudit',
        children: [
          { path: 'waitAudit', component:  () => import('@/views/opma/tenantManage/waitAudit'), name: '待审核', icon: 'zonghe' },
          { path: 'tenantList', component:  () => import('@/views/opma/tenantManage/tenantList'), name: '租户列表', icon: 'zonghe' },
          { path: 'tenantModel', component:  () => import('@/views/opma/tenantManage/tenantModel'), name: '租户模块', icon: 'zonghe' },
        ]
      },
      {
        path: 'orderManage',
        component: MainLayout,
        name: '订单管理',
        icon: 'zonghe',
        redirect: '/OPMA/orderManage/orderPublicList',
        children: [
          { path: 'orderPublicList', component:  () => import('@/views/opma/orderManage/orderPublicList'), name: '订单公海', icon: 'zonghe' },
          { path: 'myOrder', component:  () => import('@/views/opma/orderManage/myOrder'), name: '我的订单', icon: 'zonghe' },
          { path: 'addOrder', component:  () => import('@/views/opma/orderManage/addOrder'), name: '添加订单', icon: 'zonghe' }
        ]
      },
      {
        path: 'modelManage',
        component: MainLayout,
        name: '模块管理',
        icon: 'zonghe',
        redirect: '/OPMA/modelManage/systemModule',
        children: [
          { path: 'systemModule', component:  () => import('@/views/opma/modelManage/systemModule'), name: '系统模块', icon: 'zonghe' }
        ]
      },
      {
        path: 'logBuffer',
        component: MainLayout,
        name: 'App运维',
        icon: 'zonghe',
        redirect: '/OPMA/logBuffer/bufferManage',
        children: [
          { path: 'logManage', component:  () => import('@/views/opma/logBuffer/logManage'), name: '日志管理', icon: 'zonghe' },
          { path: 'bufferManage', component:  () => import('@/views/opma/logBuffer/bufferManage'), name: '缓存管理', icon: 'zonghe' },
          { path: 'dispatch', component:  () => import('@/views/opma/logBuffer/dispatch'), name: '调度管理', icon: 'zonghe' },
        ]
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
