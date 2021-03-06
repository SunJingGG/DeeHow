import Cookies from 'js-cookie'
import store from '@/store'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function exitApp() {
 
  store.dispatch('LogOut').then(() => {
    console.log('退出u');
    window.localStorage.clear();
    Cookies.remove(TokenKey)
    // window.location.href = "http://" +location.host 
    window.location.reload();
    //location.reload() // 为了重新实例化vue-router对象 避免bug
  })
}