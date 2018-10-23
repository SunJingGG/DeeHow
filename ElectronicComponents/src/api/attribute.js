import request from '@/utils/request'

/**
 * 添加属性
 */
export function AddAttribute(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/property/update',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 获取属性列表
 */
export function GetAttribute(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/property/read/page',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 删除属性
 */
export function DeleteAttribute(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/property/delete',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}
/**
 * 删除模板
 */
export function DeleteTempleteAttribute(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/property/delete/template',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}