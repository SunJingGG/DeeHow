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
      redirect:'/PROSTRU',
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
      path: '/PROSTRUS',
      component: Layout,
      redirect: '/PROSTRUS/myProduct/',
      name: '产品结构S',
      children: [
        {
          path: 'myProduct',
          component: MainLayout,
          name: '我的产品S',
          icon: 'zonghe',
          redirect: '/PROSTRUS/myProduct/bomImport',
          children: [
            { path: 'bomImport', component:  () => import('@/views/products/myProduct/bomImport'), name: 'BOM导入', icon: 'zonghe' },
            { path: 'bomExport', component:  () => import('@/views/products/myProduct/bomExport'), name: 'BOM导出', icon: 'zonghe' },
            { path: 'toCompare', component:  () => import('@/views/products/myProduct/toCompare'), name: '比较预览', icon: 'zonghe' },
            { path: 'productCompare', component:  () => import('@/views/products/myProduct/productCompare'), name: '器件比较', icon: 'zonghe' },
          ]
        },
      ]
    },
  ]


export const asyncRouterMap = [
  {
    path: '/PROSTRU',
    component: Layout,
    redirect: '/PROSTRU/myProduct/',
    name: '产品结构',
    children: [
      {
        path: 'myProduct',
        component: MainLayout,
        name: '我的产品',
        icon: 'zonghe',
        redirect: '/PROSTRU/myProduct/productList',
        children: [
          { path: 'productList', component:  () => import('@/views/product/myProduct/productList'), name: '产品列表', icon: 'zonghe' },
          { path: 'productCopy', component:  () => import('@/views/product/myProduct/productCopy'), name: '产品复制', icon: 'zonghe' },
        ]
      },
      {
        path: 'myDocument',
        component: MainLayout,
        name: '我的文档',
        icon: 'zonghe',
        redirect: '/PROSTRU/myDocument/documentManage',
        children: [
          { path: 'documentManage', component:  () => import('@/views/product/myDocument/documentManage'), name: '文档管理', icon: 'zonghe' },
          { path: 'documentBrowse', component:  () => import('@/views/product/myDocument/documentBrowse'), name: '文档浏览', icon: 'zonghe' },
        ]
      },
      // {
      //   path: 'theForm',
      //   component: MainLayout,
      //   name: '表单',
      //   icon: 'zonghe',
      //   redirect: '/FlOW/theForm/formLibrary',
      //   children: [
      //     { path: 'formLibrary', component:  () => import('@/views/flow/theForm/formLibrary'), name: '表单库', icon: 'zonghe' },
      //   ]
      // },
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
