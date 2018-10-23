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
      redirect:'/BASEUSER',
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
      path: '/Client',
      name: 'Client',
      component: () => import('@/views/baseuser/myAppConfig/Client'),
    },
    {
      path: '/onlineUpgrade',
      name: 'onlineUpgrade',
      component: () => import('@/views/baseuser/myAppConfig/onlineUpgrade'),
    },
    {
      path: '/BASEUSES',
      component: Layout,
      children: [
        {
          path: 'myAppConfig',
          component: MainLayout,
          icon: 'zonghe',
          children: [
            { path: 'Client', component:  () => import('@/views/baseuser/myAppConfig/Client'), name: '购买模块', icon: 'zonghe' },
            
          ]
        },
      ]
    },
  ]


export const asyncRouterMap = [
  {
    path: '/BASEUSER',
    component: Layout,
    redirect: '/BASEUSER/myAppConfig/',
    name: '我的配置',
    children: [
      {
        path: 'myConfiguration',
        component: MainLayout,
        name: '组织架构',
        icon: 'zonghe',
        redirect: '/BASEUSER/myConfiguration/employeesManage',
        children: [
          { path: 'roleManage', component:  () => import('@/views/baseuser/myConfiguration/roleManage'), name: '角色管理', icon: 'zonghe' },
          { path: 'employeesManage', component:  () => import('@/views/baseuser/myConfiguration/employeesManage'), name: '员工管理', icon: 'zonghe' },
        ]
      },
      {
        path: 'myAppConfig',
        component: MainLayout,
        name: '我的APP',
        icon: 'zonghe',
        redirect: '/BASEUSER/myAppConfig/myHaveModel',
        children: [
          { path: 'myHaveModel', component:  () => import('@/views/baseuser/myAppConfig/myHaveModel'), name: '我的模块', icon: 'zonghe' },
          { path: 'onlineUpgrade', component:  () => import('@/views/baseuser/myAppConfig/onlineUpgrade'), name: '在线升级', icon: 'zonghe' },
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
