import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
NProgress.configure({ showSpinner: false })// NProgress Configuration
const whiteList = ['/login','/login/logHome', '/authredirect' , '/register','/register/regHome','/register/newUser']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() 
  // 如果没网 ， 注释此部分内容
  // if(getToken()){
  //   if (to.path === '/login' || to.path == '/login/logHome') {
  //     next({ path: '/' })
  //     NProgress.done() 
  //   } else {
  //     next();
  //   }
  // }else{
  //   if (whiteList.indexOf(to.path) !== -1){
  //     next()   
  //   }else{
  //     // next('/login')
  //     console.log(123)
  //     next('/login')
  //     NProgress.done() 
  //   }
  // }

  //把这行注释解开
  if(to.path.includes('/need')){
    if(getToken()){
      console.log(to.path)
      if (to.path.includes('/logHome') || to.path == '/login/logHome') {
        console.log(123)
        next({ path: '/' })
        NProgress.done() 
      } else {
        next();
      }
    }else{
      next('/logHome')
    }
  }else{
    next();
  }
  // console.log(to.path)
  // next()
  
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
