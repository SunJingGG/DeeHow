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
      redirect:'/FlOW',
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
      path: '/FLOWS',
      component: Layout,
      redirect: '/FlOWS/single/',
      name: '流程应用',
      children: [
        {
          path: 'single',
          component: MainLayout,
          name: '流程',
          icon: 'zonghe',
          redirect: '/FlOWS/single/intoapproval',
          children: [
            { path: 'intoapproval', component:  () => import('@/views/flow/single/intoapproval'), name: '进入审批', icon: 'zonghe' },
            { path: 'approvalHome', component:  () => import('@/views/flow/single/approvalHome'), name: '审批主页', icon: 'zonghe' },
            { path: 'return', component:  () => import('@/views/flow/single/return'), name: '被打回', icon: 'zonghe' },
            { path: 'addForm', component:  () => import('@/views/flow/single/addForm'), name: '添加表单', icon: 'zonghe' },
            { path: 'userSet', component:  () => import('@/views/flow/single/userSet'), name: '人员设置', icon: 'zonghe' },
            { path: 'lookBuild', component:  () => import('@/views/flow/single/lookBuild'), name: '查看详情', icon: 'zonghe' },
            { path: 'detailMessage', component:  () => import('@/views/flow/single/detailMessage'), name: '表单详情', icon: 'zonghe' },
          ]
        },
      ]
    },
  ]


export const asyncRouterMap = [
  {
    path: '/FLOW',
    component: Layout,
    redirect: '/FlOW/approval/',
    name: '流程应用',
    children: [
      {
        path: 'approval',
        component: MainLayout,
        name: '流程',
        icon: 'zonghe',
        redirect: '/FlOW/approval/processDesign',
        children: [
          { path: 'processDesign', component:  () => import('@/views/flow/approval/processDesign'), name: '流程设计', icon: 'zonghe' },
          { path: 'waitDo', component:  () => import('@/views/flow/approval/waitDo'), name: '待办审批', icon: 'zonghe' },
          { path: 'yetDo', component:  () => import('@/views/flow/approval/yetDo'), name: '已办审批', icon: 'zonghe' },
          { path: 'mySubmit', component:  () => import('@/views/flow/approval/mySubmit'), name: '我提交的', icon: 'zonghe' },
          { path: 'allProcess', component:  () => import('@/views/flow/approval/allProcess'), name: '全部审批', icon: 'zonghe' },
          { path: 'intoapproval', component:  () => import('@/views/flow/single/intoapproval'), name: '进入审批', icon: 'zonghe' },
        ]
      },
      {
        path: 'theForm',
        component: MainLayout,
        name: '表单',
        icon: 'zonghe',
        redirect: '/FlOW/theForm/formLibrary',
        children: [
          { path: 'formLibrary', component:  () => import('@/views/flow/theForm/formLibrary'), name: '表单库', icon: 'zonghe' },
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
