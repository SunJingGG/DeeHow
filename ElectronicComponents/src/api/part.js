import request from '@/utils/request'

/**
 * 按生产状态统计元器件接口
 */
export function chartproduction(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/count/state',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

/**
 * 制造商元器件集合接口
 */
export function chartparts(data) {
  
  const params = JSON.stringify(data);
  return request({
      url: '/deehow-ELIBM-Web/manufacturers/read/list/comma',
      method: 'post',
      data: params,
      headers: {
        'content-type': 'application/json'
      }
  });
}

