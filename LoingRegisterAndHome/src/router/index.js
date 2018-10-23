import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = 
  [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/views/register/index'),
      redirect: '/PlatformApplications',
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/index'),
      redirect: '/register/regHome',
      children: [
        {
          path: 'regHome',
          name:'regHome',
          component: () => import('@/views/register/regHome'),
        },
        {
          path: 'newUser',
          name:'newUser',
          component: () => import('@/views/register/newUser'),
        },
      ]
    },
    {
      path: '/byProduct',
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
          name:'logHome',
          component: () => import('@/views/login/logHome'),
        },
        {
          path: 'logUser',
          name:'logUser',
          component: () => import('@/views/login/logUser'),
        },
        {
          path: 'logCode',
          name:'logCode',
          component: () => import('@/views/login/logCode'),
        },
        {
          path: 'findPassword',
          name:'findPassword',
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
      path:'/PlatformApplications',
      name: 'PlatformApplications',
      component: () => import('@/views/Application/PlatformApplications'),
    },
  ]


export const asyncRouterMap = [
  
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
