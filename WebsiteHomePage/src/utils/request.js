import axios from 'axios'
import { Message , MessageBox } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import { exitApp } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = getToken()
  // }
  // console.log(config)
  // console.log(config)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;
    if (res.httpCode !== 200) {
      if(res.httpCode == 401) {
        MessageBox.confirm('您登陆凭证失效,请重新登录', '提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('重新登录')
            exitApp();
          })
          return Promise.reject(false);
      }
      if(res.msg){

        Message({
          showClose: true,
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    console.log(typeof error)
    for(var i in error){
      console.log(i)
      console.log(error[i])
    }
    console.log( error) // for debug
    return Promise.reject(error)
  })

export default service
