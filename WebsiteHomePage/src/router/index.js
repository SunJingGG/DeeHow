import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// export const constantRouterMap =
//   [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: () => import('@/views/home/index'),
//       redirect: '/homeIndex',
//       children: [
//         {
//           path: 'homeIndex',
//           name: 'homeIndex',
//           component: () => import('@/views/home/mycont/homeIndex'),
//         },
//         {
//           path: 'logHome',
//           name: 'logHome',
//           component: () => import('@/views/login/logHome'),
//         },
//         {
//           path: '/findPassword',
//           name: 'findPassword',
//           component: () => import('@/views/login/findPassword'),
//         },
//         {
//           path: '/subOrder',
//           name: 'subOrder',
//           component: () => import('@/views/byProduct/subOrder'),
//         },

//       ]
//     },
//     {
//       path: '/homeIndex',
//       name: 'HelloWorld',
//       component: () => import('@/views/home/index'),
//       children: [
//         {
//           path: 'regHome',
//           name: 'regHome',
//           component: () => import('@/views/register/regHome'),
//         },
//         {
//           path: 'newUser',
//           name: 'newUser',
//           component: () => import('@/views/register/newUser'),
//         },
//       ]
//     },
//     {
//       path: '/register',
//       name: 'Register',
//       component: () => import('@/views/register/index'),
//       redirect: '/register/regHome',
//       children: [
//         {
//           path: 'regHome',
//           name: 'regHome',
//           component: () => import('@/views/register/regHome'),
//         },
//         {
//           path: 'newUser',
//           name: 'newUser',
//           component: () => import('@/views/register/newUser'),
//         },
//       ]
//     },
//     {
//       path: '/byProduct',
//       name: 'byProduct',
//       component: () => import('@/views/byProduct/index'),
//     },
//     {
//       path: '/subOrder',
//       name: 'subOrder',
//       component: () => import('@/views/byProduct/subOrder'),
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: () => import('@/views/login/index'),
//       redirect: '/login/logHome',
//       children: [
//         {
//           path: 'logHome',
//           name: 'logHome',
//           component: () => import('@/views/login/logHome'),
//         },
//         {
//           path: 'logUser',
//           name: 'logUser',
//           component: () => import('@/views/login/logUser'),
//         },
//         {
//           path: 'findPassword',
//           name: 'findPassword',
//           component: () => import('@/views/login/findPassword'),
//         },
//       ]
//     },
//     {
//       path: '/findPassword1',
//       name: 'findPassword1',
//       component: () => import('@/views/login/findPassword1'),
//     },
//     {
//       path: '/findPassword2',
//       name: 'findPassword2',
//       component: () => import('@/views/login/findPassword2'),
//     },
//     {
//       path: '/findPassword3',
//       name: 'findPassword3',
//       component: () => import('@/views/login/findPassword3'),
//     },
//     {
//       path: '/PlatformApplications',
//       name: 'PlatformApplications',
//       component: () => import('@/views/Application/PlatformApplications'),
//     },
//     {
//       path: '/applypart',
//       name: 'applypart',
//       component: () => import('@/views/Apply/applypart'),
//     },
//     {
//       path: '/applysearch',
//       name: 'applysearch',
//       component: () => import('@/views/Apply/applysearch'),
//     },
//     {
//       path: '/applyindex',
//       name: 'applyindex',
//       component: () => import('@/views/Apply/applyindex'),
//     },
//     {
//       path: '/partindex',
//       name: 'partindex',
//       component: () => import('@/views/PartView/partindex'),
//     },
//     {
//       path: '/partlists',
//       name: 'partlists',
//       component: () => import('@/views/PartView/partlists'),
//     },
//     {
//       path: '/partdetail',
//       name: 'partdetail',
//       component: () => import('@/views/PartView/partdetail'),
//     },
//     {
//       path: '/partclassify',
//       name: 'partclassify',
//       component: () => import('@/views/PartView/partclassify'),
//     },
//     {
//       path: '/partpayment',
//       name: 'partpayment',
//       component: () => import('@/views/PartView/partpayment'),
//     },
//     {
//       path: '/buildindex',
//       name: 'buildindex',
//       component: () => import('@/views/build/buildindex'),
//     },
//   ]



export const constantRouterMap =
  [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/views/home/index'),
      redirect: '/partindex',
      children: [
        {
          path: 'homeIndex',
          name: 'homeIndex',
          component: () => import('@/views/home/mycont/homeIndex'),
        },
        {
          path: 'logHome',
          name: 'logHome',
          component: () => import('@/views/login/logHome'),
        },
        {
          path: '/findPassword',
          name: 'findPassword',
          component: () => import('@/views/login/findPassword'),
        },
        {
          path: '/need/subOrder',
          name: 'subOrder',
          component: () => import('@/views/byProduct/subOrder'),
        },
      ]
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
      path:'/need',
      name:'need',
      component: () => import('@/views/home/index'),
      redirect: '/need/applypart',
      children:[
        {
          path: 'applypart',
          name: 'applypart',
          component: () => import('@/views/needLogin/Apply/applypart'),
        },
        {
          path: 'applysearch',
          name: 'applysearch',
          component: () => import('@/views/needLogin/Apply/applysearch'),
        },
        {
          path: 'applyindex',
          name: 'applyindex',
          component: () => import('@/views/needLogin/Apply/applyindex'),
        },
      ]
    },
    {
      path:'/NoNeed',
      name:'NoNeed',
      component: () => import('@/views/home/indexOther'),
      redirect: '/NoNeed/partindex',
      children:[
        {
          path: 'partindex',
          name: 'partindex',
          component: () => import('@/views/PartView/partindex'),
        },
        {
          path: 'partlists',
          name: 'partlists',
          component: () => import('@/views/PartView/partlists'),
        },
        {
          path: 'partdetail',
          name: 'partdetail',
          component: () => import('@/views/PartView/partdetail'),
        },
        {
          path: 'partclassify',
          name: 'partclassify',
          component: () => import('@/views/PartView/partclassify'),
        },
        {
          path: 'partpayment',
          name: 'partpayment',
          component: () => import('@/views/PartView/partpayment'),
        },
        {
          path: 'buildindex',
          name: 'buildindex',
          component: () => import('@/views/build/buildindex'),
        },
        {
          path: 'searchPart',
          name: 'searchPart',
          component: () => import('@/views/PartView/searchPart'),
        },
      ]
    },
    // {
    //   path: '/need/applypart',
    //   name: 'applypart',
    //   component: () => import('@/views/needLogin/Apply/applypart'),
    // },
    // {
    //   path: '/need/applysearch',
    //   name: 'applysearch',
    //   component: () => import('@/views/needLogin/Apply/applysearch'),
    // },
    // {
    //   path: '/need/applyindex',
    //   name: 'applyindex',
    //   component: () => import('@/views/needLogin/Apply/applyindex'),
    // },
    {
      path: '/partindex',
      name: 'partindex',
      component: () => import('@/views/PartView/partindex'),
    },
    {
      path: '/partlists',
      name: 'partlists',
      component: () => import('@/views/PartView/partlists'),
    },
    {
      path: '/partdetail',
      name: 'partdetail',
      component: () => import('@/views/PartView/partdetail'),
    },
    {
      path: '/partclassify',
      name: 'partclassify',
      component: () => import('@/views/PartView/partclassify'),
    },
    {
      path: '/partpayment',
      name: 'partpayment',
      component: () => import('@/views/PartView/partpayment'),
    },
    {
      path: '/buildindex',
      name: 'buildindex',
      component: () => import('@/views/build/buildindex'),
    },
  ]

export const asyncRouterMap = [

]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
