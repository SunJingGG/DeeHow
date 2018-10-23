import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
NProgress.configure({ showSpinner: false })// NProgress Configuration
const whiteList = ['/login','/login/findPassword', '/login/logHome','/login/logCode', '/login/logUser','/authredirect' , '/register','/register/regHome','/register/newUser']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() 
  // 如果没网 ， 注释此部分内容
  if(getToken()){
    if (to.path === '/login' || to.path == '/login/logHome') {
      next({ path: '/' })
      NProgress.done() 
    } else {
      next();
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1){
      next()   
    }else{
      // next('/login')
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
