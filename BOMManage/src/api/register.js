import request from '@/utils/request'
var qs = require('qs');
/**
 * 注册 手机号获取验证码
 */
export function getPhoneGetCode(data) {
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/public/anon/get/regin/code',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 注册 验证手机号和验证码是否匹配
 */
export function validationPhoneCode(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/regin/check_code',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 注册 用户提交注册信息
 */
export function updateReisger(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-CMS-Web/register/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}