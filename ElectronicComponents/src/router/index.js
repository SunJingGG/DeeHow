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
      redirect:'/ELECTRONIC',
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
      path: '/ELECTRONICS',
      component: Layout,
      redirect: '/ELECTRONIC/outlineManage/',
      name: '元器件Two',
      children:[
        {
          path: 'librariesManage',
          component: MainLayout,
          name: '库管理S',
          icon: 'zonghe',
          redirect: '/ELECTRONICS/librariesManage/libraryDetail',
          children: [
            { path: 'libraryDetail', component:  () => import('@/views/electronics/librariesManage/libraryDetail'), name: '元器件详情', icon: 'zonghe' },
            { path: 'startFlowProcess', component:  () => import('@/views/electronics/librariesManage/startFlowProcess'), name: '元器件申请修改', icon: 'zonghe' },
          ]
        },
      ]
    }
  ]


export const asyncRouterMap = [
  {
    path: '/ELECTRONIC',
    component: Layout,
    redirect: '/ELECTRONIC/outlineManage/',
    name: '元器件',
    children: [
      {
        path: 'outlineManage',
        component: MainLayout,
        name: '大纲管理',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/outlineManage/categoryManage',
        children: [
          { path: 'categoryManage', component:  () => import('@/views/electronic/outlineManage/categoryManage'), name: '类目管理', icon: 'zonghe' },
          { path: 'attributeTemp', component:  () => import('@/views/electronic/outlineManage/attributeTemp'), name: '模板属性', icon: 'zonghe' },
        ]
      },
      {
        path: 'orderBusiness',
        component: MainLayout,
        name: '订单业务',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/orderBusiness/orderSeas',
        children: [
          { path: 'orderSeas', component:  () => import('@/views/electronic/orderBusiness/orderSeas'), name: '订单公海', icon: 'zonghe' },
          { path: 'myOrder', component:  () => import('@/views/electronic/orderBusiness/myOrder'), name: '我的订单', icon: 'zonghe' },
          { path: 'updateSeas', component:  () => import('@/views/electronic/orderBusiness/updateSeas'), name: '修改公海', icon: 'zonghe' },
          { path: 'myUpdate', component:  () => import('@/views/electronic/orderBusiness/myUpdate'), name: '我的修改池', icon: 'zonghe' },
        ]
      },
      {
        path: 'buildLibraries',
        component: MainLayout,
        name: '建库',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/buildLibraries/waitBuild',
        children: [
          { path: 'waitBuild', component:  () => import('@/views/electronic/buildLibraries/waitBuild'), name: '待建列表', icon: 'zonghe' },
          { path: 'applyForThrough', component:  () => import('@/views/electronic/buildLibraries/applyForThrough'), name: '审核通过', icon: 'zonghe' },
          { path: 'applyBackTo', component:  () => import('@/views/electronic/buildLibraries/applyBackTo'), name: '被打回', icon: 'zonghe' },
          { path: 'myLibrary', component:  () => import('@/views/electronic/buildLibraries/myLibrary'), name: '我的库', icon: 'zonghe' },
        ]
      },
      {
        path: 'modifyLibraries',
        component: MainLayout,
        name: '改库',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/modifyLibraries/waitModify',
        children: [
          { path: 'waitModify', component:  () => import('@/views/electronic/modifyLibraries/waitModify'), name: '待改列表', icon: 'zonghe' },
          { path: 'applyForThrough', component:  () => import('@/views/electronic/modifyLibraries/applyForThrough'), name: '审核通过', icon: 'zonghe' },
          { path: 'applyBackTo', component:  () => import('@/views/electronic/modifyLibraries/applyBackTo'), name: '被打回', icon: 'zonghe' },
          { path: 'myLibrary', component:  () => import('@/views/electronic/modifyLibraries/myLibrary'), name: '我改的库', icon: 'zonghe' },
        ]
      },
      {
        path: 'librariesManage',
        component: MainLayout,
        name: '库管理',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/librariesManage/componentsLib',
        children: [
          { path: 'componentsLib', component:  () => import('@/views/electronic/librariesManage/componentsLib'), name: '元器件库', icon: 'zonghe' },
          { path: 'componentsImport', component:  () => import('@/views/electronic/librariesManage/componentsImport'), name: '元器件导入', icon: 'zonghe' },
          { path: 'lifeCycle', component:  () => import('@/views/electronic/librariesManage/lifeCycle'), name: '生命周期', icon: 'zonghe' },
          { path: 'historyRecord', component:  () => import('@/views/electronic/librariesManage/historyRecord'), name: '历史记录', icon: 'zonghe' },
        ]
      },
      {
        path: 'supplier',
        component: MainLayout,
        name: '供应商',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/supplier/supplierList',
        children: [
          { path: 'supplierList', component:  () => import('@/views/electronic/supplier/supplierList'), name: '供应商列表', icon: 'zonghe' },
          { path: 'supplierAttributes', component:  () => import('@/views/electronic/supplier/supplierAttributes'), name: '供应商属性', icon: 'zonghe' },
        ]
      },
      {
        path: 'manufacturer',
        component: MainLayout,
        name: '生产厂家',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/manufacturer/manufacturerList',
        children: [
          { path: 'manufacturerList', component:  () => import('@/views/electronic/manufacturer/manufacturerList'), name: '厂家列表', icon: 'zonghe' },
          { path: 'materialList', component:  () => import('@/views/electronic/manufacturer/materialList'), name: '物料列表', icon: 'zonghe' },
        ]
      },
      {
        path: 'syncData',
        component: MainLayout,
        name: '数据同步',
        icon: 'zonghe',
        redirect: '/ELECTRONIC/syncData/syncDataList',
        children: [
          { path: 'syncDataList', component:  () => import('@/views/electronic/syncData/syncDataList'), name: '数据同步', icon: 'zonghe' }
         ]
      }
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
