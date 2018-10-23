import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken , exitApp} from '@/utils/auth' // getToken from cookie
NProgress.configure({ showSpinner: false })// NProgress Configuration
const whiteList = ['/login', '/login/logHome']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 如果没网 ， 注释此部分内容
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }

  //把这行注释解开
  // next()

})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
