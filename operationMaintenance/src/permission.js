import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
NProgress.configure({ showSpinner: false })// NProgress Configuration
const whiteList = ['/login', '/login/logHome', '/authredirect', '/register', '/register/regHome', '/register/newUser']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 如果没网 ， 注释此部分内容
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // next();
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          let menus = res.data
          let roles = store.state.user.roles
          store.dispatch('GenerateRoutesByMenus', roles).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to });
          })
        }).catch(error => {
          next('/');
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // next('/login')s
      next('/login')
      // window.location.href = "http://" +location.host 
      NProgress.done()
    }
  }

  //把这行注释解开
  // next()

})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
