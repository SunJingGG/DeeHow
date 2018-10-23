import request from '@/utils/request'

/**
 * 登录 获取租户
 */
export function getTenant(data) {
  
  return request({
      url: `/deehow-CMS-Web//unit/anon/get/${data}/tenant`,
      method: 'get',
      data: {},
      headers: {
        'content-type': 'application/json'
      }
  });
}


/**
 * 登录 获取租户
 */
export function login(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/login',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}


// loginByUsername, logout, getUserInfo 


/**
 * 登录 loginByUsername
 */
export function loginByUsername(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/login',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 登出 logout
 */
export function logout(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/logout',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 获取当前登录信息
 */
export function getUserInfo(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/user/read/current',
      method: 'get',
  });
}

/**
 * 获取登录人的菜单权限
 */
export function getMenu(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-CMS-Web/user/get_menu',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 找回密码获取验证码
 */
export function findPasswordCheckCode(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-CMS-Web/public/anon/get/retrieve_password/code',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 找回密码验证验证码
 */
export function validatePasswordCheckCode(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-CMS-Web/user/anon/retrieve_password/validate',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}
/**
 * 重置密码
 */
export function resetPassword(data) {
  const params = JSON.stringify(data);
  return request({
    url: '/deehow-CMS-Web/user/anon/retrieve_password/reset',
    method: 'post',
    data: params,
    headers: {
      'content-type': 'application/json'
    }
  });
}




// 